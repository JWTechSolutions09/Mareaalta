import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../data/products";

export type CartItem = {
    product: Product;
    quantity: number;
};

type CartState = {
    items: CartItem[];
    totalItems: number;
    addItem: (product: Product, qty: number) => void;
    removeItem: (productId: string) => void;
    updateQty: (productId: string, qty: number) => void;
    clear: () => void;
};

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            totalItems: 0,
            addItem: (product, qty) => {
                const existing = get().items.find((i) => i.product.id === product.id);
                let next: CartItem[];
                if (existing) {
                    next = get().items.map((i) =>
                        i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
                    );
                } else {
                    next = [...get().items, { product, quantity: qty }];
                }
                set({ items: next, totalItems: next.reduce((a, b) => a + b.quantity, 0) });
            },
            removeItem: (productId) => {
                const next = get().items.filter((i) => i.product.id !== productId);
                set({ items: next, totalItems: next.reduce((a, b) => a + b.quantity, 0) });
            },
            updateQty: (productId, qty) => {
                const next = get().items.map((i) =>
                    i.product.id === productId ? { ...i, quantity: qty } : i
                );
                set({ items: next, totalItems: next.reduce((a, b) => a + b.quantity, 0) });
            },
            clear: () => set({ items: [], totalItems: 0 }),
        }),
        { name: "ma-cart" }
    )
);
