import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";

export default function Modal({ children, open = false, handleClose }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <div className="fixed inset-0 z-30 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen px-3 pt-4 pb-16 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-700"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 transition-opacity bg-gray-600 bg-opacity-75 du"
              style={{ height: "200%" }}
              onClick={handleClose}
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            className="transform"
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-5 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-5 sm:translate-y-0 sm:scale-95"
          >
            <div className="block">{children}</div>
          </Transition.Child>
        </div>
      </div>
    </Transition.Root>
  );
}
