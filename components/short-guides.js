import React, { useState } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { useCountState } from "../src/app-context";
import { CreateInstance } from "../src/axios";
import Toast from "./toast";

export default function App() {
  const state = useCountState();
  const instance = CreateInstance(state);

  const handleUninstall = () => {
    instance.delete("shopify/uninstall");

    Toast({
      success: true,
      duration: 30000,
      message: "You have been unsubscribed",
    });
  };

  const guides = [
    {
      title: `Who can use this app?`,
      content: `This app is great for small businesses that are shipping their own orders. If you're dropshipping orders then you'll need to ask your fulfillments center to integrate with our app for you.`,
    },
    {
      title: `Is this a paid app?`,
      content: `Nope, you don't have to pay us monthly fees to use our app.`,
    },
    {
      title: `How do I delete this app?`,
      content: (
        <React.Fragment>
          Totally, you can delete our app from your store by clicking
          <span
            onClick={() => {
              Toast({
                error: true,
                cta: "Yes",
                message: "Confirm uninstallation",
                onAction: handleUninstall,
              });
            }}
            className="text-red-700 underline cursor-pointer hover:text-red-900"
          >
            here
          </span>
          .
        </React.Fragment>
      ),
    },

    {
      title: `How much can I get insured?`,
      content: `We can insure 36% of the total disputed order value.`,
    },

    {
      title: `How do payouts work?`,
      content: `We do payouts by directly depositing money into your bank account. Payouts are instant.`,
    },

    {
      title: `Are PayPal orders supported?`,
      content: `Yes! You can let us automate your disputes on PayPal too.`,
    },
  ];

  return (
    <section aria-labelledby="announcements-title">
      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="p-5">
          <div className="flow-root">
            <AnimateSharedLayout>
              <motion.ul layout initial={{ borderRadius: 25 }} className="">
                {guides.map((guide, index) => (
                  <Item
                    key={index}
                    title={guide.title}
                    content={guide.content}
                  />
                ))}
              </motion.ul>
            </AnimateSharedLayout>
          </div>
        </div>
      </div>
    </section>
  );
}

function Item({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.li layout onClick={toggleOpen}>
      <motion.div layout>
        <div className="focus-within:ring-2 focus-within:ring-cyan-500">
          <h3 className="block mb-3 text-lg font-normal text-gray-800 cursor-pointer hover:text-gold">
            {title}
          </h3>
        </div>
      </motion.div>
      <AnimatePresence exitBeforeEnter>
        {isOpen && <Content content={content} />}
      </AnimatePresence>
    </motion.li>
  );
}

function Content({ content }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <p className="py-6 text-base"> {content}</p>
    </motion.div>
  );
}
