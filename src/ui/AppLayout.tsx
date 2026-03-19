import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartStore } from "../zustand/cartStore";
import { Logo } from "./Logo";
import { useInventoryStore } from "../zustand/inventoryStore";
import { useSiteAssetsStore } from "../zustand/siteAssetsStore";

export const AppLayout: React.FC = () => {
  const cartCount = useCartStore((s) => s.totalItems);
  const [open, setOpen] = React.useState(false);
  const fetchProducts = useInventoryStore((s) => s.fetchProducts);
  const fetchAssets = useSiteAssetsStore((s) => s.fetchAssets);

  React.useEffect(() => {
    void fetchProducts().catch(() => undefined);
    void fetchAssets().catch(() => undefined);
  }, [fetchProducts, fetchAssets]);

  return (
    <div className="min-h-dvh bg-[var(--ma-white)] text-[var(--ma-text)]">
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
        <div className="container-ma flex items-center justify-between py-3 md:py-4">
          <NavLink to="/" className="flex items-center gap-2" aria-label="Inicio Marea Alta">
            <Logo size="lg" />
          </NavLink>
          <nav className="hidden md:flex items-center gap-6 text-sm md:text-base">
            <NavLink to="/" className={({isActive}) => isActive ? "gold-text" : "hover:text-[var(--ma-pink-500)]"}>Home</NavLink>
            <NavLink to="/tienda" className={({isActive}) => isActive ? "gold-text" : "hover:text-[var(--ma-pink-500)]"}>Tienda</NavLink>
            <NavLink to="/#sobre" className="hover:text-[var(--ma-pink-500)]">Sobre</NavLink>
            <NavLink to="/contacto" className={({isActive}) => isActive ? "gold-text" : "hover:text-[var(--ma-pink-500)]"}>Contacto</NavLink>
            <NavLink to="/admin" className="btn-outline-gold !px-4 !py-1.5">Login</NavLink>
            <NavLink to="/carrito" className="relative">
              <span>Carrito</span>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-3 -top-2 rounded-full bg-[var(--ma-pink-500)] px-2 text-xs font-semibold text-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </NavLink>
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <button className="btn-outline text-xs" onClick={() => setOpen((v) => !v)}>Menú</button>
            <NavLink to="/carrito" className="btn-primary text-xs">Carrito ({cartCount})</NavLink>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t bg-white/95">
            <div className="container-ma py-3 flex flex-col gap-2 text-sm">
              <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
              <NavLink to="/tienda" onClick={() => setOpen(false)}>Tienda</NavLink>
              <NavLink to="/#sobre" onClick={() => setOpen(false)}>Sobre</NavLink>
              <NavLink to="/contacto" onClick={() => setOpen(false)}>Contacto</NavLink>
              <NavLink to="/admin" onClick={() => setOpen(false)} className="btn-outline-gold w-fit">Acceder a Admin</NavLink>
            </div>
          </div>
        )}
      </header>
      <main className="container-ma py-8 md:py-12">
        <Outlet />
      </main>
      <footer className="mt-16 border-t">
        <div className="container-ma py-8 text-sm text-neutral-500 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} mareaalta</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-[var(--ma-pink-500)]" href="https://instagram.com/mareaalta.rd" target="_blank" rel="noreferrer">@mareaalta.rd</a>
            <a className="hover:text-[var(--ma-pink-500)]" href="https://wa.me/18492016099" target="_blank" rel="noreferrer">WhatsApp: 849-201-6099</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
