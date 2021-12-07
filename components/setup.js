import React, { useContext, useState } from "react";
import { Context } from "@shopify/app-bridge-react";
import cn from "classnames";

import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { isShopifyMobile } from "@shopify/app-bridge-utils";
import InstallSelection from "../components/install-selection";
import { useCountDispatch } from "../src/app-context";
import { useTranslation } from "react-i18next";
import FadeIn from "react-fade-in";

function Index() {
  const { t } = useTranslation();
  const app = useContext(Context);
  const dispatch = useCountDispatch();

  const [selected, setSelected] = useState(["demo"]);
  const toggleOpen = (id) => {
    setSelected(selected.concat([id]));
  };

  return (
    <div>
      <div className="p-1">
        <h2 className="flex flex-col justify-center max-w-3xl p-5 mx-auto mb-10 text-lg font-normal leading-relaxed text-left sm:pr-10 sm:items-center sm:text-left sm:leading-relaxed sm:text-lg space-y-7">
          <FadeIn childClassName="mb-5">
            <span className="rounded-sm bg-shopify-grey sm:bg-none">
              {t("tutorial.benefit")}
            </span>
            <span className="rounded-sm bg-shopify-grey sm:bg-none">
              {t("tutorial.getting_started")}
            </span>
            <span className="rounded-sm bg-shopify-grey sm:bg-none">
              {t("tutorial.preventing_disputes")}
            </span>
            <span className="rounded-sm bg-shopify-grey sm:bg-none">
              {t("tutorial.short_description")}
            </span>
          </FadeIn>
        </h2>

        <AnimateSharedLayout type="crossfade">
          <div className="max-w-2xl mx-auto">
            <ul className="grid gap-8" initial="hidden" animate="show">
              <Card id="guide" toggleOpen={toggleOpen} selected={selected}>
                <div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                      <a className="hover:underline">Getting Started</a>
                    </p>
                    <a className="block mt-2">
                      <p className="text-lg font-medium text-gray-900">
                        Learn how our insurance works
                      </p>
                      <p className="mt-3 text-sm text-gray-600">
                        Quickly learn how we help protect your orders against
                        fraud.
                      </p>
                    </a>
                  </div>
                  <div className="flex items-center mt-6">
                    <div className="flex-shrink-0">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        View screencast
                      </button>
                    </div>
                    <div className="ml-3">
                      <div className="flex space-x-1 text-sm text-gray-600">
                        <time dateTime="2020-03-16">Guide</time>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              {!isShopifyMobile() && (
                <Card id="install" selected={selected} toggleOpen={toggleOpen}>
                  <div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-indigo-600">
                        <a className="hover:underline">Get Mobile</a>
                      </p>
                      <a className="block mt-2">
                        <p className="text-lg font-medium text-gray-900">
                          Download Shopify Mobile
                        </p>
                        <p className="mt-3 text-sm text-gray-600">
                          You'll need to open our app through Shopify's app to
                          start scanning the barcodes of your packages.
                        </p>
                      </a>
                    </div>
                    <div className="flex items-center mt-6">
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Download
                        </button>
                      </div>
                      <div className="ml-3">
                        <div className="flex space-x-1 text-sm text-gray-600">
                          <time dateTime="2020-03-16">Guide</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
              <Card
                id="first_order"
                selected={selected}
                toggleOpen={toggleOpen}
              >
                <div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                      <a className="hover:underline">Tutorial</a>
                    </p>
                    <a className="block mt-2">
                      <p className="text-lg font-medium text-gray-900">
                        Scan your first order
                      </p>
                      <p className="mt-3 text-sm text-gray-600">
                        Add insurance to your very first order by photographing
                        the items you're shipping.
                      </p>
                    </a>
                  </div>
                  <div className="flex items-center mt-6">
                    <div className="flex-shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          dispatch({
                            type: "SET_MODAL_VIEW",
                            view: isShopifyMobile()
                              ? "scanner"
                              : "download_prompt",
                          })
                        }
                        className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Start walkthrough
                      </button>
                    </div>
                    <div className="ml-3">
                      <div className="flex space-x-1 text-sm text-gray-600">
                        <time dateTime="2020-03-16">First Steps</time>
                        <span aria-hidden="true">&middot;</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </ul>
          </div>
        </AnimateSharedLayout>
      </div>

      <section className="mx-auto mt-10">
        <p className="w-full mb-5 -mt-4 text-base font-semibold text-center text-black cursor-pointer group">
          <span className="p-1 px-4 pr-2 bg-white border border-gray-400 rounded-full group-hover:bg-gray-100 ">
            <button
              className="focus:outline-none"
              onClick={() =>
                dispatch({
                  type: "SET_VIEW",
                  view: "orders",
                })
              }
            >
              Finish tutorial
            </button>
            <svg
              className="inline-flex w-5 h-5 ml-3 -mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </span>
        </p>
      </section>
    </div>
  );
}

