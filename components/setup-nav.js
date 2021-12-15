import cn from "classnames";

export default function SetupNav({
  steps = [],
  current = 0,
  onClick = () => {},
}) {
  const CheckmarkIcon = (
    <svg
      className="w-6 h-6 text-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clip-rule="evenodd"
      />
    </svg>
  );

  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="border border-gray-300 divide-y divide-gray-300 rounded-md md:flex md:divide-y-0"
      >
        {steps.map((step, index) => {
          return (
            <li className="relative md:flex-1 md:flex">
              <a
                href="#"
                onClick={() => onClick(index)}
                className="flex items-center w-full group"
              >
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span
                    className={cn({
                      "current text-white bg-green-600": current === index,
                      "completed text-white bg-green-600": current > index,
                      "next-step text-black bg-gray-100 border-2 group-hover:bg-gray-200":
                        current < index,
                      "flex items-center justify-center rounded-full flex-shrink-0 w-8 h-8": true,
                    })}
                  >
                    {current > index ? CheckmarkIcon : `${index}`}
                  </span>
                  <span
                    className={cn({
                      "current text-green-800": current === index,
                      "ml-4 text-sm font-medium text-gray-900 whitespace-nowrap": true,
                    })}
                  >
                    {step.title}
                  </span>
                </span>
              </a>

              <div
                className="absolute top-0 right-0 hidden w-5 h-full md:block"
                aria-hidden="true"
              >
                <svg
                  className="w-full h-full text-gray-300"
                  viewBox="0 0 22 80"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 -2L20 40L0 82"
                    vector-effect="non-scaling-stroke"
                    stroke="currentcolor"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
