import React, { useState } from "react";
import { useAuthStore } from "../../zustand/authStore";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export const AdminLoginPage: React.FC = () => {
    const login = useAuthStore((s) => s.login);
    const navigate = useNavigate();
    const location = useLocation() as any;
    const from = location.state?.from?.pathname || "/admin/dashboard";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const ok = login(username.trim(), password);
        if (!ok) {
            setError("Credenciales inválidas.");
            return;
        }
        setError("");
        navigate(from, { replace: true });
    };

    return (
        <div className="max-w-lg mx-auto">
            <h1 className="heading-serif text-3xl text-[var(--ma-black)] mb-4">Acceso administrativo</h1>
            <p className="text-neutral-600 mb-6">
                Ingresa con tu cuenta de administrador para gestionar pedidos, inventario y analíticas.
            </p>
            <form onSubmit={handleLogin} className="card p-4 space-y-3">
                <input
                    className="w-full rounded border px-3 py-2"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    className="w-full rounded border px-3 py-2"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error ? <p className="text-sm text-red-600">{error}</p> : null}
                <button className="btn-primary w-full" type="submit">Iniciar sesión</button>
            </form>
            <div className="mt-8">
                <NavLink className="text-sm text-[var(--ma-pink-500)] underline" to="/">Volver a la tienda</NavLink>
            </div>
        </div>
    );
};
