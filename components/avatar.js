import React, { useEffect, useContext, Fragment } from "react";
import { useCountState, useCountDispatch } from "../src/app-context";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { useTranslation } from "react-i18next";
import useStorefront from "../hooks/useStorefront";
import ReactTooltip from "react-tooltip";
import Toast from "./toast";
import cn from "classnames";

export default function Avatar({ size = "large", name, className }) {
  const { data: storefront, isLoading } = useStorefront();
  const { t, i18n } = useTranslation();
  const dispatch = useCountDispatch();

  const scaleValue = (element) => {
    const val = element.toString().toLowerCase().charCodeAt();
    const init = [97, 122]; // a-z
    const lin = [0, 10];

    const factor = (lin[1] - lin[0]) / (init[1] - init[0]);
    const scaledVal = (val - init[0]) * factor + lin[0];
    return Math.floor(scaledVal);
  };

  const index = storefront?.profiles?.findIndex((el) => el?.selected);
  const profile = name ?? storefront?.profiles?.[index]?.nickname ?? "";
  const assignedId = scaleValue(profile);

  useEffect(() => {
    // Update context when localized owner changes
    dispatch({ type: "SET_OWNER", owner: profile });
  }, [profile]);

  return (
    <Menu as="div" className="relative ml-3">
      {({ open }) => (
        <>
          <div>
            <ReactTooltip
              place="left"
              effect="solid"
              delayShow={250}
              arrowColor="white"
              className="text-black bg-white"
            />
            <Menu.Button
              className={cn({
                [className]: true,
                "flex text-sm rounded-full focus:outline-none focus:ring-offset-blue-800 ": true,
                "focus:ring-2 cursor-pointer": size === "large",
              })}
            >
              <span className="sr-only">Open user menu</span>
              <span
                data-tip={profile}
                className={cn({
                  "inline-flex  bg-relative items-center justify-center bg-gray-400 rounded-full": true,
                  "w-8 h-8 text-sm font-medium  inline-flex": size === "large",
                  "w-6 h-6 text-xs font-bold inline-flex": size === "tiny",
                  "animate-pulse": isLoading,

                  "bg-yellow-400 text-black": assignedId === 0,
                  "bg-green-600 text-white": assignedId === 1,
                  "bg-blue-600 text-white": assignedId === 2,
                  "bg-purple-600 text-white": assignedId === 3,
                  "bg-gray-500 text-white": assignedId === 4,
                  "bg-orange-500 text-white": assignedId === 5,
                  "bg-indigo-800 text-white": assignedId === 6,
                  "bg-green-800 text-white": assignedId === 7,
                  "bg-blue-500 text-white": assignedId === 8,
                  "bg-purple-800 text-white": assignedId === 9,
                  "bg-purple-400 text-black": assignedId === 10,
                })}
              >
                <span className="sr-only">{profile}</span>
                <img
                  src="/logos/census-core-icon-mountain-overlay.svg"
                  className="object-cover"
                />
              </span>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            show={open && size === "large"}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute right-0 z-20 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {storefront?.profiles?.map((el) => {
                return (
                  <Menu.Item key={el.nickname}>
                    {({ active }) => (
                      <a
                        className={cn(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        )}
                      >
                        Switch to{" "}
                        <span className="font-bold">{el.nickname}</span>
                      </a>
                    )}
                  </Menu.Item>
                );
              })}

              <Menu.Item>
                {({ active }) => (
                  <a
                    className={cn(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                    )}
                  >
                    Create profile
                  </a>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => {
                      dispatch({
                        type: "SET_SELECTION",
                        selection: false,
                        order: {},
                      });

                      dispatch({ type: "SET_VIEW", view: "setup" });
                    }}
                    className={cn(
                      active ? "bg-gray-100" : "",
                      "flex px-4 py-2 text-sm text-gray-700 flex-row items-center justify-between w-full cursor-pointer"
                    )}
                  >
                    <span>Browse tutorial</span>
                  </a>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => {
                      Toast({
                        message: "Switched to French localization",
                        success: true,
                      });

                      i18n.changeLanguage("fr");
                    }}
                    className={cn(
                      active ? "bg-gray-100" : "",
                      "flex px-4 py-2 text-sm border-t-2 text-gray-700 flex-row items-center justify-between w-full cursor-pointer"
                    )}
                  >
                    <span>Switch to French</span>
                  </a>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => {
                      Toast({
                        message: "Switched to English localization",
                        success: true,
                      });

                      i18n.changeLanguage("en");
                    }}
                    className={cn(
                      active ? "bg-gray-100" : "",
                      "flex px-4 py-2 text-sm text-gray-700 flex-row items-center justify-between w-full cursor-pointer"
                    )}
                  >
                    <span>Switch to English</span>
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
