import React, { useEffect, useContext, useState } from "react";
import { useCountDispatch, useCountState } from "../src/app-context";
import { PlusSmIcon } from "@heroicons/react/solid";
import { useTranslation } from "react-i18next";
import useDebounce from "../hooks/useDebounce";
import useOrders from "../hooks/useOrders";
import Loading from "../components/loading";
import DispatchCard from "./dispatch-card";
import EmptyState from "./empty-state.tsx";
import { useRouter } from "next/router";
import groupBy from "lodash/groupBy";
import FadeIn from "react-fade-in";
import Avatars from "./avatar";
import cn from "classnames";

export default function Orders() {
  const state = useCountState();
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useCountDispatch();
  const [search, setSearch] = useState();

  // Buffer before search
  const [term] = useDebounce(search, 2500);
  const [_, isSynced] = useDebounce(search, 5000);
  const { data: orders = [], isLoading } = useOrders(term);

  const batches = Object.values(
    // Create an object sorted by ascending values
    // Reverse array created from object values for descending orders
    groupBy(orders, (el) => {
      const date = new Date(el.date_packed);
      return [date.getFullYear(), date.getMonth(), date.getDay()].join("");
    })
  ).reverse();

  return (
    <section
      className="h-full px-4 pb-16 mx-auto sm:mt-4 max-w-7xl sm:px-6 lg:px-8 "
      aria-labelledby="orders-heading"
    >
      <nav id="search" className="flex-shrink-0 ">
        <div className="mx-auto">
          <div className="relative flex items-center justify-between h-10">
            <div className="flex justify-center flex-1 lg:justify-end">
              <div className="w-full">
                <label htmlFor="search" className="sr-only">
                  {t("forms.search_placeholder")}
                </label>
                <div className="relative text-gray-800 focus:outline-none">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 transition-all bg-white border border-transparent rounded-md shadow hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-transparent sm:text-sm"
                    placeholder={t("forms.search_placeholder")}
                    onChange={(event) => setSearch(event.target.value)}
                    type="search"
                  />
                </div>
              </div>

              <div className="hidden ml-6 p-0.5 rounded-lg items-center md:flex bg-gray-100">
                <button
                  type="button"
                  onClick={() =>
                    dispatch({ type: "SET_LAYOUT", layout: "vertical" })
                  }
                  title="Use list view"
                  className={cn({
                    "p-1.5 text-gray-400 rounded-md  hover:shadow-sm focus:outline-none ": true,
                    "bg-white": state?.layout === "vertical",
                    "bg-gray-100 ": state?.layout === "grid",
                  })}
                >
                  <svg
                    className="w-6 h-6"
                    x-description="Heroicon name: solid/view-list"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Use list view</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({ type: "SET_LAYOUT", layout: "grid" })
                  }
                  title="Use grid view"
                  className={cn({
                    "ml-0.5 p-1.5 rounded-md shadow-sm text-gray-400 focus:outline-none ": true,
                    "bg-gray-100": state?.layout === "vertical",
                    "bg-white ": state?.layout === "grid",
                  })}
                >
                  <svg
                    className="w-6 h-6"
                    x-description="Heroicon name: solid/view-grid"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                  <span className="sr-only">Use grid view</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <h2 id="orders-heading" className="sr-only">
        Recently scanned orders
      </h2>

      {search === term && orders && (
        <div key={orders?.length} className="sm:space-y-10">
          {Object.values(batches).map((orders, index) => {
            const date = new Date(orders[0].date_packed);

            const options = {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            };

            return (
              <FadeIn delay={25} transitionDuration={200} key={index}>
                <FadeIn
                  delay={100}
                  wrapperTag="ul"
                  className={cn({
                    "grid": true,
                    "grid-cols-2 mt-4 gap-x-4 gap-y-1 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6":
                      state.layout === "grid",

                    "grid-cols-1 mt-4 gap-y-4 sm:grid-cols-1":
                      state.layout === "vertical",

                    "hidden": !orders?.length,
                  })}
                >
                  {orders.map((el) => {
                    // Grid of dispatch cards
                    return <DispatchCard {...el} key={el.sk} />;
                  })}

                  {orders && !index && <DispatchCard />}
                </FadeIn>

                <div className="relative py-5">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex items-center justify-between">
                    <span className="pr-3 text-base font-medium text-gray-900 rounded-full bg-shopify-grey ">
                      {date.toLocaleDateString(router.locale, options)}
                    </span>
                    <div className="flex flex-row items-center space-x-3">
                      <div className="flex -space-x-1 overflow-hidden">
                        {[...new Set(orders.map((el) => el?.owner))]
                          .filter(Boolean) // Exclude without owner
                          .map((el) => {
                            return (
                              <Avatars
                                key={el}
                                name={el}
                                size="tiny"
                                className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
                              />
                            );
                          })}
                      </div>

                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-1 text-xs font-medium leading-5 text-gray-700 border border-gray-300 rounded-full shadow-sm bg-shopify-grey sm:text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                      >
                        <PlusSmIcon
                          className="-ml-1.5 hidden mr-1 w-2 h-1 sm:h-5 sm:w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>
                          {orders.length}
                          <span className="hidden ml-1 capitalize sm:inline-block">
                            {t("headings.shipped")}
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      )}

      <FadeIn
        delay={50}
        visible={isLoading || !isSynced}
        childClassName="w-full mx-auto sm:h-40"
        className={cn({
          "flex items-center justify-between w-full h-full mx-auto mt-4 sm:col-span-1": true,
          "hidden": !isLoading && isSynced,
        })}
      >
        <Loading className="mx-auto" />
      </FadeIn>

      <FadeIn
        delay={75}
        wrapperTag="ul"
        visible={orders?.length === 0 && !isLoading && isSynced}
        className={cn({
          "hidden h-0": (orders?.length > 0 && !isLoading) || !isSynced,
          "visible h-auto": orders?.length === 0 && isLoading === false,
          "flex-row self-center justify-center h-full col-span-3": true,
        })}
        childClassName="flex-1 flex h-full"
      >
        <EmptyState
          quote={
            search
              ? `We couldn't find an order with ${search} as the tracking number. Support may be able to help.`
              : t("quotes.getting_started")
          }
          src={
            !search || !isSynced
              ? "/logos/disputecore-camera-icon-39-39.svg"
              : "/logos/search-25.svg"
          }
          headshot={!search && "/marketing/D2wEMMUD_400x400.jpg"}
          title={!search && t("headings.engineering_role")}
          author={!search && "Kiyomi"}
          button={
            !search
              ? {
                  cta: t("headings.browse_tutorial"),
                  onClick: () => {
                    dispatch({ type: "SET_VIEW", view: "setup" });
                  },
                }
              : {
                  cta: t("headings.support"),
                  onClick: () => {
                    dispatch({ type: "SET_VIEW", view: "support" });
                  },
                }
          }
        />
      </FadeIn>
    </section>
  );
}
