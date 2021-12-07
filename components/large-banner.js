export default function LargeBanner({ id = "intro", addInsurance = () => {} }) {
  const options = {
    intro: {
      line_1: `Recover your lost revenue`,
      line_2: "from chargebacks",
      byline:
        "Take photos of the orders you are shipping and we'll give you free insurance against fraudulent & high-risk customers.",
      content: (
        <React.Fragment>
          <button
            type="button"
            className="relative block w-full overflow-hidden rounded-md focus:outline-none focus:shadow-outline"
          >
            <img
              className="w-full"
              src={
                "https://assets.viaglamour.com/optimizations/f_auto/https://pro.viaglamour.com/marketing/Thumbnail_00792.png"
              }
              alt="App tutorial Shopify viaglamour"
              layout="fill"
            />

            <div className="absolute inset-0 flex items-center justify-center w-full h-full">
              <svg
                className="w-10 h-10 text-indigo-500"
                fill="currentColor"
                viewBox="0 0 84 84"
              >
                <circle opacity="1" cx="42" cy="42" r="42" fill="white" />
                <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
              </svg>
            </div>
          </button>
        </React.Fragment>
      ),
    },
  };

  return (
    <div className="relative mb-5">
      <div className="absolute inset-x-0 bottom-0 bg-gray-100 h-1/2"></div>
      <div className="mx-auto max-w-7xl ">
        <div className="relative shadow-xl rounded-2xl sm:overflow-hidden">
          <div className="absolute inset-0 bg-gray-900 rounded-2xl"></div>
          <div className="flex grid items-center grid-cols-1 sm:grid-cols-3">
            <div className="col-span-1 sm:col-span-2">
              <div className="relative px-4 py-4 sm:py-10 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-light leading-loose tracking-normal text-left sm:text-4xl">
                  <span className="inline-block text-white border-b-4 border-red-600 text-red-">
                    {options?.[id]?.line_1}
                  </span>
                  <span className="inline-block text-white border-b-4 border-red-600 text-red-">
                    {options?.[id]?.line_2}
                  </span>
                </h1>
                <p className="max-w-lg mx-auto mt-6 text-xl text-left text-gray-200 sm:max-w-3xl">
                  {options?.[id]?.byline}
                </p>
              </div>
            </div>
            <div className="flex w-full col-span-1 p-2 sm:justify-end">
              <div className="relative inline-block pb-2 pl-2 pr-10 sm:pl-10">
                <div className="relative w-full rounded-lg shadow-lg sm:mx-auto lg:max-w-sm">
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
