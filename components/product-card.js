import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCountDispatch, useCountState } from "../src/app-context";
import Image from "../components/image";

function Card({ id, product = {} }) {
  const dispatch = useCountDispatch();
  const { id: localId } = useCountState();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!localId) setIsHovered(false);
  }, [localId]);

  if (!product?.id) return <React.Fragment></React.Fragment>;

  return (
    <li
      key={id}
      className={`relative  bg-white col-span-1 sm:col-span-1 ${id}`}
      onClick={() => {
        dispatch({ type: "update", id: id });
        setIsHovered(false);
      }}
    >
      <div className="borders card-content-container">
        <motion.div
          key={id}
          className="card-content"
          layoutId={`card-container-${id}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.div
            className="relative w-full overflow-hidden"
            layoutId={`card-image-container-${id}`}
          >
            <Image
              className="object-cover"
              product={product.id}
              alt="background image"
            />

            <motion.div
              animate={{ x: 0, y: isHovered ? -75 : 0 }}
              className="absolute w-full p-4 text-center"
            >
              <button
                type="button"
                className="items-center w-full px-4 py-2 mx-auto mb-1 text-lg font-medium text-center text-green-800 bg-white border-4 border-transparent border-green-800 rounded-lg shadow-sm hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View more
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="p-5 bg-white content"
            layoutId={`title-content-${id}`}
          >
            <div>
              <a className="inline-block">
                {(product?.tags ?? []).map((tag, index) => {
                  return (
                    <span
                      key={index}
                      className="inline-flex items-center mr-2 px-3 py-0.5 rounded-full text-sm font-medium text-white"
                      style={{
                        backgroundColor: index === 0 ? `#BAA364` : "#748338",
                      }}
                    >
                      {tag}
                    </span>
                  );
                })}
              </a>
            </div>
            <a className="block mt-4">
              <div className="flex items-end justify-between">
                <p className="text-base font-semibold text-gray-900">
                  {product.name}
                </p>
                <p className="text-base font-light tracking-wide text-gray-500">
                  $8
                </p>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                {product.short_description}
              </p>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </li>
  );
}

export default Card;
