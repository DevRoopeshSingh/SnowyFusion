import HeroSection from "@/components/home/HeroSection";
import SeasonalSpecials from "@/components/home/SeasonalSpecials";
import FeaturedItems from "@/components/home/FeaturedItems";
import SpecialOffers from "@/components/home/SpecialOffers";
import Testimonials from "@/components/home/Testimonials";

export default function HomeSection({ menuData, onMenuClick, onItemClick }) {
  return (
    <section role="region" aria-label="Home Content">
      <HeroSection onMenuClick={onMenuClick} />
      <SeasonalSpecials />
      <FeaturedItems
        items={menuData.categories
          .flatMap((category) => category.items)
          .filter((item) => item.popular)}
        onItemClick={onItemClick}
      />
      <SpecialOffers />
      <Testimonials />
    </section>
  );
}
