import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import Recipes from "../../../components/recipes";
import Search from "../../../components/search";
import Footer from "../../../components/footer";

import IntegrationLayout from "../../../components/integration-layout";
import Content from "../../../library/recipes";

function Index() {
  const router = useRouter();
  const { rid } = router.query;

  const recipe = Content.find((el) => el.key === rid) || Content[0];
  // Allow search via email and page urls
  const [search, setSearch] = useState();

  return (
    <React.Fragment>
      <Search search={search} setSearch={setSearch} />
      <div className="flex flex-col flex-1 sm:flex-row">
        <div className="flex flex-col-reverse flex-1 sm:flex-row-reverse">
          <main className="flex flex-col justify-between flex-1">
            <IntegrationLayout recipe={recipe} />
            <Footer />
          </main>

          <aside className="block w-full p-6 border-gray-200 sm:border-r bg-shopify-grey lg:w-1/3 xl:max-w-sm sm:block">
            <div className="m-0 space-y-6 sm:-mt-4">
              <Recipes perPage={10} />
            </div>
          </aside>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Index;
