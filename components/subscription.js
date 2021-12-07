import React, { useState, useContext } from "react";
import { Context } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { useCountState } from "../src/app-context";
import useStorefront from "../hooks/useStorefront";
import { CreateInstance } from "../src/axios";
import Toast from "../components/toast";
import Support from "../components/support";

export default function Subscription() {
  const [selection, setSelection] = useState(false);
  const { data: storefront } = useStorefront();
  const state = useCountState();
  const instance = CreateInstance(state);
  const app = useContext(Context);

  const DeleteRecurringCharge = async () => {
    Toast({
      error: true,
      message: "Are you sure?",
      cta: "Confirm subscription deletion",
      onAction: () => {
        instance.delete(`shopify/recurring_application_charges`).catch();
        Toast({ message: "Subscription was deleted" });
      },
    });
  };

  const GenerateRecurringCharge = async () => {
    Toast({ message: "Loading confirmation page", duration: 5000 });

    const data = {
      recurring_application_charge: {
        price: 12.0,
        name: "Small Business",
        test: process.env.LIVEMODE === "FALSE",
        return_url: `https://${state?.username}.myshopify.com/admin/apps/magic-soaps?intention=subscribed`,
      },
    };

    const charge = await instance
      .post(`shopify/recurring_application_charges`, data)
      .then((res) => res.data)
      .catch((err) => Toast({ message: "Error", duration: 2000 }));

    const redirect = Redirect.create(app);
    redirect.dispatch(Redirect.Action.REMOTE, {
      url: charge.confirmationUrl,
    });
  };
  return (
    <section>
      <div className="p-5 px-4 py-4 bg-white rounded-md sm:py-4 ">
        <div className="w-full mx-auto space-y-4 lg:mx-0">
          <div>
            <h2 className="sr-only">Price</h2>
            <p className="relative grid grid-cols-1">
              <span className="flex flex-col text-left">
                <span className="text-3xl tracking-tight text-black font">
                  $12
                </span>
                <span className="mt-2 text-base text-gray-500 font">
                  billed per month
                </span>
                <span className="sr-only">shopify subscription comparison</span>
              </span>
            </p>
          </div>
          <ul className="mt-6 space-y-4">
            {[
              "Accept unlimited orders",
              "Upload custom artwork to your packaging",
              "Have your orders shipped directly to customers",
              "Low-cost flat shipping. $3.99 across the US, $7.99 for Canada, $8.99 everywhere else USPS operates.",
              "Get orders from Canada, United States, France, United Kingdom, Japan, New Zealand, and Australia.",
            ].map((el) => {
              return (
                <li className="flex space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    style={{ color: `#BAA364` }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-500 transition-all duration-200 hover:text-gray-600">
                    {el}
                  </span>
                </li>
              );
            })}
          </ul>
          {!storefront?.email ? (
            <div className="animate-pulse">
              <button
                href="#"
                className="flex items-center justify-center w-full px-8 py-2 text-sm font-medium leading-6 text-white border border-transparent rounded-md cursor-pointer bg-button-green hover:bg-button-hover md:px-10"
              >
                <span>&nbsp; &nbsp; &nbsp; &nbsp;</span>
              </button>
            </div>
          ) : (
            <div>
              {storefront?.subscription ? (
                <span className="text-gray-500">
                  You're subscription is active!
                </span>
              ) : (
                <button
                  onClick={GenerateRecurringCharge}
                  className="flex items-center justify-center w-full px-8 py-2 text-sm font-medium leading-6 text-white border border-transparent rounded-md cursor-pointer bg-button-green hover:bg-button-hover md:px-10"
                >
                  <span>Subscribe</span>
                </button>
              )}
            </div>
          )}
          <div>
            <p className="-mt-2 text-sm leading-loose text-gray-500">
              <a
                onClick={DeleteRecurringCharge}
                className="underline cursor-pointer hover:text-red-800"
              >
                cancel the app
              </a>{" "}
              or{" "}
              <a
                className="underline cursor-pointer"
                onClick={() => setSelection("support")}
              >
                ask questions
              </a>
              ,{" "}
            </p>
          </div>
          {selection === "support" && <Support />}
        </div>
      </div>
      <div>
        <img
          alt="proudly canadian soap bars"
          className="h-10 mt-5"
          src="/logos/canadian-badge.svg"
        />
      </div>

      <div>
        <img
          alt="brand company shopify logo"
          className="mt-5 h-14 "
          src="/logos/magic-soaps-mini-logo.png"
        />
      </div>

      <div
        id="contact-information"
        className="relative grid gap-6 px-0 py-3 mt-5 sm:gap-8 sm:p-8 sm:px-0"
      >
        <a
          href="#"
          className="block p-3 -m-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50"
        >
          <p className="text-sm font-medium text-gray-900">Brand name</p>
          <p className="mt-1 text-xs text-gray-500">
            {!storefront?.email ? (
              <div className="flex space-x-4 animate-pulse">
                <div className="w-full h-5 bg-gray-300 rounded">
                  &nbsp; &nbsp; &nbsp; &nbsp;
                </div>
              </div>
            ) : (
              <span>
                Your store name is{" "}
                <span className="italic">
                  {storefront?.brand ?? "Demo store"}
                </span>{" "}
              </span>
            )}
          </p>
        </a>

        <a
          href="#"
          className="block p-3 -m-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50"
        >
          <p className="text-sm font-medium text-gray-900">Account</p>
          <p className="mt-1 text-xs text-gray-500">
            {!storefront?.email ? (
              <div className="flex space-x-4 animate-pulse">
                <div className="w-full h-5 bg-gray-300 rounded">
                  &nbsp; &nbsp; &nbsp; &nbsp;
                </div>
              </div>
            ) : (
              <span>Registered to {storefront?.username}</span>
            )}
          </p>
        </a>

        <a
          href="#"
          className="block p-3 -m-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50"
        >
          <p className="text-sm font-medium text-gray-900">Contact Info</p>
          <p className="mt-1 text-xs text-gray-500">
            {!storefront?.email ? (
              <div className="flex space-x-4 animate-pulse">
                <div className="w-full h-5 bg-gray-300 rounded">
                  &nbsp; &nbsp; &nbsp; &nbsp;
                </div>
              </div>
            ) : (
              <span>
                {[storefront?.email, storefront?.phone]
                  .filter(Boolean)
                  .join(" or ")}
              </span>
            )}
          </p>
        </a>

        <a
          href="#"
          className="block p-3 -m-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-50"
        >
          <p className="text-sm font-medium text-gray-900">Wallet Balance</p>
          <p className="mt-1 text-xs text-gray-500">
            {!storefront?.email ? (
              <div className="flex space-x-4 animate-pulse">
                <div className="w-full h-5 bg-gray-300 rounded">
                  &nbsp; &nbsp; &nbsp; &nbsp;
                </div>
              </div>
            ) : (
              <span>You have ${Math.abs(storefront?.balance ?? 0) / 100}</span>
            )}
          </p>
        </a>
      </div>
    </section>
  );
}
