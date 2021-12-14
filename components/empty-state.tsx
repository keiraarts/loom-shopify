import React from "react";
import cn from "classnames";

type AppProps = {
  src: string;
  quote: string;
  headshot: string;
  author: string;
  title: string;
  button: any;
  children: any;
  footer: any;
};

export default function EmptyState({
  src,
  quote,
  headshot,
  author,
  title,
  button,
  children,
  footer,
}: AppProps) {
  return (
    <section className="flex self-center justify-between max-w-lg col-span-3 py-5 mx-auto align-middle sm:py-2">
      <div className="relative px-4 mx-auto max-w-7xl sm:px-3 lg:px-4">
        <div className="relative">
          {src && (
            <img
              className={cn({ "h-20 mx-auto pr-1": true, "hidden": !src })}
              alt="ship your orders"
              src={src}
            />
          )}

          {children}

          <blockquote
            className={cn({
              "mt-3 sm:mt-5 block": src,
              "hidden no-quote": !quote,
            })}
          >
            <div className="max-w-4xl px-2 mx-auto text-lg font-medium leading-normal text-center text-gray-800 md:max-w-6xl ">
              <p>{quote}</p>
            </div>

            {button?.cta && (
              <div className="mx-auto my-5 text-center">
                <button
                  onClick={button.onClick}
                  className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md cursor-pointer"
                >
                  {button.cta}
                </button>
              </div>
            )}

            {footer}

            <footer className="mt-5">
              <div className="flex flex-col items-center justify-center sm:flex-row">
                <div className="flex-shrink-0 ">
                  <img
                    className={cn({
                      "w-10 h-10 mx-auto rounded-full": true,
                      "hidden": !headshot,
                    })}
                    src={headshot}
                    alt="author"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:flex sm:items-center">
                  <div className="text-base font-medium text-gray-900">
                    {author}
                  </div>

                  {author && title && (
                    <svg
                      className="hidden w-5 h-5 mx-1 text-green-600 sm:block"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M11 0h3L9 20H6l5-20z" />
                    </svg>
                  )}

                  <div className="block text-xs font-medium text-gray-500 sm:text-base">
                    {title}
                  </div>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
