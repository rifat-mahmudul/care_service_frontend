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
// import { TypeStep } from '../steps/TypeStep'
// interface FormData {
//     email: string
//     password: string
//     location: string
//     zipCode: string
//     selectedDays: string[]
//     timeRange: [number, number]
//     applyForAllDays: boolean
//     scheduleVaries: boolean
//     plan: 'premium' | 'safety'
//     firstName: string
//     lastName: string
//     gender: string
//     termsAccepted: boolean
//     hourlyRate: number
// }

// const INITIAL_FORM_DATA: FormData = {
//     email: '',
//     password: '',
//     location: '',
//     zipCode: '',
//     selectedDays: [],
//     timeRange: [10, 12],
//     applyForAllDays: false,
//     scheduleVaries: false,
//     plan: 'premium',
//     firstName: '',
//     lastName: '',
//     gender: '',
//     termsAccepted: false,
//     hourlyRate: 10,
// }

// export function MultiStepForm() {
//     const [currentStep, setCurrentStep] = useState(0)
//     const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)

//     const steps = [
//         {
//             component: (
//                 <TypeStep
//                     onNext={(data) => {
//                         setFormData({ ...formData, ...data })
//                         setCurrentStep(1)
//                     }} onBack={function (): void {
//                         throw new Error('Function not implemented.')
//                     }} />
//             ),
//             title: 'Type',
//         },
//         {
//             component: (
//                 <EmailStep
//                     onNext={(data) => {
//                         setFormData({ ...formData, ...data })
//                         setCurrentStep(2)
//                     }}
//                 />
//             ),
//             title: 'Email',
//         },
//         {
//             component: (
//                 <PasswordStep
//                     email={formData.email}
//                     onNext={(data) => {
//                         setFormData({ ...formData, ...data })
//                         setCurrentStep(3)
//                     }}
//                     onBack={() => setCurrentStep(0)}
//                 />
//             ),
//             title: 'Password',
//         },
//         {
//             component: (
//                 <LocationStep
//                     onNext={(data) => {
//                         setFormData({ ...formData, ...data })
//                         setCurrentStep(4)
//                     }}
//                     onBack={() => setCurrentStep(2)}
//                 />
//             ),
//             title: 'Location',
//         },
//         {
//             component: (
//                 <ScheduleStep
//                     onNext={(data) => {
//                         setFormData({ ...formData, ...data })
//                         setCurrentStep(5)
//                     }}
//                     onBack={() => setCurrentStep(2)}
//                 />
//             ),
//             title: 'Schedule',
//         },
//         {
//             component: (
//                 <PricingStep
//                     onNext={(data) => {
//                         setFormData({ ...formData, ...data })
//                         setCurrentStep(6)
//                     }}
//                     onBack={() => setCurrentStep(3)}
//                 />
//             ),
//             title: 'Pricing',
//         },
//         {
//             component: (
//                 <PersonalDetailsStep
//                     onNext={(data) => {
//                         setFormData({ ...formData, ...data })
//                         setCurrentStep(7)
//                     }}
//                     onBack={() => setCurrentStep(4)}
//                 />
//             ),
//             title: 'Personal Details',
//         },
//         {
//             component: (
//                 <HourlyRateStep
//                     onNext={(data) => {
//                         setFormData({ ...formData, ...data })
//                         setCurrentStep(8)
//                     }}
//                     onBack={() => setCurrentStep(6)}
//                 />
//             ),
//             title: 'Hourly Rate',
//         },
//         {
//             component: (
//                 <SummaryStep
//                     formData={formData}
//                     onBack={() => setCurrentStep(7)}
//                 />
//             ),
//             title: 'Summary',
//         },
//     ]

//     return (
//         <div>
//             {/* Progress Indicator */}


//             {/* Step Component */}
//             <div>{steps[currentStep].component}</div>
//         </div>
//     )
// }






'use client'

