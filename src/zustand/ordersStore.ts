import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useInventoryStore } from "./inventoryStore";

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
  addOrder: (order: Omit<StoredOrder, "id" | "createdAt" | "status" | "stockApplied">) => StoredOrder;
  updateStatus: (id: string, status: OrderStatus) => void;
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
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (payload) => {
        adjustInventoryFromOrder(payload.items, -1);
        const order: StoredOrder = {
          id: `o-${Date.now().toString(36)}`,
          createdAt: new Date().toISOString(),
          status: "en-curso",
          stockApplied: true,
          ...payload,
        };
        set({ orders: [order, ...get().orders] });
        return order;
      },
      updateStatus: (id, status) => {
        const current = get().orders.find((o) => o.id === id);
        if (!current || current.status === status) return;

        // Si se cancela un pedido activo, devolvemos stock.
        if (status === "cancelado" && current.stockApplied) {
          adjustInventoryFromOrder(current.items, 1);
        }
        // Si se reactiva un pedido cancelado, descontamos stock otra vez.
        if (current.status === "cancelado" && status !== "cancelado" && !current.stockApplied) {
          adjustInventoryFromOrder(current.items, -1);
        }

        set({
          orders: get().orders.map((o) =>
            o.id === id
              ? {
                  ...o,
                  status,
                  stockApplied: status === "cancelado" ? false : true,
                }
              : o
          ),
        });
      },
    }),
    { name: "ma-orders" }
  )
);
