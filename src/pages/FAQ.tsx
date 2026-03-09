import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, Package, CreditCard, RotateCcw, Shield, Truck, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface FAQCategory {
  title: string;
  icon: React.ReactNode;
  questions: { q: string; a: string }[];
}

const faqCategories: FAQCategory[] = [
  {
    title: "Kauf & Bestellung",
    icon: <Package className="w-5 h-5" />,
    questions: [
      {
        q: "In welchem Zustand sind die gebrauchten Smartphones?",
        a: "Alle unsere Geräte werden professionell geprüft und gereinigt. Der Zustand wird klar kommuniziert: 'Wie Neu' bedeutet keine sichtbaren Gebrauchsspuren, 'Sehr Gut' minimale Spuren, 'Gut' leichte Spuren und 'Akzeptabel' deutliche Spuren. Technisch sind alle Geräte vollständig funktionsfähig.",
      },
      {
        q: "Was bedeutet der angezeigte Batterie-Zustand?",
        a: "Der Batterie-Zustand zeigt die verbleibende Kapazität im Vergleich zum Neuzustand. Ab 80% gilt eine Batterie als gut. Wir zeigen den exakten Wert für jedes Gerät an, damit Sie informiert entscheiden können.",
      },
      {
        q: "Sind die Geräte SIM-Lock frei?",
        a: "Ja, alle unsere Smartphones sind ohne SIM-Lock und können mit jeder SIM-Karte verwendet werden.",
      },
      {
        q: "Wird Zubehör mitgeliefert?",
        a: "Jedes Gerät wird mit einem Ladekabel und einem SIM-Tool geliefert. Originalverpackung und Kopfhörer sind nicht immer dabei, es sei denn, dies ist explizit angegeben.",
      },
    ],
  },
  {
    title: "Versand & Lieferung",
    icon: <Truck className="w-5 h-5" />,
    questions: [
      {
        q: "Wie lange dauert die Lieferung?",
        a: "Die Lieferung erfolgt innerhalb von 1-3 Werktagen nach Zahlungseingang. Bestellungen bis 14 Uhr werden noch am selben Tag versendet.",
      },
      {
        q: "Was kostet der Versand?",
        a: "Ab einem Bestellwert von 50€ ist der Versand innerhalb Deutschlands kostenlos. Darunter berechnen wir 4,99€ Versandkosten.",
      },
      {
        q: "Liefert ihr auch ins Ausland?",
        a: "Aktuell liefern wir nur innerhalb Deutschlands. Eine Lieferung in EU-Länder ist auf Anfrage möglich – kontaktieren Sie uns dafür bitte.",
      },
      {
        q: "Kann ich meine Bestellung verfolgen?",
        a: "Ja, sobald Ihr Paket versendet wurde, erhalten Sie eine Sendungsverfolgungsnummer per E-Mail.",
      },
    ],
  },
  {
    title: "Bezahlung",
    icon: <CreditCard className="w-5 h-5" />,
    questions: [
      {
        q: "Welche Zahlungsmethoden werden akzeptiert?",
        a: "Wir akzeptieren PayPal, Kreditkarte (Visa, Mastercard), Klarna (Rechnung, Ratenkauf) und Überweisung (Vorkasse).",
      },
      {
        q: "Ist Ratenzahlung möglich?",
        a: "Ja, über Klarna können Sie bequem in Raten zahlen. Die Konditionen werden Ihnen beim Checkout angezeigt.",
      },
      {
        q: "Wann wird meine Kreditkarte belastet?",
        a: "Die Belastung erfolgt erst nach Versand der Ware.",
      },
    ],
  },
  {
    title: "Rückgabe & Widerruf",
    icon: <RotateCcw className="w-5 h-5" />,
    questions: [
      {
        q: "Kann ich meine Bestellung zurückgeben?",
        a: "Ja, Sie haben ein 30-tägiges Rückgaberecht. Innerhalb dieser Frist können Sie das Gerät ohne Angabe von Gründen zurücksenden. Die Rücksendung ist für Sie kostenlos.",
      },
      {
        q: "Wie funktioniert die Rücksendung?",
        a: "Kontaktieren Sie uns per E-Mail an widerruf@phonix.de. Sie erhalten dann ein kostenloses Retourenlabel. Nach Erhalt und Prüfung des Geräts erstatten wir den Kaufpreis innerhalb von 3 Werktagen.",
      },
      {
        q: "In welchem Zustand muss das Gerät sein?",
        a: "Das Gerät sollte sich in dem Zustand befinden, in dem Sie es erhalten haben. Eine normale Nutzung zur Prüfung ist natürlich erlaubt.",
      },
    ],
  },
  {
    title: "Garantie & Service",
    icon: <Shield className="w-5 h-5" />,
    questions: [
      {
        q: "Welche Garantie erhalte ich?",
        a: "Alle unsere Geräte haben 12 Monate Garantie. Diese deckt alle technischen Defekte ab, die nicht durch unsachgemäße Handhabung entstanden sind.",
      },
      {
        q: "Was ist bei einem Garantiefall zu tun?",
        a: "Kontaktieren Sie uns unter service@phonix.de mit Ihrer Bestellnummer und einer Beschreibung des Problems. Wir kümmern uns schnellstmöglich um eine Lösung.",
      },
      {
        q: "Repariert ihr auch Geräte, die nicht bei euch gekauft wurden?",
        a: "Nein, wir bieten aktuell keine Reparaturdienstleistungen für extern erworbene Geräte an.",
      },
    ],
  },
  {
    title: "Handy verkaufen",
    icon: <Phone className="w-5 h-5" />,
    questions: [
      {
        q: "Wie verkaufe ich mein Smartphone an PHONIX?",
        a: "Nutzen Sie unseren Ankauf-Rechner unter /ankauf. Wählen Sie Ihr Modell, den Zustand und eventuelle Mängel aus. Sie erhalten sofort ein Preisangebot. Nach Zusendung und Prüfung erfolgt die Auszahlung innerhalb von 3 Werktagen.",
      },
      {
        q: "Wie wird der Ankaufspreis berechnet?",
        a: "Der Preis basiert auf Modell, Speicherkapazität, Zustand und eventuellen Mängeln. Je besser der Zustand, desto höher der Preis.",
      },
      {
        q: "Was passiert mit meinen Daten?",
        a: "Wir empfehlen, vor dem Versand alle Daten zu löschen und das Gerät auf Werkseinstellungen zurückzusetzen. Zusätzlich führen wir eine professionelle Datenlöschung nach DSGVO-Standards durch.",
      },
      {
        q: "Muss ich das Gerät versichert versenden?",
        a: "Wir senden Ihnen ein kostenloses Versandlabel zu. Der Versand ist versichert – Sie tragen kein Risiko.",
      },
      {
        q: "Was, wenn der tatsächliche Zustand von meinen Angaben abweicht?",
        a: "Wenn wir Abweichungen feststellen, erhalten Sie ein angepasstes Angebot. Sie können dieses annehmen oder wir senden das Gerät kostenfrei zurück.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-secondary to-background py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-accent" />
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Häufig gestellte Fragen
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Finden Sie Antworten auf die häufigsten Fragen zu Bestellung, Versand,
                Garantie und Ankauf. Sollte Ihre Frage nicht dabei sein, kontaktieren Sie uns gerne.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                      {category.icon}
                    </div>
                    <h2 className="font-heading text-xl font-semibold text-foreground">
                      {category.title}
                    </h2>
                  </div>

                  {/* Questions */}
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((item, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.title}-${index}`}
                        className="border border-border rounded-lg px-4 data-[state=open]:bg-secondary/50"
                      >
                        <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-4">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground pb-4">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12 bg-secondary/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
              Frage nicht gefunden?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Unser Kundenservice hilft Ihnen gerne weiter. Kontaktieren Sie uns
              per E-Mail oder Telefon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/kontakt"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors"
              >
                Kontakt aufnehmen
              </Link>
              <a
                href="tel:+491234567890"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-secondary transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                +49 123 456 7890
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default FAQ;
