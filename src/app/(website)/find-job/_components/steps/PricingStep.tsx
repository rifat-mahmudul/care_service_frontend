'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { FindJobDataTypes } from '../find-job-data-type'

interface PricingStepProps {
  data: FindJobDataTypes
  onNext: (data: Partial<FindJobDataTypes>) => void
  onBack: () => void
}

export function PricingStep({ data, onNext, onBack }: PricingStepProps) {
  const [selectedPlan, setSelectedPlan] = useState<'premium' | 'safety'>(
    data.subscriptionId === '6984423244bb34ec77e8e437'
      ? 'premium'
      : 'safety'
  )

  // Map plan → subscriptionId
  const getSubscriptionId = (plan: 'premium' | 'safety') => {
    if (plan === 'premium') return '6984423244bb34ec77e8e437'
    return 'SAFETY_PLAN_ID'
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-12">
          Almost done! Choose your plan.
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          
          {/* Premium Plan */}
          <div
            onClick={() => setSelectedPlan('premium')}
            className={`relative p-6 rounded-lg border-2 cursor-pointer transition ${
              selectedPlan === 'premium'
                ? 'border-purple-500 bg-white shadow-lg'
                : 'border-gray-300 bg-white'
            }`}
          >
            {selectedPlan === 'premium' && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            <h3 className="text-xl font-bold mb-2">Premium</h3>
            <p className="text-gray-600 text-sm mb-4">
              Includes safety screening
            </p>

            <div className="mb-6">
              <span className="text-3xl font-bold">$9</span>
              <span className="text-gray-600">/month</span>
            </div>

            <div className="space-y-3 mb-6">
              {[
                'Rank higher in search results',
                'Premium badge on profile',
                'Priority job alerts',
                'Find and apply for jobs',
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded font-semibold">
              Select Plan
            </Button>
          </div>

          {/* Safety Plan */}
          <div
            onClick={() => setSelectedPlan('safety')}
            className={`p-6 rounded-lg border-2 cursor-pointer transition ${
              selectedPlan === 'safety'
                ? 'border-purple-500 bg-white shadow-lg'
                : 'border-gray-300 bg-white'
            }`}
          >
            <h3 className="text-xl font-bold mb-2">Safety Screening Only</h3>
            <p className="text-gray-600 text-sm mb-4">
              Basic membership access
            </p>

            <div className="mb-6">
              <span className="text-3xl font-bold">$23.99</span>
              <span className="text-gray-600">/year</span>
            </div>

            <div className="space-y-3 mb-6">
              {[
                'Basic membership',
                'Find and apply for jobs',
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded font-semibold">
              Select Plan
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 py-2 rounded-full font-semibold"
          >
            Back
          </Button>

          <Button
            onClick={() =>
              onNext({
                subscriptionId: getSubscriptionId(selectedPlan),
              })
            }
            className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-full font-semibold"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}





// 'use client'

// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Check } from 'lucide-react'

// interface PricingStepProps {
//   onNext: (data: { plan: 'premium' | 'safety' }) => void
//   onBack: () => void
// }

// export function PricingStep({ onNext, onBack }: PricingStepProps) {
//   const [selectedPlan, setSelectedPlan] = useState<'premium' | 'safety'>('premium')

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl">
//         <h1 className="text-3xl font-bold text-center mb-12">
//           Almost done! Order your safety screening to find jobs.
//         </h1>
        
//         <div className="grid md:grid-cols-2 gap-6 mb-6">
//           {/* Premium Plan */}
//           <div
//             onClick={() => setSelectedPlan('premium')}
//             className={`relative p-6 rounded-lg border-2 cursor-pointer transition ${
//               selectedPlan === 'premium'
//                 ? 'border-purple-500 bg-white shadow-lg'
//                 : 'border-gray-300 bg-white'
//             }`}
//           >
//             {selectedPlan === 'premium' && (
//               <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//                 <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                   Most Popular
//                 </span>
//               </div>
//             )}
            
//             <h3 className="text-xl font-bold mb-2">Premium</h3>
//             <p className="text-gray-600 text-sm mb-4">Includes safety screening</p>
            
//             <div className="mb-6">
//               <span className="text-3xl font-bold">$9</span>
//               <span className="text-gray-600">/month</span>
//             </div>

//             <div className="space-y-3 mb-6">
//               {[
//                 'Rank higher in search results',
//                 'Get a Premium badge on your profile',
//                 'Be first to learn about new jobs',
//                 'Find and apply for jobs',
//               ].map((feature, idx) => (
//                 <div key={idx} className="flex items-start gap-3">
//                   <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
//                   <span className="text-sm">{feature}</span>
//                 </div>
//               ))}
//             </div>

//             <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded font-semibold">
//               Get Started
//             </Button>
//           </div>

//           {/* Safety Screening Only Plan */}
//           <div
//             onClick={() => setSelectedPlan('safety')}
//             className={`p-6 rounded-lg border-2 cursor-pointer transition ${
//               selectedPlan === 'safety'
//                 ? 'border-purple-500 bg-white shadow-lg'
//                 : 'border-gray-300 bg-white'
//             }`}
//           >
//             <h3 className="text-xl font-bold mb-2">Safety screening only</h3>
//             <p className="text-gray-600 text-sm mb-4">
//               Perfect for small teams and side projects
//             </p>
            
//             <div className="mb-6">
//               <span className="text-3xl font-bold">$23.99</span>
//               <span className="text-gray-600">/year</span>
//             </div>

//             <div className="space-y-3 mb-6">
//               {[
//                 'GetCare.com Basic membership',
//                 'Find and apply for jobs',
//               ].map((feature, idx) => (
//                 <div key={idx} className="flex items-start gap-3">
//                   <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
//                   <span className="text-sm">{feature}</span>
//                 </div>
//               ))}
//             </div>

//             <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white py-2 rounded font-semibold">
//               Get Started
//             </Button>
//           </div>
//         </div>

//         {/* Navigation */}
//         <div className="flex gap-3">
//           <Button
//             onClick={onBack}
//             variant="outline"
//             className="flex-1 py-2 rounded-full font-semibold bg-transparent"
//           >
//             Back
//           </Button>
//           <Button
//             onClick={() => onNext({ plan: selectedPlan })}
//             className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-full font-semibold"
//           >
//             Continue
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }
