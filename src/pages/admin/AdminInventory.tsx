import React, { useState } from "react";
import { useInventoryStore } from "../../zustand/inventoryStore";
import type { Product } from "../../data/products";
import { motion } from "framer-motion";

export const AdminInventory: React.FC = () => {
    const { products, updateProduct, addProduct, deleteProduct } = useInventoryStore();
    const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [available, setAvailable] = useState(true);
    const [featured, setFeatured] = useState(false);
    const [image, setImage] = useState("");

    const onImageUpload = (productId: string, file?: File | null) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            updateProduct(productId, { image: String(reader.result) });
        };
        reader.readAsDataURL(file);
    };

    const onNewImageUpload = (file?: File | null) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setImage(String(reader.result));
        reader.readAsDataURL(file);
    };

    const handleAdd = () => {
        if (!name || !category) return;
        const parsedPrice = Number(price);
        const parsedStock = Number(stock);
        if (Number.isNaN(parsedPrice) || Number.isNaN(parsedStock)) return;

        const newProduct: Product = {
            id: `p${Math.random().toString(36).slice(2, 7)}`,
            name,
            price: parsedPrice,
            stock: parsedStock,
            category,
            description,
            image: image || undefined,
            available,
            featured,
        };
        addProduct(newProduct);
        setName("");
        setPrice("");
        setStock("");
        setCategory("");
        setDescription("");
        setImage("");
        setAvailable(true);
        setFeatured(false);
    };

    return (
        <div className="grid xl:grid-cols-5 gap-6">
            <div className="xl:col-span-3 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="heading-serif text-2xl text-[var(--ma-black)]">Inventario</h2>
                    <div className="inline-flex rounded-full border p-1 bg-white">
                        <button
                            className={viewMode === "cards" ? "rounded-full px-3 py-1 text-sm bg-[var(--ma-pink-50)]" : "rounded-full px-3 py-1 text-sm"}
                            onClick={() => setViewMode("cards")}
                        >
                            Tarjetas
                        </button>
                        <button
                            className={viewMode === "list" ? "rounded-full px-3 py-1 text-sm bg-[var(--ma-pink-50)]" : "rounded-full px-3 py-1 text-sm"}
                            onClick={() => setViewMode("list")}
                        >
                            Lista
                        </button>
                    </div>
                </div>

                {viewMode === "cards" ? products.map((p, idx) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: idx * 0.03 }}
                        className="card p-4 space-y-3"
                    >
                        <div className="flex items-center gap-3">
                            <img src={p.image || "/LogoM.png"} alt={p.name} className="size-14 rounded object-cover bg-[var(--ma-pink-50)]" />
                            <div className="flex-1">
                                <p className="font-medium">{p.name}</p>
                                <p className="text-sm text-neutral-500">${p.price.toFixed(2)} • {p.category}</p>
                            </div>
                            <button
                                className="rounded-full border border-red-200 text-red-600 px-3 py-1 text-xs hover:bg-red-50 transition"
                                onClick={() => {
                                    if (confirm(`¿Eliminar "${p.name}"?`)) deleteProduct(p.id);
                                }}
                            >
                                Eliminar
                            </button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-2">
                            <input className="rounded border px-2 py-2 text-sm" value={p.name} onChange={(e) => updateProduct(p.id, { name: e.target.value })} />
                            <input className="rounded border px-2 py-2 text-sm" value={p.category} onChange={(e) => updateProduct(p.id, { category: e.target.value })} />
                            <input type="number" className="rounded border px-2 py-2 text-sm" value={p.price} onChange={(e) => updateProduct(p.id, { price: Number(e.target.value) })} />
                            <input type="number" className="rounded border px-2 py-2 text-sm" value={p.stock} onChange={(e) => updateProduct(p.id, { stock: Math.max(0, Number(e.target.value)) })} />
                            <textarea className="md:col-span-2 rounded border px-2 py-2 text-sm h-20 resize-none" value={p.description || ""} onChange={(e) => updateProduct(p.id, { description: e.target.value })} />
                            <input className="md:col-span-2 rounded border px-2 py-2 text-sm" placeholder="URL imagen (opcional)" value={p.image || ""} onChange={(e) => updateProduct(p.id, { image: e.target.value })} />
                            <label className="col-span-2 inline-flex items-center justify-center gap-2 rounded-lg border border-dashed px-3 py-2 text-sm cursor-pointer hover:bg-[var(--ma-pink-50)] transition">
                                <span>📷 Elegir archivo</span>
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => onImageUpload(p.id, e.target.files?.[0])} />
                            </label>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm pt-1">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={p.available !== false} onChange={(e) => updateProduct(p.id, { available: e.target.checked })} />
                                Mostrar en tienda
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={Boolean(p.featured)} onChange={(e) => updateProduct(p.id, { featured: e.target.checked })} />
                                Destacar en home
                            </label>
                        </div>
                    </motion.div>
                )) : (
                    <div className="card overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-[var(--ma-pink-50)]">
                                <tr>
                                    <th className="text-left px-3 py-2">Producto</th>
                                    <th className="text-left px-3 py-2">Precio</th>
                                    <th className="text-left px-3 py-2">Stock</th>
                                    <th className="text-left px-3 py-2">Activo</th>
                                    <th className="text-left px-3 py-2">Home</th>
                                    <th className="text-left px-3 py-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => (
                                    <tr key={p.id} className="border-t">
                                        <td className="px-3 py-2">
                                            <div className="flex items-center gap-2">
                                                <img src={p.image || "/LogoM.png"} alt={p.name} className="size-10 rounded object-cover" />
                                                <div>
                                                    <p className="font-medium">{p.name}</p>
                                                    <p className="text-xs text-neutral-500">{p.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-2">
                                            <input type="number" className="w-24 rounded border px-2 py-1" value={p.price} onChange={(e) => updateProduct(p.id, { price: Number(e.target.value) })} />
                                        </td>
                                        <td className="px-3 py-2">
                                            <input type="number" className="w-20 rounded border px-2 py-1" value={p.stock} onChange={(e) => updateProduct(p.id, { stock: Math.max(0, Number(e.target.value)) })} />
                                        </td>
                                        <td className="px-3 py-2">
                                            <input type="checkbox" checked={p.available !== false} onChange={(e) => updateProduct(p.id, { available: e.target.checked })} />
                                        </td>
                                        <td className="px-3 py-2">
                                            <input type="checkbox" checked={Boolean(p.featured)} onChange={(e) => updateProduct(p.id, { featured: e.target.checked })} />
                                        </td>
                                        <td className="px-3 py-2">
                                            <button
                                                className="rounded-full border border-red-200 text-red-600 px-3 py-1 text-xs hover:bg-red-50 transition"
                                                onClick={() => {
                                                    if (confirm(`¿Eliminar "${p.name}"?`)) deleteProduct(p.id);
                                                }}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <div className="xl:col-span-2 card p-4 space-y-2 h-fit sticky top-24">
                <h3 className="font-semibold">Agregar producto</h3>
                {image ? (
                    <img src={image} alt="Preview producto nuevo" className="w-full max-h-52 rounded-lg object-cover border" />
                ) : null}
                <div className="grid md:grid-cols-2 gap-2">
                    <div>
                        <label className="mb-1 block text-xs font-medium text-neutral-600">Nombre</label>
                        <input className="w-full rounded border px-3 py-2" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-neutral-600">Categoría</label>
                        <input className="w-full rounded border px-3 py-2" placeholder="Categoría" value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-neutral-600">Precio</label>
                        <input
                            className="w-full rounded border px-3 py-2"
                            placeholder="Precio (RD$)"
                            aria-label="Precio del producto"
                            type="number"
                            min="0"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-neutral-600">Cantidad en stock</label>
                        <input
                            className="w-full rounded border px-3 py-2"
                            placeholder="Cantidad en stock"
                            aria-label="Cantidad disponible en stock"
                            type="number"
                            min="0"
                            step="1"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <textarea className="md:col-span-2 w-full rounded border px-3 py-2 h-24 resize-none" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input className="md:col-span-2 w-full rounded border px-3 py-2" placeholder="URL imagen (opcional)" value={image} onChange={(e) => setImage(e.target.value)} />
                    <label className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-lg border border-dashed px-3 py-2 text-sm cursor-pointer hover:bg-[var(--ma-pink-50)] transition">
                        <span>📷 Elegir archivo desde galería</span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => onNewImageUpload(e.target.files?.[0])} />
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
                        Mostrar en tienda
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
                        Destacar en home
                    </label>
                </div>
                <div className="pt-1">
                    <button className="btn-primary w-full" onClick={handleAdd}>Agregar producto</button>
                </div>
            </div>
        </div>
    );
};