import { useState } from 'react'
import { EmailStep } from '../steps/EmailStep'
import { PasswordStep } from '../steps/PasswordStep'
import { LocationStep } from '../steps/LocationStep'
import { ScheduleStep } from '../steps/ScheduleStep'
import { PricingStep } from '../steps/PricingStep'
import { PersonalDetailsStep } from '../steps/PersonalDetailsStep'
import { HourlyRateStep } from '../steps/HourlyRateStep'
import { SummaryStep } from '../steps/SummaryStep'
import { TypeStep } from '../steps/TypeStep'

interface FormData {
  email: string
  password: string
  location: string
  zipCode: string
  selectedDays: string[]
  timeRange: [number, number]
  applyForAllDays: boolean
  scheduleVaries: boolean
  plan: 'premium' | 'safety'
  firstName: string
  lastName: string
  gender: string
  termsAccepted: boolean
  hourlyRate: number
}

const INITIAL_FORM_DATA: FormData = {
  email: '',
  password: '',
  location: '',
  zipCode: '',
  selectedDays: [],
  timeRange: [10, 12],
  applyForAllDays: false,
  scheduleVaries: false,
  plan: 'premium',
  firstName: '',
  lastName: '',
  gender: '',
  termsAccepted: false,
  hourlyRate: 10,
}

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)

  // Centralized back handler – makes it easier to change behavior later
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    } else {
      // What to do when user clicks "Back" on the very first step?
      // Pick ONE of the following:

      // Option A: Do nothing (most common for first step)
      // → just return; back button can be disabled in TypeStep

      // Option B: Reset form
      // setFormData(INITIAL_FORM_DATA)
      // setCurrentStep(0)

      // Option C: Go back in browser history (feels natural in many wizards)
      if (typeof window !== 'undefined') {
        window.history.back()
      }

      // Option D: If using Next.js <Link> or router → router.back()
      // router.back()
    }
  }

  const steps = [
    {
      title: 'Type',
      component: (
        <TypeStep
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }))
            setCurrentStep(1)
          }}
          onBack={handleBack}
        />
      ),
    },
    {
      title: 'Email',
      component: (
        <EmailStep
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }))
            setCurrentStep(2)
          }}
        />
      ),
    },
    {
      title: 'Password',
      component: (
        <PasswordStep
          email={formData.email}
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }))
            setCurrentStep(3)
          }}
          onBack={handleBack}
        />
      ),
    },
    {
      title: 'Location',
      component: (
        <LocationStep
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }))
            setCurrentStep(4)
          }}
          onBack={handleBack}
        />
      ),
    },
    {
      title: 'Schedule',
      component: (
        <ScheduleStep
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }))
            setCurrentStep(5)
          }}
          onBack={handleBack}
        />
      ),
    },
    {
      title: 'Pricing',
      component: (
        <PricingStep
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }))
            setCurrentStep(6)
          }}
          onBack={handleBack}
        />
      ),
    },
    {
      title: 'Personal Details',
      component: (
        <PersonalDetailsStep
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }))
            setCurrentStep(7)
          }}
          onBack={handleBack}
        />
      ),
    },
    {
      title: 'Hourly Rate',
      component: (
        <HourlyRateStep
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }))
            setCurrentStep(8)
          }}
          onBack={handleBack}
        />
      ),
    },
    {
      title: 'Summary',
      component: (
        <SummaryStep
          formData={formData}
          onBack={handleBack}
          // You might also want onSubmit / onEdit / onConfirm here
        />
      ),
    },
  ]

  return (
    <div className="multi-step-form">
      {/* You can add a progress bar here if you want */}
      {/* <ProgressBar currentStep={currentStep} totalSteps={steps.length} /> */}

      <div className="step-content">
        {steps[currentStep]?.component}
      </div>

      {/* Optional: global navigation buttons – but most people put them inside each step */}
      {/* <div className="navigation">
        {currentStep > 0 && <button onClick={handleBack}>Back</button>}
        <button disabled={currentStep >= steps.length - 1}>Next</button>
      </div> */}
    </div>
  )
}