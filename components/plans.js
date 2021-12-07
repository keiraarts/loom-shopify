/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useContext, useEffect } from "react";

import { Redirect } from "@shopify/app-bridge/actions";
import { Context } from "@shopify/app-bridge-react";
import useStorefront from "../hooks/useStorefront";
import { useCountState } from "../src/app-context";
import { RadioGroup } from "@headlessui/react";
import { CreateInstance } from "../src/axios";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import Toast from "./toast";
import cn from "classnames";
import { get } from "lodash";

const plans = [
  {
    id: "revenue_based_10",
    name: "free",
    capacity: "+10% of new revenue",
    interval: "",
    subscription_cost: 0,
  },
  {
    id: "subscription_40",
    name: "Startup",
    capacity: "Zero additional fees",
    interval: "m",
    price: 49,
  },
];

export default function Accounts() {
  // Get storefront data from swr
  const state = useCountState();
  const { t } = useTranslation();
  const { data: storefront, username } = useStorefront();

  const [selected, setSelected] = useState();
  const [isSubscribed, setIsSubscribed] = useState();

  useEffect(() => {
    const id = storefront?.subscription ?? plans[0].id;
    const selection = plans.find((el) => el.name === id);
    setSelected(selection?.id);
  }, [storefront?.sk]);

  useEffect(() => {
    const id = storefront?.subscription;
    const selection = plans.find((el) => el.name === id);

    // Track if the user can switch to the exact same plan
    if (selection?.id === selected) setIsSubscribed(true);
    else setIsSubscribed(false);
  }, [selected]);

  const instance = CreateInstance(state);
  const app = useContext(Context);

  const HandlePlanSwitch = async (e) => {
    e.preventDefault();
    if (selected === "free_0") DeleteRecurringCharge();
    else GenerateRecurringCharge();
  };

  const DeleteRecurringCharge = async () => {
    Toast({
      cta: "Yes",
      message: "Switch back to the free plan?",

      onAction: async () => {
        await instance
          .delete(`${username}/shopify/recurring_application_charges`)
          .finally((res) => Toast({ message: "You're now on the free plan" }))
          .catch();
      },
    });
  };

  const GenerateRecurringCharge = async () => {
    const username = state?.username;
    const plan = plans.find((plans) => plans.id === selected);

    const data = {
      recurring_application_charge: {
        name: plan.name,
        price: plan.subscription_cost,
        test: process.env.LIVEMODE === "FALSE",
        return_url: `https://${username}.myshopify.com/admin/apps/${process.env.APP_SLUG}/app`,
      },
    };

    const charge = await instance
      .post(`${username}/shopify/recurring_application_charges`, data)
      .then((res) => res.data)
      .catch(() => Toast({ error: true, message: "Your Shopify is inactive" }));

    if (get(charge, "confirmationUrl")) {
      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.REMOTE, {
        url: charge.confirmationUrl,
      });
    }
  };

  return (
    <section
      aria-labelledby="plan_heading"
      className="bg-white border border-gray-300 rounded-2xl"
    >
      <form action="#" method="POST">
        <div className="shadow-sm rounded-2xl sm:overflow-hidden">
          <div className="px-4 py-6 space-y-6 sm:p-6">
            <div>
              <h2
                id="plan_heading"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {t("headings.plans")}
              </h2>
            </div>

            <div className="sm:pr-10">{t("settings.general_features")}</div>
            <RadioGroup value={selected} onChange={(e) => setSelected(e.id)}>
              <RadioGroup.Label className="sr-only">
                {t("headings.plans")}
              </RadioGroup.Label>
              <div className="flex flex-col space-y-4 sm:space-y-2 sm:space-x-0 sm:flex-col">
                {plans.map((plan) => (
                  <RadioGroup.Option
                    key={plan.name}
                    value={plan}
                    className={({ active }) =>
                      cn({
                        "ring-1 transition-all duration-150 flex-1 ring-offset-2 ring-gray-100 border-blue-300 bg-blue-50 text-black hover:border-blue-500":
                          active || plan.id === selected,
                        "relative flex-1 block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none": true,
                      })
                    }
                  >
                    {({ active }) => (
                      <>
                        <div
                          className={cn({
                            "text-green-900": active || plan.id === selected,
                            "flex": true,
                          })}
                        >
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className="mb-1 text-base font-bold text-black capitalize"
                            >
                              {plan.name}
                            </RadioGroup.Label>
                          </div>
                        </div>
                        <RadioGroup.Description
                          as="div"
                          className="flex mt-2 text-sm sm:mt-0 sm:block sm:text-right"
                        >
                          <div className="font-medium text-gray-900">
                            {plan?.price
                              ? `$${plan?.price}/${plan.interval}`
                              : "Free"}
                          </div>

                          <div className="ml-1 text-gray-500 sm:ml-0 whitespace-nowrap">
                            {plan.capacity}
                          </div>
                        </RadioGroup.Description>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-row items-center justify-between px-4 py-3 text-left bg-white sm:px-6">
            <div className="w-3/5 text-sm text-gray-700">
              {t("settings.support")}
            </div>
            <button
              type="submit"
              onClick={HandlePlanSwitch}
              className={cn({
                "text-white bg-green-600 hover:bg-green-700 hover:text-white ": true,
                "inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900": true,
              })}
            >
              {t("headings.change")}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
