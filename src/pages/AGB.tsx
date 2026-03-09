import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { motion } from "framer-motion";

const AGB = () => {
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
            Allgemeine Geschäftsbedingungen
          </h1>

          <div className="prose prose-gray max-w-none space-y-8 text-muted-foreground">
            {/* Geltungsbereich */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                § 1 Geltungsbereich
              </h2>
              <p className="text-sm leading-relaxed">
                (1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen
                der PHONIX GmbH, Musterstraße 1, 10115 Berlin (nachfolgend „Verkäufer") und dem
                Kunden (nachfolgend „Käufer") über den Kauf von Waren über unseren Online-Shop.
              </p>
              <p className="text-sm leading-relaxed mt-2">
                (2) Abweichende Bedingungen des Käufers werden nicht anerkannt, es sei denn, der
                Verkäufer stimmt ihrer Geltung ausdrücklich schriftlich zu.
              </p>
              <p className="text-sm leading-relaxed mt-2">
                (3) Verbraucher im Sinne dieser AGB ist jede natürliche Person, die ein
                Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen
                noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können (§ 13 BGB).
              </p>
            </section>

            {/* Vertragsschluss */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                § 2 Vertragsschluss
              </h2>
              <p className="text-sm leading-relaxed">
                (1) Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes
                Angebot, sondern eine Aufforderung zur Bestellung dar.
              </p>
              <p className="text-sm leading-relaxed mt-2">
                (2) Durch Anklicken des Buttons „Kostenpflichtig bestellen" geben Sie eine
                verbindliche Bestellung der im Warenkorb enthaltenen Waren ab. Die Bestätigung
                des Eingangs der Bestellung erfolgt zusammen mit der Annahme der Bestellung
                unmittelbar nach dem Absenden durch eine automatisierte E-Mail.
              </p>
              <p className="text-sm leading-relaxed mt-2">
                (3) Der Vertragstext wird von uns gespeichert. Sie können den Vertragstext vor
                der Bestellung über die Druckfunktion Ihres Browsers ausdrucken.
              </p>
            </section>

            {/* Preise und Zahlung */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                § 3 Preise und Zahlung
              </h2>
              <p className="text-sm leading-relaxed">
                (1) Alle angegebenen Preise sind Endpreise in Euro inklusive der gesetzlichen
                Mehrwertsteuer. Zusätzliche Liefer- und Versandkosten werden im jeweiligen
                Angebot gesondert angegeben.
              </p>
              <p className="text-sm leading-relaxed mt-2">
                (2) Bei Lieferungen innerhalb Deutschlands ist der Versand ab einem Bestellwert
                von 50 € kostenfrei. Unterhalb dieses Bestellwerts berechnen wir 4,99 € Versandkosten.
              </p>
              <p className="text-sm leading-relaxed mt-2">
                (3) Die Zahlung erfolgt wahlweise per:
              </p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li>PayPal</li>
                <li>Kreditkarte (Visa, Mastercard)</li>
                <li>Klarna (Rechnung, Ratenkauf)</li>
                <li>Überweisung (Vorkasse)</li>
              </ul>
            </section>

            {/* Lieferung */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                § 4 Lieferung
              </h2>
              <p className="text-sm leading-relaxed">
                (1) Die Lieferung erfolgt innerhalb Deutschlands. Lieferungen ins Ausland sind
                nach vorheriger Absprache möglich.
              </p>
              <p className="text-sm leading-relaxed mt-2">
                (2) Die Lieferzeit beträgt 1-3 Werktage, sofern beim jeweiligen Artikel keine
                abweichende Lieferzeit angegeben ist.
              </p>
              <p className="text-sm leading-relaxed mt-2">
                (3) Sollten nicht alle bestellten Produkte vorrätig sein, sind wir zu
                Teillieferungen auf unsere Kosten berechtigt.
              </p>
            </section>

            {/* Eigentumsvorbehalt */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                § 5 Eigentumsvorbehalt
              </h2>
              <p className="text-sm leading-relaxed">
                Die gelieferte Ware bleibt bis zur vollständigen Bezahlung Eigentum des Verkäufers.
              </p>
            </section>

            {/* Gewährleistung */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                § 6 Gewährleistung und Garantie
              </h2>
              <p className="text-sm leading-relaxed">
                (1) Es gelten die gesetzlichen Gewährleistungsrechte. Die Gewährleistungsfrist
                für gebrauchte Waren beträgt ein Jahr ab Lieferung.
              </p>
              <p className="text-sm leading-relaxed mt-2">
                (2) Zusätzlich gewähren wir auf alle Smartphones eine freiwillige Garantie von
                12 Monaten. Diese umfasst Defekte an Hardware-Komponenten, die nicht durch
                unsachgemäße Handhabung entstanden sind.
              </p>
              <p className="text-sm leading-relaxed mt-2">
                (3) Der angegebene Zustand (z.B. „Wie Neu", „Sehr Gut") bezieht sich auf den
                optischen Zustand des Geräts. Alle Geräte sind technisch vollständig geprüft
                und funktionsfähig.
              </p>
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mt-4">
                <p className="text-sm font-medium text-foreground">
                  Unsere Zustandskategorien:
                </p>
                <ul className="text-sm mt-2 space-y-1">
                  <li><strong>Wie Neu:</strong> Keine sichtbaren Gebrauchsspuren</li>
                  <li><strong>Sehr Gut:</strong> Minimale, kaum sichtbare Gebrauchsspuren</li>
                  <li><strong>Gut:</strong> Leichte Gebrauchsspuren, normal für gebrauchte Geräte</li>
                  <li><strong>Akzeptabel:</strong> Deutliche Gebrauchsspuren, volle Funktionalität</li>
                </ul>
              </div>
            </section>

            {/* Ankauf */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                § 7 Ankauf von Geräten
              </h2>
              <p className="text-sm leading-relaxed">
                (1) Beim Verkauf Ihres Geräts an uns erstellen wir Ihnen basierend auf Ihren
                Angaben ein unverbindliches Preisangebot.
              </p>
              <p className="text-sm leading-relaxed mt-2">
                (2) Der endgültige Ankaufspreis wird nach Prüfung des Geräts festgelegt. Weicht
                der Zustand von Ihren Angaben ab, unterbreiten wir Ihnen ein angepasstes Angebot.
              </p>
              <p className="text-sm leading-relaxed mt-2">
                (3) Sie haben das Recht, das angepasste Angebot abzulehnen. In diesem Fall senden
                wir Ihnen das Gerät kostenfrei zurück.
              </p>
              <p className="text-sm leading-relaxed mt-2">
                (4) Die Auszahlung erfolgt innerhalb von 3 Werktagen nach Annahme des Angebots
                per Banküberweisung.
              </p>
            </section>

            {/* Haftung */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                § 8 Haftung
              </h2>
              <p className="text-sm leading-relaxed">
                (1) Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie nach dem
                Produkthaftungsgesetz.
              </p>
              <p className="text-sm leading-relaxed mt-2">
                (2) Bei leichter Fahrlässigkeit haften wir nur bei Verletzung wesentlicher
                Vertragspflichten (Kardinalpflichten), beschränkt auf den vorhersehbaren,
                vertragstypischen Schaden.
              </p>
            </section>

            {/* Datenschutz */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                § 9 Datenschutz
              </h2>
              <p className="text-sm leading-relaxed">
                Informationen zur Verarbeitung Ihrer personenbezogenen Daten finden Sie in
                unserer{" "}
                <a href="/datenschutz" className="text-accent hover:underline">
                  Datenschutzerklärung
                </a>.
              </p>
            </section>

            {/* Schlussbestimmungen */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                § 10 Schlussbestimmungen
              </h2>
              <p className="text-sm leading-relaxed">
                (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
                UN-Kaufrechts.
              </p>
              <p className="text-sm leading-relaxed mt-2">
                (2) Ist der Käufer Kaufmann, juristische Person des öffentlichen Rechts oder
                öffentlich-rechtliches Sondervermögen, ist Gerichtsstand für alle Streitigkeiten
                aus diesem Vertrag Berlin.
              </p>
              <p className="text-sm leading-relaxed mt-2">
                (3) Sollten einzelne Bestimmungen dieses Vertrages unwirksam sein, bleibt die
                Wirksamkeit der übrigen Bestimmungen unberührt.
              </p>
            </section>

            {/* Stand */}
            <section className="border-t border-border pt-6">
              <p className="text-xs text-muted-foreground">
                Stand: März 2026
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default AGB;
