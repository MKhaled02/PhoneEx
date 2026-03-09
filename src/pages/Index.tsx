import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ALL_PRODUCTS, getProductsByBrand } from "@/data/products";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import HeroSlider from "@/components/HeroSlider";
import FeaturedProducts from "@/components/FeaturedProducts";
import TrustBadges from "@/components/TrustBadges";
import SellBanner from "@/components/SellBanner";
import SiteFooter from "@/components/SiteFooter";

const homeCategories = [
  { title: "Smartphones", subtitle: "Top Modelle sofort verfügbar", href: "/smartphones/alle" },
  { title: "iPhone", subtitle: "Von iPhone 12 bis iPhone 16", href: "/smartphones/apple" },
  { title: "Samsung", subtitle: "Galaxy S und A Serien", href: "/smartphones/samsung" },
  { title: "Google", subtitle: "Pixel Geräte mit Garantie", href: "/smartphones/google" },
  { title: "Xiaomi", subtitle: "Preis-Leistung auf hohem Niveau", href: "/smartphones/xiaomi" },
  { title: "Handy verkaufen", subtitle: "In 3 Minuten Preis berechnen", href: "/ankauf" },
];

const buyingSteps = [
  {
    title: "Passendes Modell finden",
    text: "Wähle Marke, Speicher und Zustand aus unserem geprüften Sortiment.",
  },
  {
    title: "Geprüfte Qualität erhalten",
    text: "Jedes Gerät wird professionell getestet, gereinigt und mit Garantie ausgeliefert.",
  },
  {
    title: "Nachhaltig sparen",
    text: "Du bekommst Premium-Technik deutlich günstiger und verlängerst den Produktlebenszyklus.",
  },
];

const Index = () => {
  const appleProducts = getProductsByBrand("Apple").slice(0, 8);
  const samsungProducts = getProductsByBrand("Samsung").slice(0, 8);

  const topDeals = ALL_PRODUCTS
    .filter((p) => p.badge)
    .sort((a, b) => b.oldPrice - b.price - (a.oldPrice - a.price))
    .slice(0, 8);

  const budgetProducts = [...ALL_PRODUCTS]
    .sort((a, b) => a.price - b.price)
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <HeroSlider />

        <section className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {homeCategories.map((category) => (
              <Link
                key={category.title}
                to={category.href}
                className="rounded-xl border border-border bg-card p-4 hover:bg-secondary transition-colors"
              >
                <p className="text-sm font-semibold">{category.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{category.subtitle}</p>
              </Link>
            ))}
          </div>
        </section>

        <TrustBadges />

        {/* Social Proof / Bewertungen */}
        <section className="container mx-auto px-4 py-10">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Kundenbewertungen</p>
            <h2 className="text-2xl md:text-3xl font-bold">Das sagen unsere Kunden</h2>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              ))}
              <span className="ml-2 text-sm font-semibold text-foreground">4,8 von 5</span>
              <span className="ml-1 text-sm text-muted-foreground">(243 Bewertungen)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Sarah M.", city: "Berlin", rating: 5, text: "Super schnelle Lieferung, iPhone war in perfektem Zustand. Genau wie beschrieben. Kaufe hier definitiv wieder!", product: "iPhone 15 Pro 256GB" },
              { name: "Markus T.", city: "Hamburg", rating: 5, text: "Hatte erst Bedenken bei gebrauchten Handys, aber das Samsung Galaxy sieht aus wie neu. Akku bei 97% – besser als erwartet!", product: "Samsung Galaxy S24 256GB" },
              { name: "Julia K.", city: "München", rating: 5, text: "Toller Kundenservice und faire Preise. Mein altes iPhone wurde schnell angekauft und das neue kam in 2 Tagen an.", product: "iPhone 14 Pro 128GB" },
            ].map((review) => (
              <div key={review.name} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-3">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.city}</p>
                  </div>
                  <p className="text-xs text-muted-foreground text-right">{review.product}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <FeaturedProducts
          title="Top Angebote"
          subtitle="Beliebte Geräte mit besonders hoher Ersparnis."
          products={topDeals}
          viewAllHref="/smartphones/alle"
          viewAllLabel="Alle Angebote"
        />

        <FeaturedProducts
          title="iPhone Bestseller"
          subtitle="Refurbished iPhones mit hoher Batteriekapazität und Garantie."
          products={appleProducts}
          viewAllHref="/smartphones/apple"
          viewAllLabel="Alle iPhones"
        />

        <FeaturedProducts
          title="Samsung Highlights"
          subtitle="Galaxy Modelle für Alltag, Business und Creator-Usecases."
          products={samsungProducts}
          viewAllHref="/smartphones/samsung"
          viewAllLabel="Alle Samsung"
        />

        <FeaturedProducts
          title="Preiswerte Einstiege"
          subtitle="Unsere günstigsten geprüften Smartphones."
          products={budgetProducts}
          viewAllHref="/smartphones/alle"
          viewAllLabel="Alle Budget-Deals"
        />

        <SellBanner />

        <section className="container mx-auto px-4 py-10 md:py-12">
          <div className="rounded-2xl border border-border bg-secondary/40 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold">So funktioniert refurbished kaufen</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {buyingSteps.map((step, index) => (
                <div key={step.title} className="rounded-xl bg-background border border-border p-5">
                  <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-foreground text-background text-sm font-semibold">
                    {index + 1}
                  </span>
                  <h3 className="mt-3 font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                to="/ankauf"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground text-background px-5 py-3 text-sm font-semibold hover:bg-foreground/90 transition-colors"
              >
                Jetzt altes Handy verkaufen
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
