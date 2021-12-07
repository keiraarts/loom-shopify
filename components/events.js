import React from "react";
import useEvents from "../hooks/useEvents";

const contexts = {
  personal: {
    emoji: "👋",
    title: "Keira sent you a note",
  },

  sample_order: {
    emoji: "🎁",
    title: "A new sample order was placed",
  },

  install: {
    emoji: "🌱",
    title: "You installed MagicSoaps to your shop",
  },

  design_upload: {
    emoji: "🎨",
    title: "A new design was uploaded to your store",
    context: "url",
  },

  design_reset: {
    emoji: "🌱",
    title: "Your designs were reset",
  },

  tip: {
    emoji: "🧧",
    title: "Your designs were reset",
  },

  balance_credit: {
    emoji: "🧧",
    title: "You added funds to your wallet",
    context: "amount",
  },

  balance_debit: {
    emoji: "🧧",
    title: "Funds from your account balance were used",
    context: "amount",
  },

  fulfillment_accepted: {
    emoji: "🛍️",
    title: "An order was scheduled to start formulating",
    context: "orderID",
  },

  fulfillment_rejected: {
    emoji: "❌",
    title: "An order couldn't be fulfilled",
    context: "orderID",
  },
};

export default function Actions() {
  const { data: events } = useEvents();
  const timestamp = Date.now();

  return (
    <section className="flow-root mt-5 -ml-1">
      <ul className="-mb-8">
        {(events || []).slice(0, 4).map((event, index) => {
          return (
            <li key={index}>
              <div className="relative pb-8 group ">
                {index < events?.length - 1 && (
                  <span
                    className={`absolute top-4 left-5  h-full bg-gray-300 -ml-1 w-0.5`}
                    aria-hidden="true"
                  ></span>
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={`h-8 w-8 rounded-full bg-white flex items-center justify-center ring-1 ring-gray-300 group-hover:ring-gray-700`}
                    >
                      {contexts[event?.type]?.emoji}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <h4 className="mb-2 text-sm font-normal text-black">
                        {event?.type === "loading" ? (
                          <div className="flex w-full animate-pulse">
                            <div className="h-5 min-w-full bg-gray-300 rounded ">
                              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              &nbsp; &nbsp; &nbsp; &nbsp;
                            </div>
                          </div>
                        ) : (
                          event?.message
                        )}
                      </h4>

                      <p className="mt-2 text-xs text-gray-500">
                        {event?.context?.[contexts[event?.type]?.context]}
                      </p>
                    </div>
                    <div className="text-sm text-right text-gray-500 whitespace-nowrap">
                      <time dateTime={event.date}>
                        {event?.date > 1 &&
                          new Intl.DateTimeFormat("en-US", {
                            month: "2-digit",
                            day: "numeric",
                            hour: "2-digit",
                          }).format(event.date ?? timestamp)}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
