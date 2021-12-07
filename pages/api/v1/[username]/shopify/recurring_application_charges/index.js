"use strict";

const Shopify = require("../../../../../../services/shopify");
const DynamoDB = require("../../../../../../services/dynamodb");

export default async function handler(req, res) {
  const { method } = req;
  const ShopifyClass = new Shopify();

  const headers = { request: { headers: req.headers } };
  const { username, isVerified } = await ShopifyClass.getCredentials(headers);

  if (!isVerified) {
    res.status(403);
    res.json({ message: "User not verified to access recurring charges api." });
    return;
  }

  switch (method) {
    case "POST":
      try {
        const { recurring_application_charge: data } = req.body;

        const DynamoDBClass = new DynamoDB(username);
        const storefront = await DynamoDBClass.GetStorefront();
        ShopifyClass.SetCredentials(username, storefront?.shopify_token);
        const charge = await ShopifyClass.CreateRecurringCharge(data);

        res.status(200);
        res.json(charge);
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: "fetch failed" });
      }

      break;

    case "DELETE":
      try {
        const DynamoDBClass = new DynamoDB(username);
        const storefront = await DynamoDBClass.GetStorefront();
        ShopifyClass.CancelRecurringCharge(storefront?.subscription);

        res.status(200);
        res.json({ message: `Cancelled ${storefront?.subscription}` });
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
