import { getProductsByCategory } from "@/data/products";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import HeroSlider from "@/components/HeroSlider";
import CategoryIcons from "@/components/CategoryIcons";
import FeaturedProducts from "@/components/FeaturedProducts";
import SellBanner from "@/components/SellBanner";
import TrustBadges from "@/components/TrustBadges";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  const premium = getProductsByCategory("premium");
  const midrange = getProductsByCategory("midrange");
  const budget = getProductsByCategory("budget");

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <HeroSlider />
        <CategoryIcons />
        <FeaturedProducts
          title="Premium Smartphones"
          subtitle="Geprüft & garantiert — bis zu 30% unter Neupreis."
          products={premium}
          viewAllHref="/kollektion/premium"
          viewAllLabel="Alle Premium"
        />
        <FeaturedProducts
          title="Mittelklasse Highlights"
          subtitle="Bestes Preis-Leistungs-Verhältnis."
          products={midrange}
          viewAllHref="/kollektion/midrange"
          viewAllLabel="Alle Midrange"
        />
        <FeaturedProducts
          title="Budget Deals"
          subtitle="Gute Geräte zum kleinen Preis."
          products={budget}
          viewAllHref="/kollektion/budget"
          viewAllLabel="Alle Budget"
        />
        <SellBanner />
        <TrustBadges />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
