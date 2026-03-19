import { products } from "./products";

export type Order = {
  id: string;
  status: "pendiente" | "enviado" | "entregado";
  items: Array<{ productId: string; quantity: number }>;
  total: number;
  createdAt: string;
};

export const mockOrders: Order[] = [
  {
    id: "o1",
    status: "pendiente",
    items: [{ productId: "p3", quantity: 1 }],
    total: products.find((p) => p.id === "p3")!.price * 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "o2",
    status: "enviado",
    items: [{ productId: "p1", quantity: 2 }],
    total: products.find((p) => p.id === "p1")!.price * 2,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];
