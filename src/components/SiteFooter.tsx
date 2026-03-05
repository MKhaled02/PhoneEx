import { Phone, Mail, MapPin } from "lucide-react";

const SiteFooter = () => {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <span className="font-heading text-xl font-bold text-primary-foreground">PHONIX</span>
            <p className="mt-3 text-sm text-footer-foreground/70 max-w-xs">
              Dein Partner für Smartphone An- und Verkauf. Neue und gebrauchte Geräte zu fairen Preisen.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-primary-foreground text-sm mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Smartphones</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Tablets</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Zubehör</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Angebote</a></li>
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 className="font-semibold text-primary-foreground text-sm mb-3">Service</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Handy verkaufen</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Reparatur</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Versand & Lieferung</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-primary-foreground text-sm mb-3">Kontakt</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                +49 123 456 7890
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                info@phonix.de
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                Musterstraße 1, 10115 Berlin
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-footer-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-footer-foreground/50">
          <p>© 2026 PHONIX. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-footer-foreground transition-colors">Impressum</a>
            <a href="#" className="hover:text-footer-foreground transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-footer-foreground transition-colors">AGB</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
