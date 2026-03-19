import React from "react";
import { useInventoryStore } from "../../zustand/inventoryStore";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export const AdminAnalytics: React.FC = () => {
    const products = useInventoryStore((s) => s.products);
    const fetchProducts = useInventoryStore((s) => s.fetchProducts);
    React.useEffect(() => {
        void fetchProducts().catch(() => undefined);
    }, [fetchProducts]);
    const lowStock = products.filter((p) => p.stock <= 2);
    const data = products.map((p) => ({ name: p.name, value: p.stock }));
    const COLORS = ["#111111", "#f6b8d1", "#ee94b9", "#e172a1", "#d1558e"];
    const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
    const active = products.filter((p) => p.available !== false).length;

    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="card p-3"><p className="text-xs text-neutral-500">Productos</p><p className="text-2xl font-semibold">{products.length}</p></div>
                <div className="card p-3"><p className="text-xs text-neutral-500">Activos</p><p className="text-2xl font-semibold">{active}</p></div>
                <div className="card p-3"><p className="text-xs text-neutral-500">Stock total</p><p className="text-2xl font-semibold">{totalStock}</p></div>
                <div className="card p-3"><p className="text-xs text-neutral-500">Bajo stock</p><p className="text-2xl font-semibold">{lowStock.length}</p></div>
            </div>
            <div className="card p-4">
                <h3 className="font-semibold mb-3">Stock por producto</h3>
                <div className="h-64">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label>
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="card p-4">
                <h3 className="font-semibold mb-3">Próximos a agotarse (2 o menos)</h3>
                {lowStock.length === 0 ? (
                    <p className="text-sm text-neutral-500">No hay productos en bajo stock.</p>
                ) : (
                    <ul className="space-y-2">
                        {lowStock.map((p) => (
                            <li key={p.id} className="flex items-center justify-between">
                                <span>{p.name}</span>
                                <span className="text-sm text-neutral-500">Stock: {p.stock}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
