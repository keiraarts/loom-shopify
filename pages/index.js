import React from "react";
import Image from "next/image";
import Layout from "../components/public/layout";

function Index() {
  return (
    <Layout>
      <div className="pb-8 sm:pb-12 lg:pb-12">
        <div className="pt-8 overflow-hidden sm:pt-6 lg:relative lg:py-14">
          <div className="max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 md:max-w-5xl lg:grid lg:grid-cols-5 lg:gap-14">
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

                <div className="flex-col mt-4 space-y-2 sm:mt-10">
                  <a
                    href="#"
                    type="submit"
                    className="block w-full px-5 py-4 text-base font-medium text-center text-white bg-green-700 border border-transparent rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:px-10"
                  >
                    Download on Shopify
                  </a>
                  <a
                    type="submit"
                    href="https://github.com/keiraarts/loom-shopify"
                    className="block w-full px-5 py-4 text-base font-medium text-center text-white bg-orange-400 border border-transparent rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:px-10"
                  >
                    View the code
                  </a>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
