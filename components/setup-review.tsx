import React, { Fragment, useState, useContext, useEffect } from "react";
import { useCountState, useCountDispatch } from "../src/app-context";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

import FadeIn from "react-fade-in";
import EmptyState from "./empty-state";
import { Redirect } from "@shopify/app-bridge/actions";
import { Context } from "@shopify/app-bridge-react";
import useStorefront from "../hooks/useStorefront";

interface LoomSubmission {
  onComplete?: () => void;
  quote?: string;
}

export default function SetupReview(props: LoomSubmission) {
  const dispatch = useCountDispatch();
  const { width, height } = useWindowSize();
  const { data, mutate } = useStorefront();

  // Opens a new tab for users
  const app = useContext(Context);
  const redirectContext = (url) => {
    const redirect = Redirect.create(app);
    redirect.dispatch(Redirect.Action.REMOTE, {
      url: url,
      newContext: true,
    });
  };

  return (
    <>
      <Confetti width={width} height={height} recycle={false} />
      <FadeIn className="flex items-center justify-center flex-1 h-full">
        <EmptyState
          src="/logos/primary-logo-icon.png"
          quote={
            <>
              You're done! Everything is working! <br />
              <br />
              We'll notify you by email you get your first video. While you
              wait, can you leave us a quick review? We reply to each one with a
              video! :)
            </>
          }
          button={{
            cta: "Leave a comment",
            onClick: () => redirectContext("https://apps.shopify.com/"),
          }}
          footer={
            <div className="flex items-center justify-center w-full sm:-mt-2">
              <button
                type="submit"
                onClick={() => {
                  // Hide this user interface from re-appearing unless ..
                  // .. the user repeats the entire onboarding workflow
                  mutate({ ...data, await_feedback: false }, false);
                  props.onComplete();
                }}
                className="inline-flex items-center px-4 text-sm font-medium text-black bg-gray-100 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                Maybe later
              </button>
              <button
                type="submit"
                onClick={() =>
                  dispatch({
                    type: "SET_MODAL_VIEW",
                    view: "support",
                  })
                }
                className="inline-flex items-center px-4 text-sm font-medium text-black bg-gray-100 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                Get help with setup
              </button>
            </div>
          }
        />
      </FadeIn>
    </>
  );
}
