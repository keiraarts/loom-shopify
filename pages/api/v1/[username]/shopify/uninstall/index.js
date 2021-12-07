"use strict";
const Shopify = require("../../../../../../services/shopify");

export default async function handler(req, res) {
  const { method } = req;
  const ShopifyClass = new Shopify();
  const headers = { request: { headers: req.headers } };
  const { isVerified } = await ShopifyClass.getCredentials(headers);

  if (!isVerified) {
    res.status(403);
    res.json({ message: "user not verified to uninstall" });
    return;
  }

  switch (method) {
    case "DELETE":
      try {
        res.status(200);
        await ShopifyClass.Uninstall();
        res.json("Shop uninstalled!");
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
