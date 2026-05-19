// src/components/steps/LocationStep.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

interface Country {
  _id: string;
  countryName: string;
  cityName: string;
}

interface LocationStepProps {
  onNext: (data: { country: string; city: string }) => void;
  onBack: () => void;
  initialCountry?: string;
  initialCity?: string;
}

export function LocationStep({
  onNext,
  onBack,
  initialCountry = "",
  initialCity = "",
}: LocationStepProps) {
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  // Fetch countries data
  const { data: countriesData, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/country/`);
      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }
      const json = await response.json();
      return json.data as Country[];
    },
  });

  // Get unique countries
  const uniqueCountries = countriesData
    ? Array.from(new Map(countriesData.map(item => [item.countryName, item])).values())
    : [];

  // Update cities when country changes
  useEffect(() => {
    if (selectedCountry && countriesData) {
      const cities = countriesData
        .filter(item => item.countryName === selectedCountry)
        .map(item => item.cityName)
        .filter((value, index, self) => self.indexOf(value) === index); // Get unique cities
      setAvailableCities(cities);
      setSelectedCity(""); // Reset city when country changes
    } else {
      setAvailableCities([]);
    }
  }, [selectedCountry, countriesData]);

  // Set initial city if provided
  useEffect(() => {
    if (initialCity && availableCities.includes(initialCity)) {
      setSelectedCity(initialCity);
    }
  }, [initialCity, availableCities]);

  const handleContinue = () => {
    if (selectedCountry && selectedCity) {
      onNext({ country: selectedCountry, city: selectedCity });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading locations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl text-[#0A0A23] font-bold text-center mb-8">
        Where are you looking for care?
      </h1>
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Country
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-4 py-4 border-2 border-[#8E8E9A] rounded-full focus:outline-none focus:border-primary bg-white"
            >
              <option value="">Select a country...</option>
              {uniqueCountries.map((country) => (
                <option key={country._id} value={country.countryName}>
                  {country.countryName}
                </option>
              ))}
            </select>
          </div>

          {selectedCountry && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-4 border-2 border-[#8E8E9A] rounded-full focus:outline-none focus:border-primary bg-white"
              >
                <option value="">Select a city...</option>
                {availableCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          )}

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
              disabled={!selectedCountry || !selectedCity}
              className="flex-1 bg-primary hover:bg-primary text-white py-2 rounded-full font-semibold"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}