import { create } from "zustand";
import { useInventoryStore } from "./inventoryStore";
import { ensureSupabaseConfigured, supabase } from "../lib/supabase";

export type OrderStatus = "en-curso" | "cancelado" | "entregado";

export type CustomerData = {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  shipping: string;
  payment: string;
  notes?: string;
};

export type StoredOrder = {
  id: string;
  status: OrderStatus;
  stockApplied: boolean;
  customer: CustomerData;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  createdAt: string;
};

type OrdersState = {
  orders: StoredOrder[];
  loading: boolean;
  fetchOrders: () => Promise<void>;
  addOrder: (order: Omit<StoredOrder, "id" | "createdAt" | "status" | "stockApplied">) => Promise<StoredOrder>;
  updateStatus: (id: string, status: OrderStatus) => Promise<void>;
};

const adjustInventoryFromOrder = (
  items: Array<{ productId: string; quantity: number }>,
  direction: 1 | -1
) => {
  const inventory = useInventoryStore.getState();
  for (const item of items) {
    const product = inventory.products.find((p) => p.id === item.productId);
    if (!product) continue;
    const nextStock = Math.max(0, product.stock + direction * item.quantity);
    inventory.updateProduct(product.id, { stock: nextStock });
  }
};

export const useOrdersStore = create<OrdersState>()(
  (set, get) => ({
    orders: [],
    loading: false,
    fetchOrders: async () => {
      ensureSupabaseConfigured();
      set({ loading: true });
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (error) {
        set({ loading: false });
        throw error;
      }
      const mapped = (data ?? []).map((o: any) => ({
        id: String(o.id),
        status: o.status as OrderStatus,
        stockApplied: Boolean(o.stock_applied),
        customer: o.customer,
        items: o.items,
        total: Number(o.total),
        createdAt: o.created_at,
      })) as StoredOrder[];
      set({ orders: mapped, loading: false });
    },
    addOrder: async (payload) => {
      ensureSupabaseConfigured();
      adjustInventoryFromOrder(payload.items, -1);
      const id = `o-${Date.now().toString(36)}`;
      const createdAt = new Date().toISOString();
      const order: StoredOrder = {
        id,
        createdAt,
        status: "en-curso",
        stockApplied: true,
        ...payload,
      };
      set({ orders: [order, ...get().orders] });
      const { error } = await supabase.from("orders").insert({
        id,
        status: order.status,
        stock_applied: true,
        customer: order.customer,
        items: order.items,
        total: order.total,
        created_at: createdAt,
      });
      if (error) throw error;
      return order;
    },
    updateStatus: async (id, status) => {
      ensureSupabaseConfigured();
      const current = get().orders.find((o) => o.id === id);
      if (!current || current.status === status) return;

      if (status === "cancelado" && current.stockApplied) {
        adjustInventoryFromOrder(current.items, 1);
      }
      if (current.status === "cancelado" && status !== "cancelado" && !current.stockApplied) {
        adjustInventoryFromOrder(current.items, -1);
      }
      const nextStockApplied = status === "cancelado" ? false : true;
      set({
        orders: get().orders.map((o) =>
          o.id === id ? { ...o, status, stockApplied: nextStockApplied } : o
        ),
      });
      const { error } = await supabase
        .from("orders")
        .update({ status, stock_applied: nextStockApplied })
        .eq("id", id);
      if (error) throw error;
    },
  })
);
