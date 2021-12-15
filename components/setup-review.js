import React, { Fragment, useState, useContext, useEffect } from "react";
import { useCountState, useCountDispatch } from "../src/app-context";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

import FadeIn from "react-fade-in";
import EmptyState from "../components/empty-state";
import useThemes from "../hooks/useThemes";

import { Redirect } from "@shopify/app-bridge/actions";
import { Context } from "@shopify/app-bridge-react";
import useStorefront from "../hooks/useStorefront";

export default function SetupReview() {
  const state = useCountState();
  const dispatch = useCountDispatch();
  const { width, height } = useWindowSize();
  const { data, mutate } = useStorefront();
  const [theme, setTheme] = useState("current");

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
                onClick={() =>
                  mutate(
                    { ...data, is_setup: true, is_compatible: true },
                    false
                  )
                }
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
