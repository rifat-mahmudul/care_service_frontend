"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Star, Headphones } from "lucide-react";
import { Button } from "../ui/button";

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Vetted & Verified",
    description: "Every partner is screened and trusted",
  },
  {
    icon: Star,
    title: "Highly Rated",
    description: "Real reviews from real families",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We are here whenever you need us",
  },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-24">
      <div className="container relative px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold leading-tight text-[#16324f] sm:text-5xl lg:text-6xl">
              More than a booking.
              <span className="mt-1 block text-[#28c7be]">
                Real peace of mind.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              JetSet Cares connects families with trusted childcare, pet care,
              and family support in the places that matter. Safety. Reliability.
              Professionalism. Everywhere in Asia.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="#categories">
                <Button className="h-12 rounded-full bg-[#2ed3c7] px-8 text-base font-semibold text-slate-950 shadow-[0_12px_30px_rgba(46,211,199,0.28)] transition-all hover:bg-[#22c1b5]">
                  Find Trusted Care
                </Button>
              </Link>
              <Link href="/login">
                <Button className="h-12 rounded-full border-2 border-[#35d4c8] bg-transparent px-8 text-base font-semibold text-[#1f8f88] transition-all hover:bg-[#eafffd]">
                  Become a Partner
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {trustPoints.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-[#e8fbf8] p-2 text-[#1eb7ac]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#16324f]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[520px] items-center justify-center lg:mr-0 lg:max-w-[600px]">
            <Image
              src="/banner3.png"
              alt="JetSet Cares app preview"
              width={1000}
              height={1000}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
