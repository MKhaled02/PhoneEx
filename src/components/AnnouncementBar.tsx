import { X } from "lucide-react";
import { useState } from "react";

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-announcement text-announcement-foreground text-sm py-2 px-4 text-center relative">
      <span>
        🔥 Sommer-Sale – bis zu <strong>30% Rabatt</strong> auf ausgewählte Smartphones!{" "}
        <a href="#produkte" className="underline font-semibold hover:opacity-80">
          Jetzt shoppen
        </a>
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
