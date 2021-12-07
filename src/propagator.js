import React, { useEffect, useContext } from "react";
import Router, { useRouter } from "next/router";
import { Context } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { RoutePropagator as ShopifyRoutePropagator } from "@shopify/app-bridge-react";

export const RoutePropagator = () => {
  const router = useRouter();
  const { asPath } = router;
  const appBridge = useContext(Context);

  // Subscribe to appBridge changes - captures appBridge urls
  // and sends them to Next.js router. Use useEffect hook to
  // load once when component mounted
  useEffect(() => {
    appBridge.subscribe(Redirect?.ActionType?.APP, ({ path }) => {
      Router.push(path);
    });
  }, []);

  return appBridge && asPath ? (
    <ShopifyRoutePropagator location={asPath} app={appBridge} />
  ) : null;
};
