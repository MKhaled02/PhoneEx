// ═══════════════════════════════════════════════════════════════
// Product Types & Data — Shopify Storefront API Mock Layer
// In production: Replace with real Storefront API GraphQL queries
// ═══════════════════════════════════════════════════════════════

export type ProductCondition = "Wie Neu" | "Exzellent" | "Sehr Gut" | "Gut" | "Akzeptabel";

export type ProductCategory = "premium" | "midrange" | "budget";

export interface ProductSpec {
  display: string;
  chip: string;
  ram: string;
  kamera: string;
  akku: string;
  os: string;
  sim: string;
  farbe: string;
}

export interface Product {
  id: number;
  slug: string;
  title: string;
  brand: string;
  storage: string;
  condition: ProductCondition;
  conditionColor: string;
  price: number;
  oldPrice: number;
  badge: string | null;
  battery: number;
  stock: number;
  category: ProductCategory;
  description: string;
  specs: ProductSpec;
  images: string[];
}

export const CONDITION_COLORS: Record<ProductCondition, string> = {
  "Wie Neu": "#16a34a",
  "Exzellent": "#2563eb",
  "Sehr Gut": "#7c3aed",
  "Gut": "#d97706",
  "Akzeptabel": "#dc2626",
};

export const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "iphone-16-pro-max-256gb",
    title: "iPhone 16 Pro Max",
    brand: "Apple",
    storage: "256GB",
    condition: "Wie Neu",
    conditionColor: CONDITION_COLORS["Wie Neu"],
    price: 1049,
    oldPrice: 1299,
    badge: "Top Deal",
    battery: 98,
    stock: 2,
    category: "premium",
    description: "Titanium Design, A18 Pro Chip, 48MP Kamera-System mit 5x optischem Zoom. Hervorragender Zustand ohne sichtbare Gebrauchsspuren. Inklusive Originalverpackung und Ladekabel.",
    specs: { display: '6.9" Super Retina XDR OLED', chip: "A18 Pro", ram: "8 GB", kamera: "48+12+12 MP", akku: "4685 mAh", os: "iOS 18", sim: "Nano-SIM + eSIM", farbe: "Titan Schwarz" },
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop&sat=-100",
    ],
  },
  {
    id: 2,
    slug: "iphone-15-pro-max-256gb",
    title: "iPhone 15 Pro Max",
    brand: "Apple",
    storage: "256GB",
    condition: "Exzellent",
    conditionColor: CONDITION_COLORS["Exzellent"],
    price: 879,
    oldPrice: 1099,
    badge: null,
    battery: 100,
    stock: 3,
    category: "premium",
    description: "Titanium Rahmen, A17 Pro Chip. Batterie bei 100% — wie aus der Verpackung. Minimale Mikrokratzer am Rahmen, Display einwandfrei.",
    specs: { display: '6.7" Super Retina XDR OLED', chip: "A17 Pro", ram: "8 GB", kamera: "48+12+12 MP", akku: "4422 mAh", os: "iOS 17", sim: "Nano-SIM + eSIM", farbe: "Titan Natur" },
    images: [
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1592286927505-1def25115558?w=600&h=600&fit=crop",
    ],
  },
  {
    id: 3,
    slug: "samsung-galaxy-s24-ultra-256gb",
    title: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    storage: "256GB",
    condition: "Sehr Gut",
    conditionColor: CONDITION_COLORS["Sehr Gut"],
    price: 799,
    oldPrice: 999,
    badge: "Bestseller",
    battery: 95,
    stock: 4,
    category: "premium",
    description: "200MP Kamera, Titanium Rahmen, S-Pen inklusive. Leichte Gebrauchsspuren am Rahmen, Display kratzerfrei mit Original-Schutzfolie.",
    specs: { display: '6.8" Dynamic AMOLED 2X', chip: "Snapdragon 8 Gen 3", ram: "12 GB", kamera: "200+50+12+10 MP", akku: "5000 mAh", os: "Android 14 / OneUI 6.1", sim: "Nano-SIM + eSIM", farbe: "Titan Schwarz" },
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop&sat=-100",
    ],
  },
  {
    id: 4,
    slug: "iphone-15-pro-128gb",
    title: "iPhone 15 Pro",
    brand: "Apple",
    storage: "128GB",
    condition: "Gut",
    conditionColor: CONDITION_COLORS["Gut"],
    price: 649,
    oldPrice: 849,
    badge: null,
    battery: 92,
    stock: 1,
    category: "premium",
    description: "A17 Pro Chip, Action Button. Sichtbare Gebrauchsspuren am Rahmen und leichte Display-Kratzer die im Betrieb nicht stören.",
    specs: { display: '6.1" Super Retina XDR OLED', chip: "A17 Pro", ram: "8 GB", kamera: "48+12+12 MP", akku: "3274 mAh", os: "iOS 17", sim: "Nano-SIM + eSIM", farbe: "Titan Blau" },
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop&sat=-100",
    ],
  },
  {
    id: 5,
    slug: "google-pixel-9-pro-256gb",
    title: "Google Pixel 9 Pro",
    brand: "Google",
    storage: "256GB",
    condition: "Wie Neu",
    conditionColor: CONDITION_COLORS["Wie Neu"],
    price: 719,
    oldPrice: 899,
    badge: "Neu Rein",
    battery: 99,
    stock: 3,
    category: "premium",
    description: "Tensor G4 Chip, beste KI-Kamera. Keinerlei Gebrauchsspuren erkennbar, inklusive Originalverpackung und Ladekabel.",
    specs: { display: '6.3" Super Actua LTPO OLED', chip: "Tensor G4", ram: "16 GB", kamera: "50+48+48 MP", akku: "4700 mAh", os: "Android 15", sim: "Nano-SIM + eSIM", farbe: "Porcelain" },
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&sat=-100",
    ],
  },
  {
    id: 6,
    slug: "iphone-14-pro-max-256gb",
    title: "iPhone 14 Pro Max",
    brand: "Apple",
    storage: "256GB",
    condition: "Exzellent",
    conditionColor: CONDITION_COLORS["Exzellent"],
    price: 699,
    oldPrice: 879,
    badge: "Preis-Hit",
    battery: 100,
    stock: 5,
    category: "premium",
    description: "Dynamic Island, 48MP Kamera. Batterie ausgetauscht, daher 100%. Gerät in hervorragendem Zustand.",
    specs: { display: '6.7" Super Retina XDR OLED', chip: "A16 Bionic", ram: "6 GB", kamera: "48+12+12 MP", akku: "4323 mAh", os: "iOS 16", sim: "Nano-SIM + eSIM", farbe: "Deep Purple" },
    images: [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop&sat=-100",
    ],
  },
  {
    id: 10,
    slug: "iphone-14-128gb",
    title: "iPhone 14",
    brand: "Apple",
    storage: "128GB",
    condition: "Sehr Gut",
    conditionColor: CONDITION_COLORS["Sehr Gut"],
    price: 449,
    oldPrice: 599,
    badge: null,
    battery: 96,
    stock: 6,
    category: "midrange",
    description: "Bewährtes Design mit A15 Chip. Leichte Gebrauchsspuren, Display in gutem Zustand.",
    specs: { display: '6.1" Super Retina XDR OLED', chip: "A15 Bionic", ram: "6 GB", kamera: "12+12 MP", akku: "3279 mAh", os: "iOS 16", sim: "Nano-SIM + eSIM", farbe: "Midnight" },
    images: [
      "https://images.unsplash.com/photo-1592286927505-1def25115558?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1592286927505-1def25115558?w=600&h=600&fit=crop&sat=-100",
    ],
  },
  {
    id: 11,
    slug: "samsung-galaxy-a55-128gb",
    title: "Samsung Galaxy A55",
    brand: "Samsung",
    storage: "128GB",
    condition: "Wie Neu",
    conditionColor: CONDITION_COLORS["Wie Neu"],
    price: 269,
    oldPrice: 379,
    badge: "Preis-Tipp",
    battery: 100,
    stock: 8,
    category: "midrange",
    description: "Super AMOLED Display, starke Mittelklasse. Ohne Gebrauchsspuren, mit Originalverpackung.",
    specs: { display: '6.6" Super AMOLED', chip: "Exynos 1480", ram: "8 GB", kamera: "50+12+5 MP", akku: "5000 mAh", os: "Android 14 / OneUI 6.1", sim: "Nano-SIM + eSIM", farbe: "Awesome Navy" },
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop&sat=-100",
    ],
  },
  {
    id: 12,
    slug: "iphone-13-pro-256gb",
    title: "iPhone 13 Pro",
    brand: "Apple",
    storage: "256GB",
    condition: "Gut",
    conditionColor: CONDITION_COLORS["Gut"],
    price: 399,
    oldPrice: 549,
    badge: null,
    battery: 87,
    stock: 3,
    category: "midrange",
    description: "ProMotion Display, 3-Kamera-System. Gebrauchsspuren sichtbar, Display mit leichten Kratzern.",
    specs: { display: '6.1" Super Retina XDR ProMotion', chip: "A15 Bionic", ram: "6 GB", kamera: "12+12+12 MP", akku: "3095 mAh", os: "iOS 15", sim: "Nano-SIM + eSIM", farbe: "Sierra Blue" },
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop&sat=-100",
    ],
  },
  {
    id: 13,
    slug: "google-pixel-8-128gb",
    title: "Google Pixel 8",
    brand: "Google",
    storage: "128GB",
    condition: "Sehr Gut",
    conditionColor: CONDITION_COLORS["Sehr Gut"],
    price: 329,
    oldPrice: 449,
    badge: null,
    battery: 94,
    stock: 4,
    category: "midrange",
    description: "Tensor G3, 7 Jahre Updates garantiert. Minimale Gebrauchsspuren.",
    specs: { display: '6.2" OLED', chip: "Tensor G3", ram: "8 GB", kamera: "50+12 MP", akku: "4575 mAh", os: "Android 14", sim: "Nano-SIM + eSIM", farbe: "Obsidian" },
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&sat=-100",
    ],
  },
  {
    id: 14,
    slug: "samsung-galaxy-s23-128gb",
    title: "Samsung Galaxy S23",
    brand: "Samsung",
    storage: "128GB",
    condition: "Gut",
    conditionColor: CONDITION_COLORS["Gut"],
    price: 349,
    oldPrice: 479,
    badge: null,
    battery: 91,
    stock: 5,
    category: "midrange",
    description: "Kompaktes Flaggschiff, Snapdragon 8 Gen 2. Gebrauchsspuren vorhanden.",
    specs: { display: '6.1" Dynamic AMOLED 2X', chip: "Snapdragon 8 Gen 2", ram: "8 GB", kamera: "50+12+10 MP", akku: "3900 mAh", os: "Android 13 / OneUI 5.1", sim: "Nano-SIM + eSIM", farbe: "Phantom Black" },
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop&sat=-100",
    ],
  },
  {
    id: 15,
    slug: "iphone-13-128gb",
    title: "iPhone 13",
    brand: "Apple",
    storage: "128GB",
    condition: "Akzeptabel",
    conditionColor: CONDITION_COLORS["Akzeptabel"],
    price: 269,
    oldPrice: 399,
    badge: "Budget Pick",
    battery: 83,
    stock: 7,
    category: "budget",
    description: "Solides iPhone mit A15 Chip. Deutliche Gebrauchsspuren, Funktion einwandfrei.",
    specs: { display: '6.1" Super Retina XDR OLED', chip: "A15 Bionic", ram: "4 GB", kamera: "12+12 MP", akku: "3227 mAh", os: "iOS 15", sim: "Nano-SIM + eSIM", farbe: "Midnight" },
    images: [
      "https://images.unsplash.com/photo-1592286927505-1def25115558?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1592286927505-1def25115558?w=600&h=600&fit=crop&sat=-100",
    ],
  },
  {
    id: 20,
    slug: "iphone-12-64gb",
    title: "iPhone 12",
    brand: "Apple",
    storage: "64GB",
    condition: "Gut",
    conditionColor: CONDITION_COLORS["Gut"],
    price: 219,
    oldPrice: 319,
    badge: null,
    battery: 81,
    stock: 4,
    category: "budget",
    description: "5G iPhone zum Einstiegspreis. Gebrauchsspuren sichtbar, aber voll funktionsfähig.",
    specs: { display: '6.1" Super Retina XDR OLED', chip: "A14 Bionic", ram: "4 GB", kamera: "12+12 MP", akku: "2815 mAh", os: "iOS 14", sim: "Nano-SIM + eSIM", farbe: "Blue" },
    images: [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop&sat=-100",
    ],
  },
  {
    id: 21,
    slug: "samsung-galaxy-a35-128gb",
    title: "Samsung Galaxy A35",
    brand: "Samsung",
    storage: "128GB",
    condition: "Wie Neu",
    conditionColor: CONDITION_COLORS["Wie Neu"],
    price: 199,
    oldPrice: 299,
    badge: null,
    battery: 100,
    stock: 9,
    category: "budget",
    description: "Tolles Preis-Leistungs-Verhältnis. Ohne Gebrauchsspuren.",
    specs: { display: '6.6" Super AMOLED', chip: "Exynos 1380", ram: "6 GB", kamera: "50+8+5 MP", akku: "5000 mAh", os: "Android 14", sim: "Nano-SIM", farbe: "Awesome Lilac" },
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop&sat=-100",
    ],
  },
  {
    id: 22,
    slug: "google-pixel-7a-128gb",
    title: "Google Pixel 7a",
    brand: "Google",
    storage: "128GB",
    condition: "Sehr Gut",
    conditionColor: CONDITION_COLORS["Sehr Gut"],
    price: 229,
    oldPrice: 329,
    badge: null,
    battery: 92,
    stock: 3,
    category: "budget",
    description: "Beste Kamera unter 250€. Minimale Gebrauchsspuren.",
    specs: { display: '6.1" OLED 90Hz', chip: "Tensor G2", ram: "8 GB", kamera: "64+13 MP", akku: "4385 mAh", os: "Android 13", sim: "Nano-SIM + eSIM", farbe: "Charcoal" },
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&sat=-100",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: number): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return ALL_PRODUCTS.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return ALL_PRODUCTS.filter((p) => p.id !== product.id && p.brand === product.brand).slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return ALL_PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.storage.toLowerCase().includes(q) ||
      p.condition.toLowerCase().includes(q)
  );
}

export const ALL_BRANDS = [...new Set(ALL_PRODUCTS.map((p) => p.brand))];
export const ALL_CONDITIONS: ProductCondition[] = ["Wie Neu", "Exzellent", "Sehr Gut", "Gut", "Akzeptabel"];
