import toast from "toasted-notes";
import cn from "classnames";

enum directions {
  TOP = "top",
  LEFT = "bottom-left",
  RIGHT = "bottom-right",
  BOTTOKM = "bottom",
}

interface ToastProps {
  message: string;
  error?: boolean;
  success?: boolean;
  cta?: string;
  duration?: number;
  position?: directions;
  onAction?: () => void;
}

export default async function Toast(props: ToastProps) {
  const { message, error, success, cta, onAction, duration = 7000 } = props;
  const position = props?.position ?? directions.TOP;

  const notifyClass = cn({
    "flex mt-4 bg-black": true,
    "error bg-red-800 text-white": error,
    "mb-4 pb-1 mt-2": position === "bottom",
    "success bg-brand-yellow text-black font-normal": success,
  });

  const ctaClass = cn({
    "underline transition-all rounded-md": true,
    "sm:ml-5 ml-2 text-sm px-4 py-1 border text-black bg-white ": cta,
    "error hover:text-white hover:bg-black": error,
    "success hover:text-white hover:bg-black": success && message,
    "text-lg hover:bg-none": !message,
  });

  await toast.notify(
    ({ onClose }) => (
      <div
        style={{
          overflow: "hidden",
          alignItems: "center",
          display: "inline-flex",
          maxWidth: "70rem",
          color: "white",
          borderRadius: `0.375rem !important`,
        }}
        className={`${notifyClass} bg-black leading-tight font-medium text-sm sm:text-xs rounded-md px-3 py-2 sm:px-2 sm:py-1`}
      >
        {message}

        {cta ? (
          <button
            className="relative z-50 inline-flex cursor-pointer focus:outline-none"
            onClick={onAction}
          >
            <p className={ctaClass}>{cta}</p>
            {!message && (
              <svg
                className="w-6 h-6 ml-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            )}
          </button>
        ) : null}

        <button className="focus:outline-none" onClick={onClose}>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 ml-4 sm:ml-5 sm:w-8 sm:h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    ),
    {
      position,
      duration,
    }
  );
}
