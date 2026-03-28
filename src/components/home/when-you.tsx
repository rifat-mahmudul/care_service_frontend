"use client";
import React from "react";

const WhenYou = () => {
  return (
    <div className="bg-[#e6f5ff] py-20">
      <div className="container space-y-10">
        <div className="text-center">
          <div>
            <h1 className="text-center text-3xl md:text-4xl font-bold tracking-tight lg:max-w-3xl mx-auto opacity-85">
              Why JetSet Cares
            </h1>
          </div>

          {/* Intro Copy */}
          <p className="lg:max-w-4xl mx-auto text-md opacity-60 text-center mt-2">
            Childcare is personal. It is emotional, trust heavy, and too
            important to leave to chance. JetSet Cares exists to make trusted
            childcare easier to find for families moving through Asia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Trusted Providers Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#e6f5ff] rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">👶</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Trusted Providers</h3>
            <p className="text-gray-600">
              We focus on childcare professionals who present well, communicate
              clearly, and inspire confidence from the first interaction.
            </p>
          </div>

          {/* Safety First Standards Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#e6f5ff] rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Safety First Standards
            </h3>
            <p className="text-gray-600">
              JetSet is built around trust signals that help families feel
              calmer and more secure when choosing childcare.
            </p>
          </div>

          {/* Built for Real Family Travel */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#e6f5ff] rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">✈️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Built for Real Family Travel
            </h3>
            <p className="text-gray-600">
              From homes to hotels to travel settings, JetSet Cares is designed
              for the way internationally mobile families actually live.
            </p>
          </div>

          {/* City by City Depth Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#e6f5ff] rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🏙️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">City by City Depth</h3>
            <p className="text-gray-600">
              A city should feel real before it feels live. JetSet is building
              trusted childcare density where families actually need care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhenYou;
