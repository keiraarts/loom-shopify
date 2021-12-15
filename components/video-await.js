import React, { Fragment, useState, useContext, useEffect } from "react";
import { useCountState } from "../src/app-context";

import FadeIn from "react-fade-in";
import EmptyState from "../components/empty-state";
import useThemes from "../hooks/useThemes";

import { Redirect } from "@shopify/app-bridge/actions";
import { Context } from "@shopify/app-bridge-react";

export default function VideoAwait() {
  const state = useCountState();
  const { data: themes } = useThemes();
  const [theme, setTheme] = useState("current");
  const [src, setSrc] = useState("add-app-extension.png");

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
    <FadeIn className="flex items-center justify-center flex-1 h-full">
      <EmptyState
        src="/logos/primary-logo-icon.png"
        quote={
          <React.Fragment>
            From your theme editor click on{" "}
            <span
              onClick={() => setSrc("add-app-extension.png")}
              className="text-blue-500 underline cursor-pointer"
            >
              Add section
            </span>{" "}
            to preview our app. Try clicking on{" "}
            <span
              onClick={() => setSrc("try-a-recording.png")}
              className="text-blue-500 underline cursor-pointer"
            >
              record screen
            </span>{" "}
            to open the recording overlay, and then{" "}
            <span
              onClick={() => setSrc("create-video-extension.png")}
              className="text-blue-500 underline cursor-pointer"
            >
              start recording
            </span>
            .
          </React.Fragment>
        }
        children={
          <React.Fragment>
            <div key={src} className="mt-5 bg-gray-200 aspect-w-6 aspect-h-3">
              <img src={`/assets/${src}`} className="w-full object-fit" />
            </div>
            <div className="flex flex-row items-stretch max-w-sm gap-4 mx-auto my-5 text-center"></div>
          </React.Fragment>
        }
        button={{ cta: "I recorded a video!" }}
      />
    </FadeIn>
  );
}
