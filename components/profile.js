import React, { Fragment, useState, useEffect } from "react";
import { useCountDispatch } from "../src/app-context";
import useStorefront from "../hooks/useStorefront";

export default function Accounts() {
  const { data: storefront } = useStorefront();
  const dispatch = useCountDispatch();

  return (
    <section
      aria-labelledby="profile_heading"
      className="bg-white border border-gray-300 rounded-2xl"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();

          dispatch({
            type: "SAVE_STOREFRONT",
            storefront: {
              industry: event.target.industry.value,
              brand: event.target.brand.value,
              email: event.target.email.value,
            },
          });
        }}
      >
        <div className="sm:rounded-md">
          <div className="px-4 py-6 space-y-6 rounded-3xl sm:p-6">
            <div>
              <h2
                id="profile_heading"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Brand Profile
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Keeping this updated helps our app notify you of any relevant
                status updates.
              </p>
            </div>
          </div>
          <div className="px-4 py-6 pt-0 bg-white sm:p-6 sm:pt-0">
            <div className="grid grid-cols-4 gap-6 mt-6">
              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium text-gray-700"
                >
                  Brand Name
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  defaultValue={storefront?.brand}
                  placeholder="Glossy Glosses"
                  autoComplete="cc-given-name"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="industry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Industry
                </label>
                <input
                  type="text"
                  name="industry"
                  id="industry"
                  defaultValue={storefront?.industry}
                  placeholder="Beauty and cosmetics"
                  autoComplete="cc-company-name"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>

              <div className="col-span-4 sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  defaultValue={storefront?.email}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between px-4 py-3 text-left sm:px-6">
            <div className="w-3/5 text-sm text-gray-700"></div>
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
