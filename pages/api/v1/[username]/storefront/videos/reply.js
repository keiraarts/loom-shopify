const Shopify = require("../../../../../../services/shopify");
const DynamoDB = require("../../../../../../services/dynamodb");
const SES = require("../../../../../../services/ses");
import { get } from "lodash";

export default async function handler(req, res) {
  const { method } = req;
  const ShopifyClass = new Shopify();
  const headers = { request: { headers: req.headers } };

  const {
    username,
    isVerified,
    shopifyAccessToken,
  } = await ShopifyClass.getCredentials(headers);

  ShopifyClass.SetCredentials(username, shopifyAccessToken);
  if (!isVerified) {
    res.status(403);
    res.json({ message: "Token expired before patching dispatch." });
    return;
  }

  switch (method) {
    case "POST":
      try {
        const DynamoDBClass = new DynamoDB(username);
        const storefront = await DynamoDBClass.GetStorefront();
        ShopifyClass.SetCredentials(username, shopifyAccessToken);

        const identity = {
          brand: storefront.brand,
          ses_email: process.env.AWS_SES_EMAIL,
          replyto: get(storefront, "customer_email", storefront.email),
        };

        const { body, loom_email } = req.body;

        if (!loom_email) {
          console.error("No email provided");
          res.status(400).json({ success: false, message: "No email" });
        }

        const SESClass = new SES(username, identity);
        const status = await SESClass.CustomerOutgoing([loom_email], {
          subject: `You received a reply to your video message! ✨`,
          domain: get(storefront, "domain", storefront.hostname),
          messages: body.split("\n"),
          brand: storefront.brand,
        });

        res.status(200);
        res.json({ status });
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
