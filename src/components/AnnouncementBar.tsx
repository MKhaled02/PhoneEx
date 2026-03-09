import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const announcements = [
  {
    text: "🔥 Neue Geräte täglich! iPhone 16 Pro Max ab 1.049 € – solange Vorrat reicht",
    linkLabel: "Jetzt shoppen",
    linkTo: "/smartphones/alle",
  },
  {
    text: "📦 Kostenloser Versand ab 50 € · Lieferung in 1-3 Werktagen",
    linkLabel: "Jetzt shoppen",
    linkTo: "/smartphones/alle",
  },
  {
    text: "♻️ Handy verkaufen: Faire Preise, 24h Auszahlung, kostenloser Versand",
    linkLabel: "Jetzt Preis berechnen",
    linkTo: "/ankauf",
  },
];

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      // Fade out
      setOpacity(0);

      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % announcements.length);
        // Fade in
        setOpacity(1);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  const current = announcements[activeIndex];

  return (
    <div className="bg-announcement text-announcement-foreground text-sm py-2 px-4 text-center relative">
      <span
        className="transition-opacity duration-300"
        style={{ opacity }}
      >
        {current.text}{" "}
        <Link to={current.linkTo} className="underline font-semibold hover:opacity-80">
          {current.linkLabel}
        </Link>
      </span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
        aria-label="Schließen"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AnnouncementBar;
