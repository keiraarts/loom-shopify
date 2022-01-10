import { useRouter } from "next/router";

type PageOptions = {
  title: string;
};

export default function PageTitle(args: PageOptions) {
  const router = useRouter();

  return (
    <div className="px-4 py-4 bg-white border-b border-gray-200 sm:flex sm:items-center sm:justify-between sm:px-6 md:px-8">
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-medium leading-6 text-gray-900 md:text-xl sm:truncate">
          {args.title}
        </h1>
      </div>
      <div className="flex mt-4 sm:mt-0 sm:ml-4">
        <button
          type="button"
          className="inline-flex items-center order-1 px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:order-0 sm:ml-0"
        >
          Share
        </button>
        <button
          type="button"
          onClick={() => router.push("/app/create")}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm order-0 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:order-1 sm:ml-3"
        >
          Create app
        </button>
      </div>
    </div>
  );
}
