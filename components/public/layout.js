import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import {
  AnnotationIcon,
  ChatAlt2Icon,
  InboxIcon,
  MenuIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }) {
  const internalLink = (id) => {
    const element = document.getElementById(id);

    window.scrollTo({
      top: element?.current?.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div className="h-full min-h-screen text-black bg-gradient-to-b bg-gradient via-white from-brand-beige to-white">
      <main className="h-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {children}
      </main>

      <footer
        className="mt-16 bg-tran-yellow text-tran-dark bg-brand-paper"
        aria-labelledby="footerHeading"
      >
        <div class="bg-shopify-green">
          <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between flex-wrap">
              <div class="w-0 flex-1 flex items-center">
                <img
                  className="absolute -mt-5 transform -translate-y-full w-14 h-14"
                  src="/assets/icons/new.svg"
                ></img>
                <p class="font-medium text-white truncate">
                  We're a winner of Loom's Hackathon. Explore how Loom.com &
                  HonestyCore.com work togeather!
                </p>
              </div>
              <div class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                <a
                  href="#"
                  class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-indigo-50"
                >
                  Download app
                </a>
              </div>
            </div>
          </div>
        </div>
        <h2 id="footerHeading" className="sr-only">
          Footer
        </h2>

        <div className="container h-full p-5 px-3 pt-10 mx-auto max-w-7xl sm:px-6 lg:px-6 ">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <img className="h-20" src="/brand/wordmark.svg"></img>
              <p className="text-base ">
                It can be hard to understand complex questions over email. With
                our app, you can give customers an easy way to record questions
                with a video!
                <br />
                <a href="/shopify-app-store/" className="underline">
                  Add our app to your store →
                </a>
                .
              </p>
              <div className="flex space-x-6">
                <a
                  href="https://twitter.com/keiraarts"
                  className="flex items-center"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="w-5 h-5 mr-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                  Tweet the developer
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-12 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div></div>
                <div className="mt-12 md:mt-0"></div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold tracking-wider uppercase">
                    About
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a
                        href="https://loom.com"
                        className="text-base hover:text-gray-900"
                      >
                        Loom SDK
                      </a>
                    </li>

                    <li>
                      <a
                        href="https://viaglamour.com"
                        className="text-base hover:text-gray-900"
                      >
                        viaGlamour
                      </a>
                    </li>

                    <li>
                      <a href="/" className="text-base hover:text-gray-900">
                        Example
                      </a>
                    </li>

                    <li>
                      <a
                        href="/changelog/"
                        className="text-base hover:text-gray-900"
                      >
                        Changelog
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold tracking-wider uppercase">
                    Usage Examples
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a
                        href="/customers/churches/"
                        className="text-base hover:text-gray-900"
                      >
                        For beauty shops
                      </a>
                    </li>

                    <li>
                      <a
                        href="/customers/top-fitness-podcast/"
                        className="text-base hover:text-gray-900"
                      >
                        For D2C brands
                      </a>
                    </li>

                    <li>
                      <a
                        href="/customers/ali/"
                        className="text-base hover:text-gray-900"
                      >
                        For service businesses
                      </a>
                    </li>

                    <li>
                      <a
                        href="/customers/education/"
                        className="text-base hover:text-gray-900"
                      >
                        For clothing brands
                      </a>
                    </li>

                    <li>
                      <a
                        href="/customers/veteranaffairs/"
                        className="text-base hover:text-gray-900"
                      >
                        For Weh3 communities
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 mt-12 border-t border-black">
            <p className="text-base xl:text-center">
              © 2021 viaGlamour Ltd. All rights reserved.
              <br />
              <a href="/privacy/" className="text-base hover:text-gray-900">
                Privacy
              </a>{" "}
              <a href="/terms/" className="text-base hover:text-gray-900">
                Terms
              </a>{" "}
            </p>
          </div>
        </div>

        <div className="w-full h-1 bg-black"></div>
      </footer>
    </div>
  );
}
