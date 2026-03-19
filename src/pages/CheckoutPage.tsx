import React, { useMemo, useState } from "react";
import { useCartStore } from "../zustand/cartStore";
import { useNavigate } from "react-router-dom";

export const CheckoutPage: React.FC = () => {
  const { items, clear } = useCartStore();
  const navigate = useNavigate();
  const total = useMemo(() => items.reduce((a, b) => a + b.product.price * b.quantity, 0), [items]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    shipping: "pickup", // pickup | local | nacional
    payment: "transfer", // transfer | cash
    notes: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.phone) {
      alert("Por favor completa tu nombre y teléfono.");
      return;
    }
    const lines = [
      `Nuevo pedido - MareaAlta`,
      `Nombre: ${form.name}`,
      `Teléfono: ${form.phone}`,
      form.email ? `Email: ${form.email}` : "",
      `Dirección: ${form.address || "-"}`,
      `Envío: ${form.shipping}`,
      `Pago: ${form.payment}`,
      form.notes ? `Notas: ${form.notes}` : "",
      `---`,
      ...items.map(i => `• ${i.product.name} x${i.quantity} - $${(i.product.price * i.quantity).toFixed(2)}`),
      `Total: $${total.toFixed(2)}`
    ].filter(Boolean).join("\n");

    const url = `https://wa.me/18492016099?text=${encodeURIComponent(lines)}`;
    // Guardado local simple
    localStorage.setItem("ma-last-order", JSON.stringify({ form, items, total, createdAt: new Date().toISOString() }));
    clear();
    window.location.href = url;
  };

  if (items.length === 0) {
    return (
      <div className="text-center">
        <p className="mb-4">Tu carrito está vacío.</p>
        <button className="btn-primary" onClick={() => navigate("/tienda")}>Ir a la tienda</button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 card p-4 space-y-3">
        <h2 className="heading-serif text-2xl text-[var(--ma-black)]">Datos de envío y pago</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <input className="rounded border px-3 py-2" placeholder="Nombre completo" name="name" value={form.name} onChange={onChange} />
          <input className="rounded border px-3 py-2" placeholder="Teléfono" name="phone" value={form.phone} onChange={onChange} />
          <input className="rounded border px-3 py-2" placeholder="Email (opcional)" name="email" value={form.email} onChange={onChange} />
          <select className="rounded border px-3 py-2" name="shipping" value={form.shipping} onChange={onChange}>
            <option value="pickup">Retiro en tienda</option>
            <option value="local">Envío local</option>
            <option value="nacional">Envío nacional</option>
          </select>
          <select className="rounded border px-3 py-2" name="payment" value={form.payment} onChange={onChange}>
            <option value="transfer">Transferencia bancaria</option>
            <option value="cash">Efectivo al recibir</option>
          </select>
        </div>
        <input className="rounded border px-3 py-2 w-full" placeholder="Dirección (si aplica)" name="address" value={form.address} onChange={onChange} />
        <textarea className="rounded border px-3 py-2 w-full h-28 resize-none" placeholder="Notas adicionales" name="notes" value={form.notes} onChange={onChange} />
      </div>
      <div className="card p-4">
        <h3 className="font-semibold mb-2">Resumen</h3>
        <ul className="text-sm text-neutral-600 space-y-1">
          {items.map((i) => (
            <li key={i.product.id} className="flex justify-between">
              <span>{i.product.name} x{i.quantity}</span>
              <span>${(i.product.price * i.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-between">
          <p className="font-semibold">Total</p>
          <p className="text-lg font-semibold">${total.toFixed(2)}</p>
        </div>
        <button className="btn-primary w-full mt-4" onClick={handleSubmit}>Confirmar por WhatsApp</button>
        <button className="btn-outline w-full mt-2" onClick={() => navigate("/carrito")}>Volver al carrito</button>
      </div>
    </div>
  );
};
