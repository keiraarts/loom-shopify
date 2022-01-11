require("dotenv").config();
const withOffline = require("next-offline");
const withFonts = require("next-fonts");

module.exports = withOffline(
  withFonts({
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

    async headers() {
      return [
        {
          source: "/app/:path*",
          headers: [
            {
              key: "x-mock-content-security-policy",
              value:
                "frame-ancestors https://*.myshopify.com https://admin.shopify.com;",
            },
          ],
        },

        {
          source: "/:path*",
          has: [
            {
              type: "query",
              key: "shop",
            },
          ],
          headers: [
            {
              key: "Content-Security-Policy",
              value:
                "frame-ancestors https://:shop.myshopify.com https://admin.shopify.com;",
            },
          ],
        },
      ];
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

    async rewrites() {
      return [
        {
          source: "/service-worker.js",
          destination: "/_next/static/service-worker.js",
        },
      ];
    },

    plugins: [require("tailwindcss"), require("autoprefixer")],

    images: {
      domains: ["d1ktz3iiw4k8bc.cloudfront.net"],
    },

    workboxOpts: {
      swDest: "static/service-worker.js",
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: "NetworkFirst",
          options: {
            cacheName: "https-calls",
            networkTimeoutSeconds: 10,
            expiration: {
              maxEntries: 40,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
            cacheableResponse: {
              statuses: [200],
            },
          },
        },
      ],
    },
  })
);
