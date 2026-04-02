"use client";
import React from "react";
import { Button } from "../ui/button";
import { Shield, Star, Heart, Clock } from "lucide-react";

const ProviderSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0A2B3E] mb-4">
          For providers who represent trust well
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          JetSet Cares is for childcare providers who are warm, reliable, well
          presented, responsive, and ready for real family bookings. If you want
          to be part of a platform built on trust, professionalism, and strong
          family experience, we would love to grow with you.
        </p>

        {/* ট্রাস্ট ব্যাজেস */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-10">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#40E0D0]/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="w-6 h-6 text-[#40E0D0]" />
            </div>
            <p className="text-sm font-medium">ID Verified</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#40E0D0]/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="w-6 h-6 text-[#40E0D0]" />
            </div>
            <p className="text-sm font-medium">Top Rated</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#40E0D0]/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Heart className="w-6 h-6 text-[#40E0D0]" />
            </div>
            <p className="text-sm font-medium">Background Checked</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#40E0D0]/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-6 h-6 text-[#40E0D0]" />
            </div>
            <p className="text-sm font-medium">Responsive</p>
          </div>
        </div>

        <Button className="rounded-full px-8 h-12 bg-[#40E0D0] hover:bg-[#2CB0A0] text-black">
          Apply to Become a Partner
        </Button>
      </div>
    </section>
  );
};

export default ProviderSection;
