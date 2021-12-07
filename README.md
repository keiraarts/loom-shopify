
## Deployment

## Installation

Download the [Shopify-App-CLI](https://github.com/Shopify/shopify-app-cli) run:

```sh
npm install
npm run build

shopify login
shopify extension create
cd theme-app-extension
shopify extension register
```

This app in it's current state passes Shopify's App Review process. It supports cookieless authentication and the app code supports mobile and app browsers.

## Requirements

- If you don’t have one, [create a Shopify partner account](https://partners.shopify.com/signup).
- If you don’t have one, [create a Development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) where you can install and test your app.
- In the Partner dashboard, [create a new app](https://help.shopify.com/en/api/tools/partner-dashboard/your-apps#create-a-new-app). You’ll need this app’s API credentials during the setup process.

## Usage

The primary directory of the app will run the embedded app that Shopify merchants can use to manage videos. The directory /theme-extensions-build contains the build steps that output a Shopify Theme App Extension directory at /theme-app-extension.

To create your first extension build after modifying any Shopify Liquid code uses to generate the extension.

```sh
cd theme-extensions-build
npm install
npm run build
```

After your extension has been built, push the new directory to Shopify.

```sh
cd ..
cd theme-app-extension
shopify extension push
```

## License

This respository is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
