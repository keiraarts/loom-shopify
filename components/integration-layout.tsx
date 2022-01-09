export default function IntegrationLayout() {
  return (
    <main className="max-w-2xl px-4 pb-16 mx-auto mt-8 sm:pb-24 xl:max-w-7xl">
      <div className="xl:grid xl:grid-cols-12 xl:auto-rows-min xl:gap-x-8">
        <div className="xl:col-start-8 xl:col-span-5">
          <div className="flex justify-between">
            <h1 className="text-2xl font-medium text-gray-900">
              Collect product feedback
            </h1>
          </div>

          <div className="mt-4">
            <h2 className="sr-only">Reviews</h2>
            <div className="flex items-center">
              <p className="text-sm text-gray-700">
                3.9
                <span className="sr-only"> out of 5 stars</span>
              </p>
              <div className="flex items-center ml-1">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                <svg
                  className="flex-shrink-0 w-5 h-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                <svg
                  className="flex-shrink-0 w-5 h-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                <svg
                  className="flex-shrink-0 w-5 h-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                ·
              </div>
              <div className="flex ml-4">
                <a
                  href="#"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  See all 512 reviews
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 xl:mt-0 xl:col-start-1 xl:col-span-7 xl:row-start-1 xl:row-span-3">
          <h2 className="sr-only">Images</h2>

          <div className="grid grid-cols-1 xl:grid-cols-2 xl:grid-rows-3 xl:gap-8">
            <div className="aspect-w-3 aspect-h-2">
              <img
                className="object-cover rounded-lg"
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="mt-8 xl:col-span-5">
          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Description</h2>

            <div className="mt-4 prose-sm prose text-gray-500">
              <p>
                The Basic tee is an honest new take on a classic. The tee uses
                super soft, pre-shrunk cotton for true comfort and a dependable
                fit. They are hand cut and sewn locally, with a special dye
                technique that gives each tee it's own look.
              </p>
              <p>
                Looking to stock your closet? The Basic tee also comes in a
                3-pack or 5-pack at a bundle discount.
              </p>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-gray-200">
            <h2 className="text-sm font-medium text-gray-900">
              Fabric &amp; Care
            </h2>

            <div className="mt-4 prose-sm prose text-gray-500">
              <ul role="list">
                <li>Only the best materials</li>

                <li>Ethically and locally made</li>

                <li>Pre-washed and pre-shrunk</li>

                <li>Machine wash cold with similar colors</li>
              </ul>
            </div>
          </div>

          <section aria-labelledby="policies-heading" className="mt-10">
            <h2 id="policies-heading" className="sr-only">
              Our Policies
            </h2>

            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-1 xl:grid-cols-2">
              <div className="p-6 text-center border border-gray-200 rounded-lg bg-gray-50">
                <dt>
                  <svg
                    className="flex-shrink-0 w-6 h-6 mx-auto text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="mt-4 text-sm font-medium text-gray-900">
                    International delivery
                  </span>
                </dt>
                <dd className="mt-1 text-sm text-gray-500">
                  Get your order in 2 years
                </dd>
              </div>

              <div className="p-6 text-center border border-gray-200 rounded-lg bg-gray-50">
                <dt>
                  <svg
                    className="flex-shrink-0 w-6 h-6 mx-auto text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="mt-4 text-sm font-medium text-gray-900">
                    Loyalty rewards
                  </span>
                </dt>
                <dd className="mt-1 text-sm text-gray-500">
                  Don&#039;t look at other tees
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </main>
  );
}
