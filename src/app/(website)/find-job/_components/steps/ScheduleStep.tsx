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
import { Clock } from "lucide-react";

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
        const timeValue =
          dayIndex !== -1 ? data.days.time[dayIndex] : "10:00-12:00";
        const [startTime, endTime] = timeValue
          .split("-")
          .map((t: string) => t.trim());

        return {
          day,
          selected: dayIndex !== -1,
          startTime: startTime || "09:00 AM",
          endTime: endTime || "05:00 PM",
          time: timeValue,
        };
      });
    }

    return DAYS.map((day) => ({
      day,
      selected: false,
      startTime: "09:00 AM",
      endTime: "05:00 PM",
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
              const timeValue =
                dayIndex !== -1
                  ? parsed.days.time[dayIndex] || "10:00-12:00"
                  : "10:00-12:00";
              const [startTime, endTime] = timeValue
                .split("-")
                .map((t: string) => t.trim());

              return {
                day,
                selected: dayIndex !== -1,
                startTime: startTime || "09:00 AM",
                endTime: endTime || "05:00 PM",
                time: timeValue,
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
    const [startTime, endTime] = value.split("-").map((t: string) => t.trim());
    setSchedule((prev) =>
      prev.map((d) =>
        d.day === day
          ? {
              ...d,
              time: value,
              startTime: startTime || d.startTime,
              endTime: endTime || d.endTime,
            }
          : d,
      ),
    );
  };

  // Convert array format to ScheduleTypes
  const convertToScheduleTypes = (daysArray: DaySchedule[]): ScheduleTypes => {
    return {
      day: daysArray.map((d) => d.day),
      time: daysArray.map(
        (d) =>
          d.time || `${d.startTime || "09:00 AM"}-${d.endTime || "05:00 PM"}`,
      ),
    };
  };

  const handleContinue = () => {
    const selected = schedule.filter((d) => d.selected);

    const daysArray: DaySchedule[] = selected.map((d) => ({
      day: d.day,
      startTime: d.startTime,
      endTime: d.endTime,
      time: d.time,
    }));

    // Convert to ScheduleTypes before sending
    const scheduleTypes = convertToScheduleTypes(daysArray);
    onNext({ days: scheduleTypes });
  };

  // Get common time for "Apply All" feature
  const getCommonTime = () => {
    const selectedDays = schedule.filter((d) => d.selected);
    if (selectedDays.length === 0) return "10:00-12:00";
    return selectedDays[0].time;
  };

  const handleApplyAllTime = () => {
    const commonTime = getCommonTime();
    setSchedule((prev) =>
      prev.map((d) =>
        d.selected
          ? {
              ...d,
              time: commonTime,
              startTime: commonTime.split("-")[0]?.trim() || "09:00 AM",
              endTime: commonTime.split("-")[1]?.trim() || "05:00 PM",
            }
          : d,
      ),
    );
  };

  const selectedDaysCount = schedule.filter((d) => d.selected).length;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 mt-20">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-2 text-center">Which days?</h2>
        <p className="text-center text-gray-500 mb-8">
          Select the days you&apos;re available to work
        </p>

        <div className="space-y-6">
          {/* Day Selection Buttons */}
          <div>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {schedule.map((d) => (
                <button
                  key={d.day}
                  onClick={() => toggleDay(d.day)}
                  className={`px-5 py-2.5 rounded-full border font-semibold text-sm transition-all duration-200 ${
                    d.selected
                      ? "bg-primary text-white border-primary shadow-md"
                      : "bg-white text-gray-700 border-gray-300 hover:border-primary hover:bg-gray-50"
                  }`}
                >
                  {d.day}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) => applyAll(e.target.checked)}
                checked={selectedDaysCount === DAYS.length}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium">Select All Days</span>
            </label>

            <button
              onClick={handleApplyAllTime}
              disabled={selectedDaysCount === 0}
              className={`text-sm flex items-center gap-1 px-3 py-1 rounded-full transition ${
                selectedDaysCount > 0
                  ? "text-primary hover:bg-primary/10"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              <Clock size={14} />
              Apply same time to all
            </button>
          </div>

          {/* Selected Days with Time Inputs - Grid Layout for better design */}
          {selectedDaysCount > 0 && (
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3 text-gray-700">
                Set Working Hours ({selectedDaysCount} day
                {selectedDaysCount > 1 ? "s" : ""} selected)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                {schedule
                  .filter((d) => d.selected)
                  .map((d) => (
                    <div
                      key={d.day}
                      className="bg-gray-50 p-3 rounded-lg border border-gray-100"
                    >
                      <p className="font-semibold mb-2 text-primary">{d.day}</p>
                      <input
                        type="text"
                        value={d.time}
                        onChange={(e) => updateTime(d.day, e.target.value)}
                        placeholder="09:00 AM - 05:00 PM"
                        className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {selectedDaysCount === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <Clock size={40} className="mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500 text-sm">
                Please select at least one day to continue
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 py-2.5 rounded-full font-semibold bg-transparent border-gray-300 hover:border-primary"
            >
              Back
            </Button>
            <Button
              onClick={handleContinue}
              disabled={selectedDaysCount === 0}
              className="flex-1 bg-primary hover:bg-primary text-white py-2.5 rounded-full font-semibold transition-all duration-200"
            >
              Continue ({selectedDaysCount} day
              {selectedDaysCount !== 1 ? "s" : ""})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
