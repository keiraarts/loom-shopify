import React, { useContext, useState, useCallback, useEffect } from "react";
import { useCountState, useCountDispatch } from "../src/app-context";
import useStorefront from "../hooks/useStorefront";
import { useTranslation } from "react-i18next";
import { CreateInstance } from "../src/axios";
import Support from "./support";
import cn from "classnames";
import Toast from "./toast";

export default function SupportForm(props) {
  const { isEmbedded } = props;
  const { t } = useTranslation();
  const buttonRef = React.useRef(null);

  const state = useCountState();
  const instance = CreateInstance(state);
  const { data: storefront } = useStorefront();

  const [message, setMessage] = useState();
  const [tracking, setTracking] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSend();
  };

  useEffect(() => {
    setEmail(storefront?.email);
    setPhone(storefront?.phone);
  }, [storefront?.email]);

  const handleSend = useCallback(() => {
    // Prevent multiple sends under the same email address
    const input = { email, name, phone, message, tracking };
    Toast({ message: "Message sent", success: true });
    Toast({ message: `Check ${email} for a confirmation` });

    instance
      .post(`/${storefront?.username}/storefront/contact`, input)
      .then((res) => setSent(true))
      .catch((err) => setSent(false));
  }, [email, phone, name, message]);

  return (
    <div id="contact-form">
      <div className="relative max-w-2xl pt-5 mx-auto">
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="grid w-full grid-cols-1 px-5 py-3 mx-auto sm:px-6 lg:px-8 gap-y-4 sm:grid-cols-2 sm:gap-x-8">
              <div className="col-span-2 sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("forms.first_name")}
                </label>
                <div className="mt-1">
                  <input
                    required
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="true"
                    placeholder="Ashley"
                    className="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={name}
                    defaultValue={storefront?.account?.first_name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("forms.email_address")}
                </label>
                <div className="mt-1">
                  <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="true"
                    placeholder="ashley@magicsoaps.ca"
                    className="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={email}
                    defaultValue={storefront?.email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("forms.phone")}
                </label>
                <div className="mt-1">
                  <input
                    required
                    id="phone"
                    name="phone"
                    type="text"
                    autoComplete="true"
                    placeholder="+1 866 217-1477"
                    className="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={phone}
                    defaultValue={storefront?.account?.phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                  <p className="py-2 text-sm bg-gray-100">
                    {t("forms.phone_context")}
                  </p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("forms.tracking_number")}
                </label>
                <div className="mt-1">
                  <input
                    id="text"
                    name="text"
                    type="text"
                    autoComplete="true"
                    placeholder="EZ4000000004"
                    className="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={tracking}
                    onChange={(e) =>
                      setTracking(e.target.value.replace(/ /g, ""))
                    }
                  />
                  <p className="py-2 text-sm bg-gray-100">
                    {t("forms.tracking_number_context")}
                  </p>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("forms.message")}
                </label>
                <div className="mt-1">
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows="6"
                    value={message}
                    placeholder={t("quotes.support")}
                    onChange={(event) => setMessage(event.target.value)}
                    className="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  ></textarea>
                </div>
              </div>
            </div>
            <div
              className={cn({
                "flex items-center justify-between px-4 py-4 mx-auto text-right sm:px-8": true,
                "bg-gray-100": isEmbedded,
              })}
            >
              <span className="text-left">
                <Support />
              </span>
              <button
                type="submit"
                value="Submit"
                ref={buttonRef}
                className={cn({
                  "contact-button text-white hover:bg-blue-700 cursor-pointer":
                    email && message,
                  "inline-flex bg-blue-700 capitalize justify-center text-white px-5 py-2 text-sm font-medium  border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500": true,
                })}
              >
                {t("forms.send_message")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
