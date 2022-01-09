import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import cn from "classnames";

type Options = {
  open: boolean;
  className: string;
  heading: string;
  children: React.ReactChildren;
  setOpen: (arg: boolean) => void;
};

export default function Aside({
  open,
  setOpen,
  className,
  heading,
  children,
}: Options) {
  return (
    <Transition
      show={open}
      appear={false}
      enter="transform transition transition-all ease-out duration-300 sm:duration-700"
      enterFrom="translate-x-full opacity-0"
      enterTo="translate-x-0 opacity-100"
      leave="transform transition ease-out duration-300 sm:duration-700"
      leaveFrom="translate-x-0 opacity-100"
      leaveTo="translate-x-full opacity-0"
      className="absolute w-full h-full overflow-scroll sm:w-auto sm:relative"
    >
      <aside
        className={cn({
          "hidden sm:block h-full": !open,
          [className]: true,
          "h-full": true,
        })}
      >
        <div className="sticky top-0 z-20 px-3 text-black bg-gray-300 sm:relative sm:text-black sm:px-6 sm:bg-white">
          <div className="flex items-center justify-between py-2 sm:py-5 ">
            <span className="text-base font-medium tracking-wide capitalize">
              {heading}
            </span>
            <div className="flex items-center h-7">
              <button
                className="block text-gray-700 rounded-md sm:text-gray-700 sm:hidden focus:bg-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close panel</span>
                <XIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <section className="block p-3 overflow-scroll sm:p-6 sm:pt-0">
          {children}
        </section>
      </aside>
    </Transition>
  );
}
