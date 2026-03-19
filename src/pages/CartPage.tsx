import React from "react";
import { useCartStore } from "../zustand/cartStore";
import { NavLink, useNavigate } from "react-router-dom";

export const CartPage: React.FC = () => {
    const { items, removeItem, updateQty, clear } = useCartStore();
    const total = items.reduce((a, b) => a + b.product.price * b.quantity, 0);
    const navigate = useNavigate();

    if (items.length === 0) {
        return (
            <div className="text-center">
                <p className="mb-4">Tu carrito está vacío.</p>
                <NavLink to="/tienda" className="btn-primary">Ir a la tienda</NavLink>
            </div>
        );
    }

    return (
        <div>
            <h2 className="heading-serif text-3xl text-[var(--ma-black)] mb-6">Tu carrito</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                    {items.map(({ product, quantity }) => (
                        <div key={product.id} className="card p-4 flex items-center gap-4">
                            <img
                                src={product.image || "/LogoM.png"}
                                alt={product.name}
                                className="size-16 rounded-lg object-cover bg-[var(--ma-pink-50)] border"
                            />
                            <div className="flex-1">
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-neutral-500">${product.price.toFixed(2)}</p>
                            </div>
                            <input
                                type="number"
                                min={1}
                                className="w-16 rounded border px-2 py-1"
                                value={quantity}
                                onChange={(e) => updateQty(product.id, Math.max(1, Number(e.target.value)))}
                            />
                            <button onClick={() => removeItem(product.id)} className="btn-outline">Quitar</button>
                        </div>
                    ))}
                </div>
                <div className="card p-4">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Total</p>
                        <p className="text-lg font-semibold">${total.toFixed(2)}</p>
                    </div>
                    <button className="btn-primary w-full mt-4" onClick={() => navigate("/checkout")}>Proceder al pago</button>
                    <button className="btn-outline w-full mt-2" onClick={clear}>Vaciar carrito</button>
                </div>
            </div>
        </div>
    );
};
