import React, { useRef } from "react";
import { catalog } from "../lib/catalog";
import ProductCard from "../components/product-card";

export function Product({ selectedId }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 card-list">
      {Object.values(catalog || {}).map((el) => {
        return (
          <ProductCard
            key={el.id}
            id={el.id}
            product={el}
            isSelected={el.id === selectedId}
          />
        );
      })}
    </ul>
  );
}
