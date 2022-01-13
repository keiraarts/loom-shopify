export default function Divider(props) {
  return (
    <div className="flex flex-col items-center mx-auto mt-10 mb-4">
      <div className="w-0.5 h-5 py-6 pl-0 pr-0 mx-auto bg-gray-500 rounded-full translate"></div>

      <svg
        className="w-8 h-8 mx-auto -mt-5 text-gray-500 transform -translate-x-0"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M16 17l-4 4m0 0l-4-4m4 4V3"
        />
      </svg>
    </div>
  );
}
