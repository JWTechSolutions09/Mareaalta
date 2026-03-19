import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export const AdminDashboard: React.FC = () => {
    const cards = [
        { to: "/admin/pedidos", title: "Pedidos", desc: "Ver pendientes y existentes", emoji: "📦" },
        { to: "/admin/analiticas", title: "Analíticas", desc: "Inventario y productos por agotarse", emoji: "📊" },
        { to: "/admin/inventario", title: "Inventario", desc: "Editar productos, fotos y visibilidad", emoji: "🛍️" },
        { to: "/admin/roles", title: "Roles", desc: "Gestión de permisos", emoji: "🔐" },
    ];
    return (
        <div className="space-y-6">
            <h1 className="heading-serif text-3xl text-[var(--ma-black)]">Panel de administración</h1>
            <p className="text-neutral-600">Administra tu tienda de forma centralizada y visual.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((card, i) => (
                    <motion.div
                        key={card.to}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                    >
                        <NavLink to={card.to} className="card p-4 h-full block hover:shadow-md hover:-translate-y-0.5 transition">
                            <p className="text-xl mb-2">{card.emoji}</p>
                            <p className="font-semibold">{card.title}</p>
                            <p className="text-sm text-neutral-500">{card.desc}</p>
                        </NavLink>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
