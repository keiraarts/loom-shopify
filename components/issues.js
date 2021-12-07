import React, { useEffect, Fragment, useContext, useState } from "react";
import { useCountState, useCountDispatch } from "../src/app-context";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Context } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { useTranslation } from "react-i18next";
import useIssues from "../hooks/useIssues";
import StatusCircle from "./status-circle";
import EmptyState from "./empty-state.tsx";
import { useRouter } from "next/router";
import FadeIn from "react-fade-in";
import Loading from "./loading";
import Toast from "./toast";

import {
  CheckIcon,
  DotsVerticalIcon,
  DuplicateIcon,
  PencilAltIcon,
  PhoneOutgoingIcon,
} from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Disputes() {
  const router = useRouter();
  const { t } = useTranslation();

  const dateOptions = { weekday: "short", month: "long", day: "numeric" };
  const today = new Date().toLocaleString(router.locale, dateOptions);

  const { owner } = useCountState();
  const { data, isLoading } = useIssues();
  const [projects, setProjects] = useState(data);
  const dispatch = useCountDispatch();

  const app = useContext(Context);
  const redirectTo = (url) => {
    const redirect = Redirect.create(app);
    redirect.dispatch(Redirect.Action.REMOTE, {
      url: url,
      newContext: true,
    });
  };

  return (
    <div className="flex flex-col justify-between h-full overflow-hidden sm:rounded-md">
      <div className="mt-0 text-black sm:block">
        <div className="inline-block min-w-full align-middle border-b border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr className="border-t border-gray-200">
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  <span className="lg:pl-2">Customer</span>
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Ticket
                </th>
                <th className="flex-1 hidden px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase border-b border-gray-200 md:table-cell bg-gray-50">
                  Shipped
                </th>
                <th className="py-3 pr-6 text-xs font-medium tracking-wider text-right text-gray-500 uppercase border-b border-gray-200 bg-gray-50" />
              </tr>
            </thead>

            <tbody
              wrapperTag="tbody"
              className="w-full divide-y divide-gray-200"
              childClassName="hover:bg-blue-50 bg-white focus:bg-blue-100 cursor-pointer"
            >
              {projects?.map((project, index) => {
                const date = new Date(project.date_packed);

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
                          <StatusCircle
                            status={
                              // Show a different status once the customer was contacted
                              project?.events ? "contacted" : project.ticket
                            }
                          />
                          <a href="#" className="truncate hover:text-gray-600">
                            <span>
                              {project?.destination?.name ?? project?.barcode}{" "}
                              <span className="font-normal text-gray-500">
                                in{" "}
                                {project?.destination?.province_code ??
                                  project?.carrier}
                              </span>
                            </span>
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-sm font-medium text-gray-500">
                        <div className="flex items-center space-x-2 whitespace-nowrap">
                          Item not receieved
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
                                <span className="sr-only">Open options</span>
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
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-800",
                                            "group flex items-center px-4 py-2 text-sm"
                                          )}
                                        >
                                          <DuplicateIcon
                                            className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                          />
                                          View order
                                        </a>
                                      )}
                                    </Menu.Item>

                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="#"
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-800",
                                            "group flex items-center px-4 py-2 text-sm"
                                          )}
                                        >
                                          <PencilAltIcon
                                            className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                          />
                                          View tracking
                                        </a>
                                      )}
                                    </Menu.Item>
                                  </div>
                                  <div className="py-1 border-t-2 border-black">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <a
                                          href="#"
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-800",
                                            "group flex items-center px-4 py-2 text-sm"
                                          )}
                                          onClick={() => {
                                            Toast({
                                              message: "Order has been updated",
                                            });

                                            dispatch({
                                              type: "ADD_DISPATCH_EVENT",
                                              context: "contacted_customer",
                                              message: `${owner} ontacted this customer on ${today}.`,
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
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-800",
                                            "group flex items-center w-full px-4 py-2 text-sm focus:outline-none"
                                          )}
                                          onClick={() => {
                                            Toast({
                                              success: true,
                                              message: "Resolved issue!",
                                            });

                                            dispatch({
                                              type: "UPDATE_DISPATCH",
                                              dispatch: {
                                                ...project,
                                                status: "resolved",
                                              },
                                            });

                                            // Remove from DOM
                                            projects.splice(index, 1);
                                            setProjects(projects);
                                          }}
                                        >
                                          <CheckIcon
                                            className="w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                          />
                                          Archive issue
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
                    {project?.events?.length > 0 && (
                      <tr className="bg-white border border-red-800 cursor-pointer">
                        <td className="w-full px-6 py-2 text-sm font-medium text-gray-800 cursor-pointer max-w-0 whitespace-nowrap">
                          <span className="ml-5">
                            {project.events[0].message}
                          </span>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    )}
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
        visible={data?.length === 0 && !isLoading}
        className="flex-row self-center justify-center visible h-full col-span-3"
      >
        <EmptyState
          quote={t("quotes.issues")}
          src="/logos/noun_postcard_3364112.svg"
          headshot="/marketing/D2wEMMUD_400x400.jpg"
          title={t("headings.engineering_role")}
          author="Kiyomi"
        />
      </FadeIn>

      <FadeIn
        delay={10}
        visible={isLoading}
        childClassName="w-full mx-auto"
        className="flex items-center justify-between w-full mx-auto sm:col-span-1"
      >
        {isLoading && (
          <Loading className="flex justify-around mx-auto mt-4 item sm:h-44" />
        )}
      </FadeIn>
    </div>
  );
}
