import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../data/products";
import { products as seed } from "../data/products";

type InventoryState = {
  products: Product[];
  updateStock: (id: string, stock: number) => void;
  updateProduct: (id: string, payload: Partial<Product>) => void;
  addProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
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
      updateProduct: (id, payload) => {
        set({
          products: get().products.map((p) => (p.id === id ? { ...p, ...payload } : p)),
        });
      },
      addProduct: (p) => set({ products: [...get().products, p] }),
      deleteProduct: (id) =>
        set({
          products: get().products.filter((p) => p.id !== id),
        }),
    }),
    { name: "ma-inventory" }
  )
);
