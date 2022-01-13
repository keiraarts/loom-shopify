import { useCountState } from "../src/app-context";

export default function Footer() {
  return (
    <footer className="py-3">
      <div className="block max-w-2xl px-4 mx-auto sm:px-6 md:px-8 sm:max-w-4xl">
        <img className="h-8 mx-auto" src="/brand/wordmark.svg" />

        <div className="flex flex-col max-w-md py-0 mx-auto mt-3 text-xs text-center text-gray-800">
          <span className="block sm:inline">
            HonestyCore.com is a free Shopify app that uses Loom's SDK. &copy;{" "}
            {process.env.COMPANY_NAME} 2021. Send us a text message if you need
            our help, anytime {process.env.SUPPORT_PHONE}
          </span>
        </div>
      </div>
    </footer>
  );
}
