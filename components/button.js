import cn from "classnames";
import Image from "next/image";

function Button({
  status = "active",
  forceHoverEffects = false,
  margin = true,
  fullWidth = false,
  className = "",
  onClick = () => {},
  disabled = false,
  loading = false,
  rounded = true,
  size = "normal",
  children,
  popover,
}) {
  // Class status

  let btn = cn({
    "not-loading normal py-2": !loading && size === "normal",
    "normal py-2 loading": loading && size === "normal",

    "large py-3": !loading && size === "large",
    "large py-2": loading && size === "large",

    "py-1.5 slim loading": loading && size === "slim",
    "py-1.5 slim": !loading && size === "slim",

    "inline-flex justify-center px-4 text-sm font-medium leading-tight text-white transition duration-150 ease-in-out bg-button-blue hover:bg-button-hover border border-transparent primary-hover focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700":
      status === "primary" && !disabled,
    "inline-flex justify-center px-4 text-sm font-medium leading-tight text-gray-600 transition duration-150 ease-in-out bg-gray-200 border border-transparent hover:bg-gray-200 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700":
      status === "primary" && disabled,

    "constant-primary": forceHoverEffects,

    "delete inline-flex justify-center px-4 text-sm font-medium leading-tight text-white transition duration-150 ease-in-out bg-red-600 border border-transparent primary-hover hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700":
      status === "delete" && !disabled,
    "deleted inline-flex justify-center px-4 text-sm font-medium leading-tight text-gray-100 transition duration-150 ease-in-out bg-gray-200 border border-transparent hover:bg-gray-200 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700":
      status === "delete" && disabled,

    "inline-flex items-center justify-center flex-1 px-4 text-sm font-medium leading-tight text-white transition duration-150 ease-in-out bg-button-green border border-transparent margin-auto focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700":
      status === "active",
    "text-black bg-white border-gray-400 hover:border-gray-600 focus:border-gray-600 inline-flex items-center px-4 border text-sm leading-tight font-medium text-black bg-white hover:bg-gray-50 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-gray-200 transition ease-in-out duration-150":
      status === "outline",
    "text-black bg-gray-100 border-gray-300 inline-flex items-center px-4 border text-sm leading-tight font-medium text-gray-500 focus:outline-none ease-in-out duration-150":
      status === "outline" && disabled,
    "w-full flex justify-center px-4 border border-transparent text-sm font-medium  focus:outline-none transition duration-150 ease-in-out": !className,
    "pointer-events-none": disabled || loading,
    "w-full text-center justify-center focus:outline-none": fullWidth,
    "text-base leading-6": size === "large",
    "rounded-none sm:rounded-md": popover || !rounded,
    "rounded-md": rounded,
    "z-0": true,
  });

  let loadingClass = cn({
    "w-6 m-auto animate-spin": true,
    "filter-color-white": status !== "outline",
  });

  return (
    <div className={`${margin ? "mt-2" : "h-full"} ${fullWidth && "w-full"}`}>
      <span className="inline-flex w-full rounded-md shadow-sm ">
        <button
          type="submit"
          disabled={disabled || loading}
          onClick={onClick}
          className={btn}
        >
          {loading ? (
            <span className="m-auto">
              <div
                className="invisible h-0 leading-tight"
                style={{ marginBottom: "1.5px" }}
              >
                {children}
              </div>
              <Image
                className={loadingClass}
                src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcuMjI5IDEuMTczYTkuMjUgOS4yNSAwIDEwMTEuNjU1IDExLjQxMiAxLjI1IDEuMjUgMCAxMC0yLjQtLjY5OCA2Ljc1IDYuNzUgMCAxMS04LjUwNi04LjMyOSAxLjI1IDEuMjUgMCAxMC0uNzUtMi4zODV6IiBmaWxsPSIjOTE5RUFCIi8+PC9zdmc+Cg=="
                alt="spinner"
              />
            </span>
          ) : (
            children
          )}
        </button>

        {popover && (
          <span className="relative block -ml-px">
            <button
              type="button"
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-l-none rounded-r-md hover:text-gray-400 focus:z-10 active:bg-gray-100 active:text-gray-500"
              aria-label="Expand"
              onClick={() => popover.onClick()}
            >
              <div className="w-5 h-5">{popover.icon}</div>
            </button>
          </span>
        )}
      </span>
    </div>
  );
}

export default Button;
