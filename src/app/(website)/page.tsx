import Categories from "@/components/home/categories";
import Hero from "@/components/home/hero";
import MarqueeSection from "@/components/home/marque-section";
import OurCommunity from "@/components/home/our-community";
import WhenYou from "@/components/home/when-you";
import WhyChooseUs from "@/components/home/why-choose-us";

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <Categories />
      <WhenYou />
      <OurCommunity />
      <WhyChooseUs />
      <MarqueeSection />
    </div>
  );
}
