import Categories from "@/components/home/categories";
import Hero from "@/components/home/hero";
import WhenYou from "@/components/home/when-you";

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <Categories />
      <WhenYou />
    </div>
  );
}
