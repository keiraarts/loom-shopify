import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import {
  AnnotationIcon,
  ChatAlt2Icon,
  InboxIcon,
  MenuIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from "@heroicons/react/outline";

const solutions = [
  {
    name: "Shopify",
    description: "Connect our app to your Shopify store for a seamless sync.",
    href: "#",
    icon: InboxIcon,
  },
  {
    name: "ChitChats",
    description: "Automatically add your scanned orders into ChitChat batches.",
    href: "#",
    icon: AnnotationIcon,
  },
  {
    name: "WooCommerce",
    description: "Sync Woo orders with DisputeCore to protect your orders.",
    href: "#",
    icon: ChatAlt2Icon,
  },
  {
    name: "Square",
    description: "Protect your food delivery orders from fraudulent claims.",
    href: "#",
    icon: QuestionMarkCircleIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }) {
  const internalLink = (id) => {
    const element = document.getElementById(id);

    window.scrollTo({
      top: element?.current?.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="h-full min-h-screen text-black"
      style={{ backgroundColor: "#EFEDE6" }}
    >
      <main className="">{children}</main>
    </div>
  );
}
