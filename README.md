
# LoomSDK + Shopify

Let Shopify merchants easily collect videos, feedback, and questions on their shop via Loom! We're extending Loom's SDK into a Shopify themes extension app.


![Logo](https://i.imgur.com/0MB8NLs.png)


## Screenshots

![App Screenshot](https://i.imgur.com/3zHAl96.png)
![App Screenshot](https://i.imgur.com/UhLSrwc.jpg)

## Related

View a demo of how this app is used on Shopify. The password to view the store is 'loom'.

[Shopify Store Demo](https://via-dev-220.myshopify.com/password)


## Acknowledgements

 - [Shopify Cookieless Authentication](https://github.com/ctrlaltdylan/shopify-nextjs-toolbox)
 - [Shopify Theme App Extensions Documentation](https://shopify.dev/apps/online-store/theme-app-extensions/getting-started)
 - [Loom SDK](https://www.loom.com/sdk)


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Demo

![App Screenshot](https://cdn.loom.com/sessions/thumbnails/9a9bf950328043eaa1a7c05aba9b57c3-with-play.gif)

[Loom Demo Video](https://www.loom.com/share/9a9bf950328043eaa1a7c05aba9b57c3)


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

