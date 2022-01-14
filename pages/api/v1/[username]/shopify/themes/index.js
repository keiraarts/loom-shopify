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
        const _themes = await ShopifyClass.GetThemes();
        // Specify the name of the template the app will integrate with
        const APP_BLOCK_TEMPLATES = ["product", "collection", "index"];

        const themes = await Promise.all(
          _themes.map(async (theme) => {
            // Retrieve a list of assets in the published theme
            const assets = await ShopifyClass.GetAssets(theme);

            // Check if JSON template files exist for the template specified in APP_BLOCK_TEMPLATES
            const templateJSONFiles = assets.filter((file) => {
              return APP_BLOCK_TEMPLATES.some(
                (template) => file.key === `templates/${template}.json`
              );
            });

            if (templateJSONFiles.length > 0) {
              // console.log("All desired templates support sections everywhere!");
              return { ...theme, sections: true };
            } else if (templateJSONFiles.length) {
              // console.log("Only some of the templates support sections.");
              return { ...theme, sections: false };
            }
          })
        );

        res.json(themes);
      } catch (error) {
        console.error(error);
        res.status(400).json([]);
      }

      break;

    default:
      res.status(400).json({ success: false, message: "route not matched" });
      break;
  }
}
