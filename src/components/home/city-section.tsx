"use client";
import React, { useState } from "react";
import { MapPin, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface City {
  country: string;
  cities: string[];
}

const CitySection = () => {
  // শুরুতে শুধুমাত্র একটি নির্দিষ্ট দেশ ওপেন থাকবে
  const [expandedCountry, setExpandedCountry] = useState<string | null>(
    "Singapore",
  );

  const citiesData: City[] = [
    { country: "Singapore", cities: ["Singapore"] },
    { country: "Hong Kong", cities: ["Hong Kong"] },
    {
      country: "Thailand",
      cities: [
        "Bangkok",
        "Chiang Mai",
        "Hua Hin",
        "Koh Samui",
        "Pattaya",
        "Phuket",
        "Pai (Coming Soon)",
      ],
    },
    {
      country: "Vietnam",
      cities: ["Da Nang", "Hanoi", "Ho Chi Minh City", "Hoi An"],
    },
    {
      country: "Malaysia",
      cities: ["Genting Highlands", "Johor Bahru", "Kuala Lumpur", "Penang"],
    },
    {
      country: "Indonesia",
      cities: ["Bali", "Batam", "Jakarta", "Labuan Bajo", "Surabaya"],
    },
    {
      country: "Philippines",
      cities: [
        "Cebu",
        "Manila",
        "Clark / Angeles",
        "Davao",
        "Boracay (Coming Soon)",
        "Palawan (Coming Soon)",
        "Dumaguete (Coming Soon)",
      ],
    },
    {
      country: "South Korea",
      cities: [
        "Seoul",
        "Busan (Coming Soon)",
        "Incheon (Coming Soon)",
        "Jeju (Coming Soon)",
      ],
    },
    {
      country: "Taiwan",
      cities: ["Taipei", "Taichung", "Kaohsiung", "Tainan (Coming Soon)"],
    },
    { country: "Cambodia", cities: ["Siem Reap", "Phnom Penh"] },
  ];

  const toggleCountry = (countryName: string) => {
    setExpandedCountry(expandedCountry === countryName ? null : countryName);
  };

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2B3E] mb-4">
            Built city by city across Asia
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            JetSet Cares is expanding through carefully selected cities with a
            focus on trusted childcare depth before broad expansion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {citiesData.map((country) => {
            const isExpanded = expandedCountry === country.country;

            return (
              <div
                key={country.country}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleCountry(country.country)}
                  className={`w-full px-6 py-4 flex justify-between items-center transition-colors ${
                    isExpanded ? "bg-[#40E0D0]/10" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin
                      className={`w-5 h-5 ${isExpanded ? "text-[#40E0D0]" : "text-gray-400"}`}
                    />
                    <h3 className="font-semibold text-lg text-[#0A2B3E]">
                      {country.country}
                    </h3>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? "rotate-90 text-[#40E0D0]" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-2 grid grid-cols-1 gap-1 border-t border-gray-50">
                        {country.cities.map((city) => (
                          <div
                            key={city}
                            className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
                          >
                            <span
                              className={`text-sm ${city.includes("Coming Soon") ? "text-gray-400 italic" : "text-gray-700 font-medium"}`}
                            >
                              {city}
                            </span>
                            {!city.includes("Coming Soon") && (
                              <span className="text-[10px] uppercase tracking-wider bg-green-50 text-green-600 font-bold px-2 py-0.5 rounded-full border border-green-100">
                                Active
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CitySection;
