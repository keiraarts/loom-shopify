import React, { Fragment, useState, useContext, useEffect } from "react";
import { useCountState, useCountDispatch } from "../../src/app-context";
import Loading from "../../components/loading";
import { Redirect } from "@shopify/app-bridge/actions";
import { Context } from "@shopify/app-bridge-react";
import { oembed } from "@loomhq/loom-embed";
import FadeIn from "react-fade-in";
import NProgress from "nprogress";
import set from "lodash/set";
import cn from "classnames";

import Recipes from "../../components/recipes";
import ThemePreview from "../../components/theme-preview";
import VideoAwait from "../../components/video-await";
import VideoReply from "../../components/video-reply";
import SetupReview from "../../components/setup-review";
import SetupNav from "../../components/setup-nav";
import Search from "../../components/search";

import useStorefront from "../../hooks/useStorefront";
import useCustomer from "../../hooks/useCustomer";
import useVideos from "../../hooks/useVideos";
import Footer from "../../components/footer";

const options = { weekday: "long", month: "short", day: "numeric" };
const views = ["unread", "completed", "favorited"];

function Index() {
  const state = useCountState();
  const dispatch = useCountDispatch();
  const { data: storefront, isLoading } = useStorefront();

  // Opens a new tab for users
  const app = useContext(Context);
  const redirectContext = (url) => {
    const redirect = Redirect.create(app);
    redirect.dispatch(Redirect.Action.REMOTE, {
      url: url,
      newContext: true,
    });
  };

  const { data } = useVideos();
  const [videos, setVideos] = useState([]);

  // Control tutorial steps
  const [step, setStep] = useState(0);

  const handleStep = () => setStep((v) => v + 1);

  useEffect(() => {
    // If merchant added the app but is waiting for a customer video
    if (storefront.is_compatible) setStep(4);
  }, [storefront.id]);

  // Allow search via email and page urls
  const [search, setSearch] = useState();

  // Keep 'tabs' on the selected tab.
  const [tab, setTab] = useState(views[0]);

  // Show friendly counts per tab category
  const [counts, setCounts] = useState({});

  // Placeholder data that represents Loom's SDK response
  const defaults = {
    id: false,
    title: "Welcome to our app",
    height: "720",
    width: "1080",
    sharedUrl: "https://www.loom.com/share/9a9bf950328043eaa1a7c05aba9b57c3",
    embedUrl: "https://www.loom.com/share/9a9bf950328043eaa1a7c05aba9b57c3",
    providerUrl: "https://www.loom.com",
    page_url: "Introduction video",
    email: "hey@honestycore.com",
    date_updated: Date.now(),
  };

  // Store the Loom SDK response
  const [loom, setLoom] = useState(defaults);
  const [videoHtml, setVideoHTML] = useState();

  useEffect(() => {
    if (data) {
      let items = [];
      views.map((view, index) => {
        // Required to detemine count for each tab
        const count = data.reduce((prev, current) => {
          const status = current?.status ?? views[0];
          // Only generate video list once
          if (index === 0 && status === tab) {
            // If there is no status, use the default
            items.push(current);
          }

          return prev + (status === view ? 1 : 0);
        }, 0);

        set(counts, view, count);
      });

      // Seearch tab videos
      if (search && search !== "") {
        items = items.filter(({ email = "", page_url = "" }) => {
          if ((email + page_url).includes(search)) return true;
        });
      }

      setCounts(counts);
      setVideos(items);
    }
  }, [isLoading, tab, search, state.key]);

  // Ping Shopify to load cached-customer data using the video's reply-to email
  const { data: customer, isLoading: isCustomer } = useCustomer(loom?.email);

  useEffect(() => {
    // Show loading bar when customer object is being fetched
    if (isCustomer) NProgress.start();
    const delay = setTimeout(() => NProgress.done());
    return () => clearTimeout(delay, 200);
  }, [isCustomer, customer.id]);

  useEffect(() => {
    // Generated new html when a video is selected
    if (loom.sharedUrl) EmbedVideo(loom);
  }, [loom.id]);

  // Create HTML to embed Loom's shared urls
  const EmbedVideo = async ({ sharedUrl }) => {
    if (sharedUrl) {
      try {
        const { html } = await oembed(sharedUrl);
        setVideoHTML(html);
      } catch (error) {}
    }
  };

  return (
    <React.Fragment>
      <Search search={search} setSearch={setSearch} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex flex-row-reverse flex-1 overflow-hidden">
          {/*  Blocks the UI rendering until the storefront data has loaded */}

          <section
            className={cn({
              "hidden": !isLoading,
              "flex flex-col justify-between flex-1 overflow-y-auto": isLoading,
            })}
          >
            <div className="flex items-center justify-center flex-1 h-full sm:-ml-3">
              <Loading />
            </div>
          </section>

          {/*  Blocks the UI rendering until the storefront data has loaded */}

          <main
            className={cn({
              "loading-storefront hidden": isLoading,
              "flex flex-col justify-between flex-1 overflow-y-auto": true,
            })}
          >
            {/*  Loads the onboarding setup flow */}

            {!storefront?.is_setup && (
              <React.Fragment>
                {!storefront?.is_compatible && (
                  <SetupNav
                    steps={[
                      { title: "View preview" },
                      { title: "Record a video" },
                      { title: "Send a reply" },
                    ]}
                    current={step}
                    onClick={setStep}
                  />
                )}
                {step === 0 && <ThemePreview onComplete={handleStep} />}
                {step === 1 && <VideoAwait onComplete={handleStep} />}
                {step === 2 && <VideoReply onComplete={handleStep} />}
                {step === 3 && <SetupReview />}
              </React.Fragment>
            )}

            {/*  Renders a list of videos without setup prompts */}
            {storefront?.is_compatible && storefront?.is_setup && (
              <div className="w-full h-full px-2 mx-auto sm:pt-2 max-w-7xl sm:px-2 lg:px-2">
                <div className="flex">
                  <h1 className="flex-1 hidden text-2xl font-bold text-gray-900 sr-only">
                    Videos
                  </h1>
                  <div className="ml-6 bg-gray-100 p-0.5 rounded-lg flex items-center sm:hidden">
                    <button
                      type="button"
                      className="p-1.5 rounded-md text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">Use list view</span>
                    </button>
                    <button
                      type="button"
                      className="ml-0.5 bg-white p-1.5 rounded-md shadow-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      <span className="sr-only">Use grid view</span>
                    </button>
                  </div>
                </div>

                <div className="mt-3 sm:mt-0">
                  <div className="sm:hidden">
                    <label for="tabs" className="sr-only">
                      Select a tab
                    </label>
                    <select
                      id="tabs"
                      name="tabs"
                      className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option selected>Recently Viewed</option>
                      <option>Recently Added</option>
                      <option>Favorited</option>
                    </select>
                  </div>
                  <div className="hidden sm:block">
                    <div className="flex items-center border-b border-gray-300">
                      <nav
                        className="flex flex-1 -mb-px space-x-6 xl:space-x-8"
                        aria-label="Tabs"
                      >
                        {views.map((view) => {
                          return (
                            <a
                              href="#"
                              aria-current={view}
                              onClick={() => setTab(view)}
                              className={cn({
                                "px-1 py-4 text-sm font-medium capitalize border-b-2  whitespace-nowrap": true,
                                "border-indigo-500 text-indigo-700":
                                  view === tab,
                                "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300":
                                  view !== tab,
                              })}
                            >
                              {view}
                              {counts[view] > 0 && (
                                <span className="bg-indigo-50 text-indigo-900 hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                                  {counts[view]}
                                </span>
                              )}
                            </a>
                          );
                        })}
                      </nav>
                      <div className="hidden ml-6 bg-gray-100 p-0.5 rounded-lg items-center sm:flex"></div>
                    </div>
                  </div>
                </div>

                {videos.length === 0 && (
                  <ThemePreview onComplete={() => setStep(1)} />
                )}

                {videos.length > 0 && (
                  <section
                    className="pb-16 mt-4"
                    aria-labelledby="gallery-heading"
                  >
                    <h2 id="gallery-heading" className="sr-only">
                      Recently viewed
                    </h2>
                    <div className="overflow-hidden bg-white sm:rounded-md ">
                      <FadeIn
                        role="list"
                        wrapperTag="ul"
                        className="divide-y divide-gray-200"
                      >
                        {videos.map((video, index) => {
                          const char = video.id.toUpperCase().charCodeAt(0);

                          return (
                            <li key={index}>
                              <a
                                href={"#" + video.id}
                                onClick={() => setLoom(video)}
                                className={cn({
                                  "bg-blue-100": loom.id === video.id,
                                  "bg-transparent hover:bg-blue-100":
                                    loom.id !== video.id,
                                  "block": true,
                                })}
                              >
                                <div className="flex items-center px-4 py-3 sm:px-6">
                                  <div className="flex items-center flex-1 min-w-0">
                                    <div className="flex-shrink-0">
                                      <span
                                        x-char={char}
                                        className={cn({
                                          "inline-flex items-center justify-center w-8 h-8 rounded-full": true,
                                          "bg-green-500": char < 10,
                                          "bg-green-600": char < 20,
                                          "bg-blue-500": char < 30,
                                          "bg-blue-600": char < 40,
                                          "bg-purple-500": char < 50,
                                          "bg-purple-600": char < 60,
                                          "bg-indigo-500": char < 70,
                                          "bg-indigo-600": char < 80,
                                        })}
                                      >
                                        <span className="font-medium leading-none text-white capitalize">
                                          {video.email.substring(0, 1)}
                                        </span>
                                      </span>
                                    </div>
                                    <div className="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
                                      <div>
                                        <p className="text-sm font-medium text-indigo-600 truncate">
                                          {video.email}
                                        </p>
                                        <p className="flex items-center mt-0.5 text-sm text-gray-500">
                                          <svg
                                            className="flex-shrink-0 w-3 h-3 mr-1 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              stroke-width="3"
                                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            ></path>
                                          </svg>
                                          <span className="">
                                            {video.page_url !== ""
                                              ? video.page_url
                                              : "Homepage"}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="hidden lg:block">
                                        <div>
                                          <p className="text-sm text-gray-900">
                                            Recorded on{" "}
                                            <time datetime={video.date_created}>
                                              {new Date(
                                                video.date_created
                                              ).toLocaleDateString(
                                                "en-US",
                                                options
                                              )}
                                            </time>
                                          </p>
                                          <p className="flex items-center mt-0.5 text-sm text-gray-500">
                                            <svg
                                              className={cn({
                                                "text-green-600":
                                                  video?.status === "completed",
                                                "flex-shrink-0 mr-1.5 h-4 w-4 ": true,
                                              })}
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 20 20"
                                              fill="currentColor"
                                              aria-hidden="true"
                                            >
                                              <path
                                                fill-rule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clip-rule="evenodd"
                                              />
                                            </svg>
                                            {video?.status === "completed"
                                              ? `Replied on ${new Date(
                                                  video.date_completed
                                                ).toLocaleDateString(
                                                  "en-US",
                                                  options
                                                )}  `
                                              : "Awaiting action"}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <svg
                                      className="w-5 h-5 text-gray-600"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </a>
                            </li>
                          );
                        })}
                      </FadeIn>
                    </div>
                  </section>
                )}
              </div>
            )}
            <Footer />
          </main>

          <aside
            key={loom.id}
            className="hidden p-6 border-r border-gray-200 bg-shopify-grey w-96 lg:w-1/3 xl:max-w-sm sm:block"
          >
            <div className="space-y-6">
              <div className="m-0">
                <div
                  className="-mx-4 -mt-5 bg-white rounded-md"
                  dangerouslySetInnerHTML={{ __html: videoHtml }}
                ></div>

                <Recipes perPage={3} />

                <div
                  className={cn({
                    "flex items-start justify-between mt-4": true,
                    "hidden": !loom.id,
                  })}
                >
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      <span className="sr-only">Details for </span>
                      {loom.title}
                    </h2>
                    <p className="text-sm font-medium text-gray-500">
                      {loom?.page_url !== "" ? loom.page_url : "Homepage"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const update = {
                        ...loom,
                        status:
                          loom?.status === "favorited" ? views[0] : "favorited",
                        date_updated: Date.now(),
                      };

                      dispatch({
                        type: "UPDATE_VIDEO",
                        video: update,
                      });

                      if (update.status === "favorited") setTab("favorited");
                      setLoom(update);
                    }}
                    className={cn({
                      "bg-pink-500 text-white": loom.status === "favorited",
                      "bg-white text-gray-700": loom.status !== "favorited",
                      "flex items-center justify-center w-9 h-9 ml-4 rounded-full hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500": true,
                    })}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>

                    <span className="sr-only">Favorite</span>
                  </button>
                </div>
              </div>

              <div className={cn({ hidden: !loom.id, flex: true })}>
                <button
                  type="button"
                  onClick={() => {
                    const update = {
                      ...loom,
                      status:
                        loom.status === "completed" ? views[0] : "completed",
                      date_updated: Date.now(),
                    };

                    if (loom.status !== "completed") {
                      set(update, "date_completed", Date.now());
                    }

                    dispatch({
                      type: "UPDATE_VIDEO",
                      video: update,
                    });

                    if (update.status === "completed") setTab("completed");
                    setLoom(update);
                  }}
                  className={cn({
                    "bg-gray-300 text-gray-800 cursor-default":
                      loom?.status === "completed",
                    "text-white bg-indigo-600 cursor-pointer hover:bg-indigo-700":
                      loom?.status !== "completed",
                    "flex flex-row items-center justify-center flex-1 px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500": true,
                  })}
                >
                  {loom?.status !== "completed" && (
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  )}

                  <span>Complete</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    dispatch({
                      type: "DELETE_VIDEO",
                      video: loom,
                    });

                    setLoom(defaults);
                  }}
                  className="flex-1 px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Delete
                </button>
              </div>

              <div className={cn({ hidden: loom.id === defaults.id })}>
                <h3 className="font-medium text-gray-900">Information</h3>
                <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                  <div className="flex justify-between py-3 text-sm font-medium">
                    <dt className="text-gray-500">Uploaded by</dt>
                    <dd className="text-gray-900 underline">
                      <a
                        onClick={() =>
                          redirectContext(
                            `https://${state.username}.myshopify.com/admin/customers?query=${loom.email}`
                          )
                        }
                        target="_blank"
                        className="cursor-pointer"
                      >
                        {loom.email}
                      </a>
                    </dd>
                  </div>

                  <div className="flex justify-between py-3 text-sm font-medium">
                    <dt className="text-gray-500">Created</dt>
                    <dd className="text-gray-900">
                      <time datetime={loom.date_created}>
                        {new Date(loom.date_created).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </time>
                    </dd>
                  </div>

                  <div className="flex justify-between py-3 text-sm font-medium">
                    <dt className="text-gray-500">Page</dt>
                    <dd className="text-gray-900">{loom.page_url}</dd>
                  </div>

                  <div className="flex justify-between py-3 text-sm font-medium">
                    <dt className="text-gray-500">Customer Name</dt>
                    <dd className="text-gray-900">{customer?.displayName}</dd>
                  </div>

                  <div className="flex justify-between py-3 text-sm font-medium">
                    <dt className="text-gray-500">Order Count</dt>
                    <dd className="text-gray-900">{customer?.ordersCount}</dd>
                  </div>

                  <div className="flex justify-between py-3 text-sm font-medium">
                    <dt className="text-gray-500">Accepts Marketing</dt>
                    <dd className="text-gray-900">
                      {customer?.acceptsMarketing ? "Yes" : "No"}
                    </dd>
                  </div>

                  <div className="flex justify-between py-3 text-sm font-medium">
                    <dt className="text-gray-500">Note</dt>
                    <dd className="text-gray-900 truncate">{customer?.note}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Index;
