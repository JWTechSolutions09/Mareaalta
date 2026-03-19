import React from "react";
import { mockOrders } from "../../data/orders";
import { products } from "../../data/products";

export const AdminOrders: React.FC = () => {
  return (
    <div>
      <h2 className="heading-serif text-2xl text-[var(--ma-black)] mb-4">Pedidos</h2>
      <div className="space-y-3">
        {mockOrders.map((o) => (
          <div key={o.id} className="card p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">#{o.id}</p>
              <span className="text-sm rounded-full px-3 py-1 border">
                {o.status}
              </span>
            </div>
            <ul className="mt-2 text-sm text-neutral-600">
              {o.items.map((it, idx) => {
                const p = products.find((pr) => pr.id === it.productId);
                return <li key={idx}>{p?.name} x {it.quantity}</li>;
              })}
            </ul>
            <p className="mt-2 font-medium">${o.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
