import React, { useState, useContext } from "react";
import useStorefront from "../hooks/useStorefront";
import { useCountDispatch } from "../src/app-context";
import { RadioGroup } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import cn from "classnames";

const plans = [
  {
    id: "chitchats",
    name: "ChitChats",
  },

  {
    id: "woocommerce",
    name: "WooCommerce",
    capacity: "Sync orders with Woo",
  },
];

const woocommerce_setup = [
  { name: "Name", href: "#", count: "New orders" },
  { name: "Status", href: "#", count: "Active" },
  { name: "Topic", href: "#", count: "Order Updated" },
  { name: "Secret", href: "#", count: "SHOPTSE" },
  { name: "API Version", href: "#", count: "V3" },
];

export default function Accounts() {
  const { data: storefront } = useStorefront();
  const [selected, setSelected] = useState();
  const dispatch = useCountDispatch();
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="plan_heading"
      className="border rounded-md border-gray-50"
    >
      <div>
        <div className="rounded-md shadow sm:overflow-hidden">
          <div className="px-4 py-6 space-y-6 bg-white sm:p-6">
            <div>
              <h2
                id="plan_heading"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {t("headings.integrations")}
              </h2>
            </div>

            <div className="sm:pr-10">{t("settings.integrations")}</div>
            <RadioGroup value={selected} onChange={(e) => setSelected(e.id)}>
              <RadioGroup.Label className="sr-only">
                App Integrations
              </RadioGroup.Label>
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
                {plans.map((plan) => (
                  <RadioGroup.Option
                    key={plan.name}
                    value={plan}
                    className={({ active }) =>
                      cn({
                        "ring-1 transition-all duration-150 flex-1 ring-offset-2 ring-gray-100 border-blue-300 bg-blue-100 text-black hover:border-blue-500":
                          active || plan.id === selected,
                        "relative flex-1 block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none": true,
                      })
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <RadioGroup.Description
                          as="div"
                          className="flex-1 mt-2 text-sm sm:mt-0 sm:block sm:text-right"
                        >
                          <div className="flex flex-row items-center justify-between">
                            <div
                              className={cn({
                                "text-blue-900": active || plan.id === selected,
                              })}
                            >
                              <div className="text-sm">
                                <RadioGroup.Label
                                  as="p"
                                  className="text-base font-bold text-black"
                                >
                                  {plan.name}
                                </RadioGroup.Label>
                              </div>
                            </div>
                            <div className="font-medium text-gray-900">
                              {plan?.price ? `${plan?.price}/m` : "Free"}
                            </div>
                          </div>
                        </RadioGroup.Description>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();

              dispatch({
                type: "SET_STOREFRONT",
                storefront: {
                  chitchats: {
                    id: event.target.chitchats_client.value,
                    token: event.target.chitchats_token.value,
                  },
                },
              });

              dispatch({ type: "SAVE_STOREFRONT" });
            }}
          >
            <div className="shadow sm:rounded-md">
              <div className="px-4 pt-0 bg-white sm:p-6 sm:pt-0">
                <div className="grid grid-cols-4 gap-6">
                  {selected === "chitchats" && (
                    <div className="col-span-4 sm:col-span-2">
                      <label
                        htmlFor="chitchats_token"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Access Token
                      </label>
                      <input
                        type="text"
                        name="chitchats_token"
                        id="chitchats_token"
                        defaultValue={storefront?.chitchats?.token}
                        placeholder="ACIA4TJ2S5TMQL6UTEZN"
                        autoComplete="cc-given-name"
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                      />
                    </div>
                  )}
                  {selected === "chitchats" && (
                    <div className="col-span-4 sm:col-span-2">
                      <label
                        htmlFor="chitchats_client"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Client Number
                      </label>
                      <input
                        type="text"
                        name="chitchats_client"
                        id="chitchats_client"
                        defaultValue={storefront?.chitchats?.id}
                        placeholder="35000"
                        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                      />
                    </div>
                  )}
                  {selected === "woocommerce" && (
                    <nav
                      className="w-full col-span-4 space-y-1"
                      aria-label="Sidebar"
                    >
                      {woocommerce_setup.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="flex items-center flex-1 px-3 py-2 text-sm font-medium rounded-md flex-0 group"
                          aria-current={item.current ? "page" : undefined}
                        >
                          <span className="inline-block">{item.name}</span>
                          {item.count ? (
                            <span className="ml-auto flex-0 sm:text-right border-blue-300  bg-blue-100 inline-block py-0.5 px-3 text-xs rounded-full">
                              {item.count}
                            </span>
                          ) : null}
                        </a>
                      ))}

                      <p className="block py-5 mx-3 break-all">
                        Create a new WooCommerce webhook that delivers events to
                        this address with the settings above.
                        <span className="block mt-2 font-bold">
                          https://disputecore.com/api/v1/{storefront?.username}
                          /webhooks/integrations/woocommerce
                        </span>
                      </p>
                    </nav>
                  )}
                </div>
              </div>
              <div className="flex flex-row items-center justify-between px-4 py-3 text-left bg-white sm:px-6">
                <div className="w-3/5 text-sm text-gray-700">
                  Need something else? Ask us!
                </div>
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
