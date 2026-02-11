'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FindJobDataTypes } from '../find-job-data-type'

interface LocationStepProps {
  data: Partial<FindJobDataTypes>
  onNext: (data: Partial<FindJobDataTypes>) => void
  // onBack: () => void
}

export function LocationStep({
  data,
  onNext,
  // onBack,
}: LocationStepProps) {
  const [location, setLocation] = useState(data.location || '')

  // 🔁 Restore from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('findJobForm')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.location) {
        setLocation(parsed.location)
      }
    }
  }, [])

  const handleContinue = () => {
    if (!location) return

    const payload: Partial<FindJobDataTypes> = {
      location, // zip / postal code only
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
        <h1 className="text-3xl font-bold text-center mb-8">
          Where would you like to work?
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Location (Zip / Postal Code)
            </label>
            <input
              type="text"
              placeholder="23107"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-full"
            />
          </div>

          <p className="text-sm text-gray-600">
            We&apos;ll use this to find jobs near you
          </p>

          <div className="flex gap-3">
            {/* <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 rounded-full"
            >
              Back
            </Button> */}

            <Button
              onClick={handleContinue}
              disabled={!location}
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

// interface LocationStepProps {
//   onNext: (data: { location: string; zipCode: string }) => void
//   onBack: () => void
// }

// export function LocationStep({ onNext, onBack }: LocationStepProps) {
//   const [zipCode, setZipCode] = useState('')

//   const handleContinue = () => {
//     if (zipCode) {
//       onNext({ location: 'Cina PK', zipCode })
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
//         <h1 className="text-3xl font-bold text-center mb-8">Where would you like to work?</h1>
        
//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium mb-2">Location</label>
//             <input
//               type="text"
//               placeholder="33101"
//               value={zipCode}
//               onChange={(e) => setZipCode(e.target.value)}
//               className="w-full px-4 py-2 border-2 border-blue-400 rounded-full focus:outline-none focus:border-blue-600"
//             />
//           </div>
          
//           <p className="text-sm text-gray-600">Cina PK</p>

//           <div className="flex gap-3">
//             <Button
//               onClick={onBack}
//               variant="outline"
//               className="flex-1 py-2 rounded-full font-semibold bg-transparent"
//             >
//               Back
//             </Button>
//             <Button
//               onClick={handleContinue}
//               disabled={!zipCode}
//               className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-full font-semibold"
//             >
//               Continue
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
