import React, { useContext } from "react";
import { motion } from "framer-motion";
import cn from "classnames";

export function Item({ id, content, onClick }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
        transition={{ duration: 0.2, delay: 0.25 }}
        style={{ pointerEvents: "auto" }}
        className="fixed inset-0 overflow-y-auto bg-black bg-opacity-75 sm:mx-0 "
        onClick={onClick}
      ></motion.div>

      <motion.li
        layoutId={`card-full-${id}`}
        className="fixed inset-0 mx-4 mt-4 overflow-y-auto rounded-t-lg rounded-b-none sm:mx-0 "
      >
        <motion.div
          layoutId={`card-container-${id}`}
          className="z-10 flex flex-col w-full overflow-hidden bg-white sm:flex-row"
        >
          <div className="flex flex-col justify-between flex-1 h-full bg-white">
            <p
              className={cn({
                "sm:mb-2 text-lg font-semibold text-gray-900": true,
                "p-4": id !== "first_order",
              })}
            >
              {content?.content}
            </p>
          </div>
        </motion.div>
      </motion.li>
    </>
  );
}
