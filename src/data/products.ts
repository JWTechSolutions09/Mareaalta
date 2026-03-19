export type Product = {
    id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    description?: string;
    image?: string; // ruta en /public/products/<file>.jpg
    featured?: boolean;
};

export const products: Product[] = [
    { id: "p1", name: "Vestido floral rosa", price: 49.9, stock: 14, category: "Vestidos", description: "Corte midi, silueta femenina.", image: "/products/vestido-floral.jpg", featured: true },
    { id: "p2", name: "Blusa encaje blanco", price: 29.5, stock: 6, category: "Blusas", description: "Detalles delicados, suave al tacto.", image: "/products/blusa-encaje.jpg", featured: true },
    { id: "p3", name: "Falda satinada negra", price: 39.0, stock: 2, category: "Faldas", description: "Elegante y versátil.", image: "/products/falda-satinada.jpg" },
    { id: "p4", name: "Cardigan pastel", price: 34.0, stock: 9, category: "Abrigos", description: "Tono rosa claro, tejido ligero.", image: "/products/cardigan-pastel.jpg" },
    { id: "p5", name: "Jeans recto", price: 45.0, stock: 11, category: "Jeans", description: "Corte recto, cómodo.", image: "/products/jeans-recto.jpg", featured: true },
    { id: "p6", name: "Top lencero perla", price: 24.0, stock: 15, category: "Tops", description: "Satín perla, tirantes finos.", image: "/products/top-lencero.jpg" },
    { id: "p7", name: "Blazer negro minimal", price: 59.0, stock: 7, category: "Blazers", description: "Corte recto, esencial.", image: "/products/blazer-negro.jpg", featured: true },
    { id: "p8", name: "Vestido slip rosa pálido", price: 52.0, stock: 5, category: "Vestidos", description: "Slip dress satinado.", image: "/products/vestido-slip.jpg" },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
