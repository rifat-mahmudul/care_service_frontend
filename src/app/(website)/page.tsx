import AcademySection from "@/components/home/academy-section";
import Categories from "@/components/home/categories";
import CitySection from "@/components/home/city-section";
import Hero from "@/components/home/hero";
import MarqueeSection from "@/components/home/marque-section";
import ProviderSection from "@/components/home/provider-section";

export default function Home() {
  return (
    <div className="space-y-24">
      <Hero />
      <Categories />
      <CitySection />
      <AcademySection />
      <ProviderSection />
      {/* <WhenYou /> */}
      {/* <OurCommunity /> */}
      {/* <WhyChooseUs /> */}
      <div className="!mb-16">
        <MarqueeSection />
      </div>
      {/* <CareSection /> */}
    </div>
  );
}
