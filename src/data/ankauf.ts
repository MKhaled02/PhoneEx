// ═══════════════════════════════════════════════════════════════
// Ankauf (Trade-In) Price Calculation Engine
// In production: Server-side validation via Node.js middleware
// ═══════════════════════════════════════════════════════════════

export const ANKAUF_MODELS: Record<string, Record<string, number>> = {
  "iPhone 16 Pro Max": { "128GB": 680, "256GB": 750, "512GB": 830, "1TB": 900 },
  "iPhone 16 Pro": { "128GB": 580, "256GB": 650, "512GB": 720, "1TB": 790 },
  "iPhone 16": { "128GB": 430, "256GB": 490, "512GB": 550 },
  "iPhone 15 Pro Max": { "128GB": 550, "256GB": 620, "512GB": 700, "1TB": 780 },
  "iPhone 15 Pro": { "128GB": 470, "256GB": 540, "512GB": 610 },
  "iPhone 15": { "128GB": 350, "256GB": 410, "512GB": 470 },
  "iPhone 14 Pro Max": { "128GB": 420, "256GB": 490, "512GB": 560 },
  "iPhone 14 Pro": { "128GB": 350, "256GB": 410, "512GB": 470 },
  "iPhone 14": { "128GB": 270, "256GB": 320, "512GB": 370 },
  "iPhone 13 Pro Max": { "128GB": 330, "256GB": 390, "512GB": 450 },
  "iPhone 13 Pro": { "128GB": 280, "256GB": 330, "512GB": 380 },
  "iPhone 13": { "128GB": 220, "256GB": 260, "512GB": 300 },
  "Samsung Galaxy S24 Ultra": { "256GB": 550, "512GB": 630, "1TB": 700 },
  "Samsung Galaxy S24": { "128GB": 310, "256GB": 360 },
  "Samsung Galaxy S23": { "128GB": 250, "256GB": 300 },
  "Google Pixel 9 Pro": { "128GB": 380, "256GB": 430, "512GB": 490 },
  "Google Pixel 8": { "128GB": 230, "256GB": 270 },
};

export interface ConditionOption {
  key: string;
  label: string;
  multiplier: number;
  description: string;
  icon: string;
}

export const CONDITIONS: ConditionOption[] = [
  { key: "Wie Neu", label: "Wie Neu", multiplier: 1.0, description: "Keine sichtbaren Gebrauchsspuren", icon: "✨" },
  { key: "Sehr Gut", label: "Sehr Gut", multiplier: 0.87, description: "Minimale Gebrauchsspuren", icon: "👍" },
  { key: "Gut", label: "Gut", multiplier: 0.72, description: "Leichte Kratzer sichtbar", icon: "👌" },
  { key: "Akzeptabel", label: "Akzeptabel", multiplier: 0.55, description: "Deutliche Gebrauchsspuren", icon: "🔧" },
  { key: "Defekt", label: "Defekt", multiplier: 0.28, description: "Funktionseinschränkungen", icon: "⚠️" },
];

export interface DefectOption {
  key: string;
  label: string;
  deduction: number;
  icon: string;
}

export const DEFECTS: DefectOption[] = [
  { key: "display_kratzer", label: "Display-Kratzer", deduction: 15, icon: "📱" },
  { key: "display_riss", label: "Display-Riss", deduction: 60, icon: "💥" },
  { key: "akku_schwach", label: "Akku schwach", deduction: 30, icon: "🔋" },
  { key: "kamera_defekt", label: "Kamera defekt", deduction: 50, icon: "📷" },
  { key: "lautsprecher", label: "Lautsprecher", deduction: 25, icon: "🔊" },
  { key: "ladebuchse", label: "Ladebuchse", deduction: 35, icon: "🔌" },
  { key: "wasserschaden", label: "Wasserschaden", deduction: 80, icon: "💧" },
  { key: "rahmen", label: "Rahmen beschädigt", deduction: 20, icon: "🔨" },
];

export function calculateAnkaufPrice(
  model: string,
  storage: string,
  condition: string,
  defects: string[] = []
): number | null {
  const base = ANKAUF_MODELS[model]?.[storage];
  if (!base) return null;
  const condOption = CONDITIONS.find((c) => c.key === condition);
  const mult = condOption?.multiplier ?? 0.5;
  let price = base * mult;
  defects.forEach((d) => {
    const defect = DEFECTS.find((x) => x.key === d);
    if (defect) price -= defect.deduction;
  });
  return Math.max(Math.round(price), 10);
}
