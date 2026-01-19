import Categories from "@/components/home/categories";
import Hero from "@/components/home/hero";

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <Categories />
    </div>
  );
}
