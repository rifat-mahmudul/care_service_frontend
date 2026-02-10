


'use client'

import { useState } from 'react'
import { EmailStep } from '../steps/EmailStep'
import { PasswordStep } from '../steps/PasswordStep'
import { LocationStep } from '../steps/LocationStep'
import { PersonalDetailsStep } from '../steps/PersonalDetailsStep'
import { TypeStep } from '../steps/TypeStep'
import { HelpStep } from '../steps/HelpStep'
import { PricingStep } from '../steps/PricingStep'

interface FormData {
  type?: string
  help?: string

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
  type: '',
  help: '',
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
  hourlyRate: 0,
}

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)

  const handleBack = () => {
    setCurrentStep((p) => Math.max(p - 1, 0))
  }

  const steps = [
    {
      title: 'Type',
      component: (
        <TypeStep
          onNext={(data) => {
            setFormData((p) => ({ ...p, ...data }))
            setCurrentStep(1)
          }}
          onBack={handleBack}
        />
      ),
    },
    {
      title: 'Help',
      component: (
        <HelpStep
          onNext={(data) => {
            setFormData((p) => ({ ...p, ...data }))
            setCurrentStep(2)
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
            setFormData((p) => ({ ...p, ...data }))
            setCurrentStep(3)
            
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
            setFormData((p) => ({ ...p, ...data }))
            setCurrentStep(4)
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
            setFormData((p) => ({ ...p, ...data }))
            setCurrentStep(5)
          }}
          onBack={handleBack}
        />
      ),
    },
    {
      title: 'Password',
      component: (
        <PasswordStep
          email={formData.email}
          onNext={(data) => {
            setFormData((p) => ({ ...p, ...data }))
            setCurrentStep(6)
          }}
          onBack={handleBack}
        />
      ),
    },

    // ✅ LAST STEP
    {
      title: 'Pricing',
      component: (
        <PricingStep
          formData={formData}
          onBack={handleBack}
          onFinish={(data) => {
            const finalPayload = { ...formData, ...data }
            console.log('FINAL SUBMIT PAYLOAD:', finalPayload)
            setFormData(finalPayload as FormData)
          }}
        />
      ),
    },
  ]

  return <div>{steps[currentStep]?.component}</div>
}
