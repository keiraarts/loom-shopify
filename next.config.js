require("dotenv").config();
const withFonts = require("next-fonts");

module.exports = withFonts({
  env: {
    SALT: process.env.SALT,
    TUNNEL: process.env.TUNNEL,
    LIVEMODE: process.env.LIVEMODE,
    API_TUNNEL: process.env.API_TUNNEL,
    APP_NAME: process.env.APP_NAME,
    APP_SLUG: process.env.APP_SLUG,

    SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
    SUPPORT_PHONE: process.env.SUPPORT_PHONE,
    COMPANY_NAME: process.env.COMPANY_NAME,

    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
    SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
    SHOPIFY_API_VERSION: process.env.SHOPIFY_API_VERSION,

    STRIPE_LIVE_PUBLISHABLE_KEY: process.env.STRIPE_LIVE_PUBLISHABLE_KEY,
    STRIPE_LIVE_SECRET_KEY: process.env.STRIPE_LIVE_SECRET_KEY,
    STRIPE_TEST_PUBLISHABLE_KEY: process.env.STRIPE_TEST_PUBLISHABLE_KEY,
    STRIPE_TEST_SECRET_KEY: process.env.STRIPE_TEST_SECRET_KEY,

    CLOUDFRONT_DISTRIBUTION: process.env.CLOUDFRONT_DISTRIBUTION,
  },

  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  i18n: {
    localeDetection: true,
    locales: ["en"],
    defaultLocale: "en",
  },

  plugins: [require("tailwindcss"), require("autoprefixer")],

  images: {
    domains: ["d1ktz3iiw4k8bc.cloudfront.net"],
  },
});
