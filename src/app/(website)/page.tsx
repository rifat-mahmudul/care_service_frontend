import CareSection from "@/components/home/care-section";
import Categories from "@/components/home/categories";
import CitySection from "@/components/home/city-section";
import Faq from "@/components/home/faq";
import Hero from "@/components/home/hero";
import MarqueeSection from "@/components/home/marque-section";
import OurCommunity from "@/components/home/our-community";
import WhenYou from "@/components/home/when-you";
import WhyChooseUs from "@/components/home/why-choose-us";
// import AcademySection from "@/components/home/academy-section";

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <Categories />
      <CitySection />
      <WhenYou />
      <OurCommunity />
      <WhyChooseUs />
      {/* <AcademySection /> */}
      <MarqueeSection />
      <Faq />
      <CareSection />
    </div>
  );
}
