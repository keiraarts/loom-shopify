import React, { useEffect, Fragment, useContext } from "react";
import { useCountState, useCountDispatch } from "../src/app-context";
import { Menu, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import StatusCircle from "./status-circle";
import EmptyState from "./empty-state.tsx";
import useDisputes from "../hooks/useDisputes";
import FadeIn from "react-fade-in";
import Loading from "./loading";
import Banner from "./banner";
import Toast from "./toast";
import cn from "classnames";
import Avatars from "./avatar";

import { Redirect } from "@shopify/app-bridge/actions";
import { Context } from "@shopify/app-bridge-react";

import {
  FlagIcon,
  ArrowRightIcon,
  DotsVerticalIcon,
  DuplicateIcon,
  PhoneOutgoingIcon,
} from "@heroicons/react/solid";

export default function Disputes() {
  const dateOptions = { weekday: "short", month: "long", day: "numeric" };
  const today = new Date().toLocaleString("en-US", dateOptions);
  const { t } = useTranslation();

  const { username, owner } = useCountState();
  const dispatch = useCountDispatch();
  const { data: orders, isLoading } = useDisputes();

  // Redirect away from app
  const app = useContext(Context);
  const to = (url) => {
    const redirect = Redirect.create(app);
    redirect.dispatch(Redirect.Action.REMOTE, {
      url: url,
      newContext: true,
    });
  };

  return (
    <div className="flex flex-col justify-between h-full overflow-hidden sm:rounded-md">
      <Banner
        cta={t("tabs.demo")}
        content={t("headings.disputes_demo")}
        icon={<FlagIcon className="w-6 h-6 text-black" />}
        onClick={() => {
          dispatch({ type: "SET_DISPUTE", dispute: {} });
          dispatch({ type: "SET_VIEW", view: "dispute" });
        }}
      />

      <div className="flex flex-col justify-between h-full overflow-hidden sm:rounded-md">
        <div className="mt-0 text-black sm:block">
          <div className="inline-block min-w-full align-middle border-b border-gray-200">
            <table className="min-w-full">
              <thead>
                <tr className="border-t border-gray-200">
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    <span className="lg:pl-2">{t("tables.customers")}</span>
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    {t("tables.category")}
                  </th>
                  <th className="flex-1 hidden px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase border-b border-gray-200 md:table-cell bg-gray-50">
                    {t("tables.deadline")}
                  </th>
                  <th className="py-3 pr-6 text-xs font-medium tracking-wider text-right text-gray-500 uppercase border-b border-gray-200 bg-gray-50" />
                </tr>
              </thead>

              <tbody
                wrapperTag="tbody"
                className="w-full divide-y divide-gray-200"
                childClassName="hover:bg-blue-50 bg-white focus:bg-blue-100 cursor-pointer"
              >
                {orders &&
                  orders.map((project, index) => {
                    const date = new Date(project.evidence_due_by);

                    const handleSelection = () => {
                      dispatch({
                        type: "SET_SELECTION",
                        selection: project.sk,
                        order: project,
                      });
                    };
                    return (
                      <React.Fragment key={index}>
                        <tr
                          key={index}
                          onClick={handleSelection}
                          className="bg-white border border-l-0 border-r-0 cursor-pointer hover:bg-blue-50 focus:bg-blue-100 hover:border-blue-300 "
                        >
                          <td className="w-full px-6 py-5 text-sm font-medium text-gray-900 cursor-pointer max-w-0 whitespace-nowrap">
                            <div className="flex items-center space-x-3 lg:pl-2">
                              <StatusCircle status={project?.status} />
                              <a
                                href="#"
                                className="truncate hover:text-gray-800"
                              >
                                <span>
                                  {project.tracking_number}{" "}
                                  <span className="font-normal text-gray-500">
                                    for {project?.amount} {project.currency}
                                  </span>
                                </span>
                              </a>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-sm font-medium text-gray-500">
                            <div className="flex items-center space-x-2 capitalize whitespace-nowrap">
                              {project?.reason ?? "other"}
                            </div>
                          </td>
                          <td className="hidden px-6 py-3 text-sm text-right text-gray-500 md:table-cell whitespace-nowrap">
                            {date.toLocaleString("en-US", dateOptions)}
                          </td>
                          <td className="pr-6">
                            <Menu
                              as="div"
                              className="relative flex items-center justify-end"
                            >
                              {({ open }) => (
                                <>
                                  <Menu.Button className="inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    <span className="sr-only">
                                      Open options
                                    </span>
                                    <DotsVerticalIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </Menu.Button>
                                  <Transition
                                    show={open}
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                  >
                                    <Menu.Items
                                      static
                                      className="absolute top-0 z-10 w-48 mx-3 mt-1 origin-top-right bg-white divide-y divide-gray-300 rounded-md shadow-lg right-7 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    >
                                      <div className="py-1">
                                        <Menu.Item>
                                          {({ active }) => (
                                            <a
                                              href="#"
                                              className={cn({
                                                "bg-gray-100 text-gray-900": active,
                                                "group flex items-center px-4 py-2 text-sm": true,
                                              })}
                                              onClick={() => {
                                                to(
                                                  `https://${username}.myshopify.com/admin/orders/${project.order_id}`
                                                );
                                              }}
                                            >
                                              <DuplicateIcon
                                                className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                              />
                                              View order
                                            </a>
                                          )}
                                        </Menu.Item>
                                      </div>
                                      <div className="border-t-2 border-black">
                                        <Menu.Item>
                                          {({ active }) => (
                                            <a
                                              href="#"
                                              className={cn({
                                                "bg-gray-100 text-gray-900": active,
                                                "group flex items-center px-4 py-2 text-sm": true,
                                              })}
                                              onClick={() => {
                                                Toast({
                                                  message:
                                                    "Order has been updated",
                                                });

                                                dispatch({
                                                  type: "ADD_DISPATCH_EVENT",
                                                  context: "contacted_customer",
                                                  message: `${owner} contacted this customer on ${today}.`,
                                                  dispatch: project,
                                                });
                                              }}
                                            >
                                              <PhoneOutgoingIcon
                                                className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                              />
                                              Mark as contacted
                                            </a>
                                          )}
                                        </Menu.Item>
                                        <Menu.Item>
                                          {({ active }) => (
                                            <button
                                              className={cn({
                                                "bg-gray-100 text-gray-900": active,
                                                "group flex items-center w-full px-4 py-2 text-sm": true,
                                              })}
                                              onClick={() => {
                                                dispatch({
                                                  type: "SET_VIEW",
                                                  view: "dispute",
                                                });

                                                dispatch({
                                                  type: "SET_DISPUTE",
                                                  view: project,
                                                });
                                              }}
                                            >
                                              <ArrowRightIcon
                                                className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                              />
                                              Create response
                                            </button>
                                          )}
                                        </Menu.Item>
                                      </div>
                                    </Menu.Items>
                                  </Transition>
                                </>
                              )}
                            </Menu>
                          </td>
                        </tr>
                        {project?.events?.length > 0 &&
                          project.events.map((event) => (
                            <tr className="bg-white border cursor-pointer">
                              <td className="flex flex-row items-center w-full px-6 py-2 text-xs text-black cursor-pointer sm:font-medium sm:text-sm max-w-0 whitespace-nowrap">
                                <Avatars
                                  name={event.owner}
                                  size="tiny"
                                  className="inline-block w-6 h-6 -ml-4 rounded-full -pl-1 ring-2 ring-white"
                                />
                                <span className="inline-block ml-4">
                                  {event.message}
                                </span>
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          ))}
                      </React.Fragment>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        <FadeIn
          delay={200}
          wrapperTag="ul"
          childClassName="flex-1 flex h-full"
          visible={orders.length === 0 && !isLoading}
          className="flex-row self-center justify-center h-full col-span-3 vis"
        >
          {orders.length === 0 && !isLoading && (
            <EmptyState
              quote={t("quotes.disputes")}
              src="/logos/disputecore-handshake-37.svg"
              headshot="/marketing/D2wEMMUD_400x400.jpg"
              title={t("headings.engineering_role")}
              author="Kiyomi"
            />
          )}
        </FadeIn>

        <FadeIn
          delay={20}
          visible={isLoading}
          childClassName="w-full mx-auto"
          className="flex items-center justify-between w-full mx-auto sm:col-span-1"
        >
          {isLoading && (
            <Loading className="flex justify-around mx-auto mt-4 item sm:h-44" />
          )}
        </FadeIn>
      </div>
    </div>
  );
}
