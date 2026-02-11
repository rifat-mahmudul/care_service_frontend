'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FindJobDataTypes } from '../find-job-data-type'

interface EmailStepProps {
  data: Partial<FindJobDataTypes>
  onNext: (data: Partial<FindJobDataTypes>) => void
  onBack: () => void
}

export function EmailStep({ data, onNext, onBack }: EmailStepProps) {
  const [email, setEmail] = useState(data.email || '')
  const [ageVerified, setAgeVerified] = useState(false)

  // 🔁 Restore data when user comes back / refreshes
  useEffect(() => {
    const saved = localStorage.getItem('findJobForm')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.email) setEmail(parsed.email)
    }
  }, [])

  const handleContinue = () => {
    if (!email || !ageVerified) return

    const payload: Partial<FindJobDataTypes> = {
      email,
    }

    // 💾 Persist merged data
    localStorage.setItem(
      'findJobForm',
      JSON.stringify({ ...data, ...payload })
    )

    onNext(payload)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">
          Let&apos;s create your account
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-full"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={ageVerified}
              onChange={(e) => setAgeVerified(e.target.checked)}
            />
            <label className="text-sm">
              I verify that I am at least 18 years old
            </label>
          </div>

          {/* <Button
            onClick={handleContinue}
            disabled={!email || !ageVerified}
            className="w-full bg-blue-900 text-white rounded-full"
          >
            Continue
          </Button> */}
          <div className="flex gap-3">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 rounded-full"
            >
              Back
            </Button>

            <Button
              onClick={handleContinue}
              disabled={!email || !ageVerified}
              className="flex-1 bg-blue-900 text-white rounded-full"
            >
              Continue
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

// interface EmailStepProps {
//   onNext: (data: { email: string; ageVerified: boolean }) => void
// }

// export function EmailStep({ onNext }: EmailStepProps) {
//   const [email, setEmail] = useState('')
//   const [ageVerified, setAgeVerified] = useState(false)

//   const handleContinue = () => {
//     if (email && ageVerified) {
//       onNext({ email, ageVerified })
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
//         <h1 className="text-3xl font-bold text-center mb-8">Let&apos;s create your account</h1>
        
//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium mb-2">Email</label>
//             <input
//               type="email"
//               placeholder="Write Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border-2 border-blue-400 rounded-full focus:outline-none focus:border-blue-600"
//             />
//           </div>

//           <div className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               id="age"
//               checked={ageVerified}
//               onChange={(e) => setAgeVerified(e.target.checked)}
//               className="w-4 h-4 cursor-pointer"
//             />
//             <label htmlFor="age" className="text-sm cursor-pointer">
//               I verify that I am at least 18 years old
//             </label>
//           </div>

//           <Button
//             onClick={handleContinue}
//             disabled={!email || !ageVerified}
//             className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-full font-semibold"
//           >
//             Continue
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }
