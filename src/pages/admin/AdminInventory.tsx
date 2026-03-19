import React, { useState } from "react";
import { useInventoryStore } from "../../zustand/inventoryStore";

export const AdminInventory: React.FC = () => {
  const { products, updateStock, addProduct } = useInventoryStore();
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [category, setCategory] = useState("");

  const handleAdd = () => {
    if (!name || !category) return;
    addProduct({
      id: `p${Math.random().toString(36).slice(2, 7)}`,
      name,
      price,
      stock,
      category,
    });
    setName(""); setPrice(0); setStock(0); setCategory("");
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-3">
        <h2 className="heading-serif text-2xl text-[var(--ma-black)]">Inventario</h2>
        {products.map((p) => (
          <div key={p.id} className="card p-4 flex items-center gap-3">
            <div className="size-12 rounded bg-[var(--ma-pink-50)]" />
            <div className="flex-1">
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-neutral-500">${p.price.toFixed(2)} • {p.category}</p>
            </div>
            <input
              type="number"
              className="w-20 rounded border px-2 py-1"
              value={p.stock}
              onChange={(e) => updateStock(p.id, Math.max(0, Number(e.target.value)))}
            />
          </div>
        ))}
      </div>
      <div className="card p-4 space-y-2">
        <h3 className="font-semibold">Agregar producto</h3>
        <input className="w-full rounded border px-3 py-2" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full rounded border px-3 py-2" placeholder="Categoría" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input className="w-full rounded border px-3 py-2" placeholder="Precio" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        <input className="w-full rounded border px-3 py-2" placeholder="Stock" type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
        <button className="btn-primary w-full" onClick={handleAdd}>Agregar</button>
      </div>
    </div>
  );
};
