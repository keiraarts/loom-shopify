const Shopify = require("../../../../../../services/shopify");

export default async function handler(req, res) {
  const { method } = req;
  const ShopifyClass = new Shopify();
  const headers = { request: { headers: req.headers } };
  const { username, isVerified } = await ShopifyClass.getCredentials(headers);

  if (!isVerified) {
    res.status(403);
    res.json({ message: "user not verified to uninstall" });
    return;
  }

  switch (method) {
    case "GET":
      try {
        ShopifyClass.SetCredentials(
          username,
          req.headers["x-shopify-shopify-token"]
        );
        const customer = await ShopifyClass.GetCustomerByEmail(req.query.email);
        res.json(customer);
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
