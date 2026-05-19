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

interface FormData {
  type?: string;
  help?: string;
  email: string;
  password?: string;
  country: string;
  city: string;
  selectedDays: string[];
  timeRange: [number, number];
  applyForAllDays: boolean;
  scheduleVaries: boolean;
  firstName: string;
  lastName: string;
  gender: string;
  termsAccepted: boolean;
  hourlyRate: number;
  role: string;
  categoryId: string;
  subscriptionId?: string;
  nidNumber: string;
}

const INITIAL_FORM_DATA: FormData = {
  type: "",
  help: "",
  email: "",
  password: "",
  country: "",
  city: "",
  selectedDays: [],
  timeRange: [10, 12],
  applyForAllDays: false,
  scheduleVaries: false,
  firstName: "",
  lastName: "",
  gender: "",
  termsAccepted: false,
  hourlyRate: 0,
  role: "",
  categoryId: "",
  nidNumber: "",
};

export function MultiStepForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const searchParams = useSearchParams();

  const role = searchParams.get("role") || "";
  const categoryId = searchParams.get("categoryId") || "";
  const userId = searchParams.get("userId");

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    ...INITIAL_FORM_DATA,
    role,
    categoryId,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user profile if logged in
  const {
    data: userProfile,
    isLoading: profileLoading,
    refetch,
  } = useQuery({
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
        country: userProfile.country || prev.country,
        city: userProfile.city || prev.city,
        subscriptionId: userProfile.subscription || prev.subscriptionId,
        nidNumber: userProfile.nidNumber || prev.nidNumber,
      }));
    }
  }, [userProfile]);

  // For new user registration
  const submitRegistration = useCallback(
    async (password?: string) => {
      if (isSubmitting) return;

      setIsSubmitting(true);

      const finalPassword = password || formData.password;

      // Prepare API body
      const apiBody = {
        email: formData.email,
        password: finalPassword,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
        typeOfInterest: formData.type,
        helpOfInterest: formData.help,
        categoryId: formData.categoryId,
        subscriptionId: formData.subscriptionId,
        country: formData.country,
        city: formData.city,
        gender: formData.gender,
        NIDNumber: formData.nidNumber,
      };

      // Remove undefined fields
      Object.keys(apiBody).forEach((key) => {
        if (apiBody[key as keyof typeof apiBody] === undefined) {
          delete apiBody[key as keyof typeof apiBody];
        }
      });

      console.log("Register API Body:", JSON.stringify(apiBody, null, 2));

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
        router.push(`/login`);
      } catch (error) {
        console.error("Registration error:", error);
        setIsSubmitting(false);
        throw error;
      }
    },
    [formData, token, router, isSubmitting],
  );

  // For logged-in user profile update
  const updateProfile = useCallback(async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Prepare API body for profile update
    const apiBody = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      country: formData.country,
      city: formData.city,
      nidNumber: formData.nidNumber,
      typeOfInterest: formData.type,
      helpOfInterest: formData.help,
      categoryId: formData.categoryId,
    };

    // Remove undefined fields
    Object.keys(apiBody).forEach((key) => {
      if (apiBody[key as keyof typeof apiBody] === undefined) {
        delete apiBody[key as keyof typeof apiBody];
      }
    });

    console.log("Update Profile API Body:", JSON.stringify(apiBody, null, 2));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(apiBody),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Profile update failed");
      }

      console.log("Profile update successful:", result);

      // Refetch user profile to get updated data
      await refetch();

      // Redirect to success page or dashboard
      router.push(`/`);
    } catch (error) {
      console.error("Profile update error:", error);
      setIsSubmitting(false);
      throw error;
    }
  }, [formData, token, router, isSubmitting, refetch]);

  // For logged-in user service registration
  const registerServiceForLoggedInUser = useCallback(async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Prepare API body for service registration
    const apiBody = {
      typeOfInterest: formData.type,
      helpOfInterest: formData.help,
      categoryId: formData.categoryId,
      country: formData.country,
      city: formData.city,
    };

    console.log(
      "Service Registration API Body:",
      JSON.stringify(apiBody, null, 2),
    );

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/service/register-service`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(apiBody),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Service registration failed");
      }

      console.log("Service registration successful:", result);

      // Redirect to success page or dashboard
      router.push(`/`);
    } catch (error) {
      console.error("Service registration error:", error);
      setIsSubmitting(false);
      throw error;
    }
  }, [formData, token, router, isSubmitting]);

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
          initialCountry={formData.country}
          initialCity={formData.city}
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
              // Logged in user - update profile and register service
              // First update profile, then register service
              updateProfile().then(() => {
                registerServiceForLoggedInUser();
              });
            } else {
              // New user - go to password step
              setCurrentStep(5);
            }
          }}
          onBack={() => setCurrentStep(Math.max(currentStep - 1, 0))}
          initialData={userProfile}
          isLoggedIn={!!userProfile}
        />
      ),
    });

    // Step 6: Password (only for new users) - with sign up functionality
    if (!userProfile) {
      steps.push({
        title: "Password",
        component: (
          <PasswordStep
            key="password"
            email={formData.email}
            onSignUp={(data) => {
              console.log("Password received:", data.password);
              setFormData((p) => ({ ...p, ...data }));
              submitRegistration(data.password);
            }}
            onBack={() => setCurrentStep(Math.max(currentStep - 1, 0))}
            isSubmitting={isSubmitting}
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
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Current Step */}
      {stepsToRender[0]?.component}
    </div>
  );
}
