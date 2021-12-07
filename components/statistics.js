export default function Statistics() {
  return (
    <div className="mt-8 overflow-hidde ">
      <dl className="flex flex-wrap justify-between w-full max-w-md mx-auto">
        <div className="flex flex-col px-2 pt-8 text-center ">
          <dt className="order-2 text-xs font-medium text-center text-gray-500">
            Orders insured
          </dt>
          <dd className="order-1 text-base font-medium text-gray-700 sm:text-xl">
            42
          </dd>
        </div>
        <div className="flex flex-col px-2 pt-8 text-center ">
          <dt className="order-2 text-xs font-medium text-center text-gray-500">
            Avg Value
          </dt>
          <dd className="order-1 text-base font-medium text-gray-700 sm:text-xl">
            $50
          </dd>
        </div>
        <div className="flex flex-col px-2 pt-8 text-center ">
          <dt className="order-2 text-xs font-medium text-center text-gray-500">
            Rate
          </dt>
          <dd className="order-1 text-base font-medium text-gray-700 sm:text-xl">
            $0.09
          </dd>
        </div>
      </dl>
    </div>
  );
}
