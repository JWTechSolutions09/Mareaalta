import React from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartStore } from "../zustand/cartStore";
import { Logo } from "./Logo";
import { useInventoryStore } from "../zustand/inventoryStore";
import { useSiteAssetsStore } from "../zustand/siteAssetsStore";

export const AppLayout: React.FC = () => {
  const cartCount = useCartStore((s) => s.totalItems);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const fetchProducts = useInventoryStore((s) => s.fetchProducts);
  const fetchAssets = useSiteAssetsStore((s) => s.fetchAssets);
  const pendingAboutScrollRef = React.useRef(false);

  React.useEffect(() => {
    void fetchProducts().catch(() => undefined);
    void fetchAssets().catch(() => undefined);
  }, [fetchProducts, fetchAssets]);

  const scrollToAbout = React.useCallback((attempt = 0) => {
    const target = document.getElementById("sobre");
    if (!target) {
      if (attempt < 12) {
        window.setTimeout(() => scrollToAbout(attempt + 1), 90);
      }
      return;
    }
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const offset = desktop ? 120 : 0;
    // More reliable on mobile browsers than direct window.scrollTo.
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      window.scrollBy({ top: -offset, behavior: "smooth" });
    }, 220);
    pendingAboutScrollRef.current = false;
  }, []);

  React.useEffect(() => {
    if (location.pathname !== "/") return;
    if (location.hash === "#sobre" || pendingAboutScrollRef.current) {
      window.setTimeout(() => scrollToAbout(), 40);
    }
  }, [location.pathname, location.hash, scrollToAbout]);

  const goToAboutSection = (closeMenu = false) => {
    if (closeMenu) setOpen(false);
    pendingAboutScrollRef.current = true;
    if (location.pathname === "/") {
      if (closeMenu) {
        window.setTimeout(() => scrollToAbout(), 220);
      } else {
        scrollToAbout();
      }
      return;
    }
    navigate({ pathname: "/", hash: "#sobre" });
  };

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
            <button className="hover:text-[var(--ma-pink-500)]" onClick={() => goToAboutSection()}>Sobre</button>
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
              <button className="text-left" onClick={() => goToAboutSection(true)}>Sobre</button>
              <NavLink to="/contacto" onClick={() => setOpen(false)}>Contacto</NavLink>
              <NavLink to="/admin" onClick={() => setOpen(false)} className="btn-outline-gold w-fit">Login</NavLink>
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
          <div className="flex items-center gap-3">
            <a
              className="inline-flex items-center justify-center rounded-full border p-2 hover:border-[var(--ma-pink-300)] hover:bg-[var(--ma-pink-50)] transition"
              href="https://instagram.com/mareaalta.rd"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram mareaalta.rd"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.6" cy="6.6" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full border p-2 hover:border-[var(--ma-pink-300)] hover:bg-[var(--ma-pink-50)] transition"
              href="https://wa.me/18292605027"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp 1-829-260-5027"
              title="WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 12a8 8 0 0 1-11.7 7l-4.3 1.1 1.1-4.1A8 8 0 1 1 20 12Z" />
                <path d="M9.2 8.9c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .5.3l.8 2c.1.2.1.4 0 .6l-.4.6c-.1.2-.1.3 0 .5.2.3.8 1.2 1.9 1.8.3.2.5.2.7 0l.6-.7c.2-.2.4-.2.6-.1l1.9.9c.2.1.3.2.3.4v.5c0 .4-.2.6-.5.8-.4.2-1.1.4-1.8.2-1.1-.3-2.3-1-3.5-2.1-1.1-1.1-1.8-2.2-2.1-3.3-.2-.7 0-1.5.2-1.9Z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
