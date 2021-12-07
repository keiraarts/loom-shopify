import cn from "classnames";
import Avatar from "./avatar";
import { isShopifyMobile } from "@shopify/app-bridge-utils";

export default function Tabs(props) {
  const {
    options = [{ key: "id", value: "selector" }],
    onClick = () => {},
    selected,
  } = props;

  const isMobile = isShopifyMobile();

  return (
    <div
      className={cn({
        "mt-0": isMobile,
        "mt-3": !isMobile,
        "block sm:mt-2": true,
      })}
    >
      <div className="flex flex-row mb-3 sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          value={selected}
          className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={onClick}
          defaultValue={options[0].key}
        >
          {options.map((el, index) => {
            return (
              <option
                key={index}
                id={el.key}
                value={el.key}
                selected={el.key === selected}
                className="capitalize"
              >
                {el.value}
              </option>
            );
          })}
        </select>

        <div className="flex flex-row items-center justify-end">
          <div className=" ml-1 bg-gray-100 p-0.5 rounded-lg items-center flex">
            <Avatar />
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <div className="flex items-center border-b border-gray-200">
          <nav
            className="flex flex-1 -mb-px space-x-4 xl:space-x-6"
            aria-label="Tabs"
          >
            {options.map((el) => {
              return (
                <button
                  id={el.key}
                  key={el.key}
                  aria-current="page"
                  onClick={() => onClick({ target: { value: el.key } })}
                  className={cn({
                    "px-1 py-4 text-sm focus:border-b-4 cursor-pointer capitalize font-medium hover:text-indigo-600 text-gray-800 border-b-3 hover:border-indigo-500 whitespace-nowrap focus:outline-none": true,
                    "border-indigo-500 text-indigo-600": selected === el.key,
                    "border-shopify-border": selected !== el.key,
                  })}
                >
                  <span className="hidden lg:block"> {el.value}</span>
                  <span className="block lg:hidden">{el?.sm}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex flex-row items-center justify-end">
            <div className=" ml-1 bg-gray-100 p-0.5 rounded-lg items-center flex">
              <Avatar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
