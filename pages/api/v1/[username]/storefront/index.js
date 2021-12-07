"use strict";
require("babel-polyfill");

const { get, omit } = require("lodash");
const Stripe = require("../../../../../services/stripe");
const Shopify = require("../../../../../services/shopify");
const DynamoDB = require("../../../../../services/dynamodb");

// Prevent accidental overrides
const postExclusions = [
  "pk",
  "sk",
  "id", // can't override this id
  "isDemo", // usesless demo data
  "balance", // internal atomic counter
  "isAccountNew", // intenrnal *useless* metric
  "username", // non-mutatable
  "isValidating", // useless demo data
  "stripeCustomerID", // non-mutatable
  "shopifyAccessToken", // only updated via server
  "stripeSubscriptionStatus", // this should not be fetched
];

const getExclusions = [];

export default async function handler(req, res) {
  const { method } = req;
  const { tracking } = req.query;
  const ShopifyClass = new Shopify();

  const headers = { request: { headers: req.headers } };
  const { username, isVerified } = await ShopifyClass.getCredentials(headers);

  if (!isVerified || tracking === "undefined") {
    res.status(403);
    res.json({ message: "Token expired before patching dispatch." });
    return;
  }

  switch (method) {
    case "GET":
      try {
        const DynamoDBClass = new DynamoDB(username);
        const storefront = await DynamoDBClass.GetStorefront();

        const customer = get(storefront, "stripe_id");
        const StripeClass = new Stripe(process.env.LIVEMODE, { customer });
        const account = await StripeClass.GetCustomer();
        const balance = get(account, "balance", 0);

        res.status(200);
        res.json({ ...omit(storefront, getExclusions), balance });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: "fetch failed" });
      }

      break;

    case "PUT":
      try {
        const DynamoDBClass = new DynamoDB(username);
        const update = omit(req.body, postExclusions);
        DynamoDBClass.UpdateStorefront(update);

        res.status(200);
        res.json({ message: "Shop updated!", update });
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
