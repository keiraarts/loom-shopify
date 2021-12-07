import React, { useEffect, useContext, useState, useRef } from "react";
import { Group, Scanner, Features } from "@shopify/app-bridge/actions";
import { useCountDispatch, useCountState } from "../src/app-context";
import { isMobile } from "@shopify/app-bridge-utils";
import { Context } from "@shopify/app-bridge-react";
import Toast from "../components/toast";
import cn from "classnames";

export default function ScanPostage({ ref }) {
  const inputRef = useRef();
  const buttonRef = useRef();
  const dispatch = useCountDispatch();

  const handleCapture = (target) => {
    if (target?.files && target.files.length !== 0) {
      const file = target.files[0];
      dispatch({ type: "ADD_DISPATCH_PHOTO", file });
    }
  };

  return (
    <div className={cn({ "mt-5 mb-2 sm:mt-4": showPrompt })}>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        id="icon-button-file"
        capture="environment"
        onChange={(e) => handleCapture(e.target)}
        style={{ display: "none" }}
      />

      <button
        type="button"
        ref={buttonRef}
        onClick={() => {
          Toast({ message: autoFocus.toString() });
          if (!isMobile()) {
            Toast({ message: "Download Shopify's mobile app to continue" });
            return;
          }

          inputRef.current.click();
        }}
        className={cn({
          "inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-brand-blue 8 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm": showPrompt,
          "invisible": !showPrompt,
        })}
      >
        Open Camera
        <svg
          className="w-5 h-5 mt-0.5 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
      </button>
    </div>
  );
}
