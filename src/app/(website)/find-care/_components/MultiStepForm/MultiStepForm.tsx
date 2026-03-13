/* eslint-disable react-hooks/rules-of-hooks */
// src/components/find-care/MultiStepForm.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { EmailStep } from "../steps/EmailStep";
import { PasswordStep } from "../steps/PasswordStep";
import { LocationStep } from "../steps/LocationStep";
import { PersonalDetailsStep } from "../steps/PersonalDetailsStep";
import { TypeStep } from "../steps/TypeStep";
import { HelpStep } from "../steps/HelpStep";
import { PricingStep } from "../steps/PricingStep";

interface FormData {
  type?: string;
  help?: string;
  email: string;
  password?: string;
  location: string;
  zipCode: string;
  selectedDays: string[];
  timeRange: [number, number];
  applyForAllDays: boolean;
  scheduleVaries: boolean;
  plan?: string;
  firstName: string;
  lastName: string;
  gender: string;
  termsAccepted: boolean;
  hourlyRate: number;
  role: string;
  categoryId: string;
  subscriptionId?: string;
}

const INITIAL_FORM_DATA: FormData = {
  type: "",
  help: "",
  email: "",
  password: "",
  location: "",
  zipCode: "",
  selectedDays: [],
  timeRange: [10, 12],
  applyForAllDays: false,
  scheduleVaries: false,
  plan: "",
  firstName: "",
  lastName: "",
  gender: "",
  termsAccepted: false,
  hourlyRate: 0,
  role: "",
  categoryId: "",
};

