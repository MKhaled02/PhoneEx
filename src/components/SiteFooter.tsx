import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const SiteFooter = () => {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="font-heading text-xl font-bold text-primary-foreground">PHONIX</Link>
            <p className="mt-3 text-sm text-footer-foreground/70 max-w-xs">
              Dein Partner für Smartphone An- und Verkauf. Geprüfte Geräte zu fairen Preisen mit 12 Monaten Garantie.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-primary-foreground text-sm mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/kollektion/alle" className="hover:text-primary-foreground transition-colors">Alle Smartphones</Link></li>
              <li><Link to="/kollektion/premium" className="hover:text-primary-foreground transition-colors">Premium</Link></li>
              <li><Link to="/kollektion/midrange" className="hover:text-primary-foreground transition-colors">Mittelklasse</Link></li>
              <li><Link to="/kollektion/budget" className="hover:text-primary-foreground transition-colors">Budget</Link></li>
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 className="font-semibold text-primary-foreground text-sm mb-3">Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/ankauf" className="hover:text-primary-foreground transition-colors">Handy verkaufen</Link></li>
              <li><Link to="/warenkorb" className="hover:text-primary-foreground transition-colors">Warenkorb</Link></li>
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
