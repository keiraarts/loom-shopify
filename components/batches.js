import { Fragment } from "react";
import { useCountDispatch } from "../src/app-context";
import { Menu, Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import cn from "classnames";

export default function Batches({ open = true }) {
  const dispatch = useCountDispatch();
  return (
    <Menu as="div" className="relative hidden ml-3">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-white">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 border-green-500 border text-green-900">
                Batch #1
              </span>
            </Menu.Button>
          </div>
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
              className="absolute right-0 z-20 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={cn(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Complete batch <span className="font-bold">#1</span>
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={cn(
                      active ? "bg-gray-100" : "",
                      "flex px-4 py-2 text-sm text-gray-700 flex-row items-center justify-between w-full"
                    )}
                  >
                    <span> Start new batch </span>
                  </a>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={cn(
                      active ? "bg-gray-100" : "",
                      "flex px-4 py-2 text-sm text-gray-700 flex-row items-center justify-between w-full"
                    )}
                    onClick={() =>
                      dispatch({
                        type: "SET_SELECTION",
                        selection: false,
                        order: false,
                      })
                    }
                  >
                    <span>What are batches? </span>
                    <QuestionMarkCircleIcon className="inline-block w-5 h-5 leading-none text-gray-500" />
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
