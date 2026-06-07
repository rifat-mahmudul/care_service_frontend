"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative bg-[#0a2332] lg:block">
      {/* ---------------------------------------------------------------- */}
      {/* MOBILE LAYOUT (lg:hidden) - Background Image with Natural Height */}
      {/* ---------------------------------------------------------------- */}
      <div 
        className="flex flex-col w-full px-6 pt-24 pb-12 lg:hidden h-auto relative bg-no-repeat bg-center"
        style={{
          backgroundImage: `url('/mobile-banner.webp')`,
          backgroundSize: "100% auto", // ইমেজের উইডথ ১০০% থাকবে এবং হাইট নিজে থেকে এডজাস্ট হবে
        }}
      >
        {/* টেক্সট ক্লিয়ারলি পড়ার জন্য ডার্ক ওভারলে */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2332] via-[#0a2332]/40 to-[#0a2332]/95 z-0"></div>

        {/* আসল কন্টেন্ট ব্লক */}
        <div className="relative z-10 flex flex-col space-y-6">
          
          {/* Top Text Group */}
          <div className="space-y-4">
            {/* 2. Headline */}
            <h1 className="text-3xl md:text-4xl font-bold leading-tight font-serif">
              <span className="text-[#40E0D0]">Trusted childcare</span>
              <br />
              <span className="text-white">for families on the move</span>
            </h1>

            {/* 3. Short Paragraph */}
            <p className="text-white/75 text-sm md:text-base leading-relaxed">
              JetSet Cares helps traveling families, expat families, and globally
              mobile parents find trusted childcare in the cities where they live,
              stay, and explore across Asia.
            </p>
          </div>

          {/* এই গ্যাপটা ইমেজের মেইন ফোকাস এরিয়াকে টেক্সট ও বাটনের মাঝখানে ন্যাচারাল জায়গা দিবে */}
          <div className="w-full aspect-[4/3] sm:aspect-[16/9]"></div>

          {/* Bottom Button & Tagline Group - ইমেজের নিচেই টাইটলি লেগে থাকবে */}
          <div className="space-y-4">
            {/* 5. Buttons */}
            <div className="flex flex-col gap-3 w-full">
              <Link href="#categories" className="w-full">
                <Button className="w-full rounded-full h-12 bg-[#40E0D0] hover:bg-[#2CB0A0] text-black font-semibold text-base font-serif">
                  Find Trusted Childcare
                </Button>
              </Link>
              <Link href="/login" className="w-full">
                <Button className="w-full rounded-full h-12 bg-transparent border-2 border-white hover:bg-white/10 text-white text-base font-serif">
                  Apply to Become a Partner
                </Button>
              </Link>
            </div>

            {/* 6. Tagline */}
            <p className="text-[#40E0D0] text-sm italic pt-1">
              JetSet Cares About You!
            </p>
          </div>

        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* DESKTOP LAYOUT (hidden lg:flex) */}
      {/* ---------------------------------------------------------------- */}
      <div
        className="hidden lg:flex min-h-screen items-center pt-20 pb-20 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/banner.jpeg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        <div className="container mx-auto relative z-10 px-6">
          <div className="flex justify-start">
            <div className="w-1/2 space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight font-serif">
                <span className="text-[#40E0D0]">Trusted childcare</span>
                <br />
                <span className="text-white">for families on the move</span>
              </h1>
              <p className="text-white/90 text-lg max-w-xl">
                JetSet Cares helps traveling families, expat families, and
                globally mobile parents find trusted childcare in the cities
                where they live, stay, and explore across Asia.
              </p>
              <div className="flex gap-4 pt-4">
                <Link href="#categories">
                  <Button className="rounded-full px-8 h-12 bg-[#40E0D0] hover:bg-[#2CB0A0] text-black font-semibold font-serif">
                    Find Trusted Childcare
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="rounded-full px-8 h-12 bg-transparent border-2 border-white hover:bg-white/10 text-white font-serif">
                    Apply to Become a Partner
                  </Button>
                </Link>
              </div>
              <p className="text-[#40E0D0] text-sm italic">
                JetSet Cares About You!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;