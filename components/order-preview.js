import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCountDispatch, useCountState } from "../src/app-context";
import Image from "../components/image";
import cn from "classnames";

function Card({ index, id, prev }) {
  const dispatch = useCountDispatch();
  const { id: localId, clickEvent } = useCountState();
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = React.useRef();
  const pos = (id * 10) % 3;

  useEffect(() => {
    if (!localId) setIsHovered(false);
  }, [localId]);

  useEffect(() => {
    if (clickEvent === id) inputRef.current.click();
  }, [clickEvent]);

  const footer = cn({
    "absolute bottom-0 flex flex-col justify-between flex-1 w-full p-4 py-2 rounded-sm rounded-b-md": true,
    "bg-orange-500": pos === 0,
    "bg-indigo-500": pos === 2,
    "bg-green-500": pos === 1,
  });

  return (
    <div
      key={id}
      ref={inputRef}
      className="relative flex flex-col m-1 border rounded-lg ng hover:border-gray-300"
    >
      <div className="z-10 flex-shrink-0 rounded-lg">
        <Image
          className="object-cover w-full rounded-md h-80"
          src={`https://source.unsplash.com/weekly`}
        />

        {id !== prev && false ? (
          <div className="absolute bottom-0 flex flex-col justify-between flex-1 w-full p-4 bg-white rounded-lg rounded-b-md">
            <div className="flex-1">
              <p className="text-sm font-medium text-indigo-600">
                <a href="#" className="hover:underline">
                  Order #35500
                </a>
              </p>
              <a href="#" className="block mt-2">
                <p className="text-xl font-semibold text-gray-900">
                  Kiril Climson
                </p>
              </a>
            </div>
            <div className="flex items-center mt-6">
              <div className="ml-0">
                <p className="text-sm font-medium text-gray-900">
                  <a href="#" className="hover:underline">
                    Insured for $120
                  </a>
                </p>
                <div className="flex space-x-1 text-sm text-gray-500">
                  <time datetime="2020-03-16">Mar 16, 2020</time>
                  <span aria-hidden="true">&middot;</span>
                  <span>6 min read</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={footer}>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">
                <a href="#" className="hover:underline">
                  Order #35500
                </a>
              </p>
            </div>
          </div>
        )}
      </div>

      <span
        className="absolute z-0 hidden w-full h-2 -ml-px overflow-hidden bg-orange-400 rounded-lg top-1/2 right-4 left-16"
        aria-hidden="true"
      ></span>
    </div>
  );
}

export default Card;
