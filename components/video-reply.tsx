import React, { useCallback, useState, useRef } from "react";
import { useCountState, useCountDispatch } from "../src/app-context";
import { CreateInstance } from "../src/axios";

import FadeIn from "react-fade-in";
import EmptyState from "./empty-state";
import useStorefront from "../hooks/useStorefront";

interface EmailSubmission {
  customer_email: string;
  body: string;
  alias: string;
}

interface LoomSubmission {
  onComplete(arg: { body?: string; alias?: string }): void;
}

export default function VideoReply(props: LoomSubmission) {
  const btnRef = useRef<HTMLButtonElement>();
  const state = useCountState();
  const dispatch = useCountDispatch();
  const { data: storefront, mutate } = useStorefront();
  const instance = CreateInstance(state as any);

  const [body, setBody] = useState("This is a test that messaging works!");
  const [alias, setAlias] = useState(storefront?.account?.alias as string);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await handleSend();
    await completeSetup();
    props.onComplete({ body, alias });
  };

  const handleSend = useCallback(async () => {
    // Prevent multiple sends under the same email address
    const input: EmailSubmission = {
      customer_email: storefront.email,
      body,
      alias,
    };

    btnRef.current.innerHTML = "Sending..";

    await instance
      .post(`/${storefront.username}/storefront/videos/reply`, input)
      .then(() => (btnRef.current.innerHTML = "Email sent!"))
      .catch((err) => console.error(err));
  }, [body, alias]);

  const completeSetup = () => {
    if (!storefront.is_setup) {
      instance
        // Optimisically update UI that the account is setup to accept videos
        .put(`/${storefront.username}/storefront`, { is_setup: true })
        .then(() =>
          // Finalize the setup to avoid showing the onboarding workflow
          // Temporarily prompt the review interface to collect feedback
          mutate({ ...storefront, is_setup: true }, false)
        )
        .catch((err) => console.error(err));
    }
  };

  return (
    <FadeIn className="flex items-center justify-center flex-1 h-full">
      <EmptyState
        src="/logos/primary-logo-icon.png"
        quote="You can reply back to new videos from our app and get notified if your response resulted in a new order. Try it out by sending yourself a test message."
        footer={
          <React.Fragment>
            <form className="mt-5" action="#" onSubmit={handleSubmit}>
              <div>
                <div className="mt-2">
                  <div
                    id="tabs-1-panel-1"
                    className="p-0.5 -m-0.5 rounded-lg"
                    aria-labelledby="tabs-1-tab-1"
                    role="tabpanel"
                  >
                    <label
                      htmlFor="name"
                      className="block mb-1 text-xs font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <div>
                      <textarea
                        rows={4}
                        required
                        name="comment"
                        id="comment"
                        value={body}
                        onChange={(event) => setBody(event.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Thanks for sending us a video message! I listed to your question and yes -- our products are cruelty-free! I recommend trying the 'Rose' lipstick if you prefer Autumn color palettes. :) "
                      ></textarea>
                    </div>
                  </div>
                  <div
                    id="tabs-1-panel-2"
                    className="p-0.5 -m-0.5 rounded-lg"
                    aria-labelledby="tabs-1-tab-2"
                    role="tabpanel"
                  ></div>
                </div>
              </div>

              <div className="mt-2 -space-y-px bg-white rounded-md shadow-sm isolate">
                <div className="relative px-3 py-2 border border-gray-300 rounded-md rounded-b-none focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium text-gray-700"
                  >
                    Initials
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={alias as any}
                    onChange={(event) => setAlias(event.target.value)}
                    className="flex-1 block w-full p-0 text-gray-900 placeholder-gray-500 border-0 focus:ring-0 sm:text-sm"
                    placeholder="Jane Doe, Support Engineer"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  ref={btnRef}
                  type="submit"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send message
                </button>
                <button
                  onClick={() => {
                    completeSetup();
                    props.onComplete({ body, alias });
                  }}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-gray-300 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Skip
                </button>
              </div>
            </form>
          </React.Fragment>
        }
      />
    </FadeIn>
  );
}
