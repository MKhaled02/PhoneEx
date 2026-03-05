import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1400&h=600&fit=crop",
    subtitle: "NEU EINGETROFFEN",
    title: "Das beste\nSmartphone-Erlebnis",
    price: "Ab 499 €",
    cta: "Jetzt entdecken",
    ctaHref: "/kollektion/premium",
  },
  {
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=1400&h=600&fit=crop",
    subtitle: "PREMIUM GEBRAUCHT",
    title: "Top-Handys zum\nbesten Preis",
    price: "Ab 199 €",
    cta: "Angebote sehen",
    ctaHref: "/kollektion/midrange",
  },
  {
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=1400&h=600&fit=crop",
    subtitle: "SOFORT-ANKAUF",
    title: "Altes Handy\nverkaufen",
    price: "Faire Preise",
    cta: "Preis berechnen",
    ctaHref: "/ankauf",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="relative w-full overflow-hidden rounded-none md:rounded-xl md:mx-auto md:max-w-[1400px] md:mt-4">
      <div className="relative h-[350px] sm:h-[420px] md:h-[480px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 md:px-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <span className="text-xs md:text-sm tracking-[0.2em] text-accent-foreground/80 uppercase font-medium">
                    {slides[current].subtitle}
                  </span>
                  <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground leading-tight whitespace-pre-line font-heading">
                    {slides[current].title}
                  </h1>
                  <p className="mt-3 text-lg md:text-xl text-primary-foreground/80 font-medium">
                    {slides[current].price}
                  </p>
                  <Link
                    to={slides[current].ctaHref}
                    className="mt-5 inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:bg-accent/90 transition-colors"
                  >
                    {slides[current].cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center hover:bg-background/40 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-primary-foreground" />
          </button>
          <span className="text-xs text-primary-foreground/70 font-medium min-w-[32px] text-center">
            {current + 1}/{slides.length}
          </span>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center hover:bg-background/40 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
