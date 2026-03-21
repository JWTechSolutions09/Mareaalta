import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useInventoryStore } from "../zustand/inventoryStore";
import { useSiteAssetsStore } from "../zustand/siteAssetsStore";
import { useCartStore } from "../zustand/cartStore";
import { PRODUCT_CATEGORIES } from "../data/products";

/** Categorías mostradas en Colecciones destacadas (mismas que en tienda, sin «Otros»). */
const COLECCIONES_DESTACADAS = PRODUCT_CATEGORIES.filter((c) => c !== "Otros");

export const LandingPage: React.FC = () => {
    const allProducts = useInventoryStore((s) => s.products);
    const heroMainImage = useSiteAssetsStore((s) => s.heroMainImage);
    const aboutImage = useSiteAssetsStore((s) => s.aboutImage);
    const addToCart = useCartStore((s) => s.addItem);
    const [addedProductId, setAddedProductId] = React.useState<string | null>(null);
    const featuredProducts = useMemo(
        () => allProducts.filter((p) => p.featured && p.available !== false).slice(0, 4),
        [allProducts]
    );
    const handleAddFeatured = (productId: string) => {
        const product = featuredProducts.find((p) => p.id === productId);
        if (!product) return;
        addToCart(product, 1);
        setAddedProductId(productId);
        window.setTimeout(() => setAddedProductId(null), 1400);
    };

    return (
        <div className="space-y-16">
            <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="heading-serif text-4xl md:text-6xl text-[var(--ma-black)]">
                        Moda que <span className="gold-text">abraza</span> tu esencia
                    </h1>
                    <div className="gold-divider mt-3" />
                    <p className="mt-4 text-neutral-600">
                        En Marea Alta encontrarás bikinis, trajes de baño, ropa femenina para el verano y todo lo
                        necesario para la temporada, además de cuidado para la piel y accesorios.
                        <br />
                        <br />
                        Cada producto es seleccionado por su calidad, estilo y versatilidad, para que te sientas
                        segura, fresca y auténtica.
                    </p>
                    <div className="mt-6 flex gap-3">
                        <NavLink to="/tienda" className="btn-primary">Comprar ahora</NavLink>
                        <NavLink to="/contacto" className="btn-outline-gold">Conócenos</NavLink>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                    <div className="w-full flex items-center justify-center">
                        <img
                            src={heroMainImage || "/LogoM.png"}
                            alt="Marea Alta"
                            className="max-w-full h-auto select-none pointer-events-none rounded-3xl shadow-sm"
                        />
                    </div>
                </motion.div>
            </section>

            <section id="colecciones">
                <h2 className="heading-serif text-2xl md:text-3xl text-[var(--ma-black)] mb-2">Colecciones destacadas</h2>
                <p className="text-neutral-600 mb-6">Explora nuestras categorías más queridas y los productos destacados del mes.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {COLECCIONES_DESTACADAS.map((c) => (
                        <NavLink
                            key={c}
                            to={{ pathname: "/tienda", search: `?categoria=${encodeURIComponent(c)}` }}
                            className="card p-4 text-center hover:shadow-md transition relative block text-[var(--ma-text)] hover:border-[var(--ma-pink-200)]"
                        >
                            <img src={`/home/${c.toLowerCase()}.jpg`} alt="" className="aspect-square w-full rounded-xl object-cover mb-3" onError={(e: any) => { e.currentTarget.style.display = 'none' }} />
                            <div className="aspect-square rounded-xl bg-[var(--ma-pink-50)] mb-3 hidden" />
                            <p className="font-medium">{c}</p>
                        </NavLink>
                    ))}
                </div>
                <div className="mt-8">
                    <h3 className="font-semibold mb-3 gold-text">Productos destacados</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {featuredProducts.map(p => (
                            <div key={p.id} className="card p-3">
                                <img src={p.image} alt={p.name} className="aspect-square w-full rounded-lg object-cover mb-2" />
                                <p className="text-sm font-medium">{p.name}</p>
                                <p className="text-xs text-neutral-500">${p.price.toFixed(2)}</p>
                                <div className="mt-2 flex gap-2">
                                    <NavLink to={`/producto/${p.id}`} className="btn-outline !px-3 !py-1.5 text-xs">Ver</NavLink>
                                    <button
                                        className={`btn-primary !px-3 !py-1.5 text-xs transition-all ${addedProductId === p.id ? "opacity-90" : ""}`}
                                        onClick={() => handleAddFeatured(p.id)}
                                    >
                                        {addedProductId === p.id ? "Agregado" : "Agregar"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="sobre">
                <h2 className="heading-serif text-2xl md:text-3xl text-[var(--ma-black)] mb-6">Sobre mareaalta</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <p className="text-neutral-700 leading-relaxed">
                            Somos una tienda de moda femenina enfocada en diseños atemporales, materiales cuidados
                            y una experiencia de compra amable. Cada pieza es seleccionada para acompañarte en tu día a día con confianza.
                        </p>
                        <div className="gold-divider" />
                        <div className="grid sm:grid-cols-2 gap-3">
                            <div className="card p-4">
                                <p className="font-semibold">Visión</p>
                                <p className="text-sm text-neutral-600">Ser referencia regional en moda femenina consciente y elegante.</p>
                            </div>
                            <div className="card p-4">
                                <p className="font-semibold">Misión</p>
                                <p className="text-sm text-neutral-600">Ofrecer prendas de calidad que celebren lo femenino con comodidad y estilo.</p>
                            </div>
                            <div className="card p-4">
                                <p className="font-semibold">Servicios</p>
                                <p className="text-sm text-neutral-600">Asesoría de tallas, atención por WhatsApp, envíos y cambios ágiles.</p>
                            </div>
                            <div className="card p-4">
                                <p className="font-semibold">Calidad</p>
                                <p className="text-sm text-neutral-600">Textiles seleccionados, control de acabados y empaques cuidados.</p>
                            </div>
                        </div>
                    </div>
                    <img
                        src={aboutImage || "/LogoM.png"}
                        alt="Imagen sobre Mareaalta"
                        className="rounded-3xl border h-[300px] md:h-full w-full object-cover"
                    />
                </div>
            </section>

            <section>
                <h2 className="heading-serif text-2xl md:text-3xl text-[var(--ma-black)] mb-6">Reseñas</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {["Hermosas piezas y excelente atención.", "Me encantó la calidad y los colores.", "Entrega rápida y empaque precioso."].map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="card p-4 text-sm text-neutral-700"
                        >
                            {t}
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};
