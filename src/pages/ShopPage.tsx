import React, { useMemo } from "react";
import { ProductCard } from "../components/ProductCard";
import { useInventoryStore } from "../zustand/inventoryStore";

export const ShopPage: React.FC = () => {
    const allProducts = useInventoryStore((s) => s.products);
    const products = useMemo(
        () => allProducts.filter((p) => p.available !== false),
        [allProducts]
    );
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
