import { setCookies } from "cookies-next";
const nonce = require("nonce");
const createNonce = nonce();

const handleAuthStart = (req, res) => {
  let {
    query: { shop },
  } = req;

  const scopes = process.env.SHOPIFY_AUTH_SCOPES;
  const redirect_uri = process.env.SHOPIFY_AUTH_CALLBACK_URL;

  if (!shop) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Required Query or Shop missing." });
  }

  if (!shop.includes(".myshopify.com")) {
    shop = shop + ".myshopify.com";
  }

  setCookies("shop", shop, { req, res, maxAge: 60 * 6 * 24 });
  var authUrl = "https://"
    .concat(shop, "/admin/oauth/authorize?client_id=")
    .concat(process.env.SHOPIFY_API_PUBLIC_KEY, "&scope=")
    .concat(scopes, "&redirect_uri=")
    .concat(encodeURI("https://" + redirect_uri), "&state=")
    .concat(createNonce(), encodeURI("&shop=" + shop));

  res.redirect(authUrl);
};

export default handleAuthStart;
