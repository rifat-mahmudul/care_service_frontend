'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FindJobDataTypes } from '../find-job-data-type'

interface HourlyRateStepProps {
  data: Partial<FindJobDataTypes>
  onNext: (data: Partial<FindJobDataTypes>) => void
  onBack: () => void
}

export function HourlyRateStep({
  data,
  onNext,
  onBack,
}: HourlyRateStepProps) {
  const [hourRate, setHourRate] = useState<number>(
    data.hourRate ?? 10
  )

  // 🔁 Restore from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('findJobForm')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.hourRate !== undefined) {
        setHourRate(parsed.hourRate)
      }
    }
  }, [])

  const handleContinue = () => {
    const payload: Partial<FindJobDataTypes> = {
      hourRate,
    }

    // 💾 Persist merged data
    localStorage.setItem(
      'findJobForm',
      JSON.stringify({ ...data, ...payload })
    )

    onNext(payload)
  }

  const progress = ((hourRate - 5) / 95) * 100

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">
          Which jobs are you open to?
        </h1>

        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-4">
              My hourly rate
            </label>

            <p className="text-2xl font-bold mb-4">
              ${hourRate}
              <span className="text-base font-normal text-gray-600">
                /hour
              </span>
            </p>

            <input
              type="range"
              min={5}
              max={100}
              value={hourRate}
              onChange={(e) => setHourRate(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(
                  to right,
                  #001f3f 0%,
                  #001f3f ${progress}%,
                  #d3d3d3 ${progress}%,
                  #d3d3d3 100%
                )`,
              }}
            />
          </div>

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

// interface HourlyRateStepProps {
//   onNext: (data: { hourlyRate: number }) => void
//   onBack: () => void
// }

// export function HourlyRateStep({ onNext, onBack }: HourlyRateStepProps) {
//   const [hourlyRate, setHourlyRate] = useState(10)

//   const handleContinue = () => {
//     onNext({ hourlyRate })
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
//         <h1 className="text-3xl font-bold text-center mb-8">Which jobs are you open to?</h1>
        
//         <div className="space-y-8">
//           <div>
//             <label className="block text-sm font-medium mb-4">My hourly rate</label>
//             <div className="mb-4">
//               <p className="text-2xl font-bold">${hourlyRate}<span className="text-base font-normal text-gray-600">/hour</span></p>
//             </div>
//             <input
//               type="range"
//               min="5"
//               max="100"
//               value={hourlyRate}
//               onChange={(e) => setHourlyRate(parseInt(e.target.value))}
//               className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
//               style={{
//                 background: `linear-gradient(to right, #001f3f 0%, #001f3f ${((hourlyRate - 5) / 95) * 100}%, #d3d3d3 ${((hourlyRate - 5) / 95) * 100}%, #d3d3d3 100%)`
//               }}
//             />
//           </div>

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
