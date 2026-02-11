'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { FindJobDataTypes } from '../find-job-data-type'

interface SummaryStepProps {
  data: FindJobDataTypes
  onBack: () => void
}

export function SummaryStep({ data, onBack }: SummaryStepProps) {
  useEffect(() => {
    console.log('=== FORM DATA SUMMARY ===')
    console.log('Email:', data.email)
    console.log('Password:', '***' + data.password?.slice(-3))
    console.log('Location:', data.location)
    // console.log('Selected Days:', data.selectedDays)
    // console.log('Schedule Varies:', data.scheduleVaries)
    // console.log('Plan:', data.plan)
    // console.log('First Name:', data.firstName)
    console.log('Last Name:', data.lastName)
    console.log('Gender:', data.gender)
    // console.log('Terms Accepted:', data.termsAccepted)
    // console.log('Hourly Rate:', data.hourlyRate)
    console.table(data)
  }, [data])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">
          Account Created!
        </h1>

        <div className="space-y-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Name :</span>
              <span>
                {data.firstName} {data.lastName}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Email :</span>
              <span className="text-sm">{data.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Gender :</span>
              <span className="text-sm">{data.gender}</span>
            </div>

             <div className="flex justify-between">
              <span className="font-medium">Days :</span>
              <span className="text-sm">{data?.days?.day}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Times :</span>
              <span className="text-sm">{data?.days?.time}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Location :</span>
              <span>{data.location}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Plan :</span>
              <span className="capitalize">{data.subscriptionId}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Hourly Rate :</span>
              <span>${data.hourRate}/hour</span>
            </div>
          </div>

          <p className="text-sm text-center text-gray-600">
            ✅ All your data has been logged to the console.
          </p>
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
            className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-full"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  )
}














// 'use client'

// import { useEffect } from 'react'
// import { Button } from '@/components/ui/button'

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

// interface SummaryStepProps {
//   formData: FormData
//   onBack: () => void
// }

// export function SummaryStep({ formData, onBack }: SummaryStepProps) {
//   useEffect(() => {
//     // Log all collected data to console
//     console.log('=== FORM DATA SUMMARY ===')
//     console.log('Email:', formData.email)
//     console.log('Password:', '***' + formData.password.slice(-3))
//     console.log('Location:', formData.location)
//     console.log('ZIP Code:', formData.zipCode)
//     console.log('Selected Days:', formData.selectedDays)
//     // console.log('Time Range:', `${formData.timeRange[0]}AM - ${formData.timeRange[1]}PM`)
//     // console.log('Apply for All Days:', formData.applyForAllDays)
//     console.log('Schedule Varies:', formData.scheduleVaries)
//     console.log('Selected Plan:', formData.plan)
//     console.log('First Name:', formData.firstName)
//     console.log('Last Name:', formData.lastName)
//     console.log('Gender:', formData.gender)
//     console.log('Terms Accepted:', formData.termsAccepted)
//     console.log('Hourly Rate:', `$${formData.hourlyRate}/hour`)
//     console.log('======================')
//     console.table(formData)
//   }, [formData])

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
//         <h1 className="text-3xl font-bold text-center mb-8">Account Created!</h1>
        
//         <div className="space-y-6 mb-8">
//           <div className="bg-gray-50 p-4 rounded-lg space-y-3">
//             <div className="flex justify-between">
//               <span className="font-medium">Name:</span>
//               <span>{formData.firstName} {formData.lastName}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Email:</span>
//               <span className="text-sm">{formData.email}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Location:</span>
//               <span>{formData.location} ({formData.zipCode})</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Days:</span>
//               {/* <span>{formData.selectedDays.join(', ')}</span> */}
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Hours:</span>
//               {/* <span>{formData.timeRange[0]}AM - {formData.timeRange[1]}PM</span> */}
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Plan:</span>
//               <span className="capitalize">{formData.plan}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium">Hourly Rate:</span>
//               <span>${formData.hourlyRate}/hour</span>
//             </div>
//           </div>

//           <p className="text-sm text-center text-gray-600">
//             ✅ All your data has been logged to the console. Check your browser&apos;s developer tools (F12).
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <Button
//             onClick={onBack}
//             variant="outline"
//             className="flex-1 py-2 rounded-full font-semibold bg-transparent"
//           >
//             Back
//           </Button>
//           <Button
//             className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-full font-semibold"
//           >
//             Done
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }
