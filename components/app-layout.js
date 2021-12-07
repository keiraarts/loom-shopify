import React, { useEffect, useContext } from "react";
import { useCountState, useCountDispatch } from "../src/app-context";
import useStorefront from "../hooks/useStorefront";
import { Redirect } from "@shopify/app-bridge/actions";
import { Context } from "@shopify/app-bridge-react";

function Index({ children }) {
  const { data: storefront } = useStorefront();
  const dispatch = useCountDispatch();
  const state = useCountState();

  return (
    <div className="flex flex-col justify-between min-h-screen ">
      <main className="flex flex-col flex-1 h-full">
        <div className="flex flex-col flex-1 overflow-hidden">{children}</div>
      </main>
    </div>
  );
}

export default Index;
