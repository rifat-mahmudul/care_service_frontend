'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface HourlyRateStepProps {
  onNext: (data: { hourlyRate: number }) => void
  onBack: () => void
}

export function HourlyRateStep({ onNext, onBack }: HourlyRateStepProps) {
  const [hourlyRate, setHourlyRate] = useState(10)

  const handleContinue = () => {
    onNext({ hourlyRate })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Which jobs are you open to?</h1>
        
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-4">My hourly rate</label>
            <div className="mb-4">
              <p className="text-2xl font-bold">${hourlyRate}<span className="text-base font-normal text-gray-600">/hour</span></p>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #001f3f 0%, #001f3f ${((hourlyRate - 5) / 95) * 100}%, #d3d3d3 ${((hourlyRate - 5) / 95) * 100}%, #d3d3d3 100%)`
              }}
            />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 py-2 rounded-full font-semibold bg-transparent"
            >
              Back
            </Button>
            <Button
              onClick={handleContinue}
              className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-full font-semibold"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
