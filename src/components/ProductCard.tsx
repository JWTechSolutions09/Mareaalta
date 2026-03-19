import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "../data/products";
import { useCartStore } from "../zustand/cartStore";

type Props = {
    product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
    const add = useCartStore((s) => s.addItem);
    return (
        <motion.div layout className="card p-4 hover:border-[var(--ma-gold-300)] transition-colors">
            <NavLink to={`/producto/${product.id}`}>
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="aspect-square w-full rounded-xl object-cover mb-3 border relative"
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    <div className="aspect-square w-full rounded-xl bg-[var(--ma-pink-50)] mb-3" />
                )}
                <img src="/LogoM.png" alt="" className="pointer-events-none select-none absolute top-3 left-3 h-7 w-auto opacity-70" />
                <h3 className="heading-serif text-lg text-[var(--ma-black)]">{product.name}</h3>
            </NavLink>
            <div className="mt-2 flex items-center justify-between">
                <p className="text-sm text-neutral-600">${product.price.toFixed(2)}</p>
                <button
                    className="btn-primary"
                    onClick={() => add(product, 1)}
                >
                    Agregar
                </button>
            </div>
        </motion.div>
    );
};
