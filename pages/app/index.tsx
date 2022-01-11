import React, { Fragment, useState, useContext, useEffect } from "react";
import { useCountState, useCountDispatch } from "../../src/app-context";
import Loading from "../../components/loading";
import { Redirect } from "@shopify/app-bridge/actions";
import { Context } from "@shopify/app-bridge-react";
import { oembed } from "@loomhq/loom-embed";
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

const options = { weekday: "long", month: "short", day: "numeric" } as const;
const views = ["unread", "completed", "favorited"];

function Index() {
  const state = useCountState();
  const dispatch = useCountDispatch();
  const {
    data: storefront,
    isLoading: isLoadingStorefront,
    mutate,
  } = useStorefront();

  // Opens a new tab for users
  const app = useContext(Context);
  const redirectContext = (url) => {
    const redirect = Redirect.create(app);
    redirect.dispatch(Redirect.Action.REMOTE, {
      url: url,
      newContext: true,
    });
  };

  const { data, isLoading: isLoadingVideo } = useVideos();
  const [videos, setVideos] = useState([]);

  // Join both states to prevent content from showing
  const isLoading = isLoadingVideo && isLoadingStorefront;

  // Control tutorial steps
  const [step, setStep] = useState(0);
  const handleStep = () => setStep((v) => v + 1);

  useEffect(() => {
    // If merchant added the app but is waiting for a customer video
    if (videos.length === 0 && storefront.is_compatible) setStep(1);
    if (videos.length === 0 && storefront.is_setup) setStep(4);
  }, [storefront.id, isLoadingVideo]);

  // Allow search via email and page urls
  const [search, setSearch] = useState<string>("");

  // Keep 'tabs' on the selected tab.
  const [tab, setTab] = useState(views[0]);

  // Show friendly counts per tab category
  const [counts, setCounts] = useState({});

  // Placeholder data that represents Loom's SDK response
  const defaults = {
    id: "",
    title: "Welcome to our app",
    height: "720",
    width: "1080",
    status: "unread",
    sharedUrl: "https://www.loom.com/share/9a9bf950328043eaa1a7c05aba9b57c3",
    embedUrl: "https://www.loom.com/share/9a9bf950328043eaa1a7c05aba9b57c3",
    providerUrl: "https://www.loom.com",
    page_url: "Introduction video",
    email: "hey@honestycore.com",
    date_updated: Date.now(),
    date_created: Date.now(),
  };

  // Store the Loom SDK response
  const [loom, setLoom] = useState(defaults);
  const [videoHtml, setVideoHTML] = useState<string>("");

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
  }, [isLoading, tab, search, state.key, JSON.stringify(data)]);

  // Ping Shopify to load cached-customer data using the video's reply-to email
  const { data: customer, isLoading: hasCustomer } = useCustomer(loom?.email);

  useEffect(() => {
    // Show loading bar when customer object is being fetched
    if (hasCustomer) NProgress.start();
    const delay = setTimeout(() => NProgress.done());
    return () => clearTimeout(delay);
  }, [hasCustomer, customer.id]);

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

          <main
            className={cn({
              "flex": !isLoading,
              "loading-storefront hidden": isLoading,
              "flex-col justify-between flex-1 overflow-y-auto": true,
            })}
          >
            {(!storefront?.is_setup || storefront?.await_feedback) && (
              <>
                <SetupNav
                  steps={[
                    { title: "View preview" },
                    { title: "Record a video" },
                    { title: "Send a reply" },
                  ]}
                  current={step}
                  onClick={setStep}
                />

                {step === 0 && <ThemePreview onComplete={handleStep} />}
                {step === 1 && <VideoAwait onComplete={handleStep} />}
                {step === 2 && <VideoReply onComplete={handleStep} />}
                {step === 3 && <SetupReview />}
              </>
            )}

            {/*  Renders a list of videos without setup prompts */}
            {storefront?.is_setup && (
              <div className="w-full h-full px-2 mx-auto sm:pt-2 max-w-7xl sm:px-2 lg:px-2">
                <div className="flex">
                  <h1 className="flex-1 hidden text-2xl font-bold text-gray-900 sr-only">
                    Videos
                  </h1>
                </div>

                <div className="mt-3 sm:mt-0">
                  <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                      Select a tab
                    </label>
                    <select
                      id="tabs"
                      name="tabs"
                      value={tab}
                      onChange={(e) => setTab(e.target.value)}
                      className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      {views.map((view) => {
                        function capitalize(s) {
                          return s[0].toUpperCase() + s.slice(1);
                        }

                        return (
                          <option
                            className="capitalize"
                            key={view}
                            value={view}
                          >
                            {capitalize(view)}
                          </option>
                        );
                      })}
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
                            <span
                              onClick={() => setTab(view)}
                              className={cn({
                                "px-1 py-4 text-sm font-medium cursor-pointer capitalize border-b-4 whitespace-nowrap": true,
                                "border-indigo-500 text-indigo-700":
                                  view === tab,
                                "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300":
                                  view !== tab,
                              })}
                            >
                              {view}

                              <span
                                className={cn({
                                  "bg-indigo-100 text-black":
                                    counts?.[view] === 0,
                                  "bg-indigo-600 text-white":
                                    counts?.[view] > 0,
                                  "hidden ml-2 py-0.5 px-2 rounded-full text-xs font-medium md:inline-block": true,
                                })}
                              >
                                {counts?.[view] ?? 0}
                              </span>
                            </span>
                          );
                        })}
                      </nav>
                      <div className="hidden ml-6 bg-gray-100 p-0.5 rounded-lg items-center sm:flex"></div>
                    </div>
                  </div>
                </div>

                {videos.length === 0 && (
                  <ThemePreview
                    quote={
                      search.length
                        ? "We couldn't find any videos"
                        : "You don't have any more videos to watch. Embed our app to any page on your shop to collect new inbound questions!"
                    }
                    onComplete={() => {
                      // Force user interface to show the tutorial temporarily
                      mutate({ is_setup: false }, false);
                      setStep(1);
                    }}
                  />
                )}

                {videos.length > 0 && (
                  <section
                    className="pb-16 mt-4"
                    aria-labelledby="gallery-heading"
                  >
                    <h2 id="gallery-heading" className="sr-only">
                      Recently viewed
                    </h2>
                    <div className="overflow-hidden sm:rounded-md ">
                      <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto">
                          <div className="inline-block min-w-full py-2 align-middle">
                            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="-mt-6 border-b-2 border-gray-200">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                    >
                                      Email
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                    >
                                      Page
                                    </th>

                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase whitespace-nowrap"
                                    >
                                      Recorded on
                                    </th>
                                    <th
                                      scope="col"
                                      className="relative px-6 py-3"
                                    >
                                      <span className="sr-only">Edit</span>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="px-2 bg-white divide-y divide-gray-200">
                                  {videos.map((video, index) => {
                                    return (
                                      <tr
                                        key={video.sk}
                                        onClick={() => setLoom(video)}
                                        className={cn({
                                          "bg-gray-200": loom.id === video.id,
                                          "bg-transparent hover:bg-gray-200":
                                            loom.id !== video.id,
                                          "bg-white w-full -px-10": true,
                                        })}
                                      >
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                          {video.email}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                          {video.page_url !== ""
                                            ? video.page_url
                                            : "/"}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                          <time dateTime={video.date_created}>
                                            {new Date(
                                              video.date_created
                                            ).toLocaleDateString(
                                              "en-US",
                                              options
                                            )}
                                          </time>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                          <a
                                            href={"#reply-" + video.id}
                                            className="text-indigo-600 hover:text-indigo-900"
                                            onClick={() => {
                                              dispatch({
                                                type: "SET_MODAL_VIEW",
                                                view: "reply",
                                                loom: video,
                                              });
                                            }}
                                          >
                                            Reply
                                          </a>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            )}
            <Footer />
          </main>

          <aside
            key={loom.id}
            className={cn({
              "hidden p-6 border-r border-gray-200 bg-shopify-grey w-96 lg:w-1/3 xl:max-w-sm sm:block": true,
              "bg-white sm:bg-white": loom.id,
            })}
          >
            <div className="space-y-6">
              <div className="m-0">
                <div
                  className="-mx-4 -mt-5 bg-gray-400 rounded-lg"
                  dangerouslySetInnerHTML={{ __html: videoHtml }}
                ></div>

                <div className="absolute bg-gray-200 aspect-h-9 aspect-w-12"></div>

                {!loom.id && <Recipes perPage={3} />}

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
                  <span>Complete</span>

                  {loom?.status !== "completed" && (
                    <svg
                      className="w-5 h-5 ml-1"
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
                      <time dateTime={loom.date_created?.toString()}>
                        {new Date(loom.date_created).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </time>
                    </dd>
                  </div>

                  <div className="flex justify-between py-3 text-sm font-medium">
                    <dt className="text-gray-500">Page</dt>
                    <dd className="text-gray-900">{loom?.page_url ?? "/"}</dd>
                  </div>

                  <div className="flex justify-between py-3 text-sm font-medium">
                    <dt className="text-gray-500">Customer Name</dt>
                    <dd className="text-gray-900">
                      {customer?.displayName ?? loom.email?.split("@")?.[0]}
                    </dd>
                  </div>

                  <div className="flex justify-between py-3 text-sm font-medium">
                    <dt className="text-gray-500">Order Count</dt>
                    <dd className="text-gray-900">
                      {customer?.ordersCount ?? "Unknown"}
                    </dd>
                  </div>

                  <div className="flex justify-between py-3 text-sm font-medium">
                    <dt className="text-gray-500">Accepts Marketing</dt>
                    <dd className="text-gray-900">
                      {customer?.acceptsMarketing ? "Yes" : "No"}
                    </dd>
                  </div>

                  <div className="flex justify-between py-3 text-sm font-medium">
                    <dt className="text-gray-500">Note</dt>
                    <dd className="text-gray-900 truncate">
                      {customer?.note ?? "No notes"}
                    </dd>
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
