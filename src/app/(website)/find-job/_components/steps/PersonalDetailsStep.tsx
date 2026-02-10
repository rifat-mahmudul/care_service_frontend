'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FindJobDataTypes } from '../find-job-data-type'

interface PersonalDetailsStepProps {
  data: Partial<FindJobDataTypes>
  onNext: (data: Partial<FindJobDataTypes>) => void
  onBack: () => void
}

export function PersonalDetailsStep({
  data,
  onNext,
  onBack,
}: PersonalDetailsStepProps) {
  const [firstName, setFirstName] = useState(data.firstName || '')
  const [lastName, setLastName] = useState(data.lastName || '')
  const [gender, setGender] = useState(data.gender || '')
  const [termsAccepted, setTermsAccepted] = useState(false)

  // 🔁 Rehydrate from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('findJobForm')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.firstName) setFirstName(parsed.firstName)
      if (parsed.lastName) setLastName(parsed.lastName)
      if (parsed.gender) setGender(parsed.gender)
    }
  }, [])

  const handleSignUp = () => {
    if (!termsAccepted) return

    const payload: Partial<FindJobDataTypes> = {
      firstName,
      lastName,
      gender,
    }

    // 💾 Save merged data
    localStorage.setItem(
      'findJobForm',
      JSON.stringify({ ...data, ...payload })
    )

    onNext(payload)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-8">
          Almost done, tell us a few details about yourself
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              First name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Last name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-full"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-say">Prefer not to say</option>
            </select>
          </div>

          <p className="text-xs text-gray-600">
            We currently support limited options and are actively working
            to include more identities.
          </p>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1"
            />
            <label className="text-sm">
              I agree to the{' '}
              <span className="text-blue-600 underline">
                terms & conditions
              </span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 rounded-full"
            >
              Back
            </Button>

            <Button
              onClick={handleSignUp}
              disabled={
                !firstName || !lastName || !gender || !termsAccepted
              }
              className="flex-1 bg-blue-900 text-white rounded-full"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


// 'use client'

// import { useState } from 'react'
// import { Button } from '@/components/ui/button'

// interface PersonalDetailsStepProps {
//   onNext: (data: {
//     firstName: string
//     lastName: string
//     gender: string
//     termsAccepted: boolean
//   }) => void
//   onBack: () => void
// }

// export function PersonalDetailsStep({ onNext, onBack }: PersonalDetailsStepProps) {
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [gender, setGender] = useState('')
//   const [termsAccepted, setTermsAccepted] = useState(false)

//   const handleSignUp = () => {
//     if (firstName && lastName && gender && termsAccepted) {
//       onNext({ firstName, lastName, gender, termsAccepted })
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
//         <h1 className="text-2xl font-bold text-center mb-8">
//           Almost done, tell us a few details about yourself
//         </h1>
        
//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium mb-2">First name</label>
//             <input
//               type="text"
//               placeholder="Write here"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               className="w-full px-4 py-2 border-2 border-blue-400 rounded-full focus:outline-none focus:border-blue-600"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Last name</label>
//             <input
//               type="text"
//               placeholder="Write here"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               className="w-full px-4 py-2 border-2 border-blue-400 rounded-full focus:outline-none focus:border-blue-600"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Gender</label>
//             <select
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               className="w-full px-4 py-2 border-2 border-blue-400 rounded-full focus:outline-none focus:border-blue-600"
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//               <option value="prefer-not-say">Prefer not to say</option>
//             </select>
//           </div>

//           <p className="text-xs text-gray-600">
//             For the time being, we are able to provide these three limited options. 
//             We acknowledge that there are many more identities and are actively investigating ways to 
//             accommodate the full range of gender identity.
//           </p>

//           <div className="flex items-start gap-2">
//             <input
//               type="checkbox"
//               id="terms"
//               checked={termsAccepted}
//               onChange={(e) => setTermsAccepted(e.target.checked)}
//               className="w-4 h-4 mt-1 cursor-pointer"
//             />
//             <label htmlFor="terms" className="text-sm cursor-pointer">
//               I agree to the <span className="text-blue-600 underline">terms & conditions</span>
//             </label>
//           </div>

//           <div className="flex gap-3 pt-4">
//             <Button
//               onClick={onBack}
//               variant="outline"
//               className="flex-1 py-2 rounded-full font-semibold bg-transparent"
//             >
//               Back
//             </Button>
//             <Button
//               onClick={handleSignUp}
//               disabled={!firstName || !lastName || !gender || !termsAccepted}
//               className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-full font-semibold disabled:opacity-50"
//             >
//               Sign Up
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
