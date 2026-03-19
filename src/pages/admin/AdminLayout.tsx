import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuthStore } from "../../zustand/authStore";

export const AdminLayout: React.FC = () => {
  const { role, logout } = useAuthStore();
  return (
    <div className="min-h-dvh bg-white">
      <header className="border-b bg-white">
        <div className="container-ma flex items-center justify-between py-4">
          <NavLink to="/" className="heading-serif text-2xl font-semibold">mareaalta • admin</NavLink>
          <div className="flex items-center gap-3 text-sm">
            {role ? <span className="text-neutral-600">Rol: {role}</span> : <span className="text-neutral-400">No autenticado</span>}
            {role && <button className="btn-outline" onClick={logout}>Salir</button>}
          </div>
        </div>
      </header>
      <main className="container-ma py-8">
        <Outlet />
      </main>
    </div>
  );
};
