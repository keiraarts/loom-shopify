export default function SearchBar() {
  return (
    <nav className="flex-shrink-0 ">
      <div className="mx-auto">
        <div className="relative flex items-center justify-between h-10">
          <div className="flex justify-center flex-1 lg:justify-end">
            <div className="w-full ">
              <label htmlFor="search" className="sr-only">
                Search orders by tracking
              </label>
              <div className="relative text-gray-800 focus-within:text-gray-900">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full py-2 pl-10 pr-3 leading-5 text-gray-400 placeholder-gray-500 transition-all bg-white border border-transparent rounded-md shadow focus:border-gray-400 focus:outline-none focus:ring-0 focus:placeholder-gray-500 focus:text-gray-900 sm:text-sm"
                  placeholder="Search orders by tracking"
                  type="search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
