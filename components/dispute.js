import React, { useContext, useState } from "react";
import { useCountState, useCountDispatch } from "../src/app-context";
import { CheckIcon, ExternalLinkIcon } from "@heroicons/react/solid";
import { InformationCircleIcon, EyeIcon } from "@heroicons/react/solid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Redirect } from "@shopify/app-bridge/actions";
import { Context } from "@shopify/app-bridge-react";
import useStorefront from "../hooks/useStorefront";
import { useTranslation } from "react-i18next";
import useDispute from "../hooks/useDispute";
import { decode } from "base64-arraybuffer";
import { useRouter } from "next/router";
import Toast from "../components/toast";
import FadeIn from "react-fade-in";
import Loading from "./loading";
import Banner from "./banner";
import cn from "classnames";
import axios from "axios";

export default function DisputeResponse() {
  const { t } = useTranslation();
  const router = useRouter();

  const situations = [
    {
      key: "lack_of_communication",
      title: t("situations.lack_of_communication"),
      description: `You messaged the customer without getting a response.`,
    },
    {
      key: "returns_supported",
      title: t("situations.returns_supported"),
      description: `The customer could request a replacement for damaged goods.`,
    },
    {
      key: "shipped_with_care",
      title: t("situations.shipped_with_care"),
      description: `You have photos the package was shipped with care.`,
    },
    {
      key: "incorrect_address",
      title: t("situations.incorrect_address"),
      description: `The customer provided an old shipping address.`,
    },
    {
      key: "late_delivery",
      title: t("situations.late_delivery"),
      description: `The shipping courier took longer to deliver the package.`,
    },
    {
      key: "accurate_descriptions",
      title: t("situations.accurate_descriptions"),
      description: `Your description of the ordered product isn't misleading.`,
    },
    {
      key: "shipped_quickly",
      title: t("situations.shipped_quickly"),
      description: `You shipped the order within a week of purchase.`,
    },
    {
      key: "shipped_same_day",
      title: t("situations.shipped_same_day"),
      description: `You shipped the order within a day.`,
    },
    {
      key: "complete_shipment",
      title: t("situations.complete_shipment"),
      description: `The order was shipped without missing items`,
    },
  ];

  // Redirect away from app
  const app = useContext(Context);
  const to = (url) => {
    const redirect = Redirect.create(app);
    redirect.dispatch(Redirect.Action.REMOTE, {
      url: url,
      newContext: true,
    });
  };

  // The code provided by the bank for the dispute reasoning
  const [reason, setReason] = useState(disputeOptions[0].id);

  const handleDestination = (event) => {
    event.preventDefault();
    // Keep all destination values in one object
    setDestination(event.target.value, event.target.id);
  };

  const [lastEdit, setLastEdit] = useState(false);
  const [tags, setTags] = useState([]);
  const [steps] = useState(defaults);

  const state = useCountState();
  const dispatch = useCountDispatch();
  const { data: storefront } = useStorefront();
  const { username, session_token, dispute: _dispute } = state;

  const instance = axios.create({
    crossdomain: true,
    baseURL: "https://" + process.env.API_TUNNEL + "/api/v1/" + username,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + session_token,
      "X-Mockup-Request": state?.dispute?.id?.toString(),
    },
  });

  const [shopDesc, setShopDesc] = useState(false);
  const [productDesc, setProductDesc] = useState(false);

  // Fetch dispute only if this isn't a demo order
  // Returns an {order} and {dispatch} object.
  const { data: dispute = {} } = useDispute(state?.dispute?.id);
  const order = dispute?.order ?? state?.selected;
  const tracking = order?.tracking_number;

  // Used to reset the css on the selectable tags
  // { address1, address2, city, province_code, zip = "" }
  const [destination, setDestination] = useState(order?.shipping_address);

  function Download(buffer) {
    // create the blob object with content-type "application/pdf"
    var blob = new Blob([decode(buffer)], { type: "application/pdf" });
    var url = URL.createObjectURL(blob);
    window?.open(url);
    to(url);
  }

  const downloadAddress = () => {
    instance
      .get(`/dispute/${tracking}/pdf/address`, { params: destination })
      .then((res) => Download(res.data))
      .catch(() =>
        Toast({
          message: "Demo disputes don't have any downloads",
          error: true,
        })
      );

    Toast({
      message: "Saving address verification...",
      duration: 20 * 1000,
      success: true,
    });
  };

  const downloadTracking = () => {
    instance
      .get(`/dispute/${tracking}/pdf/tracking`)
      .then((res) => Download(res.data))
      .catch(() =>
        Toast({
          message: "Demo disputes don't have any downloads",
          error: true,
        })
      );

    Toast({
      message: "Saving tracking download...",
      duration: 20 * 1000,
      success: true,
    });
  };

  const downloadScans = () => {
    instance
      .get(`/dispute/${tracking}/pdf/scans`)
      .then((res) => Download(res.data))
      .catch(() =>
        Toast({
          message: "Demo disputes don't have any downloads",
          error: true,
        })
      );

    Toast({
      message: "Preparing scans...",
      duration: 20 * 1000,
      success: true,
    });
  };

  const downloadPolicy = () => {
    instance
      .get(`/dispute/${tracking}/pdf/policies`)
      .then((res) => Download(res.data))
      .catch(() =>
        Toast({
          message: "Shopify couldn't find your refund policy",
          error: true,
        })
      );

    Toast({
      message: "Download policies...",
      duration: 20 * 1000,
      success: true,
    });
  };

  function GenerateTextResponse() {
    let blocks = [`Hi, thank you for reviewing my dispute with %firstName.`];
    const orderCount = order?.customer?.orders_count;

    // Introduce the context of the dispute
    const dateOptions = { weekday: "long", month: "short", day: "numeric" };
    const option = disputeOptions.find((el) => el.id === reason);

    // Introduce the shop owner
    shopDesc && blocks.push(shopDesc);

    // Provide context on the dispute you're fighting
    option?.response && blocks.push(option.response);

    // Recap the situation
    blocks.push(t("blocks.recap"));
    // Intention with this response
    blocks.push(t("blocks.intention"));
    // Allow reviewer to view the order
    blocks.push(t("blocks.invoice"));

    // We tried to resolve the order without disputes
    if (tags.includes("lack_of_communication")) {
      blocks.push(t("blocks.lack_of_communication"));
    }

    const _fraud = [
      `OTHER`,
      `PRODUCT_NOT_RECEIVED`,
      `PRODUCT_UNACCEPTABLE`,
      `SUBSCRIPTION_CANCELLED`,
    ];

    if (_fraud.includes(reason) && tags.includes("returns_supported")) {
      blocks.push(t("blocks.lack_of_communication"));

      blocks.push(
        cn({
          [t("blocks.products_not_received")]:
            reason === `PRODUCT_NOT_RECEIVED`,
          [t("blocks.subscription_cancelled")]:
            reason === `SUBSCRIPTION_CANCELLED`,
        })
      );
    }

    if (tags.includes("shipped_with_care") && _fraud.includes(reason)) {
      blocks.push(t("blocks.shipped_with_care"));
    }

    if (tags.includes("incorrect_address")) {
      blocks.push(t("blocks.incorrect_address"));
    }

    if (_fraud.includes(reason) && tags.includes("late_delivery")) {
      blocks.push(t("blocks.estimated_shipping_dates"));
    }

    if (
      [`OTHER`, `PRODUCT_UNACCEPTABLE`].includes(reason) &&
      tags.includes("accurate_descriptions")
    ) {
      blocks.push(t("blocks.accurate_descriptions"));

      if (tags.includes("returns_supported")) {
        blocks.push(t("blocks.accurate_descriptions_with_returns"));
      }
    }

    blocks.push(t("blocks.conclusion"));

    const f = router.locale;
    const tel = order?.phone;
    const name = order?.shipping_address?.name;
    const datePacked = dispute?.dispatch?.date_packed;
    const created = new Date(order.created_at).toLocaleString(f, dateOptions);
    const shipped = new Date(datePacked).toLocaleString(f, dateOptions);
    const delivered = new Date(order.updated_at).toLocaleString(f, dateOptions);

    const info = `order number (%number), ${!tel ? "and " : ""}email (%email)${
      tel && `, and phone (%phone)`
    }`;

    return blocks.map((block) => {
      return block
        .replace(/%customerType/g, orderCount === 1 ? "first-time" : "repeat")
        .replace(
          /%turnaround/g,
          tags.includes("shipped_same_day") ? "on the same day" : "quickly"
        )

        .replace(/%checkoutInformation/g, info)
        .replace(/%name/g, name)
        .replace(/%firstName/g, name.split(" ")[0])
        .replace(/%email/g, order?.email)
        .replace(/%phone/g, order?.phone)
        .replace(/%productDesc/g, productDesc || "products from us")

        .replace(/%orderDate/g, created)
        .replace(/%shippedDate/g, shipped)
        .replace(/%deliveredDate/g, delivered)

        .replace(/%customerOrderCount/g, order.customer.orders_count)
        .replace(/%chargeAmount/g, "$" + order.total_price)
        .replace(
          /%invoice/g,
          state?.dispute?.id ? order.order_status_url : "..."
        )
        .replace(/%number/g, order.order_number);
    });
  }

  const handleTags = (val) => {
    const index = tags.findIndex((tag) => tag === val);
    setLastEdit(Date.now());

    if (index > -1) {
      tags.splice(index, 1);
      setTags(tags);
    } else {
      tags.push(val);
      setTags([...new Set(tags)]);
    }
  };

  // If we selected a dispute but an
  // order isn't associated with the dispute id
  if (state?.dispute?.id && !order) {
    return (
      <div className="flex flex-col justify-center h-full">
        <FadeIn
          delay={100}
          childClassName="w-full mx-auto"
          className="w-full mx-auto sm:col-span-1"
        >
          <Loading className="flex flex-col justify-between mx-auto mt-4 sm:h-44" />
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {dispute?.evidence_due_by ? (
        <Banner
          cta="Support"
          content={`Submit this evidence before ${dispute.evidence_due_by}`}
          icon={<ExternalLinkIcon className="w-6 h-6 text-black" />}
          onClick={() => dispatch({ type: "SET_VIEW", view: "support" })}
        />
      ) : (
        <Banner
          content={t("headings.disputes_focus")}
          icon={<EyeIcon className="w-6 h-6 text-black" />}
        />
      )}

      <div className="h-full max-w-4xl p-4 mx-auto bg-white">
        <form action="#" method="POST">
          <nav aria-label="Progress">
            <ol className="overflow-hidden">
              {steps.map((step, index) => {
                return (
                  <li
                    key={step.name}
                    className={cn({ "pb-5": index !== steps.length })}
                  >
                    <div className="relative">
                      <div
                        className="absolute inset-0 flex items-center"
                        aria-hidden="true"
                      >
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex items-center justify-start gap-5 sm:pt-0 ">
                        <span className="pr-3 text-lg font-medium text-gray-900 bg-white">
                          {step.name}
                        </span>
                      </div>
                    </div>

                    {step.name === "Confirm the shipping address" && (
                      <div className="z-30">
                        <div className="sm:rounded-md sm:overflow-hidden">
                          <div className="py-6 space-y-2 sm:p-1">
                            <div className="grid grid-cols-6 gap-3 mt-5">
                              <div className="col-span-3">
                                <label
                                  htmlFor="first_name"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  {t("forms.first_name")}
                                </label>
                                <input
                                  type="text"
                                  name="first_name"
                                  id="first_name"
                                  placeholder="Ashley"
                                  autoComplete="given-name"
                                  defaultValue={order?.customer?.first_name}
                                  onChange={handleDestination}
                                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                              </div>

                              <div className="col-span-3">
                                <label
                                  htmlFor="last_name"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  {t("forms.last_name")}
                                </label>
                                <input
                                  type="text"
                                  name="last_name"
                                  id="last_name"
                                  placeholder="Satoshi"
                                  autoComplete="family-name"
                                  onChange={handleDestination}
                                  defaultValue={order?.customer?.last_name}
                                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                              </div>

                              <div className="col-span-6 sm:col-span-6">
                                <label
                                  htmlFor="reason"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  {t("forms.dispute_reason")}
                                </label>
                                <select
                                  id="reason"
                                  name="reason"
                                  autoComplete="reason"
                                  onChange={({ target: { value } }) =>
                                    setReason(value)
                                  }
                                  className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                  {disputeOptions.map((el) => {
                                    return (
                                      <option value={el.id} key={el.id}>
                                        {el.short}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>

                              <div className="col-span-6 p-4 mb-5 border border-blue-400 rounded-md bg-blue-50 sm:col-span-6">
                                <div className="flex">
                                  <div className="flex-shrink-0">
                                    <InformationCircleIcon
                                      className="w-5 h-5 text-blue-400"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <div className="ml-3">
                                    <h3 className="text-sm font-medium text-blue-900">
                                      {reason}
                                    </h3>
                                    <div className="mt-2 text-sm text-blue-900">
                                      <p>
                                        {
                                          disputeOptions.find(
                                            (el) => el.id === reason
                                          )?.description
                                        }
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-span-6 sm:col-span-6">
                                <label
                                  htmlFor="email_address"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  {t("forms.customer_email_address")}
                                </label>
                                <input
                                  type="text"
                                  name="email_address"
                                  id="email_address"
                                  autoComplete="email"
                                  onChange={handleDestination}
                                  placeholder="joen-smith@gmail.com"
                                  defaultValue={order?.customer?.email}
                                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                              </div>

                              <div className="col-span-3">
                                <label
                                  htmlFor="address1"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  {t("forms.address_1")}
                                </label>
                                <input
                                  type="text"
                                  name="address1"
                                  id="address1"
                                  onChange={handleDestination}
                                  autoComplete="street-address"
                                  defaultValue={
                                    order?.shipping_address?.address1
                                  }
                                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                              </div>

                              <div className="col-span-3">
                                <label
                                  htmlFor="address2"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  {t("forms.address_2")}
                                </label>
                                <input
                                  type="text"
                                  name="address2"
                                  id="address2"
                                  onChange={handleDestination}
                                  autoComplete="street-address"
                                  defaultValue={
                                    order?.shipping_address?.address1
                                  }
                                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                              </div>

                              <div className="col-span-2">
                                <label
                                  htmlFor="city"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  {t("forms.city")}
                                </label>
                                <input
                                  type="text"
                                  name="city"
                                  id="city"
                                  onChange={handleDestination}
                                  defaultValue={order?.shipping_address?.city}
                                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                              </div>

                              <div className="col-span-2">
                                <label
                                  htmlFor="province_code"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  {t("forms.province")}
                                </label>
                                <input
                                  type="text"
                                  name="province_code"
                                  id="province_code"
                                  autoComplete="province-code"
                                  onChange={handleDestination}
                                  defaultValue={
                                    order?.shipping_address?.province_code
                                  }
                                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                              </div>

                              <div className="col-span-2">
                                <label
                                  htmlFor="zip"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  {t("forms.zip")}
                                </label>
                                <input
                                  type="text"
                                  name="zip"
                                  id="zip"
                                  autoComplete="postal-code"
                                  onChange={handleDestination}
                                  defaultValue={order?.shipping_address?.zip}
                                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                              </div>

                              <div className="col-span-6 mt-5">
                                <label
                                  htmlFor="product_description"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  {t("forms.product_description")}
                                </label>
                                <textarea
                                  type="textValue"
                                  rows={3}
                                  cols={5}
                                  name="product_description"
                                  id="product_description"
                                  onChange={(e) =>
                                    setProductDesc(e.target.value)
                                  }
                                  placeholder={`our most-popular handbag and a soft handmade plushie toys.`}
                                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                              </div>

                              <div className="col-span-6 mt-5">
                                <label
                                  htmlFor="business_dsecription"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  {t("forms.business_description")}
                                </label>
                                <textarea
                                  type="textValue"
                                  rows={3}
                                  cols={5}
                                  name="business_dsecriptio`n"
                                  id="business_dsecription"
                                  autoComplete="postal-code"
                                  onChange={(e) => setShopDesc(e.target.value)}
                                  placeholder={`I own a Shopify store where I sell hoodies and plushie toys on https://cutefroggies.com. We make all of our own products here in California.`}
                                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {step.name === "Describe your situation" && (
                      <div className="block">
                        <div
                          key={lastEdit}
                          className="flex flex-row flex-wrap my-3 sm:mx-2"
                        >
                          {situations.map(({ key, title, description }) => {
                            const on = tags.findIndex((el) => el === key) > -1;

                            return (
                              <span key={key}>
                                <button
                                  title={description}
                                  onClick={(event) => {
                                    event.preventDefault();
                                    handleTags(key);
                                  }}
                                  className={cn({
                                    "bg-blue-200 border-blue-700 hover:bg-blue-200 text-blue-900": on,
                                    "bg-white border-blue-400 hover:bg-blue-100 text-blue-900": !on,
                                    "inline-flex focus:outline-none cursor-pointer border mr-2 sm:sm:mr-4 mb-2 sm:mb-3 items-center px-3 py-1 rounded-full text-xs sm:text-base font-medium": true,
                                  })}
                                >
                                  {title}
                                </button>
                              </span>
                            );
                          })}
                        </div>

                        <div className="relative mx-auto sm:max-w-3xl lg:max-w-none">
                          <div className="relative pt-64 pb-10 overflow-hidden shadow-xl rounded-2xl">
                            <img
                              className="absolute inset-0 object-cover w-full h-full"
                              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
                              alt=""
                            />
                            <div className="absolute inset-0 bg-blue-500 mix-blend-multiply" />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-800 via-blue-900 opacity-90" />
                            <div className="relative px-8">
                              <blockquote className="-mt-8">
                                <div className="relative text-base font-medium text-white sm:text-lg md:flex-grow">
                                  <svg
                                    className="absolute left-0 w-8 h-8 text-blue-400 transform -translate-x-3 -translate-y-2 -top-10"
                                    fill="currentColor"
                                    viewBox="0 0 32 32"
                                    aria-hidden="true"
                                  >
                                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                  </svg>
                                  <p
                                    className="relative focus:outline-none"
                                    contentEditable="true"
                                  >
                                    {GenerateTextResponse(tags).map(
                                      (el, index) => {
                                        return (
                                          <span key={index}>
                                            {el}
                                            <br />
                                            <br />
                                          </span>
                                        );
                                      }
                                    )}
                                  </p>
                                </div>

                                <footer className="flex flex-row items-center justify-between mt-4">
                                  <p className="text-base font-semibold text-blue-200">
                                    {storefront?.profiles?.find(
                                      (el) => el.selected
                                    )?.nickname ?? "CEO"}
                                    ,{" "}
                                    {storefront?.brand ??
                                      "Small business owner"}
                                  </p>

                                  <CopyToClipboard
                                    text={GenerateTextResponse(tags).join("")}
                                    onCopy={() => {
                                      Toast({
                                        message: "Copied to clipboard",
                                        success: true,
                                      });
                                    }}
                                  >
                                    <span className="text-sm font-medium text-blue-400 group-hover:text-blue-500">
                                      Copy
                                    </span>
                                  </CopyToClipboard>
                                </footer>
                              </blockquote>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {step.name === "Download your response" && (
                      <div className="p-1 mb-0">
                        <div>
                          <ul className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                            <li className="flex items-center justify-between py-3">
                              <div className="flex items-center">
                                <div className="w-0 h-0 rounded-full sm:w-3 sm:h-3 sm:mr-1 bg-brand-green" />
                                <p className="flex flex-col text-sm font-medium text-gray-900 sm:ml-2">
                                  <span className="font-bold">
                                    {t("download.scans")}
                                  </span>
                                  <span className="max-w-sm pr-5 mt-1 text-xs font-normal sm:pr-10">
                                    {t("download.scans_context")}
                                  </span>
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  downloadScans();
                                }}
                                className="flex items-center p-1 -ml-1 bg-white rounded-md group focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <span className="text-sm font-medium text-blue-600 group-hover:text-blue-500">
                                  {t("forms.scans")}
                                </span>
                              </button>
                            </li>

                            <li className="flex items-center justify-between py-3">
                              <div className="flex items-center">
                                <div className="w-0 h-0 bg-purple-500 rounded-full sm:w-3 sm:h-3 sm:mr-1" />
                                <p className="flex flex-col text-sm font-medium text-gray-900 sm:ml-2">
                                  <span className="font-bold">
                                    {t("download.verification")}
                                  </span>
                                  <span className="max-w-sm pr-5 mt-1 text-xs font-normal sm:pr-10">
                                    {t("download.verification_context")}
                                  </span>
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  downloadAddress();
                                }}
                                className="flex items-center p-1 -ml-1 bg-white rounded-md group focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <span className="text-sm font-medium text-blue-600 group-hover:text-blue-500">
                                  {t("forms.scans")}
                                </span>
                              </button>
                            </li>

                            <li className="flex items-center justify-between py-3">
                              <div className="flex items-center">
                                <div className="w-0 h-0 bg-orange-400 rounded-full sm:w-3 sm:h-3 sm:mr-1" />
                                <p className="flex flex-col text-sm font-medium text-gray-900 sm:ml-2">
                                  <span className="font-bold">
                                    {t("download.tracking")}
                                  </span>
                                  <span className="max-w-sm pr-5 mt-1 text-xs font-normal sm:pr-10">
                                    {t("download.tracking_context")}
                                  </span>
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  downloadTracking();
                                }}
                                className="flex items-center p-1 -ml-1 bg-white rounded-md group focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <span className="text-sm font-medium text-blue-600 group-hover:text-blue-500">
                                  {t("forms.scans")}
                                </span>
                              </button>
                            </li>

                            <li className="flex items-center justify-between py-3">
                              <div className="flex items-center">
                                <div className="w-0 h-0 bg-gray-500 rounded-full sm:w-3 sm:h-3 sm:mr-1" />
                                <p className="flex flex-col text-sm font-medium text-gray-900 sm:ml-2">
                                  <span className="font-bold">
                                    {t("download.policies")}
                                  </span>
                                  <span className="max-w-sm pr-5 mt-1 text-xs font-normal sm:pr-10">
                                    {t("download.policies_context")}
                                  </span>
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  downloadPolicy();
                                }}
                                className="flex items-center p-1 -ml-1 bg-white rounded-md group focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <span className="text-sm font-medium text-blue-600 group-hover:text-blue-500">
                                  {t("forms.scans")}
                                </span>
                              </button>
                            </li>

                            <li className="flex items-center justify-between py-3">
                              <div className="flex items-center">
                                <div className="w-0 h-0 bg-yellow-400 rounded-full sm:w-3 sm:h-3 sm:mr-1" />
                                <p className="flex flex-col text-sm font-medium text-gray-900 sm:ml-2 flex-0">
                                  <span className="font-bold">
                                    {t("download.postage")}
                                  </span>
                                  <span className="max-w-sm pr-5 mt-1 text-xs font-normal sm:pr-10">
                                    {t("download.postage_context")}
                                  </span>
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.preventDefault();
                                  to(
                                    `https://${username}.myshopify.com/admin/orders/${order.id}`
                                  );
                                }}
                                className="flex items-center p-1 -ml-1 bg-white rounded-md group focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <span className="flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-500">
                                  <span className="whitespace-nowrap">
                                    {t("forms.scans")}
                                  </span>
                                  <ExternalLinkIcon className="inline-block w-4 h-4 sm:ml-2" />
                                </span>
                              </button>
                            </li>

                            <li className="flex items-center justify-between py-3">
                              <div className="flex items-center">
                                <div className="w-0 h-0 bg-blue-600 rounded-full sm:w-3 sm:h-3 sm:mr-1" />
                                <p className="flex flex-col text-sm font-medium text-gray-900 sm:ml-2">
                                  <span className="font-bold">
                                    {t("download.text")}
                                  </span>
                                  <span className="max-w-sm pr-5 mt-1 text-xs font-normal sm:pr-10">
                                    {t("download.text_context")}
                                  </span>
                                </p>
                              </div>
                              <button
                                type="button"
                                className="flex items-center p-1 -ml-1 bg-white rounded-md group focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <CopyToClipboard
                                  text={GenerateTextResponse(tags).join("")}
                                  onCopy={() => {
                                    Toast({
                                      message: "Copied to clipboard",
                                      success: true,
                                    });
                                  }}
                                >
                                  <span className="text-sm font-medium text-blue-600 group-hover:text-blue-500">
                                    {t("forms.copy")}
                                  </span>
                                </CopyToClipboard>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="p-3 border border-blue-400 rounded-md bg-blue-50">
            <div className="flex">
              <div className="flex-shrink-0">
                <InformationCircleIcon
                  className="w-5 h-5 text-blue-400"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1 ml-3 md:flex md:justify-between">
                <p className="text-sm text-blue-700">
                  {t("quotes.gyazo")}{" "}
                  <a
                    className="inline-flex text-blue-700 underline"
                    onClick={(event) => {
                      event.preventDefault();
                      to(`gyazo.com`);
                    }}
                  >
                    Download here.
                  </a>
                </p>
              </div>
            </div>

            <FadeIn>
              <div className="flex flex-row items-center justify-between px-4 py-3 mt-5 text-left bg-white border border-blue-200 sm:px-6">
                <div className="flex-1 flex-shrink-0 pr-10 text-xs text-gray-700 sm:pr-4 sm:w-3/5 sm:text-sm">
                  {t("forms.next_steps")}
                </div>
                <div className="flex flex-row">
                  <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border rounded-md shadow-sm hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    onClick={(event) => {
                      event.preventDefault();
                      to(`https://${username}.myshopify.com/admin/orders`);
                    }}
                  >
                    {t("forms.next")}
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </form>
      </div>
      <div className="sm:h-20 bg-gradient-to-b from-white to-shopify-grey" />
    </div>
  );
}

const disputeOptions = [
  {
    id: "CREDIT_NOT_PROCESSED",
    short: "You refunded the customer but they never got it.",
    description: `The customer claims that you refunded them, but they either never received their refund or the credit that was promised to them.`,
    response: `The customer filed a dispute that they never received their credit but I have proof that they received a replacement.`,
  },

  {
    id: "CUSTOMER_INITIATED",
    short: `Customer opened a dispute without contacting you.`,
    description: `The customer initiated their dispute without contacting you about any product issues. `,
    response: `The customer opened a chargeback against us without communicating any issues to us. They received their order and got email receipts about the delivery as-normal.`,
  },

  {
    id: "DUPLICATE",
    short: `Customer got charged multiple times.`,
    description: `The customer claims they were charged multiple times for the same product or service.`,
    response: `This dispute was opened because the customer says they got charged twice, but we only have one payment from them. I'm have evidence provided from Shopify about the customer's payment history with us.`,
  },

  {
    id: "FRAUDULENT",
    short: `Customer didn't make the purchase by themselves.`,
    description: `The cardholder claims that they didn’t authorize the payment. A frequent claim is that their card was stolen when making the purchase.`,
    response: `The customer is claiming they didn't authorize this payment but I have supporting evidence that they completed the purchase with their own card to a personal shipping address.`,
  },

  {
    id: "OTHER",
    short: `Customer wants a refund without a reason.`,
    description: `The customer opened a chargeback without any supporting reason.`,
    response: `One of my customers is disputing their payment with us but I'd like to share evidence that we shipped the customer's full order with the products as-described on our site!`,
  },

  {
    id: "PRODUCT_NOT_RECEIVED",
    short: `Customer's order was never delivered`,
    description: `The customer claims they did not receive the products or services purchased.`,
    response: `We shipped the customer's order to the exact address that they provided to us when completing their checkout on Shopify. I'm attaching photos of their shipped item, postage, and address entered on checkout.`,
  },

  {
    id: "PRODUCT_UNACCEPTABLE",
    short: `The delivered product was broken or defective.`,
    description: `The product or service was received but was defective, damaged, or not as described.`,
    response: `The customer opened a chargeback against us that the product is not-as-described but we have evidence that the items shipped match the product's description and photos on our site.`,
  },

  {
    id: "SUBSCRIPTION_CANCELLED",
    short: `The customer's subscription was cancelled before this charge.`,
    description: `The customer claims that you continued to charge them after a subscription was canceled.`,
    response: `The customer opened a chargeback that they were charged for their subscription when they cancelled it, but this happened before after we shipped the items to their address.`,
  },

  {
    id: "UNRECOGNIZED",
    short: `The customer doesn't remember purchasing this product.`,
    description: `The customer doesn’t recognize the payment appearing on their card statement.`,
    response: `The customer opened a chargeback that they don't recognize this charge even though we shipped products to their address after they provided their own shipped address to our company.`,
  },
];

const defaults = [
  {
    name: "Confirm the shipping address",
    description: "Double-check the customer's shipping address.",
  },
  {
    name: "Describe your situation",
    description: "Add extra snippets of info for your reply.",
  },
  {
    name: "Download your response",
    description: "Attach these files on the next page.",
  },
];