export function MultiStepForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const searchParams = useSearchParams();

  const role = searchParams.get("role") || "";
  const categoryId = searchParams.get("categoryId") || "";
  const categoryName = searchParams.get("categoryName") || "";
  const hasSubscription = searchParams.get("hasSubscription") === "true";
  const userId = searchParams.get("userId");

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    ...INITIAL_FORM_DATA,
    role,
    categoryId,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user profile if logged in
  const { data: userProfile, isLoading: profileLoading } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      if (!token || !userId) return null;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) return null;
      const json = await response.json();
      return json.data;
    },
    enabled: !!token && !!userId,
  });

  // Pre-fill form with user profile data
  useEffect(() => {
    if (userProfile) {
      setFormData((prev) => ({
        ...prev,
        email: userProfile.email || prev.email,
        firstName: userProfile.firstName || prev.firstName,
        lastName: userProfile.lastName || prev.lastName,
        gender: userProfile.gender || prev.gender,
        zipCode: userProfile.zip || prev.zipCode,
        location: userProfile.location || prev.location,
        subscriptionId: userProfile.subscription || prev.subscriptionId,
        plan: userProfile.subscription || prev.plan,
      }));
    }
  }, [userProfile]);

  const handleSubmit = useCallback(async (data: { plan?: string } = {}) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    const finalData = { ...formData, ...data };

    // Prepare API body
    const apiBody = {
      email: finalData.email,
      password: finalData.password,
      firstName: finalData.firstName,
      lastName: finalData.lastName,
      role: finalData.role,
      typeOfInterest: finalData.type,
      helpOfInterest: finalData.help,
      categoryId: finalData.categoryId,
      subscriptionId: finalData.plan || finalData.subscriptionId,
      zip: finalData.zipCode,
      gender: finalData.gender,
    };

    // Remove undefined fields
    Object.keys(apiBody).forEach((key) => {
      if (apiBody[key as keyof typeof apiBody] === undefined) {
        delete apiBody[key as keyof typeof apiBody];
      }
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/service/register-service`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(apiBody),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      console.log("Registration successful:", result);

      // Redirect to checkout URL if provided
      if (result.data?.checkoutUrl) {
        window.location.href = result.data.checkoutUrl;
      } else {
        // If no checkout URL, redirect to success page
        router.push(`/payment-success?category=${encodeURIComponent(categoryName)}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setIsSubmitting(false);
      throw error;
    }
  }, [formData, token, router, categoryName, isSubmitting]);

  // Handle auto-submit for users with existing subscription
  useEffect(() => {
    if (userProfile?.subscription && currentStep === 4 && !isSubmitting) {
      handleSubmit({ plan: userProfile.subscription });
    }
  }, [currentStep, userProfile, handleSubmit, isSubmitting]);

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#003366] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your information...</p>
        </div>
      </div>
    );
  }

  // Determine steps based on user state
  const getSteps = () => {
    const steps = [];

    // Step 1: Type (always show)
    steps.push({
      title: "Type",
      component: (
        <TypeStep
          key="type"
          onNext={(data) => {
            setFormData((p) => ({ ...p, ...data }));
            setCurrentStep(1);
          }}
          onBack={() => setCurrentStep(Math.max(currentStep - 1, 0))}
          initialValue={formData.type}
        />
      ),
    });

    // Step 2: Help (always show)
    steps.push({
      title: "Help",
      component: (
        <HelpStep
          key="help"
          onNext={(data) => {
            setFormData((p) => ({ ...p, ...data }));
            setCurrentStep(2);
          }}
          onBack={() => setCurrentStep(Math.max(currentStep - 1, 0))}
          initialValue={formData.help}
        />
      ),
    });

    // Step 3: Location (always show)
    steps.push({
      title: "Location",
      component: (
        <LocationStep
          key="location"
          onNext={(data) => {
            setFormData((p) => ({ ...p, ...data }));
            setCurrentStep(3);
          }}
          onBack={() => setCurrentStep(Math.max(currentStep - 1, 0))}
          initialValue={formData.zipCode}
        />
      ),
    });

    // Step 4: Email (skip if logged in)
    if (!userProfile) {
      steps.push({
        title: "Email",
        component: (
          <EmailStep
            key="email"
            onNext={(data) => {
              setFormData((p) => ({ ...p, ...data }));
              setCurrentStep(4);
            }}
            onBack={() => setCurrentStep(Math.max(currentStep - 1, 0))}
          />
        ),
      });
    }

    // Step 5: Personal Details (always show, but pre-filled if logged in)
    steps.push({
      title: "Personal Details",
      component: (
        <PersonalDetailsStep
          key="personal"
          onNext={(data) => {
            setFormData((p) => ({ ...p, ...data }));
            
            if (userProfile) {
              // Logged in user
              if (hasSubscription || userProfile.subscription) {
                // User has subscription, submit directly
                handleSubmit({ plan: userProfile.subscription });
              } else {
                // User logged in but no subscription, go to pricing
                setCurrentStep(5);
              }
            } else {
              // New user, go to password step
              setCurrentStep(5);
            }
          }}
          onBack={() => setCurrentStep(Math.max(currentStep - 1, 0))}
          initialData={userProfile}
          isLoggedIn={!!userProfile}
        />
      ),
    });

    // Step 6: Password (only for new users)
    if (!userProfile) {
      steps.push({
        title: "Password",
        component: (
          <PasswordStep
            key="password"
            email={formData.email}
            onNext={(data) => {
              setFormData((p) => ({ ...p, ...data }));
              setCurrentStep(6);
            }}
            onBack={() => setCurrentStep(Math.max(currentStep - 1, 0))}
          />
        ),
      });
    }

    // Step 7: Pricing (only if no subscription)
    if (!hasSubscription && !userProfile?.subscription) {
      steps.push({
        title: "Pricing",
        component: (
          <PricingStep
            key="pricing"
            formData={formData}
            onBack={() => setCurrentStep(Math.max(currentStep - 1, 0))}
            onFinish={handleSubmit}
            token={token}
          />
        ),
      });
    }

    return steps;
  };

  const steps = getSteps();
  const stepsToRender = steps.filter((_, index) => index >= currentStep);

  return (
    <div>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-[#003366] transition-all duration-300"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Current Step */}
      {stepsToRender[0]?.component}
    </div>
  );
}