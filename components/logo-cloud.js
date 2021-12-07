import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function LogoCloud() {
  return (
    <section>
      <div className="max-w-2xl py-4 mx-auto mt-5 bg-transparent bg-gray-100">
        <p className="mt-5 text-sm tracking-wider text-center text-gray-500 uppercase">
          Works with your fav services
        </p>

        <div className="px-4 mx-auto mt-4 max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
            <div className="flex justify-center col-span-1 px-8 py-8 ">
              <Image
                className="max-h-12"
                src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg"
                alt="viaglamour"
              />
            </div>
            <div className="flex justify-center col-span-1 px-8 py-8 ">
              <Image
                className="max-h-12"
                src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg"
                alt="magicsoaps"
              />
            </div>
            <div className="flex justify-center col-span-1 px-8 py-8 ">
              <Image
                className="max-h-12"
                src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
                alt="printify"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
