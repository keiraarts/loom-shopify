"use strict";
// Services
const getRawBody = require("raw-body");
const Shopify = require("../../../../services/shopify");
const DynamoDB = require("../../../../services/dynamodb");

// Turn off default NextJS bodyParser, so we can run our own middleware
export const config = {
  api: {
    bodyParser: false,
  },
};

// Custom Middleware to parse Shopify's webhook payload
const runMiddleware = (req, res, fn) => {
  new Promise((resolve) => {
    if (!req.body) {
      let buffer = "";
      req.on("data", (chunk) => {
        buffer += chunk;
      });

      req.on("end", () => {
        resolve();
        req.body = JSON.parse(Buffer.from(buffer).toString());
      });
    }
  });
};

// https://shopify.dev/docs/admin-api/rest/reference/events/webhook
export default async function handler(req, res) {
  const body = req.body;
  const { method } = req;
  const ShopifyClass = new Shopify();

  /*  ------------------------------ */
  /*  1. Run our middleware
  /*  2. check webhook integrity
  /*  ------------------------------ */

  await runMiddleware(req, res);
  const rawBody = await getRawBody(req);

  const headers = { request: { headers: req.headers, rawBody } };
  const { username, isVerified } = await ShopifyClass.getCredentials(headers);

  if (!isVerified || !tracking_url) {
    res.status(403);
    res.json({ message: "Token expired before patching dispatch." });
    return;
  }

  const { tracking_url } = req.body;
  if (!tracking_url) {
    res.status(200);
    res.json({ message: "The fullfillment does not have a tracking." });
    return;
  }

  switch (method) {
    case "POST":
      try {
        const DynamoDBClass = new DynamoDB(username);

        await Promise.all(
          // Initialize row for each tracking number
          body.tracking_numbers.map((el, index) => {
            DynamoDBClass.InitializeDispatch({
              platform: "shopify",
              status: "pending", // Postage not yet scanned
              order_id: body.order_id,

              // Save tracking information as an array
              local_name: body.name,
              destination: body.destination,
              tracking_number: body.tracking_number,
              tracking_url: body.tracking_urls[index],
              currency: line_items[0].presentment_money.currency_code,
              shopify_fulfillment_id: body.admin_graphql_api_id,

              // Useful to spot fulfillment errors later
              products: body.line_items.map((item) => {
                return {
                  id: item.id,
                  price: item.price,
                  title: item.title,
                  quantity: item.quantity,
                  requires_shipping: item.requires_shipping,
                  shopify_line_id: item.admin_graphql_api_id,
                };
              }),

              date_created: Date.now(),
            });
          })
        );

        res.json({ message: "fullfilments_update webhook processed" });
        res.status(200);
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: "fetch failed" });
      }

      break;

    default:
      res.status(400).json({ success: false, message: "route not matched" });
      break;
  }
}
