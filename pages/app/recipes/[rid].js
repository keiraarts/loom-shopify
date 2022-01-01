import React, { Fragment, useState, useContext, useEffect } from "react";
import { useCountState, useCountDispatch } from "../../../src/app-context";
import { Redirect } from "@shopify/app-bridge/actions";
import { Context } from "@shopify/app-bridge-react";
import { oembed } from "@loomhq/loom-embed";
import NProgress from "nprogress";
import set from "lodash/set";
import cn from "classnames";

import Recipes from "../../../components/recipes";
import Search from "../../../components/search";

import useStorefront from "../../../hooks/useStorefront";
import useCustomer from "../../../hooks/useCustomer";
import useVideos from "../../../hooks/useVideos";
import Footer from "../../../components/footer";

import IntegrationLayout from "../../../components/integration-layout";
const views = ["unread", "completed", "favorited"];

function Index() {
  const state = useCountState();
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

  // Control tutorial steps
  const [step, setStep] = useState(0);

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
          <main className="flex flex-col justify-between flex-1 overflow-y-auto">
            <IntegrationLayout />
            <Footer />
          </main>

          <aside className="hidden p-6 border-r border-gray-200 bg-shopify-grey w-96 lg:w-1/3 xl:max-w-sm sm:block">
            <div className="space-y-6">
              <div className="m-0">
                <Recipes perPage={10} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Index;
