export default function Footer() {
  return (
    <footer className="py-3">
      <div className="block max-w-2xl px-4 mx-auto sm:px-6 md:px-8 sm:max-w-4xl">
        <img className="h-8 mx-auto" src="/brand/census-logo-wordmark.svg" />

        <div className="flex flex-col max-w-md py-0 mx-auto mt-3 text-xs text-center text-gray-800">
          <span className="block sm:inline">
            HonestyCore.com is a free Shopify app that uses Loom's SDK. &copy;{" "}
            {process.env.COMPANY_NAME} 2021. Text us at{" "}
            {process.env.SUPPORT_PHONE}
          </span>
        </div>
      </div>

      <style jsx gobal>{`
        #sunrise {
          -webkit-animation: sunset 10000ms ease infinite;
          animation: sunset 10000ms ease infinite;
        }

        @-webkit-keyframes sunset {
          0% {
            -webkit-transform: scale(0.95);
          }
          50% {
            -webkit-transform: scale(1.3);
          }
          100% {
            -webkit-transform: scale(0.95);
          }
        }

        @keyframes sunset {
          0% {
            transform: scale(0.95);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(0.95);
          }
        }
      `}</style>
    </footer>
  );
}
