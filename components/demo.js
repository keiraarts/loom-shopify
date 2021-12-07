import React from "react";
import FadeIn from "react-fade-in";
import { CheckIcon } from "@heroicons/react/solid";
import { useCountState, useCountDispatch } from "../src/app-context";

const features = [
  {
    name: "Scan unlimited packages",
    description:
      "Insure your orders using any carrier or shipping destination.",
  },
  {
    name: "Built for Shopify",
    description:
      "Scan your outgoing shipments using Shopify's app on your phone.",
  },
  {
    name: "Dispute Templates",
    description:
      "Use our pre-built dispute responses to increase your appeal's credibility.",
  },
  {
    name: "Long-term Storage",
    description:
      "Have ypur photo scans stored for a full year across multiple data centers.",
  },
  {
    name: "Link photos to customers",
    description:
      "Quickly view all of a customer's shipped orders from Shopify's dashboard.",
  },
  {
    name: "Cached Tracking Page",
    description:
      "Show banks a tracking page with your photos and a custom tracking history of the order.",
  },
];

export default function Demo() {
  const dispatch = useCountDispatch();

  return (
    <div className="">
      <div className="px-4 mb-5 sm:px-6 md:px-8">
        <h2 className="mb-3 font-semibold tracking-wide text-teal-500 uppercase sm:text-lg sm:leading-snug">
          Real talk
        </h2>
        <p className="mb-8 text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Disputes are a mood-killer
        </p>
        <p className="max-w-4xl mb-6 space-y-6 text-lg font-medium sm:text-xl sm:leading-8">
          Getting surprised with a chargeback after you shipped an order is
          painful. In most cases disputes happen for reasons out of your control
          as an independant shop owner. Lost packages, fraudulent cards,
          shipping address mistakes, etc.
        </p>

        <p className="max-w-4xl mb-6 space-y-6 text-lg font-medium sm:text-xl sm:leading-8"></p>
      </div>

      <div className="grid mx-5 GradientLockup_root__sBkgs">
        <div className="flex col-start-2 col-end-3 row-start-2 row-end-4 pl-4 -mr-8 lg:col-start-1 lg:col-end-5 lg:row-end-5 lg:py-10 xl:py-16 sm:mr-0 sm:pl-0">
          <div className="flex-none w-full bg-gray-100 rounded-3xl"></div>
        </div>

        <div className="relative z-20 self-center col-start-2 col-end-3 row-start-2 row-end-3 pt-6 pl-8 lg:col-end-3 lg:row-start-3 lg:row-end-4 sm:px-6 md:px-8 md:pt-8 lg:px-0 lg:pt-0">
          <div className="relative z-10 divide-gray-100 rounded-tl-xl sm:rounded-t-xl lg:rounded-xl lg:-mr-8">
            <FadeIn delay={1000} transitionDuration={500}>
              {[
                {
                  img: "/assets/pouting-face_1f621.png",
                  message: `Where's my package!?!?!`,
                  sender: "Ashley, customer",
                },
                {
                  img: "/assets/smiling-face-with-smiling-eyes_1f60a.png",
                  message:
                    "Hello! :) I checked and USPS delivered it this morning! Here's your USPS tracking number X000G7F.",
                  sender: "CEO, TobiSocks.com",
                },
                {
                  img: "/assets/pouting-face_1f621.png",
                  message: "My mailbox is empty? Wtf? I'm calling VISA.",
                  sender: "Ashley, customer",
                },
              ].map((el, index) => {
                return (
                  <div
                    key={index}
                    className="z-20 hidden p-4 mb-5 space-x-4 text-black bg-white border border-b-8 border-gray-900 rounded-lg sm:flex"
                  >
                    <div className="flex flex-row">
                      <img
                        src={el.img}
                        alt={el.message}
                        className="inline-flex w-10 h-10 mr-5 bg-white rounded-full"
                      />
                      <div className="relative flex-auto min-w-0 sm:pr-20 lg:pr-0 xl:pr-20">
                        <h2 className="text-base sm:text-lg lg:text-base xl:text-xl font-semibold sm:pr-10 mb-0.5 ">
                          {el.message}
                        </h2>

                        <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
                          <div>
                            <dt className="sr-only">Difficulty</dt>
                            <dd></dd>
                          </div>
                          <div>
                            <dt className="sr-only">Servings</dt>
                            <dd></dd>
                          </div>
                          <div className="flex-none w-full mt-0.5 font-normal">
                            <dt className="inline">By</dt> {el.sender}
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                );
              })}
            </FadeIn>
          </div>
        </div>
        <div className="relative z-30 self-center w-full col-start-1 col-end-4 row-start-3 row-end-4 py-10 pb-8 lg:pt-40 lg:w-auto md:px-8 lg:px-0 lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-5 lg:pb-0">
          <FadeIn delay={4000} transitionDuration={500}>
            <span className="flex flex-col items-start justify-center w-full px-5 py-8 text-3xl italic font-light text-white bg-gray-900 shadow-xl md:rounded-xl">
              -$50 Bank Reversal
            </span>

            <span className="flex flex-col items-start justify-center w-full px-5 py-8 mt-5 text-3xl italic font-light text-white bg-gray-900 shadow-xl md:rounded-xl">
              -$15 PayPal Fee
            </span>
          </FadeIn>
        </div>
      </div>

      <div className="px-4 mb-10 mt-28 sm:px-6 md:px-8 sm:mb-12 md:mb-12">
        <h2 className="mb-3 font-semibold tracking-wide text-teal-500 uppercase sm:text-lg sm:leading-snug">
          However ...
        </h2>
        <p className="mb-8 text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          But you can easily win them
        </p>

        <p className="max-w-4xl mb-6 space-y-6 text-lg font-medium sm:text-xl sm:leading-8">
          Part of the energy-draining process is the scramble of finding enough
          evidence (if any) that you fulfilled an order. Tracking pages aren't
          kept active forever, signature confirmations are expensive, and you
          don't want tracking pages saying a package was 'undelivered' only
          because the customer gave their wrong address.
        </p>

        <p className="max-w-4xl mb-6 space-y-6 text-lg font-medium sm:text-xl sm:leading-8">
          For chargebacks like stolen_card, order_not_received, or
          accidental_purchase you can have banks resolve disputes in your favor
          when you submit photo evidence from our app.
        </p>

        <p className="max-w-4xl mb-6 space-y-6 text-lg font-medium sm:text-xl sm:leading-8"></p>

        <img src="/marketing/dispute-distractions.png" alt="distractions" />
      </div>

      <div className="px-4 mb-10 mt-28 sm:px-6 md:px-8 sm:mb-12 md:mb-12">
        <h2 className="mb-3 font-semibold tracking-wide text-teal-500 uppercase sm:text-lg sm:leading-snug">
          It literally takes seconds
        </h2>
        <p className="mb-8 text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Insure your shipments by scanning orders
        </p>
        <p className="max-w-4xl mb-6 space-y-6 text-lg font-medium sm:text-xl sm:leading-8">
          Easily protect your orders from disputes by scanning barcode on your
          packages from the Shopify app. It's a quick-and-easy way of creating
          photo evidence that you shipped an order to the customer's address.
        </p>

        <p className="max-w-4xl mb-6 space-y-6 text-lg font-medium sm:text-xl sm:leading-8">
          Retreive your scans anytime and let our app organize your photos so
          you don't have to keep thousands of pictures scattered on your camera
          roll.
        </p>

        <div className="max-w-4xl mx-auto">
          <dl className="bg-white border border-b-8 border-black rounded-lg shadow-lg sm:grid sm:grid-cols-3">
            <div className="flex flex-col p-6 text-center border-b border-gray-100 sm:border-0 sm:border-r">
              <dt className="order-2 mt-2 text-base font-medium leading-6 text-gray-500">
                Storage reliablity
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-blue-600">
                100%
              </dd>
            </div>
            <div className="flex flex-col p-6 text-center border-t border-b border-gray-100 sm:border-0 sm:border-l sm:border-r">
              <dt className="order-2 mt-2 text-base font-medium leading-6 text-gray-500">
                Carriers supported
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-blue-600">
                500+
              </dd>
            </div>
            <div className="flex flex-col p-6 text-center border-t border-gray-100 sm:border-0 sm:border-l">
              <dt className="order-2 mt-2 text-base font-medium leading-6 text-gray-500">
                Chargeback decline
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-blue-600">
                93%
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="px-4 mb-10 mt-28 sm:px-6 md:px-8 sm:mb-12 md:mb-12">
        <h2 className="mb-3 font-semibold tracking-wide text-teal-500 uppercase sm:text-lg sm:leading-snug">
          Your new favourite app
        </h2>
        <p className="mb-8 text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Forever remove the anxiety from shipping orders
        </p>

        <p className="max-w-4xl mb-6 space-y-6 text-lg font-medium sm:text-xl sm:leading-8">
          There are an absurd amount of benefits from scanning your orders from
          our app. You can manage your quality-assurance, protect yourself
          against wrongful disputes, and it gives your customer support team
          more context the next time they answer a customer's support ticket.
        </p>

        <p className="max-w-4xl mb-6 space-y-6 text-lg font-medium sm:text-xl sm:leading-8">
          Start using our app for free to scan orders, and if a dispute happens
          we'll prepare your response to give you the best chance at winning.
        </p>

        <p className="block max-w-4xl mb-4 space-y-6 text-lg font-medium sm:text-xl sm:leading-8">
          <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-2">
            <dl className="mt-10 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:grid-rows-3 sm:grid-flow-col sm:gap-x-2 sm:gap-y-2 lg:gap-x-2">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="relative p-2 bg-white rounded-md"
                >
                  <dt>
                    <CheckIcon
                      className="absolute w-6 h-6 text-green-500 border-gray-300 text-bold"
                      aria-hidden="true"
                    />
                    <p className="text-lg font-medium leading-6 text-gray-900 ml-9">
                      {feature.name}
                    </p>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500 ml-9">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </p>
      </div>

      <section className="mx-auto mt-10">
        <p className="w-full mt-4 text-base font-semibold text-center text-black cursor-pointer group">
          <span className="p-1 px-4 bg-white border border-gray-400 rounded-full group-hover:bg-gray-100 ">
            <button
              className="focus:outline-none"
              onClick={() =>
                dispatch({
                  type: "SET_VIEW",
                  storefront: { progress: "dashboard" },
                })
              }
            >
              Ship your first order
            </button>
          </span>
        </p>
      </section>
    </div>
  );
}
