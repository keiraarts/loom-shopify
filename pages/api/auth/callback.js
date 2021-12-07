import { handleAuthCallback } from "../../../toolbox/src/middleware";
import get from "lodash/get";

const Analytics = require("analytics-node");
const Stripe = require("../../../services/stripe");
const Shopify = require("../../../services/shopify");
const DynamoDB = require("../../../services/dynamodb");
const SES = require("../../../services/ses");

const analytics = new Analytics(process.env.SEGMENT_WRITE_KEY);

const afterAuth = async (req, res, accessToken) => {
  // save accessToken with the shop
  // redirect is handled by handleAuthCallback
  const domain = req.query.shop;
  const shopify_token = accessToken.access_token;
  const username = domain.replace(".myshopify.com", "");

  const ShopifyClass = new Shopify(username, shopify_token);
  const shop = await ShopifyClass.GetShopDetails();
  const instance = ShopifyClass.CreateInstance();

  const SESClass = new SES();
  const DynamoDBClass = new DynamoDB(username);
  const StripeClass = new Stripe(process.env.LIVEMODE);
  let storefront = await DynamoDBClass.GetStorefront();

  [
    [`app/uninstalled`, `app_uninstalled`],
    [`disputes/create`, `disputes_create`],
    [`disputes/update`, `disputes_update`],
    [`fulfillments/update`, `fulfillments_update`],
  ].map(
    // Send an email to the user on install events
    // Save the tracking information on fulfillment updates
    ([topic, address]) => {
      instance
        .post(`webhooks.json`, {
          webhook: {
            topic,
            format: "json",
            apiVersion: process.env.SHOPIFY_API_VERSION,
            address: `https://${process.env.TUNNEL}/api/v1/webhooks/` + address,
          },
        })
        .catch((err) => {});
    }
  );

  if (!get(storefront, "username")) {
    SESClass.PersonalEmail([shop.email], {
      subject: "📦 おはよう! Bonjour! Thanks for installing!",
      messages: [
        `Thanks for trying out DisputeCore.com on Shopify!`,
        "Let's get your orders protected against fraudulent chargebacks.",
        `Don't hesitate to reach out if you need getting setup; I love helping! :)`,
      ],
    });

    const stripeCustomer = await StripeClass.CreateCustomer(shop);

    const input = {
      account: {
        shopify_plan: shop.plan_name,
        address1: shop.address1,
        city: shop.city,
        country: shop.country_code,
        phone: shop.phone,
        postcode: shop.zip,
        state: shop.province_code,
      },

      theme: "shopify",
      brand: shop.name,
      email: shop.email,
      currency: shop.currency,
      hostname: shop.myshopify_domain,

      id: shop.id,
      username: username,
      subscription: "free",
      stripe_id: stripeCustomer,
      shopify_token: shopify_token,
    };

    try {
      analytics.identify({
        userId: username,
        traits: input,
      });

      analytics.track({
        userId: username,
        event: "Signed Up",
      });
    } catch (error) {
      // Catch error from segment
      console.error("Segment node error", error);
    }

    // (await) is important to avoid showing a landing page
    // before the user's storefront is created!
    await DynamoDBClass.CreateStorefront(input);
  } else {
    // Make sure the storefront doesn't think the app is uninstalled
    await DynamoDBClass.UpdateStorefront({
      shopify_token: shopify_token,
      date_updated: Date.now(),
      date_uninstalled: false,
    });
  }
};

export default handleAuthCallback(afterAuth);
