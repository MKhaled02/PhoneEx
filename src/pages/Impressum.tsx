import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { motion } from "framer-motion";

const Impressum = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
            Impressum
          </h1>

          <div className="prose prose-gray max-w-none space-y-8">
            {/* Anbieterkennung */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Angaben gemäß § 5 TMG
              </h2>
              <div className="bg-secondary/50 rounded-lg p-6 space-y-2 text-foreground">
                <p className="font-semibold">PHONIX GmbH</p>
                <p>Musterstraße 1</p>
                <p>10115 Berlin</p>
                <p>Deutschland</p>
              </div>
            </section>

            {/* Kontakt */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Kontakt</h2>
              <div className="bg-secondary/50 rounded-lg p-6 space-y-2 text-foreground">
                <p>Telefon: +49 123 456 7890</p>
                <p>E-Mail: info@phonix.de</p>
                <p>Website: www.phonix.de</p>
              </div>
            </section>

            {/* Vertretungsberechtigte */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Vertretungsberechtigte Geschäftsführer
              </h2>
              <p className="text-muted-foreground">
                Max Mustermann, Maria Musterfrau
              </p>
            </section>

            {/* Registereintrag */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Registereintrag
              </h2>
              <div className="text-muted-foreground space-y-1">
                <p>Eintragung im Handelsregister</p>
                <p>Registergericht: Amtsgericht Berlin-Charlottenburg</p>
                <p>Registernummer: HRB 123456</p>
              </div>
            </section>

            {/* Umsatzsteuer-ID */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Umsatzsteuer-ID
              </h2>
              <p className="text-muted-foreground">
                Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
                <br />
                <span className="font-mono">DE 123 456 789</span>
              </p>
            </section>

            {/* Verantwortlich für den Inhalt */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </h2>
              <div className="text-muted-foreground">
                <p>Max Mustermann</p>
                <p>Musterstraße 1</p>
                <p>10115 Berlin</p>
              </div>
            </section>

            {/* Streitschlichtung */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                EU-Streitschlichtung
              </h2>
              <p className="text-muted-foreground">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="text-muted-foreground mt-3">
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            {/* Verbraucherstreitbeilegung */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Verbraucherstreitbeilegung / Universalschlichtungsstelle
              </h2>
              <p className="text-muted-foreground">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            {/* Haftungsausschluss */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Haftung für Inhalte
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
                Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine
                diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
                Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen
                werden wir diese Inhalte umgehend entfernen.
              </p>
            </section>

            {/* Haftung für Links */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Haftung für Links
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
                Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
                Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
                mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
                Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten
                ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
                Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </section>

            {/* Urheberrecht */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Urheberrecht
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
                Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind
                nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf
                dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
                beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
                trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
                entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
                Inhalte umgehend entfernen.
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Impressum;
