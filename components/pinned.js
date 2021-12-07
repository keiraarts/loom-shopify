export default function Pinned() {
  return (
    <div className="mt-4 mb-8 ">
      <h2 className="text-xs font-medium tracking-wide text-gray-500 uppercase">
        Quick Actions
      </h2>
      <ul className="grid grid-cols-1 gap-4 mt-3 sm:gap-6 sm:grid-cols-3 xl:grid-cols-4">
        {["1", "2", "3"].map((el) => {
          return (
            <li className="relative flex col-span-1 rounded-md shadow-sm">
              <div className="flex items-center justify-center flex-shrink-0 w-16 text-sm font-medium text-white bg-pink-600 rounded-l-md">
                GA
              </div>
              <div className="flex items-center justify-between flex-1 truncate bg-white border-t border-b border-r border-gray-200 rounded-r-md">
                <div className="flex-1 px-4 py-2 text-sm truncate">
                  <a
                    href="#"
                    className="font-medium text-gray-900 hover:text-gray-600"
                  >
                    GraphQL API
                  </a>
                  <p className="text-gray-500">12 Members</p>
                </div>
                <div className="flex-shrink-0 pr-2">
                  <button
                    id="pinned-project-options-menu-0"
                    aria-haspopup="true"
                    className="inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <span className="sr-only">Open options</span>
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>

                  <div
                    className="absolute z-10 hidden w-48 mx-3 mt-1 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg right-10 top-3 ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="pinned-project-options-menu-0"
                  >
                    <div className="py-1" role="none">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        View
                      </a>
                    </div>
                    <div className="py-1" role="none">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Removed from pinned
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Share
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}{" "}
      </ul>
    </div>
  );
}
