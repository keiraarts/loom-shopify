import React, { useContext, useState, useCallback, useEffect } from "react";
import { setupModalAutoSizing } from "@shopify/app-bridge-utils";
import { Context } from "@shopify/app-bridge-react";
import { useCountState } from "../../src/app-context";
import useStorefront from "../../hooks/useStorefront";
import { Modal } from "@shopify/app-bridge/actions";
import { CreateInstance } from "../../src/axios";
import Support from "../../components/support";

export default function SupportPage({ isEmbedded }) {
  if (!isEmbedded) return <></>;

  const buttonRef = React.useRef(null);
  const app = useContext(Context);
  setupModalAutoSizing(app);

  const state = useCountState();
  const instance = CreateInstance(state);
  const { data: storefront } = useStorefront();

  const [message, setMessage] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setEmail(storefront?.email);
    setPhone(storefront?.account?.phone);
    setName(storefront?.account?.first_name);
  }, [storefront?.email]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSend();
  };

  const handleSend = useCallback(() => {
    // Prevent multiple sends under the same email address
    const input = { email, name, phone, message };

    instance
      .post(`/${storefront?.username}/storefront/contact`, input)
      .then((res) => setSent(true))
      .catch((err) => setSent(false));

    app.dispatch(Modal.data({ sent: !sent }));
  }, [email, phone, name, message]);

  return (
    <div id="contact-form" className="overflow-hidden bg-white ">
      <div className="relative mx-auto">
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="grid w-full grid-cols-1 px-5 py-3 mx-auto sm:px-6 lg:px-8 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    required
                    id="name"
                    name="name"
                    type="text"
                    autocomplete="true"
                    placeholder="Ashley"
                    className="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reply-to Email
                </label>
                <div className="mt-1">
                  <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="true"
                    placeholder="ashley@magicsoaps.ca"
                    className="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    required
                    id="phone"
                    name="phone"
                    type="text"
                    autocomplete="true"
                    placeholder="+1 866 217-1477"
                    className="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
              </div>

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
                    rows="5"
                    value={message}
                    placeholder="Hello Kyouko from MagicSoaps! I want to upload my logos onto the packaging, what size should my Canva file be? Many thanks!"
                    onChange={(event) => setMessage(event.target.value)}
                    className="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-4 mx-auto text-right bg-gray-100 sm:px-6">
              <span className="text-left">
                <Support />
              </span>
              <button
                type="submit"
                value="Submit"
                ref={buttonRef}
                className="inline-flex justify-center px-5 py-2 text-sm font-medium text-white bg-green-700 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
