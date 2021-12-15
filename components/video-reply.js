import React, { useCallback, useState, useContext, useEffect } from "react";
import { useCountState } from "../src/app-context";
import { CreateInstance } from "../src/axios";
import { oembed } from "@loomhq/loom-embed";

import FadeIn from "react-fade-in";
import EmptyState from "../components/empty-state";
import useStorefront from "../hooks/useStorefront";

export default function VideoReply({ onComplete = () => {} }) {
  const state = useCountState();
  const { data: storefront } = useStorefront();
  const instance = CreateInstance(state);
  const [body, setBody] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    onComplete();
    handleSend();
  };

  const handleSend = useCallback(async () => {
    // Prevent multiple sends under the same email address
    const input = { customer_email: storefront.email, body };

    await instance
      .post(`/${storefront.username}/storefront/videos/reply`, input)
      .then((res) => Toast({ message: "Message sent", success: true }))
      .catch((err) => console.error(err));

    await instance
      .put(`/${storefront.username}/storefront`, { compatible: Date.now() })
      .catch((err) => console.error(err));
  }, [storefront?.email, body]);

  return (
    <FadeIn className="flex items-center justify-center flex-1 h-full">
      <EmptyState
        src="/logos/primary-logo-icon.png"
        quote="You can reply back to new videos from our app and get notified if your response resulted in a new order. Try it out by sending yourself a test message."
        footer={
          <React.Fragment>
            <form className="mt-5" action="#" onSubmit={handleSubmit}>
              <div>
                <div
                  className="flex items-center"
                  aria-orientation="horizontal"
                  role="tablist"
                >
                  <button
                    id="tabs-1-tab-1"
                    className="text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md"
                    aria-controls="tabs-1-panel-1"
                    role="tab"
                    type="button"
                  >
                    To: (yourself) {storefront.email}
                  </button>
                </div>
                <div className="mt-2">
                  <div
                    id="tabs-1-panel-1"
                    className="p-0.5 -m-0.5 rounded-lg"
                    aria-labelledby="tabs-1-tab-1"
                    role="tabpanel"
                    tabindex="0"
                  >
                    <label for="comment" className="sr-only">
                      Comment
                    </label>
                    <div>
                      <textarea
                        rows="6"
                        required
                        name="comment"
                        id="comment"
                        value={body}
                        onChange={(event) => setBody(event.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        placeholder="Thanks for sending us a video message! I listed to your question and yes -- our products are cruelty-free! I recommend trying the 'Rose' lipstick if you prefer Autumn color palettes. Click here to checkout with free shipping. :) "
                      ></textarea>
                    </div>
                  </div>
                  <div
                    id="tabs-1-panel-2"
                    className="p-0.5 -m-0.5 rounded-lg"
                    aria-labelledby="tabs-1-tab-2"
                    role="tabpanel"
                    tabindex="0"
                  ></div>
                </div>
              </div>
              <div className="flex justify-end gap-5 mt-2">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Send message
                </button>
                <div
                  onClick={onComplete}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-gray-300 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Skip
                </div>
              </div>
            </form>
          </React.Fragment>
        }
      />
    </FadeIn>
  );
}
