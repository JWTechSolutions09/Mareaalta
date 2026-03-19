import React from "react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export const ShopPage: React.FC = () => {
  return (
    <div>
      <h2 className="heading-serif text-3xl text-[var(--ma-black)] mb-6">Tienda</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
