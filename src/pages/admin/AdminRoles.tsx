import React from "react";
import { useAuthStore } from "../../zustand/authStore";

export const AdminRoles: React.FC = () => {
  const { role, loginAs } = useAuthStore();
  return (
    <div className="max-w-xl">
      <h2 className="heading-serif text-2xl text-[var(--ma-black)] mb-4">Gestión de roles</h2>
      <p className="text-sm text-neutral-600 mb-4">Rol actual: {role ?? "Ninguno"}</p>
      <div className="flex flex-wrap gap-2">
        <button className="btn-outline" onClick={() => loginAs("viewer")}>Asignar Viewer</button>
        <button className="btn-outline" onClick={() => loginAs("manager")}>Asignar Manager</button>
        <button className="btn-primary" onClick={() => loginAs("admin")}>Asignar Admin</button>
      </div>
    </div>
  );
};
