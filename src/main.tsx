import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style.css";
import { AppLayout } from "./ui/AppLayout";
import { LandingPage } from "./pages/LandingPage";
import { ShopPage } from "./pages/ShopPage";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminOrders } from "./pages/admin/AdminOrders";
import { AdminAnalytics } from "./pages/admin/AdminAnalytics";
import { AdminInventory } from "./pages/admin/AdminInventory";
import { AdminRoles } from "./pages/admin/AdminRoles";
import { RequireRole } from "./security/RequireRole";
import { CheckoutPage } from "./pages/CheckoutPage";
import { AdminAppearance } from "./pages/admin/AdminAppearance";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { index: true, element: <LandingPage /> },
            { path: "tienda", element: <ShopPage /> },
            { path: "producto/:id", element: <ProductPage /> },
            { path: "carrito", element: <CartPage /> },
            { path: "checkout", element: <CheckoutPage /> },
            { path: "contacto", element: <ContactPage /> },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { index: true, element: <AdminLoginPage /> },
            {
                path: "dashboard",
                element: (
                    <RequireRole roles={['admin', 'manager']}>
                        <AdminDashboard />
                    </RequireRole>
                ),
            },
            {
                path: "pedidos",
                element: (
                    <RequireRole roles={['admin', 'manager']}>
                        <AdminOrders />
                    </RequireRole>
                ),
            },
            {
                path: "analiticas",
                element: (
                    <RequireRole roles={['admin', 'manager']}>
                        <AdminAnalytics />
                    </RequireRole>
                ),
            },
            {
                path: "inventario",
                element: (
                    <RequireRole roles={['admin']}>
                        <AdminInventory />
                    </RequireRole>
                ),
            },
            {
                path: "roles",
                element: (
                    <RequireRole roles={['admin']}>
                        <AdminRoles />
                    </RequireRole>
                ),
            },
            {
                path: "apariencia",
                element: (
                    <RequireRole roles={['admin']}>
                        <AdminAppearance />
                    </RequireRole>
                ),
            },
        ],
    },
]);

const root = createRoot(document.getElementById("root")!);
root.render(<RouterProvider router={router} />);
