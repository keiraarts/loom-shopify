import React from "react";
import Layout from "../components/public/layout";

function Index() {
  return (
    <Layout>
      <div className="pb-8 sm:pb-4 lg:pb-4">
        <div className="pt-8 overflow-hidden sm:pt-6 lg:relative lg:py-14">
          <div className="px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 md:max-w-6xl lg:grid lg:grid-cols-5 lg:gap-14">
            <div className="col-span-2">
              <div>
                <img
                  className="w-auto h-24"
                  src="/logos/primary-logo-icon.png"
                  alt="Workflow"
                />
              </div>
              <div className="mt-20">
                <div className="mt-6 sm:max-w-xl">
                  <h1 className="text-2xl font-light text-gray-900 sm:text-5xl">
                    Let customers{" "}
                    <span className="font-medium text-green-600 ">
                      record their screen
                    </span>{" "}
                    when asking your shop questions.
                  </h1>
                  <p className="mt-6 text-xl text-gray-500">
                    Add our free app to your Shopify store and start collecting
                    questions from your customers over video.
                  </p>
                </div>

                <div className="flex-col mt-6 space-y-2 sm:mt-14">
                  <a
                    href="#"
                    type="submit"
                    className="relative flex items-center justify-center w-full px-5 py-4 text-base font-medium text-center text-white bg-green-700 border border-transparent rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:px-10"
                  >
                    Add us to your theme
                  </a>
                  <a
                    type="submit"
                    href="https://github.com/keiraarts/loom-shopify"
                    className="block w-full px-5 py-4 text-base font-medium text-center text-white bg-orange-500 border border-transparent rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:px-10"
                  >
                    Fork the code
                  </a>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="py-24 mx-auto max-w-7xl sm:py-32 sm:px-2 lg:px-4">
          <div className="max-w-2xl px-4 mx-auto lg:max-w-none">
            <div className="max-w-3xl">
              <h2 className="font-semibold text-gray-500">
                Drawstring Canister
              </h2>
              <p className="mt-2 text-3xl font-light text-gray-900 sm:text-4xl">
                Use it your way
              </p>
              <p className="mt-4 text-gray-500">
                The Drawstring Canister comes with multiple strap and handle
                options to adapt throughout your day. Shoulder sling it,
                backpack it, or handy carry it.
              </p>
            </div>

            <div className="pt-10 mt-10 space-y-16 border-t border-gray-200 sm:pt-16 sm:mt-16">
              <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-center">
                <div className="mt-6 lg:mt-0 lg:col-span-5 xl:col-span-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Adventure-ready
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    The Drawstring Canister is water and tear resistant with
                    durable canvas construction. This bag holds up to the
                    demands of daily use while keeping your snacks secure.
                  </p>
                </div>
                <div className="relative flex-auto lg:col-span-7 xl:col-span-8">
                  <div className="z-20 overflow-hidden bg-gray-100 rounded-lg aspect-w-5 aspect-h-2">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/product-feature-04-detail-03.jpg"
                      alt="Printed photo of bag being tossed into the sky on top of grass."
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="absolute top-0 z-0 w-full h-full translate-x-3 translate-y-3 border-4 border-black rounded-lg bg-brand-lilac b-grounded-b-lg transform-gpu"></div>
                </div>
              </div>

              <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-center">
                <div className="mt-6 lg:mt-0 lg:col-span-5 xl:col-span-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Minimal and clean
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Everything you need, nothing you don&#039;t. This bag has
                    the simple, contemporary design that enables you to tell
                    everyone you know about how essentialism is the only
                    rational way to live life.
                  </p>
                </div>
                <div className="relative flex-auto lg:col-span-7 xl:col-span-8">
                  <div className="z-20 overflow-hidden bg-gray-100 rounded-lg aspect-w-5 aspect-h-2">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/product-feature-04-detail-01.jpg"
                      alt="Double stitched black canvas hook loop."
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="absolute top-0 z-0 w-full h-full translate-x-3 translate-y-3 bg-green-700 border-4 border-black rounded-lg b-grounded-b-lg transform-gpu"></div>
                </div>
              </div>

              <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-center">
                <div className="mt-6 lg:mt-0 lg:col-span-5 xl:col-span-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Organized
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Never lose your snacks again with our patent-pending snack
                    stash pocket system. With dedicated pouches for each of your
                    snacking needs, the Drawstring Canister unlocks new levels
                    of efficiency and convenience.
                  </p>
                </div>
                <div className="relative flex-auto lg:col-span-7 xl:col-span-8">
                  <div className="z-20 overflow-hidden bg-gray-100 rounded-lg aspect-w-5 aspect-h-2">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/product-feature-04-detail-02.jpg"
                      alt="Black canvas body with chrome zipper and key ring."
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="absolute top-0 z-0 w-full h-full translate-x-3 translate-y-3 bg-orange-500 border-4 border-black rounded-lg b-grounded-b-lg transform-gpu"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <section
          aria-labelledby="details-heading"
          className="max-w-2xl px-6 py-6 mx-auto sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <div className="flex flex-col items-center text-center">
            <h2
              id="details-heading"
              className="text-3xl font-normal text-gray-900 sm:text-4xl"
            >
              Works on modern Shopify themes
            </h2>
            <p className="max-w-3xl mt-3 text-lg text-gray-600">
              Our patented padded snack sleeve construction protects your
              favorite treats from getting smooshed during all-day adventures,
              long shifts at work, and tough travel schedules.
            </p>
            <img
              className="h-5 mx-auto mt-5"
              src="/assets/icons/squiggly.svg"
            ></img>
          </div>

          <div className="grid grid-cols-1 mt-16 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
            <div>
              <div className="w-full overflow-hidden aspect-w-4 aspect-h-2 rounded-xl">
                <img
                  src="/assets/add-app-extension.png"
                  alt="Drawstring top with elastic loop closure and textured interior padding."
                  className="object-cover object-center w-full h-full"
                />
              </div>
              <p className="mt-8 text-base text-gray-500">
                The 20L model has enough space for 370 candy bars, 6 cylinders
                of chips, 1,220 standard gumballs, or any combination of
                on-the-go treats that your heart desires. Yes, we did the math.
              </p>
            </div>
            <div>
              <div className="w-full overflow-hidden aspect-w-4 aspect-h-2 rounded-xl">
                <img
                  src="/assets/create-video-extension.png"
                  alt="Front zipper pouch with included key ring."
                  className="object-cover object-center w-full h-full"
                />
              </div>
              <p className="mt-8 text-base text-gray-500">
                Up your snack organization game with multiple compartment
                options. The quick-access stash pouch is ready for even the most
                unexpected snack attacks and sharing needs.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-gray-50">
        <div className="px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            <h2 className="text-2xl font-light text-gray-900">
              Record videos for any reason
            </h2>
            <a
              href="#"
              className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
            >
              Browse all categories<span aria-hidden="true"> &rarr;</span>
            </a>
          </div>

          <div className="grid grid-cols-1 mt-6 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
            <div className="overflow-hidden rounded-lg group aspect-w-2 aspect-h-1 sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
              <img
                src="https://tailwindui.com/img/ecommerce-images/home-page-03-featured-category.jpg"
                alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
                className="object-cover object-center group-hover:opacity-75"
              />
              <div
                aria-hidden="true"
                className="opacity-50 bg-gradient-to-b from-transparent to-black"
              ></div>
              <div className="flex items-end p-6">
                <div>
                  <h3 className="font-semibold text-white">
                    <a href="#">
                      <span className="absolute inset-0"></span>
                      New Arrivals
                    </a>
                  </h3>
                  <p aria-hidden="true" className="mt-1 text-sm text-white">
                    Shop now
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg group aspect-w-2 aspect-h-1 sm:relative sm:aspect-none sm:h-full">
              <img
                src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg"
                alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
                className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:w-full sm:h-full"
              />
              <div
                aria-hidden="true"
                className="opacity-50 bg-gradient-to-b from-transparent to-black sm:absolute sm:inset-0"
              ></div>
              <div className="flex items-end p-6 sm:absolute sm:inset-0">
                <div>
                  <h3 className="font-semibold text-white">
                    <a href="#">
                      <span className="absolute inset-0"></span>
                      Accessories
                    </a>
                  </h3>
                  <p aria-hidden="true" className="mt-1 text-sm text-white">
                    Shop now
                  </p>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg group aspect-w-2 aspect-h-1 sm:relative sm:aspect-none sm:h-full">
              <img
                src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg"
                alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
                className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:w-full sm:h-full"
              />
              <div
                aria-hidden="true"
                className="opacity-50 bg-gradient-to-b from-transparent to-black sm:absolute sm:inset-0"
              ></div>
              <div className="flex items-end p-6 sm:absolute sm:inset-0">
                <div>
                  <h3 className="font-semibold text-white">
                    <a href="#">
                      <span className="absolute inset-0"></span>
                      Workspace
                    </a>
                  </h3>
                  <p aria-hidden="true" className="mt-1 text-sm text-white">
                    Shop now
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:hidden">
            <a
              href="#"
              className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Browse all categories<span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </div>

      <section
        aria-labelledby="testimonial-heading"
        className="relative px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <h2
            id="testimonial-heading"
            className="text-2xl font-light text-gray-900"
          >
            What are people saying?
          </h2>

          <div className="mt-16 space-y-16 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
            <blockquote className="sm:flex lg:block">
              <svg
                width="24"
                height="18"
                viewBox="0 0 24 18"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="flex-shrink-0 text-gray-300"
              >
                <path
                  d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                  fill="currentColor"
                />
              </svg>
              <div className="mt-8 sm:mt-0 sm:ml-6 lg:mt-10 lg:ml-0">
                <p className="text-lg text-gray-600">
                  My order arrived super quickly. The product is even better
                  than I hoped it would be. Very happy customer over here!
                </p>
                <cite className="block mt-4 not-italic font-semibold text-gray-900">
                  Sarah Peters, New Orleans
                </cite>
              </div>
            </blockquote>

            <blockquote className="sm:flex lg:block">
              <svg
                width="24"
                height="18"
                viewBox="0 0 24 18"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="flex-shrink-0 text-gray-300"
              >
                <path
                  d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                  fill="currentColor"
                />
              </svg>
              <div className="mt-8 sm:mt-0 sm:ml-6 lg:mt-10 lg:ml-0">
                <p className="text-lg text-gray-600">
                  I had to return a purchase that didn’t fit. The whole process
                  was so simple that I ended up ordering two new items!
                </p>
                <cite className="block mt-4 not-italic font-semibold text-gray-900">
                  Kelly McPherson, Chicago
                </cite>
              </div>
            </blockquote>

            <blockquote className="sm:flex lg:block">
              <svg
                width="24"
                height="18"
                viewBox="0 0 24 18"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="flex-shrink-0 text-gray-300"
              >
                <path
                  d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                  fill="currentColor"
                />
              </svg>
              <div className="mt-8 sm:mt-0 sm:ml-6 lg:mt-10 lg:ml-0">
                <p className="text-lg text-gray-600">
                  Now that I’m on holiday for the summer, I’ll probably order a
                  few more shirts. It’s just so convenient, and I know the
                  quality will always be there.
                </p>
                <cite className="block mt-4 not-italic font-semibold text-gray-900">
                  Chris Paul, Phoenix
                </cite>
              </div>
            </blockquote>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Index;
