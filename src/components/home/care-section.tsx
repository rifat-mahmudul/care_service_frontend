"use client";
import React from "react";
import { ArrowRight } from "lucide-react"; // Using lucide-react for the arrow icon
import Image from "next/image";

const CareSection = () => {
  const features = [
    {
      title: "Create a job",
      description:
        "Share your needs, and caregivers will reach out to you directly",
    },
    {
      title: "View profiles side by side",
      description:
        "Covering everything from qualifications and training to where you are and what you pay.",
    },
    {
      title: "View reviews",
      description: "You don't have to ask — check out what others have shared.",
    },
  ];

  return (
    <section className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center font-sans">
      {/* Left Content Column */}
      <div className="space-y-10">
        <h2 className="text-4xl md:text-5xl font-bold text-[#0A1D37] leading-tight">
          Find care on your terms
        </h2>

        <div className="space-y-8">
          {features.map((item, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-xl font-bold text-[#0A1D37]">{item.title}</h3>
              <p className="text-[#4A4A4A] text-lg leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <button className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-[#002244] transition-all group">
          Get Started
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>

      {/* Right Image Grid Column */}
      <div className="grid grid-cols-2 gap-4 h-full">
        {/* Left column of images */}
        <div className="space-y-4">
          <Image
            src="/when-you.jpg"
            alt="Caregiver with baby"
            width={1000}
            height={1000}
            className="w-full rounded-2xl h-[280px] object-cover bg-[#D1E1FF]"
          />
          <Image
            src="/when-you.jpg"
            alt="Caregiver with senior"
            width={1000}
            height={1000}
            className="w-full rounded-2xl h-[450px] object-cover bg-[#DED0C1]"
          />
        </div>

        {/* Right column of images */}
        <div className="space-y-4 pt-8">
          <Image
            src="/when-you.jpg"
            alt="Caregiver portrait"
            width={1000}
            height={1000}
            className="w-full rounded-2xl h-[220px] object-cover bg-[#E5D1C1]"
          />
          <Image
            src="/when-you.jpg"
            alt="Medical professional with senior"
            width={1000}
            height={1000}
            className="w-full rounded-2xl h-[280px] object-cover bg-[#99FFEB]"
          />
          <Image
            src="/when-you.jpg"
            alt="Child portrait"
            width={1000}
            height={1000}
            className="w-full rounded-2xl h-[300px] object-cover bg-[#C8D6F5]"
          />
        </div>
      </div>
    </section>
  );
};

export default CareSection;
