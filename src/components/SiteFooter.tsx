import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const SiteFooter = () => {
  return (
    <footer className="bg-footer text-footer-foreground mt-6">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="font-heading text-2xl font-bold text-primary-foreground">PHONIX</Link>
            <p className="mt-3 text-sm text-footer-foreground/75 max-w-sm">
              Refurbished Smartphones mit Garantie, fairen Preisen und transparenter Qualitätsprüfung.
            </p>
            <p className="mt-3 text-xs text-footer-foreground/60">
              Nachhaltig einkaufen. Elektronik länger nutzen.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary-foreground text-sm mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/smartphones/alle" className="hover:text-primary-foreground transition-colors">Alle Produkte</Link></li>
              <li><Link to="/smartphones/apple" className="hover:text-primary-foreground transition-colors">iPhone</Link></li>
              <li><Link to="/smartphones/samsung" className="hover:text-primary-foreground transition-colors">Samsung</Link></li>
              <li><Link to="/smartphones/google" className="hover:text-primary-foreground transition-colors">Google</Link></li>
              <li><Link to="/smartphones/xiaomi" className="hover:text-primary-foreground transition-colors">Xiaomi</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary-foreground text-sm mb-3">Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/ankauf" className="hover:text-primary-foreground transition-colors">Handy verkaufen</Link></li>
              <li><Link to="/handy-verkaufen-berlin" className="hover:text-primary-foreground transition-colors">Ankauf Berlin</Link></li>
              <li><Link to="/konto" className="hover:text-primary-foreground transition-colors">Mein Konto</Link></li>
              <li><Link to="/faq" className="hover:text-primary-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/kontakt" className="hover:text-primary-foreground transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary-foreground text-sm mb-3">Kontakt</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                +49 30 9876 5432
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                info@phonix.de
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                Brunnenstraße 147, 10115 Berlin
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-footer-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-footer-foreground/60">
          <p>© 2026 PHONIX. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4">
            <Link to="/impressum" className="hover:text-footer-foreground transition-colors">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-footer-foreground transition-colors">Datenschutz</Link>
            <Link to="/agb" className="hover:text-footer-foreground transition-colors">AGB</Link>
            <Link to="/widerruf" className="hover:text-footer-foreground transition-colors">Widerruf</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
