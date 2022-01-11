import React, { useState } from "react";
import FadeIn from "react-fade-in";
import EmptyState from "./empty-state";
import Image from "next/image";
import cn from "classnames";

interface LoomSubmission {
  onComplete(args?: string): void;
}

export default function VideoAwait(props: LoomSubmission) {
  const [src, setSrc] = useState("add-app-extension.png");

  return (
    <FadeIn className="flex items-center justify-center flex-1 h-full">
      <EmptyState
        src="/logos/primary-logo-icon.png"
        quote={
          <>
            From your theme editor click on{" "}
            <span
              onClick={() => setSrc("add-app-extension.png")}
              className={cn({
                "text-blue-800 text-bold": src === "add-app-extension.png",
                "underline text-blue-500 cursor-pointer": true,
              })}
            >
              Add section
            </span>{" "}
            to preview our app. Try clicking on{" "}
            <span
              onClick={() => setSrc("try-a-recording.png")}
              className={cn({
                "text-blue-800 text-bold": src === "try-a-recording.png",
                "underline text-blue-500 cursor-pointer": true,
              })}
            >
              record screen
            </span>{" "}
            to open the recording overlay, and then{" "}
            <span
              onClick={() => setSrc("create-video-extension.png")}
              className={cn({
                "text-blue-800 text-bold": src === "create-video-extension.png",
                "underline text-blue-500 cursor-pointer": true,
              })}
            >
              start recording
            </span>
            .
          </>
        }
        children={
          <>
            <div key={src} className="mt-5 bg-gray-200 aspect-w-6 aspect-h-3">
              <Image
                layout="fill"
                src={`/assets/${src}`}
                className="w-full object-fit"
              />
            </div>
            <div className="flex flex-row items-stretch max-w-sm gap-4 mx-auto my-5 text-center"></div>
          </>
        }
        button={{
          cta: "I recorded a video!",
          onClick: () => props.onComplete(),
        }}
      />
    </FadeIn>
  );
}
