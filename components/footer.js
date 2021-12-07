import { useCountDispatch } from "../src/app-context";

export default function Footer() {
  const dispatch = useCountDispatch();

  return (
    <footer className="py-5 pt-5 mt-5">
      <div className="block max-w-2xl px-4 mx-auto sm:px-6 md:px-8 sm:max-w-4xl">
        <div
          delay={50}
          transitionDuration={400}
          childClassName="relative"
          className="relative flex flex-col-reverse text-xs text-center text-gray-800 group sm:text-sm"
        >
          <div
            onClick={() => {
              dispatch({
                type: "SET_MODAL_VIEW",
                view: "support",
              });
            }}
          >
            <div className="relative inline-flex flex-col px-3 py-1 mx-auto mb-3 text-white transition-all transform bg-blue-500 rounded-full opacity-0 cursor-pointer group-hover:opacity-100 duration-50 ">
              <span className="absolute w-5 h-5 transform rotate-45 bg-blue-500 left-5 top-4"></span>
              <span className="relative inline-block ">Need any help?</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col max-w-md py-0 mx-auto mt-3 text-xs text-center text-gray-800">
          <span className="block sm:inline">
            ScreenReply is a free Shopify app that uses Loom to record + host
            customer videos. &copy; {process.env.COMPANY_NAME} 2021. Text us at{" "}
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
