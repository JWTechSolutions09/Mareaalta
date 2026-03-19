import React from "react";
import { useAuthStore } from "../../zustand/authStore";
import { motion } from "framer-motion";

export const AdminRoles: React.FC = () => {
  const { role, loginAs } = useAuthStore();
  const roles: Array<{ key: "viewer" | "manager" | "admin"; title: string; desc: string }> = [
    { key: "viewer", title: "Viewer", desc: "Solo visualiza datos." },
    { key: "manager", title: "Manager", desc: "Gestiona pedidos y analíticas." },
    { key: "admin", title: "Admin", desc: "Acceso completo a la tienda." },
  ];
  return (
    <div className="max-w-3xl">
      <h2 className="heading-serif text-2xl text-[var(--ma-black)] mb-4">Gestión de roles</h2>
      <p className="text-sm text-neutral-600 mb-4">Rol actual: {role ?? "Ninguno"}</p>
      <div className="grid md:grid-cols-3 gap-3">
        {roles.map((r, i) => (
          <motion.div
            key={r.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            className="card p-4"
          >
            <p className="font-semibold">{r.title}</p>
            <p className="text-sm text-neutral-500 mb-3">{r.desc}</p>
            <button
              className={r.key === "admin" ? "btn-primary w-full" : "btn-outline w-full"}
              onClick={() => loginAs(r.key)}
            >
              Asignar {r.title}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
