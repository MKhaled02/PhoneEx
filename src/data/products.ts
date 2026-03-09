// ═══════════════════════════════════════════════════════════════
// Product Types & Data — Strukturiert nach Marken
// ═══════════════════════════════════════════════════════════════

export type ProductCondition = "Wie Neu" | "Exzellent" | "Sehr Gut" | "Gut" | "Akzeptabel";

export type ProductBrand = "Apple" | "Samsung" | "Google" | "Xiaomi" | "OnePlus";

export type StorageSize = "64GB" | "128GB" | "256GB" | "512GB" | "1TB";

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
  brand: ProductBrand;
  model: string; // z.B. "iPhone 16 Pro Max" ohne Speicher
  storage: StorageSize;
  condition: ProductCondition;
  conditionColor: string;
  price: number;
  oldPrice: number;
  badge: string | null;
  battery: number;
  stock: number;
  year: number; // Erscheinungsjahr für Sortierung
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

export const BRAND_LOGOS: Record<ProductBrand, string> = {
  Apple: "🍎",
  Samsung: "📱",
  Google: "🔍",
  Xiaomi: "📲",
  OnePlus: "➕",
};

// Preis-Bereiche für Filter
export const PRICE_RANGES = [
  { label: "Unter 200€", min: 0, max: 199 },
  { label: "200€ - 400€", min: 200, max: 400 },
  { label: "400€ - 600€", min: 400, max: 600 },
  { label: "600€ - 800€", min: 600, max: 800 },
  { label: "Über 800€", min: 800, max: Infinity },
];

// Batterie-Filter
export const BATTERY_RANGES = [
  { label: "90%+", min: 90 },
  { label: "80%+", min: 80 },
  { label: "Alle", min: 0 },
];

