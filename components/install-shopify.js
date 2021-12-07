import Image from "next/image";

export default function LargeBanner({ id = "intro" }) {
  const options = {
    intro: {
      line_1: "Scan your first order",
      line_2: "through Shopify's mobile app",
      byline:
        "Take a photo of the QR code to open Shopify's mobile app. It's the easiest way to protect orders from dispute.",
      content: (
        <>
          <Image
            alt="qr code"
            className="w-3/6 h-auto mx-auto mt-3 border-4 shadow-lg lg:max-w-sm "
            src="/qr/Q1FpYTVmcTA3SGVNZnR3cSsxSEs0Zz09LS1zSTNzaEp6ZDNZZEVkcE5OU3AzaTZnPT0=--332636da2ff999d8ea9c3ff923485254964502d1.png"
          />
        </>
      ),
    },
  };

  return (
    <div className="relative hidden mb-5 sm:block">
      <div className="absolute inset-x-0 bottom-0 bg-gray-100 h-1/2"></div>
      <div className="mx-auto max-w-7xl ">
        <div className="relative shadow-xl rounded-2xl sm:overflow-hidden">
          <div className="absolute inset-0 bg-green-800 rounded-2xl"></div>
          <div className="grid items-center grid-cols-1 sm:grid-cols-3">
            <div className="col-span-1 sm:col-span-2">
              <div className="relative px-4 py-4 sm:py-10 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-light leading-loose tracking-normal text-left sm:text-4xl">
                  <span className="inline-block text-white border-b-4 border-green-600">
                    {options?.[id]?.line_1}
                  </span>
                  <span className="inline-block text-white border-b-4 border-green-600">
                    {options?.[id]?.line_2}
                  </span>
                </h1>
                <p className="max-w-lg mx-auto mt-6 text-xl text-left text-gray-200 sm:max-w-3xl">
                  {options?.[id]?.byline}
                </p>
              </div>
            </div>
            <div className="hidden w-full col-span-1 p-2  sm:flex sm:justify-end">
              <div className="relative inline-block mr-10">
                <div className="relative w-full mx-auto rounded-lg ">
                  {options?.[id]?.content}{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
