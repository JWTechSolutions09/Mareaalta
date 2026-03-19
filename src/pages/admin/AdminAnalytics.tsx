import React from "react";
import { products } from "../../data/products";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export const AdminAnalytics: React.FC = () => {
  const lowStock = products.filter((p) => p.stock <= 3);
  const data = products.map((p) => ({ name: p.name, value: p.stock }));
  const COLORS = ["#111111", "#f6b8d1", "#ee94b9", "#e172a1", "#d1558e"];

  return (
    <div className="grid md:grid-cols-2 gap-6">
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
        <h3 className="font-semibold mb-3">Próximos a agotarse</h3>
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
