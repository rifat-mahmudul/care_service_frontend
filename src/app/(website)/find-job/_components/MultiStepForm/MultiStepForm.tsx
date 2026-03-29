/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
// src/components/find-job/MultiStepForm.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { LocationStep } from "../steps/LocationStep";
import { HourlyRateStep } from "../steps/HourlyRateStep";
import { ScheduleStep } from "../steps/ScheduleStep";
import { EmailStep } from "../steps/EmailStep";
import { PersonalDetailsStep } from "../steps/PersonalDetailsStep";
import { PasswordStep } from "../steps/PasswordStep";
import { PricingStep } from "../steps/PricingStep";
import {
  FindJobDataTypes,
  DaySchedule,
  ScheduleTypes,
} from "../find-job-data-type";

const INITIAL_FORM_DATA: FindJobDataTypes = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  role: "find job",
  categoryId: "",
  subscriptionId: "",
  location: "",
  gender: "",
  hourRate: 10,
  days: { day: [], time: [] },
};

export default function MultiStepForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const searchParams = useSearchParams();
  const redirectingRef = useRef(false);

  const role = searchParams.get("role") || "find job";
  const categoryId = searchParams.get("categoryId") || "";
  const categoryName = searchParams.get("categoryName") || "";
  const hasSubscription = searchParams.get("hasSubscription") === "true";
  const userId = searchParams.get("userId");

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FindJobDataTypes>({
    ...INITIAL_FORM_DATA,
    role,
    categoryId,
  });

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

  // Load from localStorage and pre-fill with user profile
  useEffect(() => {
    const saved = localStorage.getItem("findJobForm");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Error parsing localStorage data:", e);
      }
    }

    if (userProfile) {
      setFormData((prev) => ({
        ...prev,
        email: userProfile.email || prev.email,
        firstName: userProfile.firstName || prev.firstName,
        lastName: userProfile.lastName || prev.lastName,
        gender: userProfile.gender || prev.gender,
        location: userProfile.zip || prev.location,
        subscriptionId: userProfile.subscription || prev.subscriptionId,
      }));
    }
  }, [userProfile]);

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("findJobForm", JSON.stringify(formData));
  }, [formData]);

  // Convert ScheduleTypes to API format
  const convertToAPIFormat = (days: ScheduleTypes): DaySchedule[] => {
    return days.day.map((day: string, index: number) => {
      const timeRange = days.time[index] || "10:00-12:00";
      const [startTime, endTime] = timeRange
        .split("-")
        .map((t: string) => t.trim());
      return {
        day,
        startTime: startTime || "09:00 AM",
        endTime: endTime || "05:00 PM",
      };
    });
  };

  // TanStack Query mutation for form submission
  const mutation = useMutation({
    mutationFn: async (data: { plan?: string }) => {
      const finalData = { ...formData, ...data };

      const apiBody: any = {
        role: finalData.role,
        zip: finalData.location,
        email: finalData.email,
        firstName: finalData.firstName,
        lastName: finalData.lastName,
        gender: finalData.gender,
        hourRate: finalData.hourRate,
        categoryId: finalData.categoryId,
      };

      if (finalData.subscriptionId || data.plan) {
        apiBody.subscriptionId = finalData.subscriptionId || data.plan;
      }

      if (finalData.days && finalData.days.day.length > 0) {
        apiBody.days = convertToAPIFormat(finalData.days);
      }

      if (finalData.password && !userProfile) {
        apiBody.password = finalData.password;
      }

      Object.keys(apiBody).forEach((key) => {
        if (
          apiBody[key] === undefined ||
          apiBody[key] === "" ||
          (Array.isArray(apiBody[key]) && apiBody[key].length === 0)
        ) {
          delete apiBody[key];
        }
      });

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

      return result;
    },
    onSuccess: (result) => {
      console.log("Registration successful:", result);
      localStorage.removeItem("findJobForm");

      // Prevent multiple redirects
      if (redirectingRef.current) return;
      redirectingRef.current = true;

      if (result?.data?.checkoutUrl) {
        // Use window.location for external URL
        window.location.href = result.data.checkoutUrl;
      } else {
        // Use setTimeout to ensure router.push works
        setTimeout(() => {
          router.push(
            `/payment-success?category=${encodeURIComponent(categoryName)}`,
          );
        }, 100);
      }
    },
    onError: (error) => {
      console.error("Registration error:", error);
      redirectingRef.current = false;
    },
  });

  const handleSubmit = async (data: { plan: string }) => {
    mutation.mutate(data);
  };

  // Handle auto-submit for users with existing subscription
  useEffect(() => {
    if (
      userProfile?.subscription &&
      currentStep === 4 &&
      !mutation.isPending &&
      !redirectingRef.current
    ) {
      handleSubmit({ plan: userProfile.subscription });
    }
  }, [currentStep, userProfile, mutation.isPending]);

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

  const getSteps = () => {
    const steps = [];

    steps.push({
      title: "Location",
      component: (
        <LocationStep
          key="location"
          data={formData}
          onNext={(data) => {
            setFormData((p) => ({ ...p, ...data }));
            setCurrentStep(1);
          }}
          onBack={() => setCurrentStep(Math.max(currentStep - 1, 0))}
        />
      ),
    });

    steps.push({
      title: "Hourly Rate",
      component: (
        <HourlyRateStep
          key="hourlyRate"
          data={formData}
          onNext={(data) => {
            setFormData((p) => ({ ...p, ...data }));
            setCurrentStep(2);
          }}
          onBack={() => setCurrentStep(Math.max(currentStep - 1, 0))}
        />
      ),
    });

    steps.push({
      title: "Schedule",
      component: (
        <ScheduleStep
          key="schedule"
          data={formData}
          onNext={(data) => {
            setFormData((p) => ({ ...p, ...data }));
            setCurrentStep(3);
          }}
          onBack={() => setCurrentStep(Math.max(currentStep - 1, 0))}
        />
      ),
    });

    if (!userProfile) {
      steps.push({
        title: "Email",
        component: (
          <EmailStep
            key="email"
            data={formData}
            onNext={(data) => {
              setFormData((p) => ({ ...p, ...data }));
              setCurrentStep(4);
            }}
            onBack={() => setCurrentStep(Math.max(currentStep - 1, 0))}
          />
        ),
      });
    }

    steps.push({
      title: "Personal Details",
      component: (
        <PersonalDetailsStep
          key="personal"
          data={formData}
          onNext={async (data) => {
            setFormData((p) => ({ ...p, ...data }));

            if (userProfile) {
              if (hasSubscription || userProfile.subscription) {
                handleSubmit({ plan: userProfile.subscription });
              } else {
                setCurrentStep(5);
              }
            } else {
              setCurrentStep(5);
            }
          }}
          onBack={() => setCurrentStep(Math.max(currentStep - 1, 0))}
          initialData={userProfile}
          isLoggedIn={!!userProfile}
        />
      ),
    });

    if (!userProfile) {
      steps.push({
        title: "Password",
        component: (
          <PasswordStep
            key="password"
            data={formData}
            onNext={(data) => {
              setFormData((p) => ({ ...p, ...data }));
              setCurrentStep(6);
            }}
            onBack={() => setCurrentStep(Math.max(currentStep - 1, 0))}
          />
        ),
      });
    }

    if (!hasSubscription && !userProfile?.subscription) {
      steps.push({
        title: "Pricing",
        component: (
          <PricingStep
            key="pricing"
            data={{ ...formData, categoryName }}
            onBack={() => setCurrentStep(Math.max(currentStep - 1, 0))}
            onSubmit={handleSubmit}
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
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-[#003366] transition-all duration-300"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      {stepsToRender[0]?.component}
    </div>
  );
}
