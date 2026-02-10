'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface PersonalDetailsStepProps {
  onNext: (data: {
    firstName: string
    lastName: string
    gender: string
    termsAccepted: boolean
  }) => void
  onBack: () => void
}

export function PersonalDetailsStep({ onNext, onBack }: PersonalDetailsStepProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleSignUp = () => {
    if (firstName.trim() && lastName.trim() && gender && termsAccepted) {
      onNext({ firstName, lastName, gender, termsAccepted })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Title - same as previous steps */}
      <h1 className="text-3xl text-[#0A0A23] font-bold text-center mb-8">
        Almost done, tell us a few details about yourself
      </h1>

      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
        <div className="space-y-4">
          {/* First name */}
          <label className="block text-sm font-medium text-gray-700">First name</label>
          <div>
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-4 border-2 border-[#8E8E9A] rounded-full focus:outline-none focus:border-[#8E8E9A]"
            />
          </div>

          {/* Last name */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Last name</label>
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-4 border-2 border-[#8E8E9A] rounded-full focus:outline-none focus:border-[#8E8E9A]"
            />
          </div>

          {/* Gender */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full  px-4 py-4 border-2 border-[#8E8E9A] rounded-full focus:outline-none focus:border-[#8E8E9A] bg-white"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Helper text */}
          <p className="text-xs text-gray-600 leading-relaxed">
            For the time being, we are able to provide these three limited options. We acknowledge that
            there are many more identities and are actively investigating ways to accommodate the full
            range of gender identity.
          </p>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-4 h-4 mt-1 cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm cursor-pointer text-[#4B4B4B]">
              I agree to the{' '}
              <span className="text-blue-600 underline">terms &amp; conditions</span>
            </label>
          </div>

          {/* Buttons - same as previous steps */}
          <div className="flex gap-3">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 py-2 rounded-full font-semibold bg-transparent"
            >
              Back
            </Button>

            <Button
              onClick={handleSignUp}
              disabled={!firstName || !lastName || !gender || !termsAccepted}
              className="flex-1 bg-[#003366] hover:bg-[#003366] text-white py-2 rounded-full font-semibold disabled:opacity-50"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
