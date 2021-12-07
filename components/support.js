import Image from "next/image";

export default function Support() {
  return (
    <div className="flex-shrink-0 block py-2 pr-2 group ">
      <div className="flex items-center">
        <Image
          className="inline-block border-2 border-pink-400 rounded-full hover:border-pink-800"
          src="/logos/primary-logo-icon.png"
          alt="developer shopify agency"
          width={40}
          height={40}
        />

        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            {process.env.SUPPORT_EMAIL}
          </p>
          <p className="text-xs font-normal text-gray-500">
            {process.env.SUPPORT_PHONE}
          </p>
        </div>
      </div>
    </div>
  );
}
