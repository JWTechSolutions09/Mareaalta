import React from "react";
import { NavLink } from "react-router-dom";

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="heading-serif text-3xl text-[var(--ma-black)]">Panel de administración</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <NavLink to="/admin/pedidos" className="card p-4">
          <p className="font-semibold">Pedidos</p>
          <p className="text-sm text-neutral-500">Ver pendientes y existentes</p>
        </NavLink>
        <NavLink to="/admin/analiticas" className="card p-4">
          <p className="font-semibold">Analíticas</p>
          <p className="text-sm text-neutral-500">Inventario, próximos a agotar</p>
        </NavLink>
        <NavLink to="/admin/inventario" className="card p-4">
          <p className="font-semibold">Inventario</p>
          <p className="text-sm text-neutral-500">Gestiona stock de productos</p>
        </NavLink>
        <NavLink to="/admin/roles" className="card p-4">
          <p className="font-semibold">Roles</p>
          <p className="text-sm text-neutral-500">Gestión de permisos</p>
        </NavLink>
      </div>
    </div>
  );
};
