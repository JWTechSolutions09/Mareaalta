import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuthStore } from "../../zustand/authStore";

export const AdminLayout: React.FC = () => {
    const { role, logout } = useAuthStore();
    return (
        <div className="min-h-dvh bg-white">
            <header className="border-b bg-white">
                <div className="container-ma flex items-center justify-between gap-3 py-4">
                    <NavLink to="/" className="heading-serif text-2xl font-semibold tracking-tight">
                        Mareaalta • admin
                    </NavLink>
                    <div className="flex items-center gap-2">
                        {role && (
                            <button className="btn-outline-gold !px-4 !py-1.5 text-sm" onClick={logout}>
                                Salir
                            </button>
                        )}
                    </div>
                </div>
                {role && (
                    <div className="container-ma">
                        <nav className="flex flex-wrap items-center gap-5 text-sm border-t pt-3 pb-2">
                            {[
                                { to: "/admin/dashboard", label: "Dashboard" },
                                { to: "/admin/pedidos", label: "Pedidos" },
                                { to: "/admin/analiticas", label: "Analíticas" },
                                { to: "/admin/inventario", label: "Inventario" },
                                { to: "/admin/apariencia", label: "Apariencia" },
                                { to: "/admin/roles", label: "Roles" },
                            ].map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "relative pb-2 text-[var(--ma-black)] font-medium after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-[var(--ma-pink-400)]"
                                            : "pb-2 text-neutral-600 hover:text-[var(--ma-black)] transition"
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                )}
            </header>
            <main className="container-ma py-8">
                <Outlet />
            </main>
        </div>
    );
};
