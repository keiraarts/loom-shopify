import React, { useState } from "react";

import { useCountDispatch, useCountState } from "../src/app-context";
import { isShopifyMobile } from "@shopify/app-bridge-utils";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import StatusCircle from "./status-circle";
import ReactTooltip from "react-tooltip";
import { motion } from "framer-motion";
import FadeIn from "react-fade-in";
import Image from "next/image";
import cn from "classnames";
import get from "lodash/get";

export default function DispatchCard(props) {
  const prefix = process.env.CLOUDFRONT_DISTRIBUTION;
  const dispatch = useCountDispatch();
  const isMobile = isShopifyMobile();
  const { t } = useTranslation();
  const state = useCountState();

  const initialImage = props?.scans?.[0]?.Location;
  const total = props?.scans?.slice(0, 2)?.length;
  const [scans, setScans] = useState(props?.scans?.slice(0, 2) ?? []);

  const FavoritedDispatch = ({ bookmarked }) => {
    if (bookmarked) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-pink-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          />
        </svg>
      );
    }

    return <></>;
  };

  return (
    <li
      id={props?.sk}
      className={cn({
        "relative mt-2 bg-white rounded-lg shadow": true,
        "h-full mt-0 sm:mt-0": !props?.sk,
      })}
      onClick={() =>
        dispatch({
          type: "SET_SELECTION",
          selection: props?.sk,
          order: props,
        })
      }
    >
      <ReactTooltip
        place="top"
        effect="solid"
        delayShow={250}
        arrowColor="black"
        className="z-50 px-2 py-0.5 text-white bg-gray-900 border shadow-sm"
      />

      {!props?.sk && (
        <div
          className={cn({
            "aspect-w-10 aspect-h-8": state.layout === "grid",
            "aspect-w-10 aspect-h-12": state.layout === "vertical",
          })}
        >
          <div className="flex flex-col items-center justify-center w-full h-full cursor-pointer group">
            <motion.button className="p-3" whileHover={{ scale: 1.05 }}>
              <span className="sr-only">Scan more products</span>
              <svg
                version="1.2"
                baseProfile="tiny"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                className="block w-12 h-12 text-gray-300 group-hover:opacity-80"
                viewBox="0 0 111 110.4"
                onClick={() => {
                  dispatch({
                    type: "SET_MODAL_VIEW",
                    view: isMobile ? "scanner" : "download_prompt",
                  });
                }}
              >
                <g>
                  <path
                    fill="currentColor"
                    d="M61,83V42.7l12.7,12.7l7.8-7.8L59.4,25.4c-2.2-2.2-5.7-2.2-7.8,0L29.4,47.6l7.8,7.8l12.7-12.7V83H61z"
                  />
                  <path
                    fill="currentColor"
                    d="M111,20.1c0-11.2-9.1-20.3-20.3-20.3H75.8v11.1h14.8c5.1,0,9.2,4.1,9.2,9.2v14.8H111V20.1z"
                  />
                  <path
                    fill="currentColor"
                    d="M0,34.9h11.1V20.1c0-5.1,4.1-9.2,9.2-9.2h14.8V-0.3H20.3C9.1-0.3,0,8.8,0,20.1l0,0V34.9z"
                  />
                  <path
                    fill="currentColor"
                    d="M0,90.4c0,11.2,9.1,20.3,20.3,20.3h14.8V99.6H20.3c-5.1,0-9.2-4.1-9.2-9.2V75.6H0V90.4z"
                  />
                  <path
                    fill="currentColor"
                    d="M111,75.6H99.9v14.8c0,5.1-4.1,9.2-9.2,9.2H75.8v11.1h14.8c11.2,0,20.3-9.1,20.3-20.3V75.6z"
                  />
                </g>
              </svg>
            </motion.button>
          </div>
        </div>
      )}
      <FadeIn
        delay={30}
        transitionDuration={350}
        className={cn({
          "hidden": !props?.sk,
          "relative block w-full rounded-lg group": true,
          "aspect-w-10 aspect-h-7 h-0": state.layout === "grid",
        })}
      >
        {scans.slice(0, 2)?.map((el, index) => {
          return (
            <div
              key={index}
              className={cn({
                "z-0 transform rounded-xl": true,
                "aspect-w-10 aspect-h-7": state.layout === "grid",
                "aspect-w-10 aspect-h-12": state.layout === "vertical",

                "mx-4 -translate-y-2":
                  state.layout === "grid" && index === 0 && total > 1,
                "mx-0 translate-y-0": index === 1 && total > 1,
                "mx-0 translate-y-0": index === 0,
              })}
              style={{ zIndex: `${Math.abs(index + 1)}!important` }}
            >
              <motion.button
                className="rounded-md outline-none ring-0 ring-offset-blue-600 focus:ring-offset-2"
                onClick={() => index === 0 && setScans(scans.reverse())}
                whileHover={{ scale: state.layout === "vertical" ? 1 : 1.02 }}
              >
                <Image
                  alt={""}
                  layout="fill"
                  loading="lazy"
                  objectFit="cover"
                  src={prefix + el?.Key}
                  objectPosition="center"
                  // Vertical deserves higher quality
                  quality={state.layout === "vertical" ? 95 : 20}
                  className={cn({
                    "object-cover bg-gray-300 rounded-md skeleton-box": true,
                    "rounded-b-none":
                      index === 0 && state.layout === "vertical",
                    "rounded-t-none":
                      index === 1 && state.layout === "vertical",
                  })}
                />
              </motion.button>
            </div>
          );
        })}
      </FadeIn>

      {initialImage && (
        <div className="px-2 py-2">
          <p className="flex flex-row justify-between text-base font-medium text-black truncate pointer-events-none">
            <span>{props?.shipping_address?.first_name}</span>
            <span>
              {props?.shipping_address?.country && (
                <ReactCountryFlag
                  countryCode={props.shipping_address.country_code}
                  aria-label={props.shipping_address.country}
                  className="w-4"
                  svg
                />
              )}
            </span>
          </p>
          <p className="flex flex-row items-center justify-between text-xs font-medium tracking-wide text-gray-800 capitalize pointer-events-none md:text-sm">
            <span className="flex flex-row items-center space-x-1">
              <span
                className="pointer-events-auto cursor"
                data-tip={props?.local_name}
              >
                <StatusCircle status={props?.status} />
              </span>
              <FavoritedDispatch bookmarked={props?.bookmarked} />
            </span>
            <span>{t(`statuses.${props?.status}`)}</span>
          </p>
        </div>
      )}
    </li>
  );
}
