import cn from "classnames";
import React from "react";

type Steps = { step?: number; title: string };

interface Options {
  readonly steps: Steps[];
  readonly current: number;
  onClick: (props: number) => void;
}
export default function SetupNav({
  steps = [],
  current = 0,
  onClick = () => {},
}: Options) {
  return (
    <nav
      className="flex items-center justify-center mt-4 sm:mt-0 sm:block"
      aria-label="Progress"
      x-current-step={current}
      key={current}
    >
      <p className="text-xs font-medium sm:hidden">
        Step {current + 1} of {steps.length}
      </p>
      <ol role="list" className="flex items-center ml-8 space-x-5 sm:hidden">
        {steps.map((_, index) => {
          return (
            <li key={index}>
              <a
                href="#"
                onClick={() => onClick(index)}
                className={cn({
                  "block w-2.5 h-2.5 rounded-full z-20": true,
                  "completed bg-green-700": index < current,
                  "next bg-gray-300": index > current,
                  "current relative bg-green-800 ": current === index,
                })}
              >
                <span className="sr-only">Step {current}</span>
              </a>
            </li>
          );
        })}
      </ol>

      <ol
        role="list"
        className="hidden border border-gray-300 divide-y divide-gray-300 sm:flex md:flex md:divide-y-0"
      >
        {steps.map((step, index) => {
          return (
            <li key={index} className="relative md:flex-1 md:flex">
              <a
                href="#"
                onClick={() => onClick(index)}
                className="flex items-center w-full group"
              >
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span
                    className={cn({
                      "current text-white bg-green-600": current === index,
                      "completed text-white bg-green-600": current > index,
                      "next-step text-black bg-gray-100 border-2 group-hover:bg-gray-200":
                        current < index,
                      "flex items-center justify-center rounded-full flex-shrink-0 w-8 h-8": true,
                    })}
                  >
                    {current > index ? CheckmarkIcon : `${index + 1}`}
                  </span>
                  <span
                    className={cn({
                      "current text-green-800": current === index,
                      "ml-4 text-sm font-medium text-gray-900 whitespace-nowrap": true,
                    })}
                  >
                    {step.title}
                  </span>
                </span>
              </a>

              <div
                className="absolute top-0 right-0 hidden w-5 h-full md:block"
                aria-hidden="true"
              >
                <svg
                  className="w-full h-full text-gray-300"
                  viewBox="0 0 22 80"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 -2L20 40L0 82"
                    vectorEffect="non-scaling-stroke"
                    stroke="currentcolor"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

const CheckmarkIcon = (
  <svg
    className="w-6 h-6 text-white"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);
