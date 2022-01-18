import { DefaultSeo } from "next-seo";
import Router, { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { AppProvider } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import { CountProvider, useCountDispatch } from "../src/app-context";

import { useShopOrigin } from "../toolbox/src/index";
import { Provider, Context } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import { appWithTranslation } from "next-i18next";

import { CreateInstance } from "../src/axios";
import { EmbeddedLayout } from "../src/embedded";
import { RoutePropagator } from "../src/propagator";
import AppLayout from "../components/app-layout";
import NProgress from "nprogress";
import "../css/global.css";
import "../i18n";

import { datadogRum } from "@datadog/browser-rum";
import LogRocket from "logrocket";

Router.events.on("routeChangeStart", (url, { shallow }) => {
  if (!shallow) NProgress.start();
});

Router.events.on("routeChangeComplete", (url, { shallow }) => {
  if (!shallow) NProgress.done();
});

declare const Buffer;
function SessionProvider(props) {
  const { Component, pageProps, shopOrigin } = props;
  const dispatch = useCountDispatch();
  const app = useContext(Context);

  function reloadToShopifyEmbedded() {
    // Prevent embedded app from loading standalone
    if (shopOrigin && process?.browser && window?.top == window?.self) {
      const hmac = new URLSearchParams(window.location.search).get("hmac");

      const destination = hmac
        ? `https://${process.env.TUNNEL}/api/auth?shop=${shopOrigin}&hmac=${hmac}`
        : `https://${shopOrigin}/admin/apps/${process.env.APP_SLUG}?intention=embed&shop=${shopOrigin}`;

      // Assumes this app is not embedded so far
      window.location.assign(destination);
    }
  }

  getSessionToken(app)
    .then((session_token) => {
      const username = shopOrigin.replace(".myshopify.com", "");
      dispatch({ type: "SET_USERNAME", username: username });
      const axios = CreateInstance({ username, session_token });

      axios
        .get(`/${username}/verify`)
        .then((res) => {
          dispatch({
            type: "UPDATE_SESSION_TOKEN",
            token: session_token,
            shop_origin: shopOrigin,
            shopify_token: res?.data?.shopify_token,
          });

          return res.data;
        })

        .then((storefront) => {
          // Run on browsers where the storefront object is available
          if (username && storefront?.email && process?.browser) {
            // LogRocket
            LogRocket?.init("nygdoo/honestycore");
            LogRocket?.identify(username, {
              email: storefront.email,
              session_token: session_token,
              ...storefront,
            });

            // Datadog
            datadogRum?.init({
              applicationId: "0a9f4daf-8039-4023-ab65-e47d146e7844",
              clientToken: "pubb602e8110c9fbb36b6a983db048e9594",
              site: "datadoghq.com",
              service: "honestycore.com",
              sampleRate: 100,
              trackInteractions: true,
              env: process.env.NODE_ENV,
              defaultPrivacyLevel: "mask-user-input",
            });

            datadogRum?.startSessionReplayRecording();
          }
        })

        .catch((err) => {
          // If the user requires a re-install
          console.error(err);
          const redirect = Redirect.create(app);
          const destination = `https://${process.env.TUNNEL}/api/auth/${username}`;
          redirect.dispatch(Redirect.Action.REMOTE, destination);
        });
    })
    .catch((err) => console.warn(err));

  reloadToShopifyEmbedded();

  return (
    <main
      id="main-container"
      className="bg-gray-100 bg-opacity-80 bg-medium sm:bg-small"
    >
      <EmbeddedLayout>
        <AppLayout>
          <Component {...pageProps} isEmbedded={true} />
        </AppLayout>
      </EmbeddedLayout>
    </main>
  );
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const shopOrigin = useShopOrigin();

  const defaults = {
    title: "Honesty - Video messages for Shopify",
    description: "Let customers send you video messages",
    canonical: "/",
    openGraph: {
      title: "HonestyCore.com",
      description: `Let customers send you video questions through your Shopify store. Download our free app on Shopify's app store.`,
      images: [
        {
          url: "/marketing/opengraph-visual-preview.png",
          width: 900,
          height: 600,
        },
      ],
      site_name: "HonestyCore.com",
    },
    twitter: {
      handle: "@keiraarts",
      cardType: "summary_large_image",
    },
  };

  // For marketing pages without shop origin or accessing app
  if (!shopOrigin && !router.asPath.startsWith("/app")) {
    return (
      <CountProvider>
        <DefaultSeo {...defaults} />
        <Component {...pageProps} />
      </CountProvider>
    );
  }

  if (typeof window == "undefined") {
    return <></>;
  }

  if (!window.location || !shopOrigin) {
    return (
      <CountProvider>
        <DefaultSeo {...defaults} />
        <Component {...pageProps} />
      </CountProvider>
    );
  }

  var host = new Buffer(shopOrigin as any);

  const config = {
    apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_PUBLIC_KEY,
    forceRedirect: true,
    shopOrigin: shopOrigin,
    host: host.toString("base64"),
  };

  return (
    <AppProvider i18n={translations}>
      <Provider config={config}>
        <RoutePropagator />
        <DefaultSeo {...defaults} />
        <CountProvider>
          <SessionProvider
            router={router}
            Component={Component}
            shopOrigin={shopOrigin}
            {...pageProps}
          />
        </CountProvider>
      </Provider>
    </AppProvider>
  );
}

export default appWithTranslation(MyApp);
