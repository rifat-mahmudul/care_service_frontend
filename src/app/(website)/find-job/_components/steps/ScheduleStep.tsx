'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FindJobDataTypes } from '../find-job-data-type'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function ScheduleStep({
  data,
  onNext,
  onBack,
}: {
  data: FindJobDataTypes
  onNext: (d: Partial<FindJobDataTypes>) => void
  onBack: () => void
}) {
  const [schedule, setSchedule] = useState(() => {
    if (data.days.day.length) {
      return DAYS.map((day) => ({
        day,
        selected: data.days.day.includes(day),
        time:
          data.days.time[
            data.days.day.indexOf(day)
          ] || '10:00-12:00',
      }))
    }

    return DAYS.map((day) => ({
      day,
      selected: false,
      time: '10:00-12:00',
    }))
  })

  const toggleDay = (day: string) => {
    setSchedule((prev) =>
      prev.map((d) =>
        d.day === day ? { ...d, selected: !d.selected } : d
      )
    )
  }

  const applyAll = (checked: boolean) => {
    setSchedule((prev) =>
      prev.map((d) => ({ ...d, selected: checked }))
    )
  }

  const updateTime = (day: string, value: string) => {
    setSchedule((prev) =>
      prev.map((d) =>
        d.day === day ? { ...d, time: value } : d
      )
    )
  }

  const handleContinue = () => {
    const selected = schedule.filter((d) => d.selected)

    onNext({
      days: {
        day: selected.map((d) => d.day),
        time: selected.map((d) => d.time),
      },
    })
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
 <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Which days?</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {schedule.map((d) => (
          <button
            key={d.day}
            onClick={() => toggleDay(d.day)}
            className={`px-3 py-1 rounded border ${
              d.selected
                ? 'bg-blue-900 text-white'
                : 'border-blue-900 text-blue-900'
            }`}
          >
            {d.day}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2 mb-4">
        <input type="checkbox" onChange={(e) => applyAll(e.target.checked)} />
        Apply for all days
      </label>

      {schedule
        .filter((d) => d.selected)
        .map((d) => (
          <div key={d.day} className="bg-gray-50 p-3 rounded mb-2">
            <p className="font-semibold">{d.day}</p>
            <input
              type="text"
              value={d.time}
              onChange={(e) => updateTime(d.day, e.target.value)}
              placeholder="06:00-10:00"
              className="w-full mt-2 border px-2 py-1 rounded"
            />
          </div>
        ))}

      <div className="flex gap-3 mt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleContinue}>Continue</Button>
      </div>
    </div>
    </div>
   
  )
}










// 'use client'

// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { ChevronDown, ChevronUp } from 'lucide-react'

// interface ScheduleStepProps {
//   onNext: (data: {
//     selectedDays: string[]
//     timeRange: [number, number]
//     applyForAllDays: boolean
//     scheduleVaries: boolean
//   }) => void
//   onBack: () => void
// }

// export function ScheduleStep({ onNext, onBack }: ScheduleStepProps) {
//   const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
//   //   const days: { [key: string]: string } = {
//   //   Sun: 'Sunday',
//   //   Mon: 'Monday',
//   //   Tue: 'Tuesday',
//   //   Wed: 'Wednesday',
//   //   Thu: 'Thursday',
//   //   Fri: 'Friday',
//   //   Sat: 'Saturday',
//   // }
//   const [selectedDays, setSelectedDays] = useState(['Sun'])
//   const [expandedDay, setExpandedDay] = useState('Sunday')
//   const [timeRange, setTimeRange] = useState<[number, number]>([10, 12])
//   const [applyForAllDays, setApplyForAllDays] = useState(false)
//   const [scheduleVaries, setScheduleVaries] = useState(false)

//   const toggleDay = (day: string) => {
//     setSelectedDays((prev) =>
//       prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
//     )
//   }

//   const handleContinue = () => {
//     onNext({
//       selectedDays,
//       timeRange,
//       applyForAllDays,
//       scheduleVaries,
//     })
//   }



//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
//         <h1 className="text-3xl font-bold text-center mb-8">Which days?</h1>
        
//         <div className="space-y-6">
//           {/* Day Selection */}
//           <div>
//             <div className="flex flex-wrap gap-2 mb-4">
//               {days.map((day) => (
//                 <button
//                   key={day}
//                   onClick={() => toggleDay(day)}
//                   className={`px-3 py-1 rounded border font-semibold text-sm transition ${
//                     selectedDays.includes(day)
//                       ? 'bg-blue-900 text-white border-blue-900'
//                       : 'bg-white text-blue-900 border-blue-900'
//                   }`}
//                 >
//                   {day}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Time Range Section */}
//           <div>
//             <div
//               onClick={() =>
//                 setExpandedDay(expandedDay === 'Sunday' ? '' : 'Sunday')
//               }
//               className="flex justify-between items-center cursor-pointer mb-2"
//             >
//               <span className="font-medium">{expandedDay || 'Select Day'}</span>
//               {expandedDay ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//             </div>

//             {expandedDay && (
//               <div className="space-y-4 bg-gray-50 p-4 rounded">
//                 <div>
//                   <p className="text-sm font-semibold mb-2">
//                     {timeRange[0]}Am · {timeRange[1]}Pm
//                   </p>
//                   <input
//                     type="range"
//                     min="0"
//                     max="24"
//                     value={timeRange[0]}
//                     onChange={(e) => {
//                       const val = parseInt(e.target.value)
//                       if (val < timeRange[1]) {
//                         setTimeRange([val, timeRange[1]])
//                       }
//                     }}
//                     className="w-full"
//                   />
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     id="applyAll"
//                     checked={applyForAllDays}
//                     onChange={(e) => setApplyForAllDays(e.target.checked)}
//                     className="w-4 h-4"
//                   />
//                   <label htmlFor="applyAll" className="text-sm">
//                     Apply for All days
//                   </label>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Schedule Varies Checkbox */}
//           <div className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               id="varies"
//               checked={scheduleVaries}
//               onChange={(e) => setScheduleVaries(e.target.checked)}
//               className="w-4 h-4"
//             />
//             <label htmlFor="varies" className="text-sm">
//               My schedule may vary
//             </label>
//           </div>

//           {/* Navigation */}
//           <div className="flex gap-3 pt-4">
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
