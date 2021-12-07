import React, { useState } from "react";

import { useCountState, useCountDispatch } from "../src/app-context";
import { CreateInstance } from "../src/axios";
import Tracking from "./tracking";
import Toast from "./toast";
import Image from "next/image";
import cn from "classnames";

export default function Order(props) {
  const state = useCountState();
  const dispatch = useCountDispatch();
  const axios = CreateInstance(state);

  const dateOptions = {
    weekday: "short",
    month: "long",
    day: "numeric",
  };

  const [bookmarked, setBookmark] = useState(props?.bookmarked);

  return (
    <section className="">
      <div className="pb-2 mt-1 space-y-6">
        <div className="sticky top-0 flex flex-row justify-between mt-0">
          <div className="">
            <React.Fragment>
              <h2 className="text-base font-medium text-gray-900">
                <span>Shipped for</span>{" "}
                {props?.destination?.name ?? props.tracking_number}
              </h2>
              <p className="text-sm font-medium text-gray-500">
                <span>{props?.value}</span>
              </p>
            </React.Fragment>
          </div>

          <button
            type="button"
            onClick={() => {
              axios
                .patch(`${state.username}/dispatch/${props.tracking_number}`, {
                  ...props, // existing dispatch
                  bookmarked: !bookmarked,
                })
                .then((res) => setBookmark(!bookmarked))
                .catch((err) => {});
            }}
            className={cn({
              "bg-pink-500 text-white hover:bg-pink-600": bookmarked,
              "text-gray-600 bg-gray-200 hover:bg-gray-300 hover:text-gray-500": !bookmarked,
              "flex items-center justify-center w-8 h-8 ml-4 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500": true,
            })}
          >
            <svg
              className="w-6 h-6 p-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              ></path>
            </svg>

            <span className="sr-only">bookmarked</span>
          </button>
        </div>

        <div className="block w-full h-full space-y-4 divide-y rounded-lg ">
          {props?.scans?.map((el, index) => {
            return (
              <div key={index} className="relative w-full h-72 md:h-96">
                <Image
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  src={process.env.CLOUDFRONT_DISTRIBUTION + el?.Key}
                  className="object-cover bg-gray-300 rounded-md skeleton-box"
                />
              </div>
            );
          })}
        </div>

        <div>
          <h3 className="font-medium text-gray-900">Information</h3>
          <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
            <div className="flex justify-between py-3 text-sm font-medium">
              <dt className="text-gray-500">Photographed by</dt>
              <dd className="text-gray-900 capitalize">
                {props.owner ?? "Admin"}
              </dd>
            </div>
            <div className="flex justify-between py-3 text-sm font-medium">
              <dt className="text-gray-500">Date Created</dt>
              <dd className="text-gray-900">
                {new Date(props.date_packed).toLocaleString(
                  "en-US",
                  dateOptions
                )}
              </dd>
            </div>

            <div className="flex justify-between py-3 text-sm font-medium">
              <dt className="text-gray-500">Timestamp</dt>
              <dd className="text-gray-900">
                {new Date(props.date_packed).toLocaleTimeString("en-US")}
              </dd>
            </div>

            <div className="flex justify-between py-3 text-sm font-medium">
              <dt className="text-gray-500">Carrier</dt>
              <dd className="text-gray-900 uppercase">{props?.carrier}</dd>
            </div>
            <div className="flex justify-between py-3 text-sm font-medium">
              <dt className="text-gray-500">Tracking</dt>
              <dd className="text-gray-900">{props.tracking_number}</dd>
            </div>
            <div className="flex justify-between py-3 text-sm font-medium">
              <dt className="text-gray-500">Status</dt>
              <dd className="text-gray-900 uppercase">
                {props?.status?.replace(/_/g, " ")}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col w-full space-y-1">
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "SET_DISPUTE", dispute: state.order });
              dispatch({ type: "SET_VIEW", view: "dispute" });
            }}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Prepare Dispute
          </button>
          <button
            type="button"
            onClick={() => {
              Toast({
                message: "Are you sure?",
                cta: "Yes",
                error: true,
                onAction: () => {
                  axios
                    .delete(
                      `${state.username}/dispatch/${props?.tracking_number}`
                    )
                    .then((res) => Toast({ message: "Order has been deleted" }))
                    .catch((err) => {});
                },
              });
            }}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>

        <Tracking {...props} />
      </div>
    </section>
  );
}
