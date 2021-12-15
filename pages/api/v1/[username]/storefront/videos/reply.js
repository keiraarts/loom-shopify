"use strict";

import { get } from "lodash";

require("babel-polyfill");
// Services
const Shopify = require("../../../../../../services/shopify");
const DynamoDB = require("../../../../../../services/dynamodb");
const SES = require("../../../../../../services/ses");

export default async function handler(req, res) {
  const { method } = req;
  const ShopifyClass = new Shopify();

  const headers = { request: { headers: req.headers } };
  const { username, isVerified } = await ShopifyClass.getCredentials(headers);

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

        const identity = {
          brand: storefront.brand,
          ses_email: process.env.AWS_SES_EMAIL,
          replyto: get(storefront, "customer_email", storefront.email),
        };

        const { body, customer_email } = req.body;
        const SESClass = new SES(username, identity);
        const status = await SESClass.CustomerOutgoing([customer_email], {
          subject: `You received a reply to your video message! ✨`,
          messages: body.split("\n"),
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
