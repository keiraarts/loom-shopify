import React, { useEffect, useContext, useState } from "react";
import { useCountDispatch, useCountState } from "../src/app-context";
import useOrders from "../hooks/useOrders";
import Loading from "../components/loading";
import FadeIn from "react-fade-in";
import cn from "classnames";

import SearchBar from "./search";
import DispatchCard from "./dispatch-card";
import EmptyState from "./empty-state.tsx";

export default function Orders() {
  const state = useCountState();
  const dispatch = useCountDispatch();
  const { data: orders, isLoading } = useOrders();

  return (
    <section
      className="h-full px-4 pb-16 mx-auto sm:mt-4 max-w-7xl sm:px-6 lg:px-8 "
      aria-labelledby="orders-heading"
    >
      <SearchBar />

      <h2 id="orders-heading" className="sr-only">
        Recently scanned orders
      </h2>

      <FadeIn
        delay={75}
        wrapperTag="ul"
        visible={orders?.length > 0}
        className={cn({
          "grid grid-cols-2 mt-4 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8": true,
          "hidden": !orders?.length,
        })}
      >
        {orders &&
          orders?.map((el) => {
            return <DispatchCard {...el} key={el?.sk} />;
          })}
      </FadeIn>

      <FadeIn
        delay={75}
        wrapperTag="ul"
        className="mt-4"
        visible={orders?.length === 0 && !isLoading}
        className={cn({
          "hidden": !orders?.length === 0 && !isLoading,
          "visible": orders?.length === 0 && isLoading === false,
          "flex-row self-center justify-center h-full col-span-3": true,
        })}
        childClassName="flex-1 flex h-full"
      >
        <EmptyState
          quote="Handle your own quality-assurance by browsing a recent photos and catching any poorly "
          src="/logos/disputecore-camera-icon-39-39.svg"
          headshot="/marketing/D2wEMMUD_400x400.jpg"
          title="App Developer"
          author="Kiwi"
        />
      </FadeIn>

      <FadeIn
        delay={100}
        className={cn({
          "flex items-center justify-between w-full h-full mx-auto mt-4 sm:col-span-1": true,
          "hidden": !isLoading,
        })}
        childClassName="w-full mx-auto sm:h-44"
        visible={isLoading}
      >
        <Loading className="mx-auto" />
      </FadeIn>
    </section>
  );
}
