"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const WhyChooseUs = () => {
  return (
    <section className="bg-[#e6f5ff] py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-10">
          {/* Left Card - Value Proposition */}
          <div className="w-full lg:w-2/5 bg-primary text-primary-foreground rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold mb-4 sm:mb-5 md:mb-6 text-pretty">
                A more thoughtful way to find trusted support
              </h2>
              <p className="text-sm sm:text-base leading-relaxed sm:leading-relaxed opacity-95">
                JetSet Cares was created for modern global life. We offer a more
                thoughtful alternative to generic listing platforms by focusing
                on trust, human connection, and the kind of support people
                actually need when living life across borders.
              </p>
            </div>
            <Button className="mt-6 sm:mt-8 w-full sm:w-fit bg-accent text-primary hover:bg-accent/90 rounded-full px-4 sm:px-6 py-3 sm:py-4 font-medium text-sm sm:text-base">
              Learn More
              <span className="ml-2">→</span>
            </Button>
          </div>

          {/* Right Cards Grid */}
          <div className="w-full lg:w-3/5 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {/* Verified Profiles Card */}
            <div className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-3 sm:mb-4 mx-auto">
                <Image
                  src="/verified-profiles.png"
                  alt="Verified Profiles"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover rounded-lg mx-auto"
                  priority={false}
                />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-card-foreground mb-1 sm:mb-2">
                Verified Profiles
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-tight sm:leading-normal">
                All service providers are ID-verified for your safety
              </p>
            </div>

            {/* Women-Only Network Card */}
            <div className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-3 sm:mb-4">
                <Image
                  src="/womens-network.png"
                  alt="Women-Only Network"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover rounded-lg"
                  priority={false}
                />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-card-foreground mb-1 sm:mb-2">
                Trusted Provider Network
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-tight sm:leading-normal">
                Built on trust, care, and connection
              </p>
            </div>

            {/* Trusted Reviews Card */}
            <div className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 col-span-1 xs:col-span-2 sm:col-span-1">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-3 sm:mb-4">
                <Image
                  src="/trusted-reviews.png"
                  alt="Trusted Reviews"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover rounded-lg"
                  priority={false}
                />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-card-foreground mb-1 sm:mb-2">
                Trusted Reviews
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-tight sm:leading-normal">
                Real ratings from verified clients
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
