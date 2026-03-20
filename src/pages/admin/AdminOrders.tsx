import React from "react";
import { motion } from "framer-motion";
import { useOrdersStore, type OrderStatus } from "../../zustand/ordersStore";

export const AdminOrders: React.FC = () => {
    const { orders, updateStatus, fetchOrders, deleteOrder } = useOrdersStore();
    const [statusFilter, setStatusFilter] = React.useState<"todos" | OrderStatus>("todos");
    React.useEffect(() => {
        void fetchOrders().catch(() => undefined);
    }, [fetchOrders]);
    const statusMap: Record<OrderStatus, string> = {
        "en-curso": "En curso",
        cancelado: "Cancelado",
        entregado: "Entregado",
    };
    const filteredOrders = statusFilter === "todos"
        ? orders.filter((o) => o.status !== "cancelado")
        : orders.filter((o) => o.status === statusFilter);

    return (
        <div>
            <h2 className="heading-serif text-2xl text-[var(--ma-black)] mb-4">Pedidos</h2>
            <p className="text-sm text-neutral-600 mb-4">Pedidos existentes con datos completos del comprador.</p>
            <div className="mb-4 flex items-center gap-2">
                <label htmlFor="status-filter" className="text-sm text-neutral-700">Filtrar por estado:</label>
                <select
                    id="status-filter"
                    className="text-sm rounded-full px-3 py-1 border bg-white"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as "todos" | OrderStatus)}
                >
                    <option value="todos">Todos</option>
                    <option value="en-curso">{statusMap["en-curso"]}</option>
                    <option value="entregado">{statusMap.entregado}</option>
                    <option value="cancelado">{statusMap.cancelado}</option>
                </select>
            </div>
            <div className="space-y-3">
                {filteredOrders.length === 0 ? (
                    <div className="card p-4 text-sm text-neutral-600">Aún no hay pedidos registrados.</div>
                ) : filteredOrders.map((o, idx) => (
                    <motion.div
                        key={o.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: idx * 0.05 }}
                        className="card p-4"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="font-semibold">#{o.id}</p>
                            <select
                                className="text-sm rounded-full px-3 py-1 border bg-[var(--ma-pink-50)]"
                                value={o.status}
                                onChange={(e) => { void updateStatus(o.id, e.target.value as OrderStatus); }}
                            >
                                <option value="en-curso">{statusMap["en-curso"]}</option>
                                <option value="cancelado">{statusMap.cancelado}</option>
                                <option value="entregado">{statusMap.entregado}</option>
                            </select>
                            {o.status === "cancelado" && (
                                <button
                                    className="text-sm rounded-full px-3 py-1 border border-red-300 text-red-600 hover:bg-red-50"
                                    onClick={() => {
                                        const confirmed = window.confirm("¿Eliminar este pedido cancelado?");
                                        if (!confirmed) return;
                                        void deleteOrder(o.id);
                                    }}
                                >
                                    Eliminar
                                </button>
                            )}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mt-3">
                            <div className="text-sm text-neutral-700 space-y-1">
                                <p><strong>Comprador:</strong> {o.customer.name}</p>
                                <p><strong>Tel:</strong> {o.customer.phone}</p>
                                <p><strong>Email:</strong> {o.customer.email || "-"}</p>
                                <p><strong>Dirección:</strong> {o.customer.address || "-"}</p>
                                <p><strong>Envío:</strong> {o.customer.shipping}</p>
                                <p><strong>Pago:</strong> {o.customer.payment}</p>
                                {o.customer.notes ? <p><strong>Notas:</strong> {o.customer.notes}</p> : null}
                            </div>
                            <ul className="text-sm text-neutral-600 space-y-1">
                                <p className="font-medium text-neutral-800">Productos:</p>
                                {o.items.map((it, idx) => {
                                    return <li key={idx}>{it.name} x {it.quantity} - ${(it.price * it.quantity).toFixed(2)}</li>;
                                })}
                            </ul>
                        </div>
                        <p className="mt-2 text-xs text-neutral-500">Creado: {new Date(o.createdAt).toLocaleString()}</p>
                        <p className="mt-2 font-medium">${o.total.toFixed(2)}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
