// src/components/steps/ScheduleStep.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  FindJobDataTypes,
  DaySchedule,
  ScheduleItem,
  ScheduleTypes,
} from "../find-job-data-type";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function ScheduleStep({
  data,
  onNext,
  onBack,
}: {
  data: FindJobDataTypes;
  onNext: (d: Partial<FindJobDataTypes>) => void;
  onBack: () => void;
}) {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(() => {
    // Convert from ScheduleTypes to array format
    if (data.days && data.days.day.length > 0) {
      return DAYS.map((day) => {
        const dayIndex = data.days.day.indexOf(day);
        return {
          day,
          selected: dayIndex !== -1,
          time:
            dayIndex !== -1
              ? data.days.time[dayIndex] || "10:00-12:00"
              : "10:00-12:00",
        };
      });
    }

    return DAYS.map((day) => ({
      day,
      selected: false,
      time: "10:00-12:00",
    }));
  });

  // Restore from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("findJobForm");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.days && parsed.days.day && parsed.days.day.length > 0) {
          setSchedule(
            DAYS.map((day) => {
              const dayIndex = parsed.days.day.indexOf(day);
              return {
                day,
                selected: dayIndex !== -1,
                time:
                  dayIndex !== -1
                    ? parsed.days.time[dayIndex] || "10:00-12:00"
                    : "10:00-12:00",
              };
            }),
          );
        }
      } catch (e) {
        console.error("Error parsing localStorage data:", e);
      }
    }
  }, []);

  const toggleDay = (day: string) => {
    setSchedule((prev) =>
      prev.map((d) => (d.day === day ? { ...d, selected: !d.selected } : d)),
    );
  };

  const applyAll = (checked: boolean) => {
    setSchedule((prev) => prev.map((d) => ({ ...d, selected: checked })));
  };

  const updateTime = (day: string, value: string) => {
    setSchedule((prev) =>
      prev.map((d) => (d.day === day ? { ...d, time: value } : d)),
    );
  };

  // Convert array format to ScheduleTypes
  const convertToScheduleTypes = (daysArray: DaySchedule[]): ScheduleTypes => {
    return {
      day: daysArray.map((d) => d.day),
      time: daysArray.map((d) => d.time || "10:00-12:00"),
    };
  };

  const handleContinue = () => {
    const selected = schedule.filter((d) => d.selected);

    const daysArray: DaySchedule[] = selected.map((d) => ({
      day: d.day,
      time: d.time,
    }));

    // Convert to ScheduleTypes before sending
    const scheduleTypes = convertToScheduleTypes(daysArray);
    onNext({ days: scheduleTypes });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Which days?</h2>

        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {schedule.map((d) => (
                <button
                  key={d.day}
                  onClick={() => toggleDay(d.day)}
                  className={`px-4 py-2 rounded-full border font-semibold text-sm transition ${
                    d.selected
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-primary border-primary"
                  }`}
                >
                  {d.day}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              onChange={(e) => applyAll(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">Apply for all days</span>
          </label>

          <div className="space-y-4">
            {schedule
              .filter((d) => d.selected)
              .map((d) => (
                <div key={d.day} className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">{d.day}</p>
                  <input
                    type="text"
                    value={d.time}
                    onChange={(e) => updateTime(d.day, e.target.value)}
                    placeholder="09:00 AM - 05:00 PM"
                    className="w-full px-4 py-2 border-2 border-[#8E8E9A] rounded-full focus:outline-none focus:border-primary"
                  />
                </div>
              ))}
          </div>

          <div className="flex gap-3 mt-8">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 py-2 rounded-full font-semibold bg-transparent"
            >
              Back
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!schedule.some((d) => d.selected)}
              className="flex-1 bg-primary hover:bg-primary text-white py-2 rounded-full font-semibold"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
