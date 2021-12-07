const Shopify = require("../../../../../../services/shopify");

export default async function handler(req, res) {
  const { method } = req;
  const ShopifyClass = new Shopify();
  const headers = { request: { headers: req.headers } };

  const {
    username,
    isVerified,
    shopifyAccessToken,
  } = await ShopifyClass.getCredentials(headers);

  if (!isVerified) {
    res.status(403);
    return;
  }

  switch (method) {
    case "GET":
      try {
        ShopifyClass.SetCredentials(username, shopifyAccessToken);
        const themes = await ShopifyClass.GetThemes();
        res.json(themes);
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
