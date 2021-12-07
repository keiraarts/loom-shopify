import cn from "classnames";

export default function Banner(props) {
  const { icon, content, cta, link, activated, onClick = () => {} } = props;
  if (!content) return <></>;

  return (
    <div
      className={cn({
        "bg-gray-200": activated,
        "text-black bg-brand-green": !activated,
        "pb-1 banner-container": true,
      })}
    >
      <div className="px-3 py-2 mx-auto sm:py-2 max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center flex-1 sm:w-0">
            <span className="flex p-1 rounded-lg sm:p-1">{icon}</span>
            <p className="ml-3 text-sm font-semibold text-black truncate sm:text-base">
              <span className="inline">{content}</span>
            </p>
          </div>

          <div className="flex-shrink-0 sm:mt-0 sm:w-auto">
            {cta && (
              <a
                href={link}
                onClick={onClick}
                className="flex items-center justify-center px-4 py-2 text-sm font-medium bg-white border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-blue-50"
              >
                {activated ? "Exit" : cta}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