export const ALL_PRODUCTS: Product[] = [
  // ═══════════════════════════════════════════════════════════════
  // APPLE iPHONE
  // ═══════════════════════════════════════════════════════════════

  // iPhone 16 Pro Max
  {
    id: 1,
    slug: "iphone-16-pro-max-256gb-wie-neu",
    title: "iPhone 16 Pro Max 256GB",
    brand: "Apple",
    model: "iPhone 16 Pro Max",
    storage: "256GB",
    condition: "Wie Neu",
    conditionColor: CONDITION_COLORS["Wie Neu"],
    price: 1049,
    oldPrice: 1299,
    badge: "Top Deal",
    battery: 98,
    stock: 2,
    year: 2024,
    description: "Titanium Design, A18 Pro Chip, 48MP Kamera-System mit 5x optischem Zoom. Hervorragender Zustand ohne sichtbare Gebrauchsspuren.",
    specs: { display: '6.9" Super Retina XDR OLED', chip: "A18 Pro", ram: "8 GB", kamera: "48+12+12 MP", akku: "4685 mAh", os: "iOS 18", sim: "Nano-SIM + eSIM", farbe: "Titan Schwarz" },
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop"],
  },
  {
    id: 2,
    slug: "iphone-16-pro-max-512gb-exzellent",
    title: "iPhone 16 Pro Max 512GB",
    brand: "Apple",
    model: "iPhone 16 Pro Max",
    storage: "512GB",
    condition: "Exzellent",
    conditionColor: CONDITION_COLORS["Exzellent"],
    price: 1149,
    oldPrice: 1449,
    badge: null,
    battery: 96,
    stock: 1,
    year: 2024,
    description: "Maximaler Speicher, A18 Pro Chip. Minimale Gebrauchsspuren am Rahmen.",
    specs: { display: '6.9" Super Retina XDR OLED', chip: "A18 Pro", ram: "8 GB", kamera: "48+12+12 MP", akku: "4685 mAh", os: "iOS 18", sim: "Nano-SIM + eSIM", farbe: "Titan Natur" },
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop"],
  },

  // iPhone 16 Pro
  {
    id: 3,
    slug: "iphone-16-pro-128gb-wie-neu",
    title: "iPhone 16 Pro 128GB",
    brand: "Apple",
    model: "iPhone 16 Pro",
    storage: "128GB",
    condition: "Wie Neu",
    conditionColor: CONDITION_COLORS["Wie Neu"],
    price: 899,
    oldPrice: 1099,
    badge: "Neu rein",
    battery: 100,
    stock: 3,
    year: 2024,
    description: "Kompaktes Pro-Modell mit A18 Pro Chip. Keine Gebrauchsspuren.",
    specs: { display: '6.3" Super Retina XDR OLED', chip: "A18 Pro", ram: "8 GB", kamera: "48+12+12 MP", akku: "3582 mAh", os: "iOS 18", sim: "Nano-SIM + eSIM", farbe: "Titan Blau" },
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop"],
  },
  {
    id: 4,
    slug: "iphone-16-pro-256gb-sehr-gut",
    title: "iPhone 16 Pro 256GB",
    brand: "Apple",
    model: "iPhone 16 Pro",
    storage: "256GB",
    condition: "Sehr Gut",
    conditionColor: CONDITION_COLORS["Sehr Gut"],
    price: 879,
    oldPrice: 1149,
    badge: null,
    battery: 94,
    stock: 2,
    year: 2024,
    description: "256GB Speicher, leichte Gebrauchsspuren am Rahmen.",
    specs: { display: '6.3" Super Retina XDR OLED', chip: "A18 Pro", ram: "8 GB", kamera: "48+12+12 MP", akku: "3582 mAh", os: "iOS 18", sim: "Nano-SIM + eSIM", farbe: "Titan Schwarz" },
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop"],
  },

  // iPhone 15 Pro Max
  {
    id: 5,
    slug: "iphone-15-pro-max-256gb-exzellent",
    title: "iPhone 15 Pro Max 256GB",
    brand: "Apple",
    model: "iPhone 15 Pro Max",
    storage: "256GB",
    condition: "Exzellent",
    conditionColor: CONDITION_COLORS["Exzellent"],
    price: 879,
    oldPrice: 1099,
    badge: "Bestseller",
    battery: 100,
    stock: 3,
    year: 2023,
    description: "Titanium Rahmen, A17 Pro Chip. Batterie bei 100% — wie aus der Verpackung.",
    specs: { display: '6.7" Super Retina XDR OLED', chip: "A17 Pro", ram: "8 GB", kamera: "48+12+12 MP", akku: "4422 mAh", os: "iOS 17", sim: "Nano-SIM + eSIM", farbe: "Titan Natur" },
    images: ["https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&h=600&fit=crop"],
  },
  {
    id: 6,
    slug: "iphone-15-pro-max-512gb-gut",
    title: "iPhone 15 Pro Max 512GB",
    brand: "Apple",
    model: "iPhone 15 Pro Max",
    storage: "512GB",
    condition: "Gut",
    conditionColor: CONDITION_COLORS["Gut"],
    price: 799,
    oldPrice: 1099,
    badge: "Preis-Hit",
    battery: 89,
    stock: 2,
    year: 2023,
    description: "Großer Speicher zum günstigen Preis. Sichtbare Gebrauchsspuren.",
    specs: { display: '6.7" Super Retina XDR OLED', chip: "A17 Pro", ram: "8 GB", kamera: "48+12+12 MP", akku: "4422 mAh", os: "iOS 17", sim: "Nano-SIM + eSIM", farbe: "Titan Blau" },
    images: ["https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&h=600&fit=crop"],
  },

  // iPhone 15 Pro
  {
    id: 7,
    slug: "iphone-15-pro-128gb-sehr-gut",
    title: "iPhone 15 Pro 128GB",
    brand: "Apple",
    model: "iPhone 15 Pro",
    storage: "128GB",
    condition: "Sehr Gut",
    conditionColor: CONDITION_COLORS["Sehr Gut"],
    price: 649,
    oldPrice: 849,
    badge: null,
    battery: 92,
    stock: 4,
    year: 2023,
    description: "A17 Pro Chip, Action Button. Minimale Gebrauchsspuren.",
    specs: { display: '6.1" Super Retina XDR OLED', chip: "A17 Pro", ram: "8 GB", kamera: "48+12+12 MP", akku: "3274 mAh", os: "iOS 17", sim: "Nano-SIM + eSIM", farbe: "Titan Schwarz" },
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop"],
  },
  {
    id: 8,
    slug: "iphone-15-pro-256gb-wie-neu",
    title: "iPhone 15 Pro 256GB",
    brand: "Apple",
    model: "iPhone 15 Pro",
    storage: "256GB",
    condition: "Wie Neu",
    conditionColor: CONDITION_COLORS["Wie Neu"],
    price: 749,
    oldPrice: 949,
    badge: null,
    battery: 98,
    stock: 2,
    year: 2023,
    description: "Perfekter Zustand, keine sichtbaren Gebrauchsspuren.",
    specs: { display: '6.1" Super Retina XDR OLED', chip: "A17 Pro", ram: "8 GB", kamera: "48+12+12 MP", akku: "3274 mAh", os: "iOS 17", sim: "Nano-SIM + eSIM", farbe: "Titan Natur" },
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop"],
  },

  // iPhone 15
  {
    id: 9,
    slug: "iphone-15-128gb-wie-neu",
    title: "iPhone 15 128GB",
    brand: "Apple",
    model: "iPhone 15",
    storage: "128GB",
    condition: "Wie Neu",
    conditionColor: CONDITION_COLORS["Wie Neu"],
    price: 549,
    oldPrice: 699,
    badge: null,
    battery: 99,
    stock: 5,
    year: 2023,
    description: "Dynamic Island, USB-C. Keine Gebrauchsspuren.",
    specs: { display: '6.1" Super Retina XDR OLED', chip: "A16 Bionic", ram: "6 GB", kamera: "48+12 MP", akku: "3349 mAh", os: "iOS 17", sim: "Nano-SIM + eSIM", farbe: "Blau" },
    images: ["https://images.unsplash.com/photo-1592286927505-1def25115558?w=600&h=600&fit=crop"],
  },
  {
    id: 10,
    slug: "iphone-15-256gb-exzellent",
    title: "iPhone 15 256GB",
    brand: "Apple",
    model: "iPhone 15",
    storage: "256GB",
    condition: "Exzellent",
    conditionColor: CONDITION_COLORS["Exzellent"],
    price: 579,
    oldPrice: 799,
    badge: null,
    battery: 97,
    stock: 3,
    year: 2023,
    description: "Mehr Speicher, minimale Gebrauchsspuren.",
    specs: { display: '6.1" Super Retina XDR OLED', chip: "A16 Bionic", ram: "6 GB", kamera: "48+12 MP", akku: "3349 mAh", os: "iOS 17", sim: "Nano-SIM + eSIM", farbe: "Pink" },
    images: ["https://images.unsplash.com/photo-1592286927505-1def25115558?w=600&h=600&fit=crop"],
  },

  // iPhone 14 Pro Max
  {
    id: 11,
    slug: "iphone-14-pro-max-256gb-exzellent",
    title: "iPhone 14 Pro Max 256GB",
    brand: "Apple",
    model: "iPhone 14 Pro Max",
    storage: "256GB",
    condition: "Exzellent",
    conditionColor: CONDITION_COLORS["Exzellent"],
    price: 699,
    oldPrice: 879,
    badge: "Preis-Tipp",
    battery: 100,
    stock: 5,
    year: 2022,
    description: "Dynamic Island, 48MP Kamera. Batterie ausgetauscht, daher 100%.",
    specs: { display: '6.7" Super Retina XDR OLED', chip: "A16 Bionic", ram: "6 GB", kamera: "48+12+12 MP", akku: "4323 mAh", os: "iOS 16", sim: "Nano-SIM + eSIM", farbe: "Deep Purple" },
    images: ["https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop"],
  },
  {
    id: 12,
    slug: "iphone-14-pro-max-128gb-gut",
    title: "iPhone 14 Pro Max 128GB",
    brand: "Apple",
    model: "iPhone 14 Pro Max",
    storage: "128GB",
    condition: "Gut",
    conditionColor: CONDITION_COLORS["Gut"],
    price: 549,
    oldPrice: 749,
    badge: null,
    battery: 86,
    stock: 3,
    year: 2022,
    description: "Sichtbare Gebrauchsspuren, voll funktionsfähig.",
    specs: { display: '6.7" Super Retina XDR OLED', chip: "A16 Bionic", ram: "6 GB", kamera: "48+12+12 MP", akku: "4323 mAh", os: "iOS 16", sim: "Nano-SIM + eSIM", farbe: "Space Black" },
    images: ["https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop"],
  },

  // iPhone 14
  {
    id: 13,
    slug: "iphone-14-128gb-sehr-gut",
    title: "iPhone 14 128GB",
    brand: "Apple",
    model: "iPhone 14",
    storage: "128GB",
    condition: "Sehr Gut",
    conditionColor: CONDITION_COLORS["Sehr Gut"],
    price: 449,
    oldPrice: 599,
    badge: null,
    battery: 96,
    stock: 6,
    year: 2022,
    description: "Bewährtes Design mit A15 Chip. Leichte Gebrauchsspuren.",
    specs: { display: '6.1" Super Retina XDR OLED', chip: "A15 Bionic", ram: "6 GB", kamera: "12+12 MP", akku: "3279 mAh", os: "iOS 16", sim: "Nano-SIM + eSIM", farbe: "Midnight" },
    images: ["https://images.unsplash.com/photo-1592286927505-1def25115558?w=600&h=600&fit=crop"],
  },
  {
    id: 14,
    slug: "iphone-14-256gb-wie-neu",
    title: "iPhone 14 256GB",
    brand: "Apple",
    model: "iPhone 14",
    storage: "256GB",
    condition: "Wie Neu",
    conditionColor: CONDITION_COLORS["Wie Neu"],
    price: 499,
    oldPrice: 699,
    badge: null,
    battery: 99,
    stock: 2,
    year: 2022,
    description: "Perfekter Zustand mit viel Speicher.",
    specs: { display: '6.1" Super Retina XDR OLED', chip: "A15 Bionic", ram: "6 GB", kamera: "12+12 MP", akku: "3279 mAh", os: "iOS 16", sim: "Nano-SIM + eSIM", farbe: "Starlight" },
    images: ["https://images.unsplash.com/photo-1592286927505-1def25115558?w=600&h=600&fit=crop"],
  },

  // iPhone 13
  {
    id: 15,
    slug: "iphone-13-128gb-sehr-gut",
    title: "iPhone 13 128GB",
    brand: "Apple",
    model: "iPhone 13",
    storage: "128GB",
    condition: "Sehr Gut",
    conditionColor: CONDITION_COLORS["Sehr Gut"],
    price: 349,
    oldPrice: 479,
    badge: null,
    battery: 91,
    stock: 7,
    year: 2021,
    description: "Solides iPhone mit A15 Chip. Minimale Gebrauchsspuren.",
    specs: { display: '6.1" Super Retina XDR OLED', chip: "A15 Bionic", ram: "4 GB", kamera: "12+12 MP", akku: "3227 mAh", os: "iOS 15", sim: "Nano-SIM + eSIM", farbe: "Midnight" },
    images: ["https://images.unsplash.com/photo-1592286927505-1def25115558?w=600&h=600&fit=crop"],
  },
  {
    id: 16,
    slug: "iphone-13-128gb-akzeptabel",
    title: "iPhone 13 128GB",
    brand: "Apple",
    model: "iPhone 13",
    storage: "128GB",
    condition: "Akzeptabel",
    conditionColor: CONDITION_COLORS["Akzeptabel"],
    price: 269,
    oldPrice: 399,
    badge: "Sparpreis",
    battery: 83,
    stock: 4,
    year: 2021,
    description: "Deutliche Gebrauchsspuren, Funktion einwandfrei.",
    specs: { display: '6.1" Super Retina XDR OLED', chip: "A15 Bionic", ram: "4 GB", kamera: "12+12 MP", akku: "3227 mAh", os: "iOS 15", sim: "Nano-SIM + eSIM", farbe: "Blue" },
    images: ["https://images.unsplash.com/photo-1592286927505-1def25115558?w=600&h=600&fit=crop"],
  },

  // iPhone 12
  {
    id: 17,
    slug: "iphone-12-64gb-gut",
    title: "iPhone 12 64GB",
    brand: "Apple",
    model: "iPhone 12",
    storage: "64GB",
    condition: "Gut",
    conditionColor: CONDITION_COLORS["Gut"],
    price: 219,
    oldPrice: 319,
    badge: null,
    battery: 81,
    stock: 4,
    year: 2020,
    description: "5G iPhone zum Einstiegspreis. Gebrauchsspuren sichtbar.",
    specs: { display: '6.1" Super Retina XDR OLED', chip: "A14 Bionic", ram: "4 GB", kamera: "12+12 MP", akku: "2815 mAh", os: "iOS 14", sim: "Nano-SIM + eSIM", farbe: "Blue" },
    images: ["https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop"],
  },
  {
    id: 18,
    slug: "iphone-12-128gb-sehr-gut",
    title: "iPhone 12 128GB",
    brand: "Apple",
    model: "iPhone 12",
    storage: "128GB",
    condition: "Sehr Gut",
    conditionColor: CONDITION_COLORS["Sehr Gut"],
    price: 279,
    oldPrice: 399,
    badge: null,
    battery: 88,
    stock: 3,
    year: 2020,
    description: "Mehr Speicher, guter Zustand.",
    specs: { display: '6.1" Super Retina XDR OLED', chip: "A14 Bionic", ram: "4 GB", kamera: "12+12 MP", akku: "2815 mAh", os: "iOS 14", sim: "Nano-SIM + eSIM", farbe: "Green" },
    images: ["https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=600&fit=crop"],
  },

  // ═══════════════════════════════════════════════════════════════
  // SAMSUNG GALAXY
  // ═══════════════════════════════════════════════════════════════

  // Samsung Galaxy S24 Ultra
  {
    id: 20,
    slug: "samsung-galaxy-s24-ultra-256gb-sehr-gut",
    title: "Samsung Galaxy S24 Ultra 256GB",
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    storage: "256GB",
    condition: "Sehr Gut",
    conditionColor: CONDITION_COLORS["Sehr Gut"],
    price: 799,
    oldPrice: 999,
    badge: "Bestseller",
    battery: 95,
    stock: 4,
    year: 2024,
    description: "200MP Kamera, Titanium Rahmen, S-Pen inklusive. Leichte Gebrauchsspuren.",
    specs: { display: '6.8" Dynamic AMOLED 2X', chip: "Snapdragon 8 Gen 3", ram: "12 GB", kamera: "200+50+12+10 MP", akku: "5000 mAh", os: "Android 14 / OneUI 6.1", sim: "Nano-SIM + eSIM", farbe: "Titan Schwarz" },
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop"],
  },
  {
    id: 21,
    slug: "samsung-galaxy-s24-ultra-512gb-wie-neu",
    title: "Samsung Galaxy S24 Ultra 512GB",
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    storage: "512GB",
    condition: "Wie Neu",
    conditionColor: CONDITION_COLORS["Wie Neu"],
    price: 949,
    oldPrice: 1199,
    badge: null,
    battery: 99,
    stock: 2,
    year: 2024,
    description: "Maximaler Speicher, perfekter Zustand.",
    specs: { display: '6.8" Dynamic AMOLED 2X', chip: "Snapdragon 8 Gen 3", ram: "12 GB", kamera: "200+50+12+10 MP", akku: "5000 mAh", os: "Android 14 / OneUI 6.1", sim: "Nano-SIM + eSIM", farbe: "Titan Grau" },
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop"],
  },

  // Samsung Galaxy S24+
  {
    id: 22,
    slug: "samsung-galaxy-s24-plus-256gb-exzellent",
    title: "Samsung Galaxy S24+ 256GB",
    brand: "Samsung",
    model: "Galaxy S24+",
    storage: "256GB",
    condition: "Exzellent",
    conditionColor: CONDITION_COLORS["Exzellent"],
    price: 649,
    oldPrice: 849,
    badge: null,
    battery: 97,
    stock: 3,
    year: 2024,
    description: "Großes Display, Galaxy AI Features. Minimale Gebrauchsspuren.",
    specs: { display: '6.7" Dynamic AMOLED 2X', chip: "Exynos 2400", ram: "12 GB", kamera: "50+12+10 MP", akku: "4900 mAh", os: "Android 14 / OneUI 6.1", sim: "Nano-SIM + eSIM", farbe: "Cobalt Violet" },
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop"],
  },

  // Samsung Galaxy S24
  {
    id: 23,
    slug: "samsung-galaxy-s24-128gb-wie-neu",
    title: "Samsung Galaxy S24 128GB",
    brand: "Samsung",
    model: "Galaxy S24",
    storage: "128GB",
    condition: "Wie Neu",
    conditionColor: CONDITION_COLORS["Wie Neu"],
    price: 499,
    oldPrice: 649,
    badge: null,
    battery: 100,
    stock: 5,
    year: 2024,
    description: "Kompaktes Flaggschiff mit AI Features. Keine Gebrauchsspuren.",
    specs: { display: '6.2" Dynamic AMOLED 2X', chip: "Exynos 2400", ram: "8 GB", kamera: "50+12+10 MP", akku: "4000 mAh", os: "Android 14 / OneUI 6.1", sim: "Nano-SIM + eSIM", farbe: "Onyx Black" },
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop"],
  },
  {
    id: 24,
    slug: "samsung-galaxy-s24-256gb-sehr-gut",
    title: "Samsung Galaxy S24 256GB",
    brand: "Samsung",
    model: "Galaxy S24",
    storage: "256GB",
    condition: "Sehr Gut",
    conditionColor: CONDITION_COLORS["Sehr Gut"],
    price: 479,
    oldPrice: 699,
    badge: "Preis-Tipp",
    battery: 94,
    stock: 4,
    year: 2024,
    description: "Mehr Speicher, leichte Gebrauchsspuren.",
    specs: { display: '6.2" Dynamic AMOLED 2X', chip: "Exynos 2400", ram: "8 GB", kamera: "50+12+10 MP", akku: "4000 mAh", os: "Android 14 / OneUI 6.1", sim: "Nano-SIM + eSIM", farbe: "Marble Gray" },
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop"],
  },

  // Samsung Galaxy S23 Ultra
  {
    id: 25,
    slug: "samsung-galaxy-s23-ultra-256gb-gut",
    title: "Samsung Galaxy S23 Ultra 256GB",
    brand: "Samsung",
    model: "Galaxy S23 Ultra",
    storage: "256GB",
    condition: "Gut",
    conditionColor: CONDITION_COLORS["Gut"],
    price: 549,
    oldPrice: 749,
    badge: null,
    battery: 88,
    stock: 3,
    year: 2023,
    description: "200MP Kamera, S-Pen. Gebrauchsspuren vorhanden.",
    specs: { display: '6.8" Dynamic AMOLED 2X', chip: "Snapdragon 8 Gen 2", ram: "12 GB", kamera: "200+10+12+10 MP", akku: "5000 mAh", os: "Android 13 / OneUI 5.1", sim: "Nano-SIM + eSIM", farbe: "Phantom Black" },
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop"],
  },

  // Samsung Galaxy S23
  {
    id: 26,
    slug: "samsung-galaxy-s23-128gb-sehr-gut",
    title: "Samsung Galaxy S23 128GB",
    brand: "Samsung",
    model: "Galaxy S23",
    storage: "128GB",
    condition: "Sehr Gut",
    conditionColor: CONDITION_COLORS["Sehr Gut"],
    price: 349,
    oldPrice: 479,
    badge: null,
    battery: 91,
    stock: 5,
    year: 2023,
    description: "Kompaktes Flaggschiff, Snapdragon 8 Gen 2.",
    specs: { display: '6.1" Dynamic AMOLED 2X', chip: "Snapdragon 8 Gen 2", ram: "8 GB", kamera: "50+12+10 MP", akku: "3900 mAh", os: "Android 13 / OneUI 5.1", sim: "Nano-SIM + eSIM", farbe: "Phantom Black" },
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop"],
  },
  {
    id: 27,
    slug: "samsung-galaxy-s23-256gb-exzellent",
    title: "Samsung Galaxy S23 256GB",
    brand: "Samsung",
    model: "Galaxy S23",
    storage: "256GB",
    condition: "Exzellent",
    conditionColor: CONDITION_COLORS["Exzellent"],
    price: 399,
    oldPrice: 549,
    badge: null,
    battery: 95,
    stock: 2,
    year: 2023,
    description: "Mehr Speicher, minimale Gebrauchsspuren.",
    specs: { display: '6.1" Dynamic AMOLED 2X', chip: "Snapdragon 8 Gen 2", ram: "8 GB", kamera: "50+12+10 MP", akku: "3900 mAh", os: "Android 13 / OneUI 5.1", sim: "Nano-SIM + eSIM", farbe: "Cream" },
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop"],
  },

  // Samsung Galaxy A55
  {
    id: 28,
    slug: "samsung-galaxy-a55-128gb-wie-neu",
    title: "Samsung Galaxy A55 128GB",
    brand: "Samsung",
    model: "Galaxy A55",
    storage: "128GB",
    condition: "Wie Neu",
    conditionColor: CONDITION_COLORS["Wie Neu"],
    price: 269,
    oldPrice: 379,
    badge: "Preis-Hit",
    battery: 100,
    stock: 8,
    year: 2024,
    description: "Super AMOLED Display, starke Mittelklasse.",
    specs: { display: '6.6" Super AMOLED', chip: "Exynos 1480", ram: "8 GB", kamera: "50+12+5 MP", akku: "5000 mAh", os: "Android 14 / OneUI 6.1", sim: "Nano-SIM + eSIM", farbe: "Awesome Navy" },
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop"],
  },

  // Samsung Galaxy A35
  {
    id: 29,
    slug: "samsung-galaxy-a35-128gb-wie-neu",
    title: "Samsung Galaxy A35 128GB",
    brand: "Samsung",
    model: "Galaxy A35",
    storage: "128GB",
    condition: "Wie Neu",
    conditionColor: CONDITION_COLORS["Wie Neu"],
    price: 199,
    oldPrice: 299,
    badge: null,
    battery: 100,
    stock: 9,
    year: 2024,
    description: "Tolles Preis-Leistungs-Verhältnis.",
    specs: { display: '6.6" Super AMOLED', chip: "Exynos 1380", ram: "6 GB", kamera: "50+8+5 MP", akku: "5000 mAh", os: "Android 14", sim: "Nano-SIM", farbe: "Awesome Lilac" },
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop"],
  },

  // ═══════════════════════════════════════════════════════════════
  // GOOGLE PIXEL
  // ═══════════════════════════════════════════════════════════════

  // Google Pixel 9 Pro
  {
    id: 30,
    slug: "google-pixel-9-pro-256gb-wie-neu",
    title: "Google Pixel 9 Pro 256GB",
    brand: "Google",
    model: "Pixel 9 Pro",
    storage: "256GB",
    condition: "Wie Neu",
    conditionColor: CONDITION_COLORS["Wie Neu"],
    price: 719,
    oldPrice: 899,
    badge: "Neu rein",
    battery: 99,
    stock: 3,
    year: 2024,
    description: "Tensor G4 Chip, beste KI-Kamera. Keine Gebrauchsspuren.",
    specs: { display: '6.3" Super Actua LTPO OLED', chip: "Tensor G4", ram: "16 GB", kamera: "50+48+48 MP", akku: "4700 mAh", os: "Android 15", sim: "Nano-SIM + eSIM", farbe: "Porcelain" },
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"],
  },
  {
    id: 31,
    slug: "google-pixel-9-pro-128gb-exzellent",
    title: "Google Pixel 9 Pro 128GB",
    brand: "Google",
    model: "Pixel 9 Pro",
    storage: "128GB",
    condition: "Exzellent",
    conditionColor: CONDITION_COLORS["Exzellent"],
    price: 649,
    oldPrice: 799,
    badge: null,
    battery: 97,
    stock: 2,
    year: 2024,
    description: "Tensor G4, minimale Gebrauchsspuren.",
    specs: { display: '6.3" Super Actua LTPO OLED', chip: "Tensor G4", ram: "16 GB", kamera: "50+48+48 MP", akku: "4700 mAh", os: "Android 15", sim: "Nano-SIM + eSIM", farbe: "Hazel" },
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"],
  },

  // Google Pixel 9
  {
    id: 32,
    slug: "google-pixel-9-128gb-wie-neu",
    title: "Google Pixel 9 128GB",
    brand: "Google",
    model: "Pixel 9",
    storage: "128GB",
    condition: "Wie Neu",
    conditionColor: CONDITION_COLORS["Wie Neu"],
    price: 549,
    oldPrice: 699,
    badge: null,
    battery: 100,
    stock: 4,
    year: 2024,
    description: "7 Jahre Updates, beste KI-Features.",
    specs: { display: '6.3" Actua OLED', chip: "Tensor G4", ram: "12 GB", kamera: "50+48 MP", akku: "4700 mAh", os: "Android 15", sim: "Nano-SIM + eSIM", farbe: "Obsidian" },
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"],
  },

  // Google Pixel 8 Pro
  {
    id: 33,
    slug: "google-pixel-8-pro-256gb-sehr-gut",
    title: "Google Pixel 8 Pro 256GB",
    brand: "Google",
    model: "Pixel 8 Pro",
    storage: "256GB",
    condition: "Sehr Gut",
    conditionColor: CONDITION_COLORS["Sehr Gut"],
    price: 499,
    oldPrice: 649,
    badge: null,
    battery: 93,
    stock: 3,
    year: 2023,
    description: "Tensor G3, 7 Jahre Updates. Leichte Gebrauchsspuren.",
    specs: { display: '6.7" Super Actua LTPO OLED', chip: "Tensor G3", ram: "12 GB", kamera: "50+48+48 MP", akku: "5050 mAh", os: "Android 14", sim: "Nano-SIM + eSIM", farbe: "Obsidian" },
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"],
  },

  // Google Pixel 8
  {
    id: 34,
    slug: "google-pixel-8-128gb-sehr-gut",
    title: "Google Pixel 8 128GB",
    brand: "Google",
    model: "Pixel 8",
    storage: "128GB",
    condition: "Sehr Gut",
    conditionColor: CONDITION_COLORS["Sehr Gut"],
    price: 329,
    oldPrice: 449,
    badge: null,
    battery: 94,
    stock: 4,
    year: 2023,
    description: "Tensor G3, 7 Jahre Updates garantiert.",
    specs: { display: '6.2" OLED', chip: "Tensor G3", ram: "8 GB", kamera: "50+12 MP", akku: "4575 mAh", os: "Android 14", sim: "Nano-SIM + eSIM", farbe: "Obsidian" },
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"],
  },
  {
    id: 35,
    slug: "google-pixel-8-256gb-exzellent",
    title: "Google Pixel 8 256GB",
    brand: "Google",
    model: "Pixel 8",
    storage: "256GB",
    condition: "Exzellent",
    conditionColor: CONDITION_COLORS["Exzellent"],
    price: 379,
    oldPrice: 529,
    badge: null,
    battery: 96,
    stock: 2,
    year: 2023,
    description: "Mehr Speicher, minimale Gebrauchsspuren.",
    specs: { display: '6.2" OLED', chip: "Tensor G3", ram: "8 GB", kamera: "50+12 MP", akku: "4575 mAh", os: "Android 14", sim: "Nano-SIM + eSIM", farbe: "Rose" },
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"],
  },

  // Google Pixel 7a
  {
    id: 36,
    slug: "google-pixel-7a-128gb-sehr-gut",
    title: "Google Pixel 7a 128GB",
    brand: "Google",
    model: "Pixel 7a",
    storage: "128GB",
    condition: "Sehr Gut",
    conditionColor: CONDITION_COLORS["Sehr Gut"],
    price: 229,
    oldPrice: 329,
    badge: "Preis-Tipp",
    battery: 92,
    stock: 6,
    year: 2023,
    description: "Beste Kamera unter 250€. Minimale Gebrauchsspuren.",
    specs: { display: '6.1" OLED 90Hz', chip: "Tensor G2", ram: "8 GB", kamera: "64+13 MP", akku: "4385 mAh", os: "Android 13", sim: "Nano-SIM + eSIM", farbe: "Charcoal" },
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"],
  },

  // ═══════════════════════════════════════════════════════════════
  // XIAOMI
  // ═══════════════════════════════════════════════════════════════

  // Xiaomi 14 Ultra
  {
    id: 40,
    slug: "xiaomi-14-ultra-512gb-wie-neu",
    title: "Xiaomi 14 Ultra 512GB",
    brand: "Xiaomi",
    model: "Xiaomi 14 Ultra",
    storage: "512GB",
    condition: "Wie Neu",
    conditionColor: CONDITION_COLORS["Wie Neu"],
    price: 899,
    oldPrice: 1199,
    badge: "Kamera-König",
    battery: 99,
    stock: 2,
    year: 2024,
    description: "Leica Kamera, bestes Xiaomi ever. Keine Gebrauchsspuren.",
    specs: { display: '6.73" AMOLED LTPO', chip: "Snapdragon 8 Gen 3", ram: "16 GB", kamera: "50+50+50+50 MP", akku: "5000 mAh", os: "Android 14 / HyperOS", sim: "Nano-SIM + eSIM", farbe: "Schwarz" },
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"],
  },

  // Xiaomi 14
  {
    id: 41,
    slug: "xiaomi-14-256gb-exzellent",
    title: "Xiaomi 14 256GB",
    brand: "Xiaomi",
    model: "Xiaomi 14",
    storage: "256GB",
    condition: "Exzellent",
    conditionColor: CONDITION_COLORS["Exzellent"],
    price: 549,
    oldPrice: 749,
    badge: null,
    battery: 97,
    stock: 3,
    year: 2024,
    description: "Kompaktes Flaggschiff mit Leica Kamera.",
    specs: { display: '6.36" AMOLED LTPO', chip: "Snapdragon 8 Gen 3", ram: "12 GB", kamera: "50+50+50 MP", akku: "4610 mAh", os: "Android 14 / HyperOS", sim: "Nano-SIM + eSIM", farbe: "Weiß" },
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"],
  },

  // Xiaomi 13T Pro
  {
    id: 42,
    slug: "xiaomi-13t-pro-256gb-sehr-gut",
    title: "Xiaomi 13T Pro 256GB",
    brand: "Xiaomi",
    model: "Xiaomi 13T Pro",
    storage: "256GB",
    condition: "Sehr Gut",
    conditionColor: CONDITION_COLORS["Sehr Gut"],
    price: 399,
    oldPrice: 549,
    badge: null,
    battery: 93,
    stock: 4,
    year: 2023,
    description: "Leica Kamera, 120W Schnellladen.",
    specs: { display: '6.67" AMOLED 144Hz', chip: "Dimensity 9200+", ram: "12 GB", kamera: "50+50+12 MP", akku: "5000 mAh", os: "Android 13 / MIUI 14", sim: "Nano-SIM", farbe: "Schwarz" },
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"],
  },

  // Xiaomi Redmi Note 13 Pro
  {
    id: 43,
    slug: "xiaomi-redmi-note-13-pro-256gb-wie-neu",
    title: "Redmi Note 13 Pro 256GB",
    brand: "Xiaomi",
    model: "Redmi Note 13 Pro",
    storage: "256GB",
    condition: "Wie Neu",
    conditionColor: CONDITION_COLORS["Wie Neu"],
    price: 199,
    oldPrice: 299,
    badge: "Preis-Leistung",
    battery: 100,
    stock: 7,
    year: 2024,
    description: "200MP Kamera zum Budgetpreis.",
    specs: { display: '6.67" AMOLED 120Hz', chip: "Helio G99 Ultra", ram: "8 GB", kamera: "200+8+2 MP", akku: "5100 mAh", os: "Android 13 / MIUI 14", sim: "Nano-SIM", farbe: "Aurora Purple" },
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"],
  },

  // ═══════════════════════════════════════════════════════════════
  // ONEPLUS
  // ═══════════════════════════════════════════════════════════════

  // OnePlus 12
  {
    id: 50,
    slug: "oneplus-12-256gb-wie-neu",
    title: "OnePlus 12 256GB",
    brand: "OnePlus",
    model: "OnePlus 12",
    storage: "256GB",
    condition: "Wie Neu",
    conditionColor: CONDITION_COLORS["Wie Neu"],
    price: 599,
    oldPrice: 799,
    badge: "Flagship Killer",
    battery: 100,
    stock: 3,
    year: 2024,
    description: "Hasselblad Kamera, 100W Laden.",
    specs: { display: '6.82" AMOLED LTPO', chip: "Snapdragon 8 Gen 3", ram: "12 GB", kamera: "50+48+64 MP", akku: "5400 mAh", os: "Android 14 / OxygenOS 14", sim: "Nano-SIM", farbe: "Silky Black" },
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"],
  },
  {
    id: 51,
    slug: "oneplus-12-512gb-exzellent",
    title: "OnePlus 12 512GB",
    brand: "OnePlus",
    model: "OnePlus 12",
    storage: "512GB",
    condition: "Exzellent",
    conditionColor: CONDITION_COLORS["Exzellent"],
    price: 679,
    oldPrice: 899,
    badge: null,
    battery: 98,
    stock: 2,
    year: 2024,
    description: "Maximaler Speicher, minimale Spuren.",
    specs: { display: '6.82" AMOLED LTPO', chip: "Snapdragon 8 Gen 3", ram: "16 GB", kamera: "50+48+64 MP", akku: "5400 mAh", os: "Android 14 / OxygenOS 14", sim: "Nano-SIM", farbe: "Flowy Emerald" },
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"],
  },

  // OnePlus 11
  {
    id: 52,
    slug: "oneplus-11-256gb-sehr-gut",
    title: "OnePlus 11 256GB",
    brand: "OnePlus",
    model: "OnePlus 11",
    storage: "256GB",
    condition: "Sehr Gut",
    conditionColor: CONDITION_COLORS["Sehr Gut"],
    price: 399,
    oldPrice: 549,
    badge: null,
    battery: 92,
    stock: 4,
    year: 2023,
    description: "Hasselblad Kamera, 100W Laden.",
    specs: { display: '6.7" AMOLED LTPO', chip: "Snapdragon 8 Gen 2", ram: "12 GB", kamera: "50+48+32 MP", akku: "5000 mAh", os: "Android 13 / OxygenOS 13", sim: "Nano-SIM", farbe: "Titan Black" },
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"],
  },

  // OnePlus Nord 3
  {
    id: 53,
    slug: "oneplus-nord-3-256gb-wie-neu",
    title: "OnePlus Nord 3 256GB",
    brand: "OnePlus",
    model: "OnePlus Nord 3",
    storage: "256GB",
    condition: "Wie Neu",
    conditionColor: CONDITION_COLORS["Wie Neu"],
    price: 299,
    oldPrice: 399,
    badge: null,
    battery: 99,
    stock: 5,
    year: 2023,
    description: "Starke Mittelklasse mit 80W Laden.",
    specs: { display: '6.74" AMOLED 120Hz', chip: "Dimensity 9000", ram: "16 GB", kamera: "50+8+2 MP", akku: "5000 mAh", os: "Android 13 / OxygenOS 13.1", sim: "Nano-SIM", farbe: "Tempest Gray" },
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"],
  },
];

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

