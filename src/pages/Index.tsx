import AnnouncementBar from "@/components/AnnouncementBar";
import SiteHeader from "@/components/SiteHeader";
import HeroSlider from "@/components/HeroSlider";
import CategoryIcons from "@/components/CategoryIcons";
import FeaturedProducts from "@/components/FeaturedProducts";
import SellBanner from "@/components/SellBanner";
import TrustBadges from "@/components/TrustBadges";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <HeroSlider />
        <CategoryIcons />
        <FeaturedProducts />
        <SellBanner />
        <TrustBadges />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
