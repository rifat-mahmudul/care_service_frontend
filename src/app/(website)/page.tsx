import Categories from "@/components/home/categories";
import Hero from "@/components/home/hero";
import OurCommunity from "@/components/home/our-community";
import WhenYou from "@/components/home/when-you";

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <Categories />
      <WhenYou />
      <OurCommunity />
    </div>
  );
}
