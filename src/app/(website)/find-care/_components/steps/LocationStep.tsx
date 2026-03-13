// src/components/steps/LocationStep.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface LocationStepProps {
  onNext: (data: { location: string; zipCode: string }) => void;
  onBack: () => void;
  initialValue?: string;
}

export function LocationStep({
  onNext,
  onBack,
  initialValue = "",
}: LocationStepProps) {
  const [zipCode, setZipCode] = useState(initialValue);

  const handleContinue = () => {
    if (zipCode.trim()) {
      onNext({ location: "Cina PK", zipCode });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl text-[#0A0A23] font-bold text-center mb-8">
        Where are you looking for care?
      </h1>
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
        <div className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Enter zip code..."
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full px-4 py-4 border-2 border-[#8E8E9A] rounded-full focus:outline-none focus:border-[#8E8E9A]"
            />
          </div>

          <p className="text-sm text-gray-600">Cina PK</p>

          <div className="flex gap-3">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 py-2 rounded-full font-semibold bg-transparent"
            >
              Back
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!zipCode.trim()}
              className="flex-1 bg-[#003366] hover:bg-[#003366] text-white py-2 rounded-full font-semibold"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
