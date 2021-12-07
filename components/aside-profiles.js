import React, { useEffect, useContext, useState, useRef } from "react";
import { useCountDispatch } from "../src/app-context";
import Image from "../components/image";

export default function AsideProfiles(props) {
  return (
    <section className="h-full">
      <div className="pb-6 space-y-6">
        <div>
          <div className="block w-full overflow-hidden rounded-md aspect-w-10 aspect-h-6">
            <svg
              className="z-10 w-10 h-10 mx-auto my-auto text-blue-500 rounded-full cursor-pointer hover:bg-gray-500 "
              fill="currentColor"
              viewBox="0 0 84 84"
            >
              <circle
                opacity="0.9"
                cx="42"
                cy="42"
                r="42"
                fill="white"
              ></circle>
              <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z"></path>
            </svg>
            <Image
              alt="demo"
              src="https://images.unsplash.com/photo-1575821421645-5d9918532a06?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1275&q=80"
              className="object-cover"
            />
          </div>
        </div>
        <div className="block mt-2">
          <div className="pt-5 mt-3 border-t border-blue-400 border-opacity-25">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-1 md:gap-x-8 md:gap-y-12">
              <div>
                <dt className="text-lg font-medium leading-6 lg:text-xl ">
                  What are profiles?
                </dt>
                <dd className="mt-2 text-sm">
                  Profiles lets you tag different members of your team to the
                  orders they shipped. If questions later popup about an order
                  you'll know exactly who finalized the order for shipping.
                  <br /> <br />
                  Create as many profiles as you need too from our settings
                  menu. When a new member of your team starts packing orders as
                  them to click the avatar icon and switch to their own profile
                  before scaning any orders.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
