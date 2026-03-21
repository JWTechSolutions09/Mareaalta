import React, { useMemo, useCallback, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { useInventoryStore } from "../zustand/inventoryStore";
import { PRODUCT_CATEGORIES } from "../data/products";

const isValidCategory = (s: string) =>
    (PRODUCT_CATEGORIES as readonly string[]).includes(s);

export const ShopPage: React.FC = () => {
    const allProducts = useInventoryStore((s) => s.products);
    const [searchParams, setSearchParams] = useSearchParams();

    const param = searchParams.get("categoria");
    const categoryFilter =
        param && isValidCategory(param) ? param : "todas";

    const setCategoryFilter = useCallback(
        (next: string) => {
            if (next === "todas") {
                setSearchParams({}, { replace: true });
            } else {
                setSearchParams({ categoria: next }, { replace: true });
            }
        },
        [setSearchParams]
    );

    const available = useMemo(
        () => allProducts.filter((p) => p.available !== false),
        [allProducts]
    );

    const filtered = useMemo(() => {
        if (categoryFilter === "todas") return available;
        return available.filter((p) => p.category === categoryFilter);
    }, [available, categoryFilter]);

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, []);

    return (
        <div>
            <h2 className="heading-serif text-3xl text-[var(--ma-black)] mb-4">Tienda</h2>
            <p className="text-sm text-neutral-600 mb-3">Filtra por categoría</p>
            <div className="flex flex-wrap gap-2 mb-8">
                <button
                    type="button"
                    onClick={() => setCategoryFilter("todas")}
                    className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                        categoryFilter === "todas"
                            ? "border-[var(--ma-pink-400)] bg-[var(--ma-pink-50)] text-[var(--ma-pink-500)]"
                            : "border-neutral-200 bg-white text-neutral-700 hover:border-[var(--ma-pink-200)]"
                    }`}
                >
                    Todas
                </button>
                {PRODUCT_CATEGORIES.map((c) => (
                    <button
                        key={c}
                        type="button"
                        onClick={() => setCategoryFilter(c)}
                        className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                            categoryFilter === c
                                ? "border-[var(--ma-pink-400)] bg-[var(--ma-pink-50)] text-[var(--ma-pink-500)]"
                                : "border-neutral-200 bg-white text-neutral-700 hover:border-[var(--ma-pink-200)]"
                        }`}
                    >
                        {c}
                    </button>
                ))}
            </div>
            {filtered.length === 0 ? (
                <p className="text-neutral-600 text-sm">No hay productos en esta categoría por ahora.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {filtered.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
        </div>
    );
};
