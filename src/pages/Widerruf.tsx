import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { motion } from "framer-motion";
import { FileText, Mail, MapPin, Phone } from "lucide-react";

const Widerruf = () => {
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
            Widerrufsbelehrung
          </h1>

          <div className="prose prose-gray max-w-none space-y-8 text-muted-foreground">
            {/* Widerrufsrecht */}
            <section className="bg-accent/10 border border-accent/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                Widerrufsrecht
              </h2>
              <p className="text-sm leading-relaxed">
                Sie haben das Recht, binnen <strong>vierzehn Tagen</strong> ohne Angabe von
                Gründen diesen Vertrag zu widerrufen.
              </p>
              <p className="text-sm leading-relaxed mt-3">
                Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von
                Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz
                genommen haben bzw. hat.
              </p>
            </section>

            {/* Ausübung des Widerrufs */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Ausübung des Widerrufsrechts
              </h2>
              <p className="text-sm leading-relaxed">
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen
                Erklärung (z.B. ein mit der Post versandter Brief oder E-Mail) über Ihren
                Entschluss, diesen Vertrag zu widerrufen, informieren.
              </p>

              <div className="bg-secondary/50 rounded-lg p-6 mt-4 space-y-3">
                <p className="font-semibold text-foreground">Kontakt für Widerruf:</p>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-accent mt-0.5" />
                  <div className="text-sm">
                    <p>PHONIX GmbH</p>
                    <p>Musterstraße 1</p>
                    <p>10115 Berlin</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-accent" />
                  <span className="text-sm">+49 123 456 7890</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent" />
                  <span className="text-sm">widerruf@phonix.de</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed mt-4">
                Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch
                nicht vorgeschrieben ist. Zur Wahrung der Widerrufsfrist reicht es aus, dass
                Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der
                Widerrufsfrist absenden.
              </p>
            </section>

            {/* Folgen des Widerrufs */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Folgen des Widerrufs
              </h2>
              <p className="text-sm leading-relaxed">
                Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von
                Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der
                zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der
                Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben),
                unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an
                dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
              </p>
              <p className="text-sm leading-relaxed mt-3">
                Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
                ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde
                ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser
                Rückzahlung Entgelte berechnet.
              </p>
              <p className="text-sm leading-relaxed mt-3">
                Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten
                haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt
                haben, je nachdem, welches der frühere Zeitpunkt ist.
              </p>
            </section>

            {/* Rücksendung */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Rücksendung der Waren
              </h2>
              <p className="text-sm leading-relaxed">
                Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn
                Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten,
                an uns zurückzusenden oder zu übergeben. Die Frist ist gewahrt, wenn Sie die
                Waren vor Ablauf der Frist von vierzehn Tagen absenden.
              </p>

              <div className="bg-foreground text-background rounded-lg p-4 mt-4">
                <p className="font-semibold">Kostenlose Rücksendung!</p>
                <p className="text-sm mt-1 opacity-90">
                  Wir tragen die Kosten der Rücksendung der Waren. Ein Retourenlabel erhalten
                  Sie per E-Mail nach Eingang Ihrer Widerrufserklärung.
                </p>
              </div>

              <p className="text-sm leading-relaxed mt-4">
                Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser
                Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und
                Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist.
              </p>
            </section>

            {/* Muster-Widerrufsformular */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Muster-Widerrufsformular
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular
                aus und senden Sie es zurück.)
              </p>

              <div className="bg-secondary rounded-lg p-6 font-mono text-sm space-y-4">
                <p>An:</p>
                <div className="pl-4 border-l-2 border-accent">
                  <p>PHONIX GmbH</p>
                  <p>Musterstraße 1</p>
                  <p>10115 Berlin</p>
                  <p>E-Mail: widerruf@phonix.de</p>
                </div>

                <p className="pt-2">
                  Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag
                  über den Kauf der folgenden Waren (*):
                </p>
                <p className="border-b border-border pb-2">_______________________________</p>

                <p>Bestellt am (*) / erhalten am (*):</p>
                <p className="border-b border-border pb-2">_______________________________</p>

                <p>Name des/der Verbraucher(s):</p>
                <p className="border-b border-border pb-2">_______________________________</p>

                <p>Anschrift des/der Verbraucher(s):</p>
                <p className="border-b border-border pb-2">_______________________________</p>

                <p className="pt-4">
                  Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):
                </p>
                <p className="border-b border-border pb-2">_______________________________</p>

                <p>Datum:</p>
                <p className="border-b border-border pb-2">_______________________________</p>

                <p className="text-xs text-muted-foreground pt-4">
                  (*) Unzutreffendes streichen
                </p>
              </div>
            </section>

            {/* Ausnahmen */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Ausschluss des Widerrufsrechts
              </h2>
              <p className="text-sm leading-relaxed">
                Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die
                nicht vorgefertigt sind und für deren Herstellung eine individuelle Auswahl
                oder Bestimmung durch den Verbraucher maßgeblich ist oder die eindeutig auf
                die persönlichen Bedürfnisse des Verbrauchers zugeschnitten sind.
              </p>
            </section>

            {/* 30-Tage-Garantie */}
            <section className="bg-accent/10 border border-accent/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Unser Versprechen: 30 Tage Rückgaberecht
              </h2>
              <p className="text-sm leading-relaxed">
                Zusätzlich zum gesetzlichen 14-tägigen Widerrufsrecht gewähren wir Ihnen
                freiwillig ein <strong>30-tägiges Rückgaberecht</strong>. Wenn Sie mit Ihrem
                Gerät nicht zufrieden sind, können Sie es innerhalb von 30 Tagen nach Erhalt
                zurückgeben – ohne Angabe von Gründen.
              </p>
              <p className="text-sm leading-relaxed mt-3">
                Voraussetzung ist, dass sich das Gerät in dem Zustand befindet, in dem Sie es
                erhalten haben.
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

export default Widerruf;
