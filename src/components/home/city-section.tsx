"use client";
import React, { useState } from "react";
import { ChevronRight, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface APICountry {
  _id: string;
  countryName: string;
  cityName: string[];
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface APIResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: APICountry[];
}

// Shadcn UI স্টাইলের স্কেলিটন কম্পোনেন্ট
const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200/80 dark:bg-gray-800 ${className}`}
      {...props}
    />
  );
};

// কার্ড বেসড ডিজাইনের জন্য স্কেলিটন লোডিং স্টেট
const CitySectionSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="border border-gray-100 rounded-3xl overflow-hidden bg-white space-y-4 shadow-sm"
        >
          {/* ইমেজ স্কেলিটন */}
          <Skeleton className="h-48 w-full rounded-t-3xl rounded-b-none" />
          {/* কন্টেন্ট স্কেলিটন */}
          <div className="p-6 space-y-3">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-44" />
          </div>
        </div>
      ))}
    </div>
  );
};

const CitySection = () => {
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useQuery<APIResponse>({
    queryKey: ["country-city"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/country`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  const countriesData = apiResponse?.data || [];

  React.useEffect(() => {
    if (countriesData.length > 0 && !expandedCountry) {
      setExpandedCountry(countriesData[0].countryName);
    }
  }, [countriesData, expandedCountry]);

  const toggleCountry = (countryName: string) => {
    setExpandedCountry(expandedCountry === countryName ? null : countryName);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50/30 to-white">
      <div className="container mx-auto px-4">
        {/* হেডার সেকশন */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A2B3E] tracking-tight mb-4">
            Built city by city across Asia
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            JetSet Cares is expanding through carefully selected cities with a
            focus on trusted childcare depth before broad expansion.
          </p>
        </div>

        {/* এরর স্টেট */}
        {isError && (
          <div className="text-center py-12 text-red-500 font-medium">
            Failed to load cities data. Please try again later.
          </div>
        )}

        {/* লোডিং ও মেইন কন্টেন্ট গ্রিড */}
        {isLoading ? (
          <CitySectionSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {countriesData.map((country) => {
              const isExpanded = expandedCountry === country.countryName;
              const totalCities = country.cityName.length;

              return (
                <div
                  key={country._id}
                  className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? "border-gray-200 shadow-md ring-1 ring-gray-100"
                      : "border-gray-100 hover:border-gray-200 hover:shadow-sm"
                  }`}
                >
                  {/* কার্ড টপ ব্যানার ইমেজ */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-50">
                    {country.image ? (
                      <Image
                        src={country.image}
                        alt={country.countryName}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 bg-gray-50">
                        <Globe className="w-10 h-10 mb-2 stroke-[1.5]" />
                        <span className="text-xs">No image available</span>
                      </div>
                    )}
                  </div>

                  {/* কার্ডের কন্টেন্ট ও ইন্টারঅ্যাকশন বাটন */}
                  <button
                    onClick={() => toggleCountry(country.countryName)}
                    className="w-full text-left p-6 block transition-colors bg-white hover:bg-gray-50/50"
                  >
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="font-bold text-2xl text-[#0A2B3E] capitalize tracking-tight">
                        {country.countryName}
                      </h3>
                      <span className="text-[11px] uppercase tracking-wider bg-emerald-50 text-emerald-600 font-bold px-2.5 py-0.5 rounded-full border border-emerald-100/60 shrink-0 mt-1">
                        Active
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <p className="text-gray-400 text-sm font-medium">
                        Trusted care across {totalCities}{" "}
                        {totalCities > 1 ? "cities" : "city"}
                      </p>
                      <div
                        className={`p-1.5 rounded-full border border-gray-100 bg-white transition-all duration-300 shadow-sm ${
                          isExpanded
                            ? "bg-[#0A2B3E] text-white border-[#0A2B3E]"
                            : "text-[#0A2B3E]"
                        }`}
                      >
                        <ChevronRight
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </button>

                  {/* ড্রপডাউন ড্রয়ার (শহরের তালিকা) */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-2 grid grid-cols-1 gap-1.5 border-t border-gray-50 bg-gray-50/40">
                          {country.cityName.map((city) => {
                            const isComingSoon = city
                              .toLowerCase()
                              .includes("coming soon");

                            return (
                              <div
                                key={city}
                                className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-white border border-gray-100/50 shadow-2xs"
                              >
                                <span
                                  className={`text-sm font-semibold ${
                                    isComingSoon
                                      ? "text-gray-400 italic font-normal"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {city}
                                </span>
                                {!isComingSoon && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CitySection;
