'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { FindJobDataTypes } from '../find-job-data-type'

interface PasswordStepProps {
  data: Partial<FindJobDataTypes>
  onNext: (data: Partial<FindJobDataTypes>) => void
  onBack: () => void
}

export function PasswordStep({
  data,
  onNext,
  onBack,
}: PasswordStepProps) {
  const [password, setPassword] = useState(data.password || '')
  const [showPassword, setShowPassword] = useState(false)

  // 🔁 Rehydrate from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('findJobForm')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.password) setPassword(parsed.password)
    }
  }, [])

  const handleSetPassword = () => {
    if (password.length < 6) return

    const payload: Partial<FindJobDataTypes> = {
      password,
    }

    // 💾 Persist merged data
    localStorage.setItem(
      'findJobForm',
      JSON.stringify({ ...data, ...payload })
    )

    onNext(payload)
  }

  const displayName =
    data.email?.split('@')[0] || 'there'

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-8">
          Glad you&apos;re here, {displayName}! Let&apos;s set your password.
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border-2 rounded-full"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-2.5 text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              At least 6 characters
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
              onClick={handleSetPassword}
              disabled={password.length < 6}
              className="flex-1 bg-blue-900 text-white rounded-full"
            >
              Set Password
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
// import { Eye, EyeOff } from 'lucide-react'

// interface PasswordStepProps {
//   email: string
//   onNext: (data: { password: string }) => void
//   onBack: () => void
// }

// export function PasswordStep({ email, onNext, onBack }: PasswordStepProps) {
//   const [password, setPassword] = useState('')
//   const [showPassword, setShowPassword] = useState(false)

//   const handleSetPassword = () => {
//     if (password.length >= 6) {
//       onNext({ password })
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
//         <h1 className="text-2xl font-bold text-center mb-8">
//           Glad you&apos;re here, {email.split('@')[0]}! Let&apos;s set your password.
//         </h1>
        
//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium mb-2">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-400"
//               />
//               <button
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-2.5 text-gray-600"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//             <p className="text-xs text-gray-500 mt-2">At least 6 characters</p>
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
//               onClick={handleSetPassword}
//               disabled={password.length < 6}
//               className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-full font-semibold"
//             >
//               Set Password
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