function Card({ id, toggleOpen, selected, children }) {
  const isSelected = selected?.includes(id);

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const container = {
    hidden: {
      borderBottomRightRadius: `0.75rem`,
      orderBottomLeftRadius: `0.75rem`,
    },
    show: {
      borderBottomRightRadius: `0.2rem`,
      orderBottomLeftRadius: `0.2rem`,
    },
  };

  return (
    <motion.li
      id={`card-${id}`}
      layoutId={`card-full-${id}`}
      variants={item}
      className="mx-2 shadow-lg cursor-pointer sm:px-5 sm:mx-0 sm:shadow-none"
    >
      <motion.div
        variants={container}
        layoutId={`card-container-${id}`}
        animate={isSelected ? "show" : "hidden"}
        onClick={() => toggleOpen(isSelected ? false : id)}
        className="z-10 flex flex-col w-full overflow-hidden sm:bg-white sm:flex-row rounded-t-xl"
      >
        <motion.div
          className="cursor-pointer rounded-t-xl sm:w-6/12"
          layoutId={`card-image-container-${id}`}
        >
          <img
            className="object-cover w-full rounded-t-xl h-60"
            src={CardContent?.[id]?.img}
            alt=""
          />
        </motion.div>
        <div className="flex flex-col justify-between flex-1 p-4 bg-white rounded-xl">
          {children}
        </div>
      </motion.div>

      <AnimatePresence>{isSelected && <Content id={id} />}</AnimatePresence>
    </motion.li>
  );
}

function Content({ id }) {
  const containerClass = cn({
    "z-0 bg-white rounded-b-xl": true,
    "p-5": id !== "first_order",
  });

  return (
    <motion.div
      layout
      id={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, duration: 0.4 }}
      exit={{ opacity: 0 }}
      className={containerClass}
    >
      <div className="relative px-2 sm:px-0">{CardContent?.[id]?.content}</div>
    </motion.div>
  );
}

const CardContent = {
  first_order: {
    title: "Insure your first order",
    img: "/marketing/card-scan-new-orders.png",
    content: "",
  },
  install: {
    title: "Download Shopify",
    img: "/marketing/card-install-shopify-mobile.png",
    content: <InstallSelection />,
  },
  guide: {
    title: "How this all works",
    img: "/marketing/card-learn-about-dispute-core.png",
    content: (
      <React.Fragment>
        <div className="mx-auto text-base max-w-prose s">
          <h2 className="font-semibold leading-6 tracking-wide text-indigo-600 uppercase">
            Work with us
          </h2>
          <h3 className="mt-2 mb-5 text-2xl font-medium leading-8 tracking-wide text-gray-900 sm:text-3xl">
            Our Process
          </h3>

          <div className="aspect-w-16 aspect-h-9 ">
            <iframe
              src="https://www.youtube.com/embed/Bg92sObrFGk"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

          <p className="mt-8 text-base prose prose-lg text-gray-900">
            I jumped into customer support for a few hours last night, to help
            out a friend, and I was shocked at how many people think they’re
            entitled to free replacements if they put in the wrong address or
            didn't pick up their order. And while most customers were okay to
            work on a compromise — a few decided to file chargebacks.
          </p>
          <div className="mt-5 text-base prose text-gray-900 prose-indigo">
            <p>
              And fighting chargebacks is an emotionally draining process.
              Customers can dispute their payment to you and get all of their
              money back for an order; even if their products were delivered six
              months ago!
            </p>
            <p>
              Responding to disputes involves a month-long process of gathering
              documentation to fight it, the customer's entire payment gets
              withdraw from your account, you pay a $15 bank penalty
              out-of-pocket, and worst of all — a single customer can live rent
              free in your head for days when you could have been doing more
              productive things.
            </p>
            <p>
              And after talking with other store owners in the Shopify community
              I decided that an app had to be built to make shipping less
              stressful; arming us rebels with a tool to protect our shipments
              from wrongful chargebacks. Because if a customer forgot their
              apartment number it shouldn't mean you have to issue a refund — or
              give a customer a free replacement because shipping took a few
              extra days in the middle of a emerging pandemic.
            </p>
            <p>
              So here's how this app works — The next time you're packing
              orders, open our app on your phone to photograph the products
              you're shipping. It takes a few seconds and works with any
              shipping courier. From USPS to Canada Post our app works with all
              them.
            </p>
            <p>
              If a dispute happens; you'll have an overwhelming amount of proof
              to tilt the case in your favour. Big banks prefer pdf documents so
              we'll help you put together the paperwork showing your photo
              scans, a verification from USPS that the shipping address exists,
              evidence to show the order wasn't missing any items, tracking
              screenshots, and a personalized case response for your unique
              situation.
            </p>

            <p>
              Keep your energy focused on better things knowing that you've got
              a layer of insurance from the customers hurting your business with
              fraud. Recover your money from lost orders and chargebacks more
              often! Download our app for free on Shopify's app store.
            </p>
          </div>
        </div>
      </React.Fragment>
    ),
  },
};

export default Index;
