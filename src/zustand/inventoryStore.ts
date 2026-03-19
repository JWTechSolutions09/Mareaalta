import { create } from "zustand";
import type { Product } from "../data/products";
import { products as seed } from "../data/products";
import { ensureSupabaseConfigured, supabase } from "../lib/supabase";

type InventoryState = {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  updateStock: (id: string, stock: number) => void;
  updateProduct: (id: string, payload: Partial<Product>) => Promise<void>;
  addProduct: (p: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  uploadProductImage: (file: File) => Promise<string>;
};

export const useInventoryStore = create<InventoryState>()((set, get) => ({
  products: seed,
  loading: false,
  fetchProducts: async () => {
    ensureSupabaseConfigured();
    set({ loading: true });
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (error) {
      set({ loading: false });
      throw error;
    }
    const mapped = (data ?? []).map((p: any) => ({
      id: String(p.id),
      name: p.name,
      price: Number(p.price),
      stock: Number(p.stock),
      category: p.category,
      description: p.description ?? "",
      image: p.image ?? "",
      featured: Boolean(p.featured),
      available: p.available !== false,
    })) as Product[];
    set({ products: mapped, loading: false });
  },
  updateStock: (id, stock) => {
    void get().updateProduct(id, { stock });
  },
  updateProduct: async (id, payload) => {
    ensureSupabaseConfigured();
    set({
      products: get().products.map((p) => (p.id === id ? { ...p, ...payload } : p)),
    });
    const { error } = await supabase.from("products").update(payload).eq("id", id);
    if (error) throw error;
  },
  addProduct: async (p) => {
    ensureSupabaseConfigured();
    const insertPayload = {
      id: p.id,
      name: p.name,
      price: p.price,
      stock: p.stock,
      category: p.category,
      description: p.description ?? "",
      image: p.image ?? "",
      featured: Boolean(p.featured),
      available: p.available !== false,
    };
    const { error } = await supabase.from("products").insert(insertPayload);
    if (error) throw error;
    set({ products: [p, ...get().products] });
  },
  deleteProduct: async (id) => {
    ensureSupabaseConfigured();
    const prev = get().products;
    set({ products: prev.filter((p) => p.id !== id) });
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      set({ products: prev });
      throw error;
    }
  },
  uploadProductImage: async (file) => {
    ensureSupabaseConfigured();
    const ext = file.name.split(".").pop() || "jpg";
    const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    return data.publicUrl;
  },
}));
