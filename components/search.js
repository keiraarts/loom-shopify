import React, { Fragment, useState, useContext, useEffect } from "react";
import { useCountState, useCountDispatch } from "../src/app-context";
import { Redirect } from "@shopify/app-bridge/actions";
import { Context } from "@shopify/app-bridge-react";
import { useRouter } from "next/router";
import cn from "classnames";
import Link from "next/link";

export default function Search({ search, setSearch = () => {} }) {
  // Allow search via email and page urls
  const dispatch = useCountDispatch();
  const state = useCountState();
  const router = useRouter();

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
    <header className="z-20 w-full">
      <div className="relative z-10 flex flex-shrink-0 h-12 bg-white border-b border-gray-200 shadow-sm">
        <button
          type="button"
          className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 md:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
        <div className="flex justify-between flex-1 px-4 sm:px-6">
          <div className="flex flex-1">
            <form className="flex w-full md:ml-0" action="#" method="GET">
              <label for="desktop-search-field" className="sr-only">
                Search video replies
              </label>
              <label for="mobile-search-field" className="sr-only">
                Search video replies
              </label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  <svg
                    className="flex-shrink-0 w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  name="mobile-search-field"
                  id="mobile-search-field"
                  className="w-full h-full py-2 pl-8 pr-3 text-sm text-gray-900 placeholder-gray-500 border-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:hidden"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search"
                  value={search}
                  type="search"
                />
                <input
                  name="desktop-search-field"
                  id="desktop-search-field"
                  className="hidden w-full h-full py-2 pl-8 pr-3 text-sm text-gray-900 placeholder-gray-500 border-transparent focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:block"
                  placeholder="Search videos by emails or products"
                  onChange={(event) => setSearch(event.target.value)}
                  value={search}
                  type="search"
                />
              </div>
            </form>
          </div>
          <div className="flex items-center ml-2 space-x-4 sm:ml-6 sm:space-x-6">
            <div className="flex items-center justify-end">
              <div className="flex">
                {[
                  { key: "/app", href: "/app", value: "Dashboard" },
                  {
                    key: "/app/recipes/all",
                    href: "/app/recipes/[rid]",
                    value: "Recipes",
                  },
                  {
                    key: "#support",
                    href: false,
                    value: "Support",
                    onClick: () => {
                      dispatch({
                        type: "SET_MODAL_VIEW",
                        view: "support",
                      });
                    },
                  },
                ].map(({ key, value, href, onClick = () => {} }) => {
                  return (
                    <Link href={key}>
                      <a
                        href={key}
                        onClick={onClick}
                        className={cn({
                          "text-black": router.pathname === href,
                          "text-gray-500 ": router.pathname !== href,
                          "px-3 py-2 text-sm font-medium hover:text-black rounded-md cursor-pointer ": true,
                        })}
                      >
                        {value}
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                redirectContext(
                  `https://${state.username}.myshopify.com/admin/themes/current/editor?context=apps&template=index&activateAppId=5178a21d-051e-4b38-8992-ed13ae96cd73/app-block`
                );
              }}
              className="flex items-center justify-center p-1 text-black bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="sr-only">Add file</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
