import { handleAuthCallback } from "../../../toolbox/src/middleware";
import get from "lodash/get";

const Stripe = require("../../../services/stripe");
const Shopify = require("../../../services/shopify");
const DynamoDB = require("../../../services/dynamodb");
const SES = require("../../../services/ses");

export interface ShopObject {
  address1: string;
  address2: string;
  checkout_api_supported: boolean;
  city: string;
  country: string;
  country_code: string;
  country_name: string;
  county_taxes: any;
  created_at: string;
  customer_email: string;
  currency: string;
  domain: string;
  enabled_presentment_currencies: string[];
  eligible_for_card_reader_giveaway: boolean;
  eligible_for_payments: boolean;
  email: string;
  finances: boolean;
  force_ssl: boolean;
  google_apps_domain: boolean;
  google_apps_login_enabled: any;
  has_discounts: boolean;
  has_gift_cards: boolean;
  has_storefront: boolean;
  iana_timezone: string;
  id: number;
  latitude: number;
  longitude: number;
  money_format: string;
  money_in_emails_format: string;
  money_with_currency_format: string;
  money_with_currency_in_emails_format: string;
  multi_location_enabled: boolean;
  myshopify_domain: string;
  name: string;
  password_enabled: boolean;
  phone: any;
  plan_display_name: string;
  pre_launch_enabled: boolean;
  cookie_consent_level: string;
  plan_name: string;
  primary_locale: string;
  primary_location_id: number;
  province: string;
  province_code: string;
  requires_extra_payments_agreement: boolean;
  setup_required: boolean;
  shop_owner: string;
  source: any;
  taxes_included: any;
  tax_shipping: any;
  timezone: string;
  updated_at: string;
  weight_unit: string;
  zip: string;
}

export interface StorefrontObject {
  account: {
    shopify_plan: string;
    address1: string;
    city: string;
    country: string;
    phone: string;
    postcode: string;
    state: string;
  };

  theme: string;
  brand: string;
  email: string;
  domain: string;
  customer_email: string;
  currency: string;
  hostname: string;

  id: number;
  username: string;
  subscription: string;
  stripe_id: string;
  shopify_token: string;
}

const afterAuth = async (req, res, accessToken) => {
  // save accessToken with the shop
  // redirect is handled by handleAuthCallback
  const domain = req.query.shop;
  const shopify_token = accessToken.access_token;
  const username: string = domain.replace(".myshopify.com", "");

  const ShopifyClass = new Shopify(username, shopify_token);
  const shop: ShopObject = await ShopifyClass.GetShopDetails();
  const instance = ShopifyClass.CreateInstance();

  const SESClass = new SES();
  const DynamoDBClass = new DynamoDB(username);
  const StripeClass = new Stripe(process.env.LIVEMODE);
  const storefront: StorefrontObject = await DynamoDBClass.GetStorefront();

  [[`app/uninstalled`, `app_uninstalled`]].map(
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
        .catch(() => {});
    }
  );

  if (!get(storefront, "username")) {
    SESClass.PersonalEmail([shop.email], {
      subject: "🦄 おはよう! Bonjour! Let's get your shop setup!",
      messages: [
        `Thanks for trying out HonestyCore.com on Shopify!`,
        "You can now add our app to any of your pages within the theme editor.",
        "Customers will be able to ask your shop questions with a video or screen recording.",
        `Don't hesitate to reach out if you need getting setup; I love helping! :)`,
      ],
    });

    const stripeCustomer = await StripeClass.CreateCustomer(shop);

    const input: StorefrontObject = {
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
      domain: shop.domain,
      customer_email: shop.customer_email,
      currency: shop.currency,
      hostname: shop.myshopify_domain,

      id: shop.id,
      username: username,
      subscription: "free",
      stripe_id: stripeCustomer,
      shopify_token: shopify_token,
    };

    // (await) is important to avoid showing a landing page
    // before the user's storefront is created!
    await DynamoDBClass.CreateStorefront(input);
  } else {
    // Make sure the storefront doesn't think the app is uninstalled
    await DynamoDBClass.UpdateStorefront({
      customer_email: shop.customer_email,
      shopify_token: shopify_token,
      date_updated: Date.now(),
      date_uninstalled: false,
      domain: shop.domain,
    });
  }
};

export default handleAuthCallback(afterAuth);
