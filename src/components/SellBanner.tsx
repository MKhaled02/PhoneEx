import { motion } from "framer-motion";
import { ArrowRight, Smartphone } from "lucide-react";

const SellBanner = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="hero-gradient rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
      >
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">
            Dein altes Handy verkaufen
          </h2>
          <p className="mt-3 text-primary-foreground/70 max-w-md">
            Erhalte sofort eine Bewertung und verkaufe dein gebrauchtes Smartphone schnell und einfach.
            Faire Preise garantiert.
          </p>
          <a
            href="#ankauf"
            className="mt-5 inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:bg-accent/90 transition-colors"
          >
            Handy bewerten lassen
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
          <Smartphone className="w-12 h-12 md:w-16 md:h-16 text-accent" />
        </div>
      </motion.div>
    </section>
  );
};

export default SellBanner;
