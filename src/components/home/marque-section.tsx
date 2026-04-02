"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image";

interface Service {
  id: string;
  name: string;
  textColor: string;
  imageUrl: string;
  alt: string;
}

const topRowServices: Service[] = [
  {
    id: "1",
    name: "Infant Care",
    textColor: "#8B6F47",
    imageUrl: "/marque/urgent.jpg",
    alt: "Infant Care",
  },
  {
    id: "2",
    name: "Toddler Care",
    textColor: "#0066CC",
    imageUrl: "/marque/urgent.jpg",
    alt: "Toddler Care",
  },
  {
    id: "3",
    name: "School Age Care",
    textColor: "#333333",
    imageUrl: "/marque/urgent.jpg",
    alt: "School Age Care",
  },
  {
    id: "4",
    name: "Date Night",
    textColor: "#17A2B8",
    imageUrl: "/marque/urgent.jpg",
    alt: "Date Night",
  },
  {
    id: "5",
    name: "Weekend Care",
    textColor: "#8B6F47",
    imageUrl: "/marque/urgent.jpg",
    alt: "Weekend Care",
  },
  {
    id: "6",
    name: "Hotel Babysitting",
    textColor: "#0066CC",
    imageUrl: "/marque/urgent.jpg",
    alt: "Hotel Babysitting",
  },
];

const bottomRowServices: Service[] = [
  {
    id: "7",
    name: "Travel Support",
    textColor: "#17A2B8",
    imageUrl: "/marque/urgent.jpg",
    alt: "Travel Support",
  },
  {
    id: "8",
    name: "LGBTQ+ Affirming",
    textColor: "#17A2B8",
    imageUrl: "/marque/urgent.jpg",
    alt: "LGBTQ+ Affirming",
  },
  {
    id: "9",
    name: "Multilingual",
    textColor: "#0066CC",
    imageUrl: "/marque/urgent.jpg",
    alt: "Multilingual",
  },
  {
    id: "10",
    name: "Homework Help",
    textColor: "#17A2B8",
    imageUrl: "/marque/urgent.jpg",
    alt: "Homework Help",
  },
  {
    id: "11",
    name: "Special Needs Support",
    textColor: "#8B6F47",
    imageUrl: "/marque/urgent.jpg",
    alt: "Special Needs Support",
  },
  {
    id: "12",
    name: "Newborn Support",
    textColor: "#0066CC",
    imageUrl: "/marque/urgent.jpg",
    alt: "Newborn Support",
  },
];

function ServiceCard({ name, textColor, imageUrl, alt }: Service) {
  return (
    <div className="flex items-center gap-3 min-w-max px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 mx-2 sm:mx-3 border border-gray-100">
      <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes="(max-width: 1000px) 40px, (max-width: 1000px) 48px, 56px"
          className="object-cover"
        />
      </div>
      <span
        style={{ color: textColor }}
        className="text-xs sm:text-sm md:text-base font-medium whitespace-nowrap"
      >
        {name}
      </span>
    </div>
  );
}

export default function MarqueeSection() {
  return (
    <div className="w-full space-y-3 sm:space-y-4 md:space-y-6 overflow-hidden">
      {/* Top Row - LTR (Left to Right) */}
      <div className="relative">
        <Marquee
          pauseOnHover={true}
          speed={40}
          gradient={true}
          gradientColor="#ffffff"
          gradientWidth={80}
          direction="left"
        >
          {topRowServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </Marquee>
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>

      {/* Bottom Row - RTL (Right to Left) */}
      <div className="relative">
        <Marquee
          pauseOnHover={true}
          speed={40}
          gradient={true}
          gradientColor="#ffffff"
          gradientWidth={80}
          direction="right"
        >
          {bottomRowServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </Marquee>
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
}
