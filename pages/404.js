export default function Example() {
  return (
    <div className="flex flex-col min-h-screen pt-16 pb-12 bg-white">
      <main className="flex flex-col justify-center flex-grow w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-center flex-shrink-0">
          <a href="/" className="inline-flex">
            <span className="sr-only">Workflow</span>
            <img className="w-auto h-20" src="/logos/wordmark.svg" alt="" />
          </a>
        </div>
        <div className="py-16">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">
              404 error
            </p>
            <h1 className="mt-2 text-4xl font-medium text-gray-900 sm:text-5xl">
              Page not found.
            </h1>
            <p className="mt-2 text-base text-gray-500">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-6">
              <a
                href="/app"
                className="text-base font-medium text-indigo-600 hover:text-indigo-500"
              >
                Go back home<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex-shrink-0 w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex justify-center space-x-4">
          <a
            href="/app/support"
            className="text-sm font-medium text-gray-500 hover:text-gray-600"
          >
            Contact Support
          </a>
          <span
            className="inline-block border-l border-gray-300"
            aria-hidden="true"
          />

          <a
            href="https://twitter.com/keiraarts"
            className="text-sm font-medium text-gray-500 hover:text-gray-600"
          >
            Developer
          </a>
        </nav>
      </footer>
    </div>
  );
}
