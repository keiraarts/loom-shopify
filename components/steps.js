import React, { useEffect, useState } from "react";
import { isShopifyMobile } from "@shopify/app-bridge-utils";
import InstallSelection from "../components/install-selection";
import ScanPostage from "../components/scan-postage";
import ScanProducts from "../components/scan-products";
import Toast from "../components/toast";
import cn from "classnames";

export default function Steps() {
  const [selected, setSelected] = useState();
  const handeSelect = (id) => isShopifyMobile && setSelected(id);
  const [completed, setCompleted] = useState([]);

  // raw
  const [tracking, setTracking] = useState();
  const [image, setImage] = useState();

  const handleFile = (file) => {
    const newUrl = URL.createObjectURL(file);
    setCompleted(completed.concat(["photograph", "completed"]));
    Toast({ message: `Successful snap` });
    setSelected("completed");
    setImage(newUrl);
  };

  useEffect(() => {
    // Auto-complete step 1
    if (isShopifyMobile()) {
      setCompleted(["download"]);
      setSelected("scan");
    }
  }, []);

  const steps = [
    {
      id: "download",
      title: "Open Shopify's app",
      byline: "You'll take photos through their app.",
    },
    {
      id: "scan",
      title: "Scan your order's barcode",
      byline: "Works with any shipping carrier.",
    },
    {
      id: "photograph",
      title: "Take a photo of your items",
      byline: "Make sure the customer's purchase is visible.",
    },
    {
      id: "completed",
      title: "You're done!",
      byline: "Taking those two photos is the entire setup! ",
    },
  ];

  return (
    <div className="py-0">
      <nav className="mx-auto max-w-7xl" aria-label="Progress">
        <ol className="overflow-hidden rounded-md ">
          {steps.map((el, index) => {
            return (
              <li
                className={cn({
                  "relative overflow-hidden lg:flex-1 pt-2 cursor-pointer": true,
                  "opacity-50": selected && selected !== el.id,
                })}
                id={index}
                key={el.id}
                onClick={() => handeSelect(el.id)}
              >
                <div className="overflow-hidden border border-b-0 border-gray-200 rounded-t-md ">
                  <a className="group">
                    <span
                      className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-gray-200 "
                      aria-hidden="true"
                    ></span>
                    <span className="flex items-start px-6 py-4 text-sm font-medium">
                      <span className="flex-shrink-0">
                        {completed.includes(el.id) ? (
                          <span className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-full">
                            <svg
                              className="w-6 h-6 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        ) : (
                          <span className="flex-shrink-0">
                            <span className="flex items-center justify-center w-10 h-10 border-2 border-gray-500 rounded-full">
                              <span className="text-black">{index + 1}</span>
                            </span>
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 ml-4 min-w-0 flex flex-col">
                        <span className="text-sm font-semibold tracking-wide uppercase">
                          {el.title}
                        </span>
                        <span className="mt-1 text-xs font-medium text-gray-500">
                          {el.byline}
                        </span>
                      </span>
                    </span>

                    <div className="p-3 px-7 sm:px-7 list-content">
                      {selected === el.id &&
                        selected === "download" &&
                        !completed.includes("download") && <InstallSelection />}

                      {selected === el.id && selected === "scan" && (
                        <div
                          className="flex-col inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg sm:my-3 sm:align-middle sm:w-full"
                          role="dialog"
                          aria-modal="true"
                          aria-labelledby="modal-headline"
                        >
                          <div className="sm:flex sm:items-start sm:flex-1">
                            <div className="mt-1 text-left sm:mt-0 sm:ml-4">
                              <div className="">
                                <p className="text-sm text-gray-800">
                                  Next time you ship a customer order, scan the
                                  barcode on the outgoing shipping label with
                                  your phone.
                                </p>
                              </div>
                            </div>
                          </div>

                          <ScanPostage
                            handlePostage={(el) => {
                              Toast({ message: `Successful scan` });
                              setCompleted(completed.concat("scan"));
                              setSelected("photograph");
                              setTracking(el);
                            }}
                          />
                        </div>
                      )}

                      {selected === el.id && selected === "photograph" && (
                        <div
                          className="flex-col inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg sm:my-3 sm:align-middle sm:w-full"
                          role="dialog"
                          aria-modal="true"
                          aria-labelledby="modal-headline"
                        >
                          <div className="sm:flex sm:items-start sm:flex-1">
                            <div className="mt-1 text-left sm:mt-0 sm:ml-4">
                              <div className="">
                                <p className="text-sm text-gray-800">
                                  Take a photo of the items you're shipping to
                                  the customer. Make sure that the items you
                                  photograph match the customer's order.
                                </p>
                              </div>
                            </div>
                          </div>

                          <ScanProducts handleFile={handleFile} />
                        </div>
                      )}

                      {selected === el.id && selected === "completed" && (
                        <div
                          className="flex-col inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg sm:my-3 sm:align-middle sm:w-full"
                          role="dialog"
                          aria-modal="true"
                          aria-labelledby="modal-headline"
                        >
                          <div className="mb-4 text-4xl sm:ml-4">🎉</div>
                          <div className="sm:flex sm:items-start sm:flex-1">
                            <div className="gap-4 mt-0 text-left sm:mt-0 sm:ml-4">
                              <p className="block mt-4 text-sm text-gray-800">
                                That was easy right? You can repeat this process
                                for any order you want to insure.
                              </p>
                              <p className="block mt-4 text-sm text-gray-800">
                                Keeping a visual history of your shipments can
                                also help you resolve support tickets. For
                                instance, if a customer says they got the wrong
                                product variant then you'll have photos of the
                                original shipment without needing to ask for
                                customer photos.
                              </p>
                              <p className="block mt-4 text-sm text-gray-800">
                                If this order gets disputed we'll help you win
                                it too. Chargebacks can take months to resolve,
                                but we'll pay you 35% of the order's value
                                upfront so you can keep your business going.
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="inline-flex justify-center w-full px-4 py-2 mt-5 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm 8 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            Finish Setup
                          </button>
                        </div>
                      )}
                    </div>
                  </a>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
