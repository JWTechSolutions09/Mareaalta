import React from "react";
import { useParams } from "react-router-dom";
import { useCartStore } from "../zustand/cartStore";
import { useInventoryStore } from "../zustand/inventoryStore";

export const ProductPage: React.FC = () => {
    const { id } = useParams();
    const product = useInventoryStore((s) => s.products.find((p) => p.id === id));
    const add = useCartStore((s) => s.addItem);
    const [added, setAdded] = React.useState(false);

    const handleAdd = () => {
        if (!product) return;
        add(product, 1);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
    };

    if (!product) {
        return <p>Producto no encontrado.</p>;
    }

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <img
                src={product.image || "/LogoM.png"}
                alt={product.name}
                className="aspect-square w-full rounded-2xl object-cover bg-[var(--ma-pink-50)] border"
            />
            <div>
                <h1 className="heading-serif text-3xl text-[var(--ma-black)]">{product.name}</h1>
                <p className="mt-2 text-neutral-600">{product.description}</p>
                <p className="mt-4 text-xl font-semibold">${product.price.toFixed(2)}</p>
                <p className="mt-1 text-sm text-neutral-500">Stock: {product.stock}</p>
                <div className="mt-6 flex gap-3">
                    <button className={`btn-primary transition-all ${added ? "opacity-90" : ""}`} onClick={handleAdd}>
                        {added ? "Agregado" : "Agregar al carrito"}
                    </button>
                </div>
            </div>
        </div>
    );
};
