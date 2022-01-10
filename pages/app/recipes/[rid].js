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

  const recipe = Content.find((el) => el.key === rid);
  // Allow search via email and page urls
  const [search, setSearch] = useState();

  return (
    <React.Fragment>
      <Search search={search} setSearch={setSearch} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex flex-row-reverse flex-1 overflow-hidden">
          <main className="flex flex-col justify-between flex-1 overflow-y-auto">
            <IntegrationLayout recipe={recipe} />
            <Footer />
          </main>

          <aside className="hidden p-6 border-r border-gray-200 bg-shopify-grey w-96 lg:w-1/3 xl:max-w-sm sm:block">
            <div className="space-y-6">
              <div className="m-0 sm:-mt-4">
                <Recipes perPage={10} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Index;
