import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { motion } from "framer-motion";

const Datenschutz = () => {
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
            Datenschutzerklärung
          </h1>

          <div className="prose prose-gray max-w-none space-y-8 text-muted-foreground">
            {/* Einleitung */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                1. Datenschutz auf einen Blick
              </h2>
              <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Allgemeine Hinweise</h3>
              <p className="text-sm leading-relaxed">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
                Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
            </section>

            {/* Verantwortlicher */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                2. Verantwortlicher
              </h2>
              <div className="bg-secondary/50 rounded-lg p-6 space-y-1 text-foreground text-sm">
                <p className="font-semibold">PHONIX GmbH</p>
                <p>Musterstraße 1</p>
                <p>10115 Berlin</p>
                <p className="mt-2">Telefon: +49 123 456 7890</p>
                <p>E-Mail: datenschutz@phonix.de</p>
              </div>
            </section>

            {/* Datenerfassung */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                3. Datenerfassung auf dieser Website
              </h2>

              <h3 className="text-lg font-medium text-foreground mt-4 mb-2">Cookies</h3>
              <p className="text-sm leading-relaxed">
                Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine
                Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder
                vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft
                (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach
                Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem
                Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung
                durch Ihren Webbrowser erfolgt.
              </p>
              <p className="text-sm leading-relaxed mt-3">
                Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies
                informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies
                für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der
                Cookies beim Schließen des Browsers aktivieren.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Server-Log-Dateien</h3>
              <p className="text-sm leading-relaxed">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so
                genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt.
                Dies sind:
              </p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="text-sm leading-relaxed mt-3">
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
              </p>

              <h3 className="text-lg font-medium text-foreground mt-6 mb-2">Kontaktformular</h3>
              <p className="text-sm leading-relaxed">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus
                dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
                Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
            </section>

            {/* Bestellungen */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                4. Datenverarbeitung bei Bestellungen
              </h2>
              <p className="text-sm leading-relaxed">
                Bei der Bestellung von Produkten erheben wir folgende Daten:
              </p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li>Name und Anschrift</li>
                <li>E-Mail-Adresse</li>
                <li>Telefonnummer (optional)</li>
                <li>Zahlungsdaten</li>
                <li>Bestellte Produkte</li>
              </ul>
              <p className="text-sm leading-relaxed mt-3">
                Die Verarbeitung erfolgt zur Vertragserfüllung gemäß Art. 6 Abs. 1 lit. b DSGVO.
                Die Daten werden nach Ablauf der gesetzlichen Aufbewahrungsfristen gelöscht.
              </p>
            </section>

            {/* Ankauf */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                5. Datenverarbeitung beim Handy-Ankauf
              </h2>
              <p className="text-sm leading-relaxed">
                Beim Verkauf Ihres Geräts an uns erheben wir zusätzlich:
              </p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li>Geräteinformationen (Modell, IMEI, Zustand)</li>
                <li>Bankverbindung für die Auszahlung</li>
                <li>Ausweisdaten zur Identitätsprüfung (bei Geräten über 100€)</li>
              </ul>
              <p className="text-sm leading-relaxed mt-3">
                Diese Daten werden zur Vertragsabwicklung und zur Erfüllung gesetzlicher
                Aufbewahrungspflichten (z.B. Geldwäschegesetz) verwendet.
              </p>
            </section>

            {/* Rechte der Betroffenen */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                6. Ihre Rechte
              </h2>
              <p className="text-sm leading-relaxed">
                Sie haben jederzeit das Recht:
              </p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li><strong>Auskunft</strong> über Ihre bei uns gespeicherten Daten zu erhalten (Art. 15 DSGVO)</li>
                <li><strong>Berichtigung</strong> unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
                <li><strong>Löschung</strong> Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
                <li><strong>Einschränkung</strong> der Verarbeitung zu verlangen (Art. 18 DSGVO)</li>
                <li><strong>Datenübertragbarkeit</strong> zu verlangen (Art. 20 DSGVO)</li>
                <li><strong>Widerspruch</strong> gegen die Verarbeitung einzulegen (Art. 21 DSGVO)</li>
              </ul>
              <p className="text-sm leading-relaxed mt-3">
                Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: datenschutz@phonix.de
              </p>
            </section>

            {/* Beschwerderecht */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                7. Beschwerderecht
              </h2>
              <p className="text-sm leading-relaxed">
                Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
                Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren. Die für uns
                zuständige Aufsichtsbehörde ist:
              </p>
              <div className="bg-secondary/50 rounded-lg p-4 mt-3 text-sm">
                <p>Berliner Beauftragte für Datenschutz und Informationsfreiheit</p>
                <p>Friedrichstr. 219</p>
                <p>10969 Berlin</p>
              </div>
            </section>

            {/* SSL-Verschlüsselung */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                8. SSL-Verschlüsselung
              </h2>
              <p className="text-sm leading-relaxed">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
                vertraulicher Inhalte eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung
                erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://"
                wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
              </p>
            </section>

            {/* Aktualität */}
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

export default Datenschutz;
