"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const Hero = () => {
  const [backgroundImage, setBackgroundImage] = useState("/banner.jpeg");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setBackgroundImage("/mobile-banner.webp");
      } else {
        setBackgroundImage("/banner.jpeg");
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="min-h-[calc(100vh)] flex items-center pt-20 pb-20 lg:pb-0 lg:pt-0 relative"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0a2b3e0",
      }}
    >
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="container mx-auto relative z-10">
        <div className="flex justify-start">
          {/* Text Section - Left Side */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="text-[#40E0D0]">Trusted childcare</span>
              <br />
              <span className="text-white">for families on the move</span>
            </h1>
            <p className="text-white/90 text-lg">
              JetSet Cares helps traveling families, expat families, and
              globally mobile parents find trusted childcare in the cities where
              they live, stay, and explore across Asia.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="rounded-full px-8 h-12 bg-[#40E0D0] hover:bg-[#2CB0A0] text-black font-semibold">
                Find Trusted Childcare
              </Button>
              <Button className="rounded-full px-8 h-12 bg-transparent border-2 border-white hover:bg-white/10 text-white">
                Apply to Become a Partner
              </Button>
            </div>
            {/* Tagline */}
            <p className="text-[#40E0D0] text-sm italic">
              JetSet Cares About You!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
