"use client";

import { useEffect, useState } from "react";
import { loadForm, saveForm } from "@/utils/storage";
import { LocationStep } from "../steps/LocationStep";
import { HourlyRateStep } from "../steps/HourlyRateStep";
import { ScheduleStep } from "../steps/ScheduleStep";
import { EmailStep } from "../steps/EmailStep";
import { PersonalDetailsStep } from "../steps/PersonalDetailsStep";
import { PasswordStep } from "../steps/PasswordStep";
import { SummaryStep } from "../steps/SummaryStep";
import { FindJobDataTypes } from "../find-job-data-type";
import { PricingStep } from "../steps/PricingStep";

const INITIAL_DATA: FindJobDataTypes = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  role: "find job",
  categoryId: "698443e505e54189c3671358",
  subscriptionId: "6984423244bb34ec77e8e437",
  location: "",
  gender: "",
  hourRate: 10,
  days: { day: [], time: [] },
};

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FindJobDataTypes>(
    () => loadForm() || INITIAL_DATA,
  );

  useEffect(() => {
    saveForm(formData);
  }, [formData]);

  const next = (data: Partial<FindJobDataTypes>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const steps = [
    <LocationStep key={0} data={formData} onNext={next} />,
    <HourlyRateStep key={1} data={formData} onNext={next} onBack={back} />,
    <ScheduleStep key={2} data={formData} onNext={next} onBack={back} />,
    <EmailStep key={3} data={formData} onNext={next} onBack={back} />,
    <PersonalDetailsStep key={4} data={formData} onNext={next} onBack={back} />,
    <PasswordStep key={5} data={formData} onNext={next} onBack={back} />,
    <PricingStep key={6} data={formData} onNext={next} onBack={back} />,
    <SummaryStep key={step} data={formData} onBack={back} />,
  ];

  return <>{steps[step]}</>;
}
