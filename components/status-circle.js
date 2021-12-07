import cn from "classnames";
export default function StatusCircle(props) {
  if (!props) return <></>;
  const { status } = props;

  /*   
    Status is defined by EasyPost
    EZ1000000001	pre_transit
    EZ2000000002	in_transit
    EZ3000000003	out_for_delivery
    EZ4000000004	delivered
    EZ5000000005	return_to_sender
    EZ6000000006	failure
    EZ7000000007	unknown 
  */

  return (
    <span className="flex flex-row items-center justify-start">
      <span
        x-status={status}
        className={cn({
          "flex-shrink-0 w-3 h-3 xl:w-4 xl:h-4 rounded-full bg-gray-100": true,
          // Easypost errors
          "pre-transit bg-gray-300": status === "pre_transit",
          "in_transit bg-blue-400": status === "in_transit",
          "out_for_delivery bg-blue-400": status === "out_for_delivery",
          "delivered bg-brand-green": status === "delivered",
          "return_to_sender bg-brand-red": status === "return_to_sender",
          "flagged bg-brand-red": status === "flagged",
          "closed bg-brand-green": status === "closed",
          "failure bg-gray-200": status === "failure",
          "unknown bg-gray-500": status === "unknown",
          // Flagged issues
          "unverified_address bg-red-400": status === "unverified_address",
          // Contacted customers
          "bg-gray-700": status === "contacted",
          // Dispute statuses ['needs_response', 'under_review']
          "under_review bg-red-400": status === "needs_response",
          "under_review bg-gray-300": status === "under_review",
        })}
        aria-hidden="true"
      />

      {status === "flagged" && (
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 ml-1 text-red-700"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}
    </span>
  );
}