export const ALL_BRANDS: ProductBrand[] = ["Apple", "Samsung", "Google", "Xiaomi", "OnePlus"];
export const ALL_CONDITIONS: ProductCondition[] = ["Wie Neu", "Exzellent", "Sehr Gut", "Gut", "Akzeptabel"];
export const ALL_STORAGES: StorageSize[] = ["64GB", "128GB", "256GB", "512GB", "1TB"];

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: number): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id);
}

export function getProductsByBrand(brand: ProductBrand): Product[] {
  return ALL_PRODUCTS.filter((p) => p.brand === brand);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  // Erst gleiche Modell-Reihe, dann gleiche Marke
  const sameModel = ALL_PRODUCTS.filter(
    (p) => p.id !== product.id && p.model === product.model
  );
  const sameBrand = ALL_PRODUCTS.filter(
    (p) => p.id !== product.id && p.brand === product.brand && p.model !== product.model
  );
  return [...sameModel, ...sameBrand].slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return ALL_PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.model.toLowerCase().includes(q) ||
      p.storage.toLowerCase().includes(q) ||
      p.condition.toLowerCase().includes(q)
  );
}

// Verfügbare Speichergrößen für eine Marke
export function getStoragesForBrand(brand: ProductBrand): StorageSize[] {
  const storages = ALL_PRODUCTS
    .filter((p) => p.brand === brand)
    .map((p) => p.storage);
  return [...new Set(storages)] as StorageSize[];
}

// Verfügbare Modelle für eine Marke
export function getModelsForBrand(brand: ProductBrand): string[] {
  const models = ALL_PRODUCTS
    .filter((p) => p.brand === brand)
    .map((p) => p.model);
  return [...new Set(models)];
}

// Preis-Range für Produkte
export function getPriceRange(): { min: number; max: number } {
  const prices = ALL_PRODUCTS.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

// Statistiken pro Marke
export function getBrandStats(): Record<ProductBrand, { count: number; minPrice: number }> {
  const stats: Record<string, { count: number; minPrice: number }> = {};
  ALL_BRANDS.forEach((brand) => {
    const products = getProductsByBrand(brand);
    stats[brand] = {
      count: products.length,
      minPrice: Math.min(...products.map((p) => p.price)),
    };
  });
  return stats as Record<ProductBrand, { count: number; minPrice: number }>;
}
