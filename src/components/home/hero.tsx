import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center bg-gradient-to-br from-[#0A2B3E] to-[#1A4B6E] pt-20 pb-20 lg:pb-0 lg:pt-0">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* বাম পাশে টেক্সট */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="text-[#40E0D0]">Trusted childcare</span>
              <br />
              <span className="text-white">for families on the move</span>
            </h1>

            <p className="text-white/80 text-lg max-w-lg">
              JetSet Cares helps traveling families, expat families, and
              globally mobile parents find trusted childcare in the cities where
              they live, stay, and explore across Asia.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="rounded-full px-8 h-12 bg-[#40E0D0] hover:bg-[#2CB0A0] text-black font-semibold">
                Find Trusted Childcare
              </Button>
              <Button className="rounded-full px-8 h-12 bg-transparent border-2 border-white hover:bg-white/10 text-white">
                Join as a Provider
              </Button>
            </div>

            {/* ট্যাগলাইন */}
            <p className="text-[#40E0D0] text-sm italic">
              JetSet Cares About You!
            </p>
          </div>

          {/* ডান পাশে ইমেজ */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/banner2.png"
                alt="Family with trusted sitter"
                width={1000}
                height={1000}
                className="object-cover w-full h-[400px] md:h-[500px] lg:h-[650px]"
              />
              {/* ওভারলে - সিটার ইউনিফর্ম, টোট ব্যাগ ইত্যাদি ইন্ডিকেট করতে */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3">
                <p className="text-sm font-semibold">✓ Background Checked</p>
                <p className="text-sm">✓ Trusted Sitter</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
