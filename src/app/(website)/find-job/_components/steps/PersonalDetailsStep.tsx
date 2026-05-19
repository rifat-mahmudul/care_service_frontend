/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/steps/PersonalDetailsStep.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface PersonalDetailsStepProps {
  data: any;
  onNext: (data: {
    firstName: string;
    lastName: string;
    gender: string;
    nidNumber: string;
    termsAccepted: boolean;
  }) => void;
  onBack: () => void;
  initialData?: any;
  isLoggedIn?: boolean;
}

export function PersonalDetailsStep({
  data,
  onNext,
  onBack,
  initialData,
  isLoggedIn = false,
}: PersonalDetailsStepProps) {
  const [firstName, setFirstName] = useState(
    data?.firstName || initialData?.firstName || "",
  );
  const [lastName, setLastName] = useState(
    data?.lastName || initialData?.lastName || "",
  );
  const [gender, setGender] = useState(
    data?.gender || initialData?.gender || "",
  );
  const [nidNumber, setNidNumber] = useState(
    data?.nidNumber || initialData?.nidNumber || "",
  );
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form if initialData changes
  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.firstName || "");
      setLastName(initialData.lastName || "");
      setGender(initialData.gender || "");
      setNidNumber(initialData.nidNumber || "");
    }
  }, [initialData]);

  const handleSubmit = async () => {
    // For logged in users, NID is optional
    if (isLoggedIn) {
      if (!firstName.trim() || !lastName.trim() || !gender || !termsAccepted) {
        return;
      }
    } else {
      // For new users, NID is required
      if (
        !firstName.trim() ||
        !lastName.trim() ||
        !gender ||
        !nidNumber.trim() ||
        !termsAccepted
      ) {
        return;
      }
    }

    setIsSubmitting(true);

    try {
      await onNext({ firstName, lastName, gender, nidNumber, termsAccepted });
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled = () => {
    const baseConditions = !firstName || !lastName || !gender || !termsAccepted;

    if (isLoggedIn) {
      return baseConditions;
    } else {
      return baseConditions || !nidNumber;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 mt-10">
      <h1 className="text-3xl text-[#0A0A23] font-bold text-center mb-8">
        Almost done, tell us a few details about yourself
      </h1>

      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First name
            </label>
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-4 border-2 border-[#8E8E9A] rounded-full focus:outline-none focus:border-[#8E8E9A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last name
            </label>
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-4 border-2 border-[#8E8E9A] rounded-full focus:outline-none focus:border-[#8E8E9A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-4 border-2 border-[#8E8E9A] rounded-full focus:outline-none focus:border-[#8E8E9A] bg-white"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NID Number{" "}
              {!isLoggedIn && <span className="text-red-500">*</span>}
              {isLoggedIn && (
                <span className="text-gray-400 text-xs ml-1">(Optional)</span>
              )}
            </label>
            <input
              type="text"
              placeholder="Enter your NID number"
              value={nidNumber}
              onChange={(e) => setNidNumber(e.target.value)}
              className="w-full px-4 py-4 border-2 border-[#8E8E9A] rounded-full focus:outline-none focus:border-[#8E8E9A]"
            />
            <p className="text-xs text-gray-500 mt-1">
              {isLoggedIn
                ? "Your National ID number is optional but recommended for verification purposes"
                : "Your National ID number will be used for verification purposes"}
            </p>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            For the time being, we are able to provide these three limited
            options. We acknowledge that there are many more identities and are
            actively investigating ways to accommodate the full range of gender
            identity.
          </p>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-4 h-4 mt-1 cursor-pointer"
            />
            <label
              htmlFor="terms"
              className="text-sm cursor-pointer text-[#4B4B4B]"
            >
              I agree to the{" "}
              <span className="text-blue-600 underline">
                terms &amp; conditions
              </span>
            </label>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 py-2 rounded-full font-semibold bg-transparent"
              disabled={isSubmitting}
            >
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitDisabled() || isSubmitting}
              className="flex-1 bg-primary hover:bg-primary text-white py-2 rounded-full font-semibold disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : isLoggedIn ? (
                "Continue"
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>

          {isLoggedIn && (
            <p className="text-xs text-center text-gray-500 mt-2">
              Your information will be updated and saved to your profile
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
