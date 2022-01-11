import React, { useContext, useState, useCallback } from "react";
import { setupModalAutoSizing } from "@shopify/app-bridge-utils";
import { Context } from "@shopify/app-bridge-react";
import useStorefront from "../../hooks/useStorefront";
import { Modal } from "@shopify/app-bridge/actions";
import { CreateInstance } from "../../src/axios";
import Support from "../../components/support";
import cn from "classnames";

export default function SupportPage({ isEmbedded }) {
  if (!isEmbedded) return <>Embedded app not loading..</>;

  const buttonRef = React.useRef(null);
  const app = useContext(Context);
  const [state, setState] = useState<any | null>();
  setupModalAutoSizing(app);

  app.subscribe(Modal.Action.DATA, (action) => {
    if (action?.loom?.email) setState(action);
  });

  const { data: storefront, loading } = useStorefront();
  const [message, setMessage] = useState<string | null>();
  const [sent, setSent] = useState<boolean>(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSend(state);
  };

  const handleSend = useCallback(
    (state) => {
      // Prevent multiple sends under the same email address
      if (!state.session_token) return;
      const instance = CreateInstance(state);

      const input = {
        body: message,
        loom_email: state.loom.email,
      };

      instance
        .post(`/${storefront.username}/storefront/videos/reply`, input)
        .then((res) => setSent(true))
        .catch((err) => setSent(false));
    },
    [sent, message, state?.loom?.email]
  );

  return (
    <div id="reply-form" className="overflow-hidden bg-white">
      <div className="relative mx-auto">
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="grid w-full grid-cols-1 px-5 py-3 mx-auto sm:px-6 lg:px-8 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    required
                    id="message"
                    name="message"
                    value={message}
                    rows={8}
                    placeholder="Hey! We can totally ship out your products with a different packaging so you can use it as a gift. I looked over your video and everything should fit into one box. Click here to finish your purchase! - Keira"
                    onChange={(event) => setMessage(event.target.value)}
                    className="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-4 mx-auto text-right bg-gray-100 sm:px-6">
              <span
                className={cn({
                  "text-left": true,
                  "invisible": !state?.loom?.email,
                })}
              >
                <Support
                  email={"To " + state?.loom?.email ?? "..."}
                  metadata={storefront.email}
                />
              </span>
              <button
                type="submit"
                value="Submit"
                ref={buttonRef}
                className={cn({
                  "sm:bg-gray-800 hover:bg-gray-800 whitespace-nowrap": sent,
                  "inline-flex justify-center px-5 py-2 text-sm font-medium text-white bg-green-700 border border-transparent rounded-md shadow-sm hover:bg-green-800 0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500": true,
                })}
              >
                {sent ? "Message sent!" : "Reply back"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
