import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings, Check } from "lucide-react";
import { Link } from "react-router-dom";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Immer erforderlich
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Prüfe ob Consent bereits gegeben wurde
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Zeige Banner nach kurzer Verzögerung
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setIsVisible(false);
  };

  const acceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
  };

  const acceptSelected = () => {
    saveConsent(preferences);
  };

  const rejectAll = () => {
    const onlyNecessary = { necessary: true, analytics: false, marketing: false };
    setPreferences(onlyNecessary);
    saveConsent(onlyNecessary);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Cookie className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        Cookie-Einstellungen
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Wir respektieren Ihre Privatsphäre
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={rejectAll}
                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    aria-label="Schließen"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Wir verwenden Cookies, um Ihnen das beste Einkaufserlebnis zu bieten.
                  Einige Cookies sind technisch notwendig, andere helfen uns, unseren
                  Service zu verbessern.{" "}
                  <Link to="/datenschutz" className="text-accent hover:underline">
                    Mehr erfahren
                  </Link>
                </p>
              </div>

              {/* Cookie-Details (Erweiterbar) */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 space-y-3">
                      {/* Notwendige Cookies */}
                      <label className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-sm">
                            Notwendige Cookies
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Erforderlich für grundlegende Funktionen wie Warenkorb und Login.
                          </p>
                        </div>
                        <div className="w-12 h-6 bg-accent rounded-full flex items-center justify-end px-1">
                          <Check className="w-4 h-4 text-accent-foreground" />
                        </div>
                      </label>

                      {/* Analyse Cookies */}
                      <label className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-sm">
                            Analyse Cookies
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Helfen uns zu verstehen, wie Besucher unsere Website nutzen.
                          </p>
                        </div>
                        <button
                          onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                          className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${
                            preferences.analytics ? "bg-accent justify-end" : "bg-border justify-start"
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full transition-colors ${
                            preferences.analytics ? "bg-accent-foreground" : "bg-muted-foreground"
                          }`} />
                        </button>
                      </label>

                      {/* Marketing Cookies */}
                      <label className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-sm">
                            Marketing Cookies
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Werden verwendet, um Werbung für Sie relevanter zu machen.
                          </p>
                        </div>
                        <button
                          onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                          className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${
                            preferences.marketing ? "bg-accent justify-end" : "bg-border justify-start"
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full transition-colors ${
                            preferences.marketing ? "bg-accent-foreground" : "bg-muted-foreground"
                          }`} />
                        </button>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="p-6 pt-4 bg-secondary/30 border-t border-border">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    {showDetails ? "Weniger anzeigen" : "Anpassen"}
                  </button>

                  <div className="flex-1 flex gap-3 sm:justify-end">
                    <button
                      onClick={rejectAll}
                      className="flex-1 sm:flex-initial px-6 py-2.5 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-secondary transition-colors"
                    >
                      Nur Notwendige
                    </button>

                    {showDetails ? (
                      <button
                        onClick={acceptSelected}
                        className="flex-1 sm:flex-initial px-6 py-2.5 text-sm font-medium bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
                      >
                        Auswahl speichern
                      </button>
                    ) : (
                      <button
                        onClick={acceptAll}
                        className="flex-1 sm:flex-initial px-6 py-2.5 text-sm font-medium bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
                      >
                        Alle akzeptieren
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
