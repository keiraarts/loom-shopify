import React, { useState, useContext } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import { Redirect } from "@shopify/app-bridge/actions";
import { Context } from "@shopify/app-bridge-react";
import { isMobile } from "react-device-detect";
import Image from "../components/image";

export default function InstallSelection() {
  const [selected, setSelected] = useState("apple");
  const app = useContext(Context);

  const redirectToAppStore = () => {
    const redirect = Redirect.create(app);

    const appleUrl =
      "https://apps.apple.com/us/app/shopify-ecommerce-business/id371294472";

    const androidUrl =
      "https://play.google.com/store/apps/details?id=com.shopify.mobile&hl=en_CA&gl=US";

    redirect.dispatch(Redirect.Action.REMOTE, {
      url: selected === "apple" ? appleUrl : androidUrl,
      newContext: true,
    });
  };

  return (
    <AnimateSharedLayout>
      <React.Fragment>
        <div className="flex flex-row">
          <fieldset className="flex-1">
            <legend id="radiogroup-label" className="sr-only">
              Download on the app store
            </legend>
            <ul
              className="flex flex-col space-y-5"
              role="radiogroup"
              aria-labelledby="radiogroup-label"
            >
              <li
                tabIndex="0"
                role="radio"
                aria-checked={selected === "apple"}
                onClick={() => setSelected("apple")}
                className="relative bg-white rounded-lg shadow-sm cursor-pointer group focus:outline-none "
              >
                <div className="px-6 py-4 bg-white border border-gray-300 rounded-lg hover:border-gray-400 sm:flex sm:justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <p className="font-medium text-black">iPhones & iPads</p>
                      <div className="text-gray-800">
                        <p className="mt-2 sm:inline">
                          Download Shopify's mobile app to your device. You can
                          find it on the Apple app store.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden mt-2 text-xs sm:mt-0 sm:block sm:ml-4 sm:text-right">
                    <div className="px-1 py-1 font-medium text-black bg-green-100 border border-green-300 rounded-md sm:px-2">
                      Free
                    </div>
                  </div>
                </div>
                {selected === "apple" && (
                  <div
                    className="absolute inset-0 border-4 border-indigo-500 rounded-lg pointer-events-none"
                    aria-hidden="true"
                  ></div>
                )}
              </li>

              <li
                tabIndex="-1"
                role="radio"
                aria-checked={selected === "android"}
                id="radiogroup-option-1"
                onClick={() => setSelected("android")}
                className="relative bg-white rounded-lg shadow-sm cursor-pointer group focus:outline-none "
              >
                <div className="px-6 py-4 bg-white border-2 border-gray-300 rounded-lg br hover:border-gray-400 sm:flex sm:justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <p className="font-medium text-black">Android Devices</p>
                      <div className="text-gray-800">
                        <p className="mt-2 text-xs sm:inline">
                          Download Shopify's official app on your phone.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden mt-2 text-xs sm:mt-0 sm:block sm:ml-4 sm:text-right">
                    <div className="px-1 py-1 font-medium text-black bg-green-100 border border-green-300 rounded-md sm:px-2">
                      Free
                    </div>
                  </div>
                </div>
                {selected === "android" && (
                  <div
                    className="absolute inset-0 border-4 border-indigo-500 rounded-lg pointer-events-none"
                    aria-hidden="true"
                  ></div>
                )}
              </li>
            </ul>
          </fieldset>
          {!isMobile && selected && (
            <motion.div className="hidden max-w-lg px-5 mx-auto text-center sm:block">
              <h5 className="text-xs italic text-gray-700 font-xs">
                Take a photo of this symbol
              </h5>
              <img
                alt="install app"
                className="flex-1 w-40 pb-0 mx-auto"
                src={
                  selected === "apple"
                    ? "/qr/Q1FpYTVmcTA3SGVNZnR3cSsxSEs0Zz09LS1zSTNzaEp6ZDNZZEVkcE5OU3AzaTZnPT0=--332636da2ff999d8ea9c3ff923485254964502d1.png"
                    : "/qr/android-shopify.png"
                }
              />
              <div className="w-full mx-auto mt-1 text-center">
                <button
                  type="button"
                  onClick={redirectToAppStore}
                  className="flex items-center justify-center w-full px-3 py-1 text-sm font-medium text-center text-white bg-indigo-600 border-2 border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <div className="inline-flex">View on app store</div>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </React.Fragment>
    </AnimateSharedLayout>
  );
}
