'use client'

import { useEffect, useState } from 'react'
import { loadForm, saveForm } from '@/utils/storage'
import { LocationStep } from '../steps/LocationStep'
import { HourlyRateStep } from '../steps/HourlyRateStep'
import { ScheduleStep } from '../steps/ScheduleStep'
import { EmailStep } from '../steps/EmailStep'
import { PersonalDetailsStep } from '../steps/PersonalDetailsStep'
import { PasswordStep } from '../steps/PasswordStep'
import { SummaryStep } from '../steps/SummaryStep'
import { FindJobDataTypes } from '../find-job-data-type'
import { PricingStep } from '../steps/PricingStep'


const INITIAL_DATA: FindJobDataTypes = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  role: 'find job',
  categoryId: '698443e505e54189c3671358',
  subscriptionId: '6984423244bb34ec77e8e437',
  location: '',
  gender: '',
  hourRate: 10,
  days: { day: [], time: [] },
}

export default function MultiStepForm() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FindJobDataTypes>(
    () => loadForm() || INITIAL_DATA
  )

  useEffect(() => {
    saveForm(formData)
  }, [formData])

  const next = (data: Partial<FindJobDataTypes>) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setStep((s) => s + 1)
  }

  const back = () => setStep((s) => Math.max(0, s - 1))

  const steps = [
    <LocationStep key={0} data={formData} onNext={next} />,
    <HourlyRateStep key={1} data={formData} onNext={next} onBack={back} />,
    <ScheduleStep key={2} data={formData} onNext={next} onBack={back} />,
    <EmailStep key={3} data={formData} onNext={next} onBack={back} />,
    <PersonalDetailsStep key={4} data={formData} onNext={next} onBack={back} />,
    <PasswordStep key={5} data={formData} onNext={next} onBack={back} />,
    <PricingStep key={6} data={formData} onNext={next} onBack={back} />,
    <SummaryStep key={step} data={formData} onBack={back}/>
  ]

  return <>{steps[step]}</>
}




// 'use client'

// import { useState } from 'react'
// import { EmailStep } from '../steps/EmailStep'
// import { PasswordStep } from '../steps/PasswordStep'
// import { LocationStep } from '../steps/LocationStep'
// import { ScheduleStep } from '../steps/ScheduleStep'
// import { PricingStep } from '../steps/PricingStep'
// import { PersonalDetailsStep } from '../steps/PersonalDetailsStep'
// import { HourlyRateStep } from '../steps/HourlyRateStep'
// import { SummaryStep } from '../steps/SummaryStep'

// interface FormData {
//   email: string
//   password: string
//   location: string
//   zipCode: string
//   selectedDays: string[]
//   timeRange: [number, number]
//   applyForAllDays: boolean
//   scheduleVaries: boolean
//   plan: 'premium' | 'safety'
//   firstName: string
//   lastName: string
//   gender: string
//   termsAccepted: boolean
//   hourlyRate: number
// }

// const INITIAL_FORM_DATA: FormData = {
//   email: '',
//   password: '',
//   location: '',
//   zipCode: '',
//   selectedDays: [],
//   timeRange: [10, 12],
//   applyForAllDays: false,
//   scheduleVaries: false,
//   plan: 'premium',
//   firstName: '',
//   lastName: '',
//   gender: '',
//   termsAccepted: false,
//   hourlyRate: 10,
// }

// export function MultiStepForm() {
//   const [currentStep, setCurrentStep] = useState(0)
//   const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)

//   // Centralized back handler – makes it easier to change behavior later
//   const handleBack = () => {
//     if (currentStep > 0) {
//       setCurrentStep((prev) => prev - 1)
//     } else {
//       if (typeof window !== 'undefined') {
//         window.history.back()
//       }
//     }
//   }

//   const steps = [
//      {
//       title: 'Location',
//       component: (
//         <LocationStep
//           onNext={(data) => {
//             setFormData((prev) => ({ ...prev, ...data }))
//             setCurrentStep(1)
//           }}
//           onBack={handleBack}
//         />
//       ),
//     },
//     {
//       title: 'Hourly Rate',
//       component: (
//         <HourlyRateStep
//           onNext={(data) => {
//             setFormData((prev) => ({ ...prev, ...data }))
//             setCurrentStep(2)
//           }}
//           onBack={handleBack}
//         />
//       ),
//     },
//      {
//       title: 'Schedule',
//       component: (
//         <ScheduleStep
//           onNext={(data) => {
//             setFormData((prev) => ({ ...prev, ...data }))
//             setCurrentStep(3)
//           }}
//           onBack={handleBack}
//         />
//       ),
//     },
//       {
//       title: 'Email',
//       component: (
//         <EmailStep
//           onNext={(data) => {
//             setFormData((prev) => ({ ...prev, ...data }))
//             setCurrentStep(4)
//           }}
//         />
//       ),
//     },
//     {
//       title: 'Personal Details',
//       component: (
//         <PersonalDetailsStep
//           onNext={(data) => {
//             setFormData((prev) => ({ ...prev, ...data }))
//             setCurrentStep(5)
//           }}
//           onBack={handleBack}
//         />
//       ),
//     },
//       {
//       title: 'Password',
//       component: (
//         <PasswordStep
//           email={formData.email}
//           onNext={(data) => {
//             setFormData((prev) => ({ ...prev, ...data }))
//             setCurrentStep(6)
//           }}
//           onBack={handleBack}
//         />
//       ),
//     },
//        {
//       title: 'Pricing',
//       component: (
//         <PricingStep
//           onNext={(data) => {
//             setFormData((prev) => ({ ...prev, ...data }))
//             setCurrentStep(7)
//           }}
//           onBack={handleBack}
//         />
//       ),
//     },
    
//     {
//       title: 'Summary',
//       component: (
//         <SummaryStep
//           formData={formData}
//           onBack={handleBack}
//           // You might also want onSubmit / onEdit / onConfirm here
//         />
//       ),
//     },
//   ]

//   return (
//     <div className="multi-step-form">

//       <div className="step-content">
//         {steps[currentStep]?.component}
//       </div>
//     </div>
//   )
// }