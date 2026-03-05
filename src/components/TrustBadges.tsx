import { Truck, Shield, RotateCcw, Headphones } from "lucide-react";

const badges = [
  { icon: Truck, title: "Kostenloser Versand", desc: "Ab 50 € Bestellwert" },
  { icon: Shield, title: "12 Monate Garantie", desc: "Auf alle Geräte" },
  { icon: RotateCcw, title: "14 Tage Rückgabe", desc: "Problemlos zurücksenden" },
  { icon: Headphones, title: "Experten-Support", desc: "Mo–Sa erreichbar" },
];

const TrustBadges = () => {
  return (
    <section className="border-y border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge) => (
            <div key={badge.title} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <badge.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{badge.title}</p>
                <p className="text-xs text-muted-foreground">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
