import React, { useState, useContext, useEffect } from "react";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { Context } from "@shopify/app-bridge-react";
import { useCountState } from "../src/app-context";
import useStorefront from "../hooks/useStorefront";
import { setStorage } from "../lib/localStorage";
import { SOAP_BAR_PRICE } from "../lib/constants";
import { CreateInstance } from "../src/axios";
import Support from "./support";
import Toast from "./toast";
import Checkout from "./checkout";
import Button from "./button";

import { loadStripe } from "@stripe/stripe-js";

const options = [
  {
    id: "sample",
    title: "Try your samples",
    subtext: "Get personalized products",
    emoji: "📦",
    cta: "View",
  },
  {
    id: "stripe",
    title: "Pay order costs",
    subtext: "Add funds to fulfill orders",
    emoji: "🌱",
    cta: "View",
  },
  {
    id: "question",
    title: "Ask a question",
    subtext: "Message our support",
    emoji: "👋",
    cta: "View",
  },
];

const key =
  process.env.LIVEMODE === "FALSE"
    ? process.env.STRIPE_TEST_PUBLISHABLE_KEY
    : process.env.STRIPE_LIVE_PUBLISHABLE_KEY;

const stripePromise = loadStripe(key);

export default function Actions() {
  const state = useCountState();
  const [selection, setSelection] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);

  const { data: storefront } = useStorefront();
  const [amount, setAmount] = useState(0);

  const handleCheckout = async () => {
    if (!storefront?.subscription) {
      Toast({ message: "Subscribe at $12/m to process customer orders" });
      return;
    }

    const stripe = await stripePromise;
    const instance = CreateInstance(state);
    const checkoutAmount = amount * 100;
    Toast({ message: "Loading Stripe checkout" });

    // Call your backend to create the Checkout Session
    const session = await instance
      .post("payments/balance/" + checkoutAmount)
      .then((res) => res.data)
      .catch((err) => console.error(err.message));

    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      Toast({
        message: `Checkout error: ${result.error.message}`,
        error: true,
      });
    }
  };

  const handleBulk = async () => {
    if (!storefront?.subscription) {
      Toast({ message: "Subscribe at $12/m to order in bulk" });
      return;
    }

    setSelection("sample");
  };

  useEffect(() => {
    if (selection === "bulk") {
      setMultiple(true);
      handleBulk();
    }
  }, [selection]);

  return (
    <section aria-labelledby="recent-hires-title">
      <ResourcePicker
        resourceType="Product"
        selectMultiple={multiple}
        open={selection === "sample"}
        onCancel={() => setOpenCheckout(false)}
        onSelection={({ selection }) => {
          const cart = [];
          setOpenCheckout(true);

          selection.map((el) => {
            cart.push({
              id: el.id,
              quantity: 1,
              title: el.title,
              price: SOAP_BAR_PRICE,
              amount: SOAP_BAR_PRICE,
              sku: el.variants[0].sku,
              variantId: el.variants[0].id,
              thumbnail: el?.images?.[0]?.originalSrc,
            });
          });

          setStorage("cart", JSON.stringify(cart));
          setOpenCheckout(true);
        }}
      />

      <Checkout
        stripeKey={key}
        key={openCheckout}
        checkoutActive={openCheckout}
        onClose={() => setOpenCheckout(false)}
        chargeType="direct"
        initialView="checkout"
        onClearCart={() => {
          removeStorage("orders");
          removeStorage("cart");
          setSampleIntent([]);
          setSampleIntent({});
        }}
        storefront={{
          ...storefront,
          storeName: "Magic Soaps",
          logo: "/logos/magic-soaps-mini-logo.png",
          logoCheckout: "/logos/magic-soaps-mini-logo.png",
          snapchatPixel: "75e7e437-1b06-4811-bcad-e2dd4ca70d38",
        }}
        checkoutOptions={{
          paypal: false,
          createDraft: false,
          acceptCoupons: false,
        }}
      />

      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="py-6">
          <h2
            id="recent-hires-title"
            className="px-6 mb-2 text-base font-medium text-gray-900"
          >
            Quick Actions
          </h2>
          <div className="flow-root mt-6">
            <ul className="-my-5 divide-y divide-gray-300">
              {options.map((el) => {
                return (
                  <li>
                    <div
                      key={el.id}
                      layout="true"
                      className="py-4 transition-all duration-75 bg-white cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        setSelection(el?.id !== selection && el?.id)
                      }
                    >
                      <div className="flex items-center px-6 ">
                        <div className="flex-shrink-0 mr-3 text-xl">
                          {el?.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {el.title}
                          </p>
                          <p className="text-xs text-gray-800">{el.subtext}</p>
                        </div>
                      </div>
                    </div>

                    {el?.id === selection && selection === "stripe" && (
                      <div className="px-4 py-8 bg-gray-100 ">
                        <label
                          for="price"
                          className="block text-sm font-medium text-black"
                        >
                          Add funds
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="text"
                            name="price"
                            id="price"
                            className="block w-full pr-12 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pl-7 sm:text-sm"
                            placeholder="0.00"
                            aria-describedby="price-currency"
                            onChange={(event) => {
                              setAmount(event.currentTarget.value);
                            }}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <span
                              className="text-gray-800 sm:text-sm"
                              id="price-currency"
                            >
                              USD
                            </span>
                          </div>
                        </div>
                        <Button fullWidth onClick={handleCheckout}>
                          Add funds
                        </Button>
                        <span className="mt-2 text-xs text-black">
                          You have an existing balance of{"  "}$
                          {Math.abs(storefront?.balance ?? 0) / 100}
                        </span>
                      </div>
                    )}

                    {el?.id === selection && el?.id === "question" && (
                      <div className="px-6">
                        <Support />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <style jsx global>
        {`
          .modal-fixed-background {
            background-color: rgba(0, 0, 0, 0.5) !important;
          }

          .div#checkout-container {
            border: 1px solid black !important;
          }

          #modal-body input {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background-color: #fff;
            border-color: #cecece !important;
            border-width: 0px !important;
            border-radius: 0px;
            padding-top: 0.5rem;
            padding-right: 0.75rem;
            padding-bottom: 0.5rem;
            padding-left: 0.75rem;
            font-size: 1rem;
            line-height: 1.5rem;
          }
        `}
      </style>
    </section>
  );
}
