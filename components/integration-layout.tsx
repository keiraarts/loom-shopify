type image = {
  src: string;
  alt?: string;
  className?: string;
};

type content = {
  heading: string;
  body: React.ReactNode[];
};

type feature = {
  icon: string;
  heading: string;
  body: string[];
};

export interface RecipeDetails {
  key: string;
  title: string;
  images: image[];
  prose: content[];
  usage?: string;
  features?: feature[];
}

type RecipeObject = {
  recipe: RecipeDetails;
};

import Image from "next/image";
export default function IntegrationLayout(props: RecipeObject) {
  const recipe = props.recipe;
  if (!recipe || !recipe.title)
    return <div className="flex-1 m-5 bg-gray-200 rounded-lg"></div>;

  return (
    <main className="w-full max-w-2xl px-4 pb-16 mx-auto mt-8 sm:pb-24">
      <div className="">
        <div className="">
          <div className="flex justify-between">
            <h1 className="text-2xl font-medium text-gray-900">
              {recipe.title}
            </h1>
          </div>

          <div className="mt-4">
            <h2 className="sr-only">Reviews</h2>
            <div className="flex items-center">
              <div
                aria-hidden="true"
                className="ml-4 text-sm text-gray-300"
              ></div>
              <div className="flex ml-4">
                <a
                  href="#"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {recipe.usage}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 ">
          <h2 className="sr-only">Images</h2>

          <div className="grid grid-cols-1 ">
            {recipe.images.map((el) => {
              return (
                <div
                  key={el.src}
                  className="relative block w-full mb-10 bg-gray-400 aspect-w-6 aspect-h-3"
                >
                  <Image
                    layout="fill"
                    className="object-fill"
                    src={el.src}
                    alt={el?.alt}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          {recipe.prose &&
            recipe.prose.map((el) => {
              return (
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-black">
                    {el.heading}
                  </h2>

                  <div className="mt-4 prose-sm prose text-gray-900">
                    {el.body.map((el) => {
                      return <p>{el}</p>;
                    })}
                  </div>
                </div>
              );
            })}

          <section aria-labelledby="policies-heading" className="hidden mt-5">
            <h2 id="policies-heading" className="sr-only">
              Our Policies
            </h2>

            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="p-6 text-center border border-gray-200 rounded-lg bg-gray-50">
                <dt>
                  <svg
                    className="flex-shrink-0 w-6 h-6 mx-auto text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="mt-4 text-sm font-medium text-gray-900">
                    International delivery
                  </span>
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  Get your order in 2 years
                </dd>
              </div>

              <div className="p-6 text-center border border-gray-200 rounded-lg bg-gray-50">
                <dt>
                  <svg
                    className="flex-shrink-0 w-6 h-6 mx-auto text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="mt-4 text-sm font-medium text-gray-900">
                    Loyalty rewards
                  </span>
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  Don&#039;t look at other tees
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </main>
  );
}
