import React from "react";
import { useAuthStore } from "../../zustand/authStore";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export const AdminLoginPage: React.FC = () => {
  const loginAs = useAuthStore((s) => s.loginAs);
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || "/admin/dashboard";

  const handleLogin = (role: "admin" | "manager" | "viewer") => {
    loginAs(role);
    navigate(from, { replace: true });
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="heading-serif text-3xl text-[var(--ma-black)] mb-4">Acceso administrativo</h1>
      <p className="text-neutral-600 mb-6">
        Elige un rol para ingresar (demo). Luego podrás ver pedidos, inventario y analíticas.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button className="btn-primary" onClick={() => handleLogin("admin")}>Entrar como Admin</button>
        <button className="btn-outline" onClick={() => handleLogin("manager")}>Manager</button>
        <button className="btn-outline" onClick={() => handleLogin("viewer")}>Viewer</button>
      </div>
      <div className="mt-8">
        <NavLink className="text-sm text-[var(--ma-pink-500)] underline" to="/">Volver a la tienda</NavLink>
      </div>
    </div>
  );
};
