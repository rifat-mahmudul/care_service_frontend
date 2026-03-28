"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const WhyChooseUs = () => {
  return (
    <section className="bg-[#e6f5ff] py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-10">
          {/* Left Card - How JetSet Works */}
          <div className="w-full lg:w-2/5 bg-primary text-primary-foreground rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold mb-4 sm:mb-5 md:mb-6 text-pretty">
                How JetSet Works
              </h2>
              <p className="text-sm sm:text-base leading-relaxed sm:leading-relaxed opacity-95">
                Finding trusted childcare has never been easier. JetSet connects
                internationally mobile families with verified childcare
                professionals who meet the highest standards of warmth,
                professionalism, and reliability.
              </p>
            </div>
            <Button className="mt-6 sm:mt-8 w-full sm:w-fit bg-accent text-primary hover:bg-accent/90 rounded-full px-4 sm:px-6 py-3 sm:py-4 font-medium text-sm sm:text-base">
              Get Started
              <span className="ml-2">→</span>
            </Button>
          </div>

          {/* Right Cards Grid */}
          <div className="w-full lg:w-3/5 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {/* Choose Your City Card */}
            <div className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 flex flex-col items-center justify-between text-center shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
              <div className="flex flex-col items-center w-full">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-3 sm:mb-4 mx-auto flex-shrink-0">
                  <Image
                    src="/verified-profiles.png"
                    alt="Choose Your City"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover rounded-lg mx-auto"
                    priority={false}
                  />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-card-foreground mb-1 sm:mb-2">
                  Choose Your City
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-tight sm:leading-normal">
                  Explore the JetSet cities where trusted childcare is growing
                </p>
              </div>
            </div>

            {/* Browse Trusted Providers Card */}
            <div className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 flex flex-col items-center justify-between text-center shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
              <div className="flex flex-col items-center w-full">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-3 sm:mb-4 flex-shrink-0">
                  <Image
                    src="/womens-network.png"
                    alt="Browse Trusted Providers"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover rounded-lg"
                    priority={false}
                  />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-card-foreground mb-1 sm:mb-2">
                  Browse Trusted Providers
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-tight sm:leading-normal">
                  View childcare professionals who align with the JetSet
                  standard for warmth, professionalism, reliability, and
                  presentation
                </p>
              </div>
            </div>

            {/* Book with More Confidence Card */}
            <div className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 flex flex-col items-center justify-between text-center shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
              <div className="flex flex-col items-center w-full">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-3 sm:mb-4 flex-shrink-0">
                  <Image
                    src="/trusted-reviews.png"
                    alt="Book with More Confidence"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover rounded-lg"
                    priority={false}
                  />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-card-foreground mb-1 sm:mb-2">
                  Book with More Confidence
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-tight sm:leading-normal">
                  Move forward with childcare that feels safer, more polished,
                  and more dependable for your family
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
