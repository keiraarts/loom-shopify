import { Button, Redirect, Modal } from "@shopify/app-bridge/actions";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { useCountState, useCountDispatch } from "../src/app-context";
import { Context } from "@shopify/app-bridge-react";

export function EmbeddedLayout(props) {
  const { children } = props;
  const state = useCountState();
  const dispatch = useCountDispatch();
  const app = useContext(Context);

  const supportModal = Modal.create(app, {
    title: "Support",
    path: "/modal/support",
  });

  useEffect(() => {
    if (state?.modal_view === "support") {
      console.log({ app });

      try {
        supportModal.dispatch(Modal.Action.OPEN);
      } catch (error) {
        console.error({ app: error });
      }
    }
  }, [state?.modal_view]);

  supportModal.subscribe(Modal.Action.CLOSE, () => {
    dispatch({ type: "SET_MODAL_VIEW", view: false });
  });

  supportModal.subscribe(Modal.Action.OPEN, () => {
    dispatch({ type: "SET_MODAL_VIEW", view: true });
  });

  return <div id="embedded-layout">{children}</div>;
}
