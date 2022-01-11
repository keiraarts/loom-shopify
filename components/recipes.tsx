import FadeIn from "react-fade-in";
import {
  CakeIcon,
  CalendarIcon,
  EmojiHappyIcon,
  SupportIcon,
  MailIcon,
  GiftIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";
import Link from "next/link";
import cn from "classnames";

type HeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element;

interface Recipe<T> {
  href: T;
  style: T;
  title: T;
  content: T;
  tags?: T[];
  icon: HeroIcon;
}

const recipes: Recipe<string>[] = [
  {
    icon: EmojiHappyIcon,
    href: "/app/recipes/product-feedback",
    style: "text-orange-700 rounded-lg bg-orange-50",
    title: "Collect product feedback",
    content: `A cosmetics company might ask customers to record video feedback on how a customer is using their product in a skincare routine.`,
  },
  {
    icon: SupportIcon,
    href: "/app/recipes/reduce-support-churn",
    style: "text-green-700 rounded-lg bg-green-50",
    title: "Reduce support frustration",
    content: `Let customers record their product support questions with a video instead of asking them to type out complex descriptions of their question`,
  },
  {
    icon: GiftIcon,
    href: "/app/recipes/increase-your-sales",
    style: "text-rose-700 rounded-lg bg-rose-50",
    title: "Increase your sales",
    content: `Add a button to your product pages to let customers record screencasts if they need help deciding on a product purchase.`,
  },

  {
    icon: CalendarIcon,
    href: "/app/recipes/ask-for-videos",
    style: "text-blue-700 rounded-lg bg-blue-50",
    title: "Ask for video applications",
    content: `You might like to have applications for partners, affiliates, or referal sites submit an application with a video component.`,
  },
  {
    icon: MailIcon,
    href: "/app/recipes/file-attachments",
    style: "text-blue-700 rounded-lg bg-blue-50",
    title: "Alternative to file attachments",
    content: `Add video support to your contact page so you don't need to setup file uploads on your form.`,
  },
];

export default function RecipeCards({ perPage = 10 }: { perPage: number }) {
  const [start, setStart] = useState<number | null>(0);

  return (
    <div className="-mx-6 overflow-hidden sm:-mx-6 sm:divide-y-0 sm:grid sm:grid-cols-1 sm:gap-px">
      <FadeIn
        key={start}
        transitionDuration={300}
        className="flex flex-row pb-2 m-1 space-x-0 overflow-scroll sm:space-y-1 sm:space-x-0 sm:flex-col sm:overflow-hidden sm:m-2 divide-y-3"
      >
        {recipes
          .slice(start * perPage, start * perPage + perPage)
          .map(({ icon, title, content, style, href }) => {
            return (
              <div
                className="grid flex-1 w-full h-full px-4 pb-5 sm:min-w-full sm:px-0 sm:pb-2"
                style={{ minWidth: "60vw" }}
              >
                <Link href={href}>
                  <div className="relative self-stretch p-4 bg-white rounded-md shadow-lg sm:shadow-sm group focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                    <div className="mt-0">
                      <div>
                        <span className={`inline-flex p-2 ${style}`}>
                          {React.createElement(icon, {
                            className: "w-6 h-6",
                          })}
                        </span>
                      </div>

                      <h3 className="mt-4 text-base font-medium text-black">
                        <a href="#" className="focus:outline-none">
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          ></span>
                          {title}
                        </a>
                      </h3>
                      <p className="hidden mt-2 text-xs text-gray-600 sm:block">
                        {content}
                      </p>
                    </div>
                    <span
                      className="absolute text-gray-400 pointer-events-none top-6 right-6 group-hover:text-gray-800"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
      </FadeIn>
      <nav
        className={cn({
          "none hidden sm:hidden": recipes.length / perPage < 1,
          "flex items-center justify-center mt-4": true,
        })}
        aria-label="current-page"
      >
        <p className="text-xs">
          Cards {start + 1} of {Math.round(recipes.length / perPage)}
        </p>
        <ol role="list" className="flex items-center ml-8 space-x-5">
          {new Array(Math.round(recipes.length / 3))
            .fill(true)
            .map((el, index) => {
              return (
                <li>
                  <a
                    onClick={() => setStart(index)}
                    className={cn({
                      "cursor-pointer block w-2.5 h-2.5": true,
                      "bg-indigo-600 rounded-full hover:bg-indigo-900":
                        index === start,
                      "bg-gray-200 rounded-full hover:bg-gray-400":
                        index !== start,
                    })}
                  >
                    <span className="sr-only">Step {index}</span>
                  </a>
                </li>
              );
            })}
        </ol>
      </nav>
    </div>
  );
}
