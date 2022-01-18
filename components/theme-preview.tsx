import React, { Fragment, useState, useContext, useEffect } from "react";
import { useCountState } from "../src/app-context";

import FadeIn from "react-fade-in";
import EmptyState from "./empty-state";
import useThemes from "../hooks/useThemes";

import { Redirect } from "@shopify/app-bridge/actions";
import { Context } from "@shopify/app-bridge-react";
import cn from "classnames";

interface LoomSubmission {
  onComplete(args?: string): void;
  quote?: string;
}

export default function ThemePreview(props: LoomSubmission) {
  const state = useCountState();
  const { data: themes, isLoading, isCompatible } = useThemes();
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
    <FadeIn className="flex items-center justify-center flex-1 h-full">
      <EmptyState
        src="/logos/primary-logo-icon.png"
        quote={
          !isLoading && !isCompatible ? (
            <React.Fragment>
              Your shop doesn't have any{" "}
              <a
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  redirectContext(`https://shopify.pxf.io/5bqBQo`);
                }}
              >
                Online Store 2.0{" "}
              </a>{" "}
              themes that supports embedded apps like ours. You can{" "}
              <a
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  redirectContext(`https://shopify.pxf.io/a1LZmq`);
                }}
              >
                add one
              </a>{" "}
              to your store for free.
            </React.Fragment>
          ) : (
            props?.quote ??
            "It can be hard to understand complex questions over email. With our app, you can give customers an easy way to record questions with a video!"
          )
        }
        children={
          <React.Fragment>
            <div className="flex flex-row items-stretch max-w-sm gap-4 mx-auto my-5 text-center">
              <div className="flex-1">
                <label
                  htmlFor="theme"
                  className="block text-sm font-medium text-gray-700 sr-only"
                >
                  Theme
                </label>
                <select
                  id="theme"
                  name="theme"
                  onChange={(event: React.FormEvent<HTMLSelectElement>) =>
                    setTheme(event.currentTarget.value)
                  }
                  className="block w-full h-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="current">Current theme</option>

                  {themes
                    ?.filter((theme) => theme?.sections ?? false)
                    ?.map((theme, index) => {
                      const { id, name, role } = theme;

                      return (
                        <option key={index} value={id}>
                          {name} ({role})
                        </option>
                      );
                    })}
                </select>
              </div>
              <button
                onClick={() => {
                  if (isCompatible) {
                    redirectContext(
                      `https://${state.username}.myshopify.com/admin/themes/${theme}/editor?context=apps&template=index&activateAppId=5178a21d-051e-4b38-8992-ed13ae96cd73/app-block`
                    );

                    props.onComplete();
                  }
                }}
                className={cn({
                  "px-4 py-2 font-semibold rounded-md": true,
                  "text-black bg-gray-200 cursor-default": !isCompatible,
                  "text-white bg-green-600 rounded-md cursor-pointer": isCompatible,
                })}
              >
                Open Preview
              </button>
            </div>

            <div className="flex justify-center mx-auto sm:-mt-2">
              <p className="text-xs text-gray-700">
                Our app works on all{" "}
                <a
                  className="font-bold text-blue-500 cursor-pointer"
                  onClick={() =>
                    redirectContext(`https://shopify.pxf.io/5bqBQo`)
                  }
                >
                  Online Store 2.0{" "}
                </a>
                themes.{" "}
                <span
                  className="font-bold text-blue-500 cursor-pointer"
                  onClick={() => props.onComplete()}
                >
                  Skip
                </span>
                .
              </p>
            </div>
          </React.Fragment>
        }
      />
    </FadeIn>
  );
}
