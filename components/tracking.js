import React, { Fragment, useState, useEffect } from "react";
import { TagIcon, CheckIcon } from "@heroicons/react/solid";
import useTracking from "../hooks/useTracking";
import FadeIn from "react-fade-in";
import Loading from "./loading";

const dateOptions = { weekday: "short", month: "long", day: "numeric" };

export default function Tracking({ easypost_id }) {
  const { data: tracking = [], isLoading } = useTracking(easypost_id);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (easypost_id) {
      setEvents(tracking?.tracking_details?.reverse());
    }
  }, [tracking?.tracking_details?.length]);

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events &&
          events.map((event, index) => {
            const date = new Date(event.datetime);

            return (
              <li key={index}>
                <div className="relative pb-8">
                  {index !== tracking?.tracking_details?.length - 1 ? (
                    <span
                      className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex items-start space-x-3">
                    {event.status === "pre_transit" ? (
                      <>
                        <div className="relative px-1">
                          <div className="flex items-center justify-center w-8 h-8 bg-yellow-400 rounded-full ring-8 ring-white">
                            <TagIcon
                              className="w-5 h-5 text-gray-900"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div>
                            <div className="text-sm">
                              <a className="font-medium text-gray-900 capitalize">
                                {event.status.replace(/_/g, "-")}
                              </a>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">
                              {date.toLocaleString("en-US", dateOptions)}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : event.status === "in_transit" ? (
                      <>
                        <div>
                          <div className="relative px-1">
                            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full ring-8 ring-white"></div>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1 py-1.5">
                          <div className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">
                              {event.message}
                            </span>{" "}
                            <a className="">
                              {event?.tracking_location?.state ??
                                event?.tracking_location?.country}
                            </a>{" "}
                            <span className="whitespace-nowrap">
                              {date.toLocaleString("en-US", dateOptions)}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : event.status === "delivered" ? (
                      <>
                        <div>
                          <div className="relative px-1 ">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-green ring-8 ring-white">
                              <CheckIcon
                                className="w-4 h-4 text-black"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 py-0">
                          <div className="text-sm leading-8 text-gray-500">
                            <span className="mr-0.5">
                              <a className="font-medium text-gray-900">
                                {event.message}
                              </a>
                            </span>
                            <span className="">
                              <Fragment>
                                <a className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm">
                                  <span className="absolute flex items-center justify-center flex-shrink-0">
                                    <span
                                      className="h-1.5 w-1.5 rounded-full"
                                      aria-hidden="true"
                                    />
                                  </span>
                                  <span className="font-medium text-gray-900">
                                    {[
                                      event.tracking_location.state,
                                      event.tracking_location.zip,
                                    ].join(", ")}
                                  </span>
                                </a>{" "}
                              </Fragment>
                            </span>
                            <span className="whitespace-nowrap">
                              {date.toLocaleString("en-US", dateOptions)}
                            </span>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
      </ul>

      <FadeIn
        delay={100}
        visible={isLoading}
        childClassName="w-full mx-auto"
        className="flex items-center justify-between w-full h-full mx-auto mt-4 sm:col-span-1"
      >
        {isLoading && <Loading className="mx-auto" />}
      </FadeIn>
    </div>
  );
}
