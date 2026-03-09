import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  subject: z.string().min(3, "Bitte geben Sie einen Betreff ein"),
  orderNumber: z.string().optional(),
  message: z.string().min(10, "Bitte geben Sie eine Nachricht ein (min. 10 Zeichen)"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Kontakt = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simuliere API-Aufruf
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Kontaktformular gesendet:", data);
    setIsSubmitted(true);
    setIsSubmitting(false);
    reset();

    toast.success("Nachricht erfolgreich gesendet!", {
      description: "Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
    });
  };

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
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Kontakt
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Haben Sie Fragen zu unseren Produkten, Ihrer Bestellung oder dem Ankauf?
                Wir sind für Sie da und helfen gerne weiter.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Kontakt-Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-1 space-y-6"
              >
                <div>
                  <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
                    So erreichen Sie uns
                  </h2>

                  <div className="space-y-4">
                    {/* Telefon */}
                    <a
                      href="tel:+4930987654321"
                      className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Telefon</p>
                        <p className="text-sm text-muted-foreground">+49 30 9876 5432</p>
                      </div>
                    </a>

                    {/* E-Mail */}
                    <a
                      href="mailto:info@phonix.de"
                      className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">E-Mail</p>
                        <p className="text-sm text-muted-foreground">info@phonix.de</p>
                        <p className="text-xs text-muted-foreground">service@phonix.de</p>
                      </div>
                    </a>

                    {/* Adresse */}
                    <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Adresse</p>
                        <p className="text-sm text-muted-foreground">
                          Brunnenstraße 147<br />
                          10115 Berlin
                        </p>
                      </div>
                    </div>

                    {/* Öffnungszeiten */}
                    <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Öffnungszeiten</p>
                        <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
                          <p>Mo - Fr: 09:00 - 18:00 Uhr</p>
                          <p>Sa: 10:00 - 15:00 Uhr</p>
                          <p>So: Geschlossen</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
                  <p className="text-sm font-medium text-foreground">
                    Durchschnittliche Antwortzeit
                  </p>
                  <p className="text-2xl font-bold text-accent mt-1">
                    &lt; 24 Stunden
                  </p>
                </div>
              </motion.div>

              {/* Kontaktformular */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="bg-secondary/30 border border-border rounded-2xl p-6 md:p-8">
                  <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
                    Schreiben Sie uns
                  </h2>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-14 h-14 mx-auto mb-4 border-2 border-foreground rounded-full flex items-center justify-center">
                        <CheckCircle className="w-7 h-7 text-foreground" />
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                        Nachricht gesendet!
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Vielen Dank für Ihre Nachricht. Wir melden uns schnellstmöglich bei Ihnen.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-accent hover:underline font-medium"
                      >
                        Weitere Nachricht senden
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        {/* Name */}
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-foreground mb-1.5"
                          >
                            Name *
                          </label>
                          <input
                            {...register("name")}
                            type="text"
                            id="name"
                            placeholder="Ihr Name"
                            className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                              errors.name ? "border-red-500" : "border-border"
                            }`}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                          )}
                        </div>

                        {/* E-Mail */}
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-foreground mb-1.5"
                          >
                            E-Mail *
                          </label>
                          <input
                            {...register("email")}
                            type="email"
                            id="email"
                            placeholder="ihre@email.de"
                            className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                              errors.email ? "border-red-500" : "border-border"
                            }`}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        {/* Betreff */}
                        <div>
                          <label
                            htmlFor="subject"
                            className="block text-sm font-medium text-foreground mb-1.5"
                          >
                            Betreff *
                          </label>
                          <select
                            {...register("subject")}
                            id="subject"
                            className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                              errors.subject ? "border-red-500" : "border-border"
                            }`}
                          >
                            <option value="">Bitte wählen...</option>
                            <option value="bestellung">Frage zu meiner Bestellung</option>
                            <option value="produkt">Frage zu einem Produkt</option>
                            <option value="ankauf">Frage zum Ankauf</option>
                            <option value="garantie">Garantie & Rückgabe</option>
                            <option value="sonstiges">Sonstiges</option>
                          </select>
                          {errors.subject && (
                            <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                          )}
                        </div>

                        {/* Bestellnummer */}
                        <div>
                          <label
                            htmlFor="orderNumber"
                            className="block text-sm font-medium text-foreground mb-1.5"
                          >
                            Bestellnummer (optional)
                          </label>
                          <input
                            {...register("orderNumber")}
                            type="text"
                            id="orderNumber"
                            placeholder="z.B. PHX-123456"
                            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                      </div>

                      {/* Nachricht */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-foreground mb-1.5"
                        >
                          Nachricht *
                        </label>
                        <textarea
                          {...register("message")}
                          id="message"
                          rows={5}
                          placeholder="Wie können wir Ihnen helfen?"
                          className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none ${
                            errors.message ? "border-red-500" : "border-border"
                          }`}
                        />
                        {errors.message && (
                          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                        )}
                      </div>

                      {/* Datenschutz-Hinweis */}
                      <p className="text-xs text-muted-foreground">
                        Mit dem Absenden stimmen Sie unserer{" "}
                        <a href="/datenschutz" className="text-accent hover:underline">
                          Datenschutzerklärung
                        </a>{" "}
                        zu.
                      </p>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto px-8 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                            Wird gesendet...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Nachricht senden
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="h-80 bg-secondary/50 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-accent mx-auto mb-3" />
              <p className="text-muted-foreground">
                Brunnenstraße 147, 10115 Berlin
              </p>
              <a
                href="https://maps.google.com/?q=Brunnenstraße+147,+10115+Berlin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline text-sm mt-2 inline-block"
              >
                In Google Maps öffnen →
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Kontakt;
