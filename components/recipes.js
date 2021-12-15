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
import cn from "classnames";

const recipes = [
  {
    icon: EmojiHappyIcon,
    style: "text-orange-700 rounded-lg bg-orange-50",
    title: "Collect product feedback",
    content: `A cosmetics company might ask customers to record video feedback on how a customer is using their product in a skincare routine.`,
  },
  {
    icon: SupportIcon,
    style: "text-green-700 rounded-lg bg-green-50",
    title: "Reduce support frustration",
    content: `Let customers record their product support questions with a video instead of asking them to type out complex descriptions of their question`,
  },
  {
    icon: GiftIcon,
    style: "text-rose-700 rounded-lg bg-rose-50",
    title: "Increase your sales",
    content: `Add a button to your product pages to let customers record screencasts if they need help deciding on a product purchase.`,
  },

  {
    icon: CalendarIcon,
    style: "text-blue-700 rounded-lg bg-blue-50",
    title: "Ask for video applications",
    content: `You might like to have applications for partners, affiliates, or referal sites submit an application with a video component.`,
  },
  {
    icon: CakeIcon,
    style: "text-blue-700 rounded-lg bg-blue-50",
    title: "Post-purchase review",
    content: `Let customers record a review of their product a few days after purchase.`,
  },
  {
    icon: MailIcon,
    style: "text-blue-700 rounded-lg bg-blue-50",
    title: "Alternative to file attachments",
    content: `Add video support to your contact page so you don't need to setup file uploads on your form.`,
  },
];

export default function RecipeCards() {
  const [start, setStart] = useState(0);

  return (
    <div className="overflow-hidden sm:-mx-6 sm:divide-y-0 sm:grid sm:grid-cols-1 sm:gap-px">
      <FadeIn
        key={start}
        wrapperTag={"section"}
        className="m-2 space-y-3 divide-y-5"
      >
        {recipes
          .slice(start * 3, start * 3 + 3)
          .map(({ icon, title, content, style }) => {
            return (
              <div className="relative p-3 bg-white rounded-md shadow-sm group focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
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
                  <p className="mt-2 text-xs text-gray-600">{content}</p>
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
            );
          })}
      </FadeIn>
      <nav
        className="flex items-center justify-center mt-4"
        aria-label="Progress"
      >
        <p className="text-xs">
          Cards {start + 1} of {Math.round(recipes.length / 3)}
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
