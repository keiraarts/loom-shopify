import { Button, Redirect, Modal } from "@shopify/app-bridge/actions";
import React, { useContext, useState, useEffect } from "react";
import { useCountState, useCountDispatch } from "./app-context";
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

  const replyModal = Modal.create(app, {
    title: "Reply",
    path: "/modal/reply",
  });

  useEffect(() => {
    if (state?.modal_view === "support") {
      supportModal.dispatch(Modal.Action.OPEN);
    } else if (state?.modal_view === "reply") {
      replyModal.set({ path: "/modal/reply/" + state.loom.id });
      replyModal.dispatch(Modal.Action.OPEN);
    }
  }, [state.modal_view]);

  supportModal.subscribe(Modal.Action.CLOSE, () => {
    dispatch({ type: "SET_MODAL_VIEW", view: false });
  });

  replyModal.subscribe(Modal.Action.CLOSE, () => {
    dispatch({ type: "SET_MODAL_VIEW", view: false });
  });

  replyModal.subscribe(Modal.Action.OPEN, () => {
    app.dispatch(Modal.data(state));
  });

  return <div id="embedded-layout">{children}</div>;
}
