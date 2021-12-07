import React, { useEffect, useContext, useState, useRef } from "react";
import { useCountDispatch } from "../src/app-context";
import CommonQuestions from "./common-questions";

export default function AsideTutorial(props) {
  const dispatch = useCountDispatch();
  const [play, setPlay] = useState(false);
  const handlePlay = () => setPlay(!play);

  return (
    <section className="">
      <div className="pb-2 space-y-6">
        <div className="relative hidden">
          <div className="top-0 block w-full overflow-hidden rounded-md aspect-w-8 aspect-h-16 aspect">
            {!play && (
              <svg
                onClick={handlePlay}
                className="z-10 mx-auto my-auto text-blue-500 rounded-full cursor-pointer w-14 h-14 hover:bg-gray-500 "
                fill="currentColor"
                viewBox="0 0 84 84"
              >
                <circle
                  opacity="0.95"
                  cx="42"
                  cy="42"
                  r="42"
                  fill="white"
                ></circle>
                <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z"></path>
              </svg>
            )}

            <img
              src={
                play
                  ? "/assets/phone-mask-white.png"
                  : "https://images.unsplash.com/photo-1575821421645-5d9918532a06?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1275&q=80"
              }
              className="object-cover"
              alt="youtube thumbnail"
            />
          </div>

          {play && (
            <div className="absolute top-0 w-full h-full pr-1">
              <div
                className="relative h-0 rounded-2xl"
                style={{ paddingBottom: "217%" }}
              >
                <iframe
                  src="https://www.loom.com/embed/e1e09cf694164da8b99b468ec9315cb4?autoplay=1&hide_owner=true&hide_speed=true&hide_share=true&hide_title=true&hideEmbedTopBar=true&autoplay=1"
                  frameborder="0"
                  webkitallowfullscreen
                  mozallowfullscreen
                  allowfullscreen
                  className="absolute top-0 left-0 w-full h-full rounded-2xl"
                ></iframe>
              </div>
            </div>
          )}
        </div>
        <CommonQuestions />
      </div>
    </section>
  );
}
