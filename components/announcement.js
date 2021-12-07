import { useRouter } from "next/router";

const DEFAULTS = {
  payment_success: {
    message: "Your payment went through! Try requesting fulfillment again.",
  },
  payment_error: {
    message: "The transaction was cancelled; you will not be charged.",
  },
  subscribed: {
    message: "Thank you for supporting our app with your subscription!",
  },
};

export default function Announcement() {
  const router = useRouter();
  const intention = router?.query?.intention;
  const values = DEFAULTS?.[intention];

  if (!values) return <></>;

  return (
    <div className="mb-5 rounded-lg bg-logo-magenta">
      <div className="px-3 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center flex-1 w-0">
            <span className="flex p-2 rounded-lg ">
              <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokelineCap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
            </span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="md:hidden">{DEFAULTS?.[intention].message}</span>
              <span className="hidden md:inline">
                {DEFAULTS?.[intention].message}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
