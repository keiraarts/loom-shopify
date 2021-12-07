"use strict";
require("babel-polyfill");
const { get } = require("lodash");
const Shopify = require("../../../../services/shopify");
const DynamoDB = require("../../../../services/dynamodb");

export default async function handler(req, res) {
  const { method } = req;
  const ShopifyClass = new Shopify();

  const headers = { request: { headers: req.headers } };
  const {
    username,
    isVerified,
    authorization,
  } = await ShopifyClass.getCredentials(headers);

  switch (method) {
    case "GET":
      try {
        if (!isVerified) {
          res.status(403);
          res.json({ message: "Verify failed; user not verified" });
          return;
        }

        // From here on the verification was correct
        // We will delete storefronts on any uninstall requests
        const DynamoDBClass = new DynamoDB(username);
        const storefront = await DynamoDBClass.GetStorefront();

        if (!get(storefront, "username")) {
          res.status(307);
          res.json({ message: "User does not exist" });
          return;
        }

        if (!get(storefront, "shopify_token")) {
          res.status(403);
          res.json({ message: "Verify failed; user uninstalled" });
          return;
        }

        res.status(200);
        res.json(storefront);
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
