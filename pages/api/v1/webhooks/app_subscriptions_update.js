"use strict";
// Services
const getRawBody = require("raw-body");
const Shopify = require("../../../../services/shopify");
const DynamoDB = require("../../../../services/dynamodb");
const SES = require("../../../../services/ses");

const Analytics = require("analytics-node");
const analytics = new Analytics(process.env.SEGMENT_WRITE_KEY);

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

export default async function handler(req, res) {
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

  if (!isVerified) {
    res.status(403);
    console.error("Shopify webhook not verified.");
    res.json({ message: "Token expired before patching dispatch" });
    return;
  }

  switch (method) {
    case "POST":
      try {
        const { app_subscription } = req.body;
        const { status, name } = app_subscription;
        const subscription_id = name.toLowerCase();
        console.log("Process app_subscriptions_update");
        console.log({ username, app_subscription });

        analytics.identify({
          userId: username,
          traits: { subscriptionn: app_subscription },
        });

        const SESClass = new SES();
        const DynamoDBClass = new DynamoDB(username);
        const storefront = await DynamoDBClass.GetStorefront();

        if (status === "ACCEPTED" || status === "ACTIVE") {
          console.log("Updating subscriptions..");
          DynamoDBClass.UpdateStorefront({ subscription: subscription_id });

          SESClass.PersonalEmail([storefront.email], {
            subject: `You subscribed to DisputeCore.com! ✨`,
            messages: [
              `Congrats on the upgrade for your <a href="${username}.myshopify.com">shop<a/>!`,
              `Your subscription was added to Shopify's next billing cycle.`,
              `I'm excited to help you win more disputes; reach out if I can help!`,
            ],
          });

          analytics.track({
            userId: username,
            event: "Subscribed",
            properties: app_subscription,
          });
        }

        if (status === "EXPIRED") {
          SESClass.PersonalEmail([storefront.email], {
            subject: `Have you fought disputes before?`,
            messages: [
              `Thanks for trying out DisputeCore.com!`,
              `If you have any questions (or dispute experiences) we'd love to hear them.`,
              `Ping me anytime! :)`,
            ],
          });
        }

        res.json({ message: "app_subscriptions_update webhook processed" });
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
