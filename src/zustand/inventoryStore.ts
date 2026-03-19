import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../data/products";
import { products as seed } from "../data/products";

type InventoryState = {
  products: Product[];
  updateStock: (id: string, stock: number) => void;
  addProduct: (p: Product) => void;
};

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set, get) => ({
      products: seed,
      updateStock: (id, stock) => {
        set({
          products: get().products.map((p) => (p.id === id ? { ...p, stock } : p)),
        });
      },
      addProduct: (p) => set({ products: [...get().products, p] }),
    }),
    { name: "ma-inventory" }
  )
);
