"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceDay {
  day: string;
  startTime: string;
  endTime: string;
  _id: string;
}

interface BookingProps {
  days: ServiceDay[];
  hourlyRate?: number;
  providerName?: string;
}



const Booking = ({
  days = [],
  hourlyRate = 0,
  providerName = "",
}: BookingProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  // Get available days for the selected date
  const getAvailableDayFromDate = (selectedDate: Date): string => {
    const dayName = format(selectedDate, "EEEE"); // Gets full day name (Monday, Tuesday, etc.)
    return dayName;
  };

  

  // Alternative simpler implementation without the linting issue
  const generateTimeSlotsAlternative = (startTime: string, endTime: string): string[] => {
    const slots: string[] = [];

    // Parse time to minutes since midnight
    const timeToMinutes = (timeStr: string): number => {
      const [timePart, modifier] = timeStr.split(" ");
      const [hourStr, minuteStr] = timePart.split(":");
      let hours = parseInt(hourStr, 10);
      const minutes = parseInt(minuteStr, 10); // Using const since it's never reassigned

      if (modifier === "PM" && hours !== 12) {
        hours += 12;
      }
      if (modifier === "AM" && hours === 12) {
        hours = 0;
      }

      return hours * 60 + minutes;
    };

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    // Generate slots every 2 hours
    for (let mins = startMinutes; mins < endMinutes; mins += 120) {
      const hours = Math.floor(mins / 60);
      const minsOfHour = mins % 60; // Renamed to avoid confusion
      const period = hours >= 12 ? "PM" : "AM";
      const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
      
      const timeString = `${displayHours.toString().padStart(2, "0")}:${minsOfHour.toString().padStart(2, "0")} ${period}`;
      slots.push(timeString);
    }

    return slots;
  };

  // Update available time slots when date changes
  useEffect(() => {
    if (date && days.length > 0) {
      const selectedDayName = getAvailableDayFromDate(date);

      // Find the day's schedule from the days array
      const daySchedule = days.find((d) => d.day === selectedDayName);

      if (daySchedule) {
        const slots = generateTimeSlotsAlternative(
          daySchedule.startTime,
          daySchedule.endTime,
        );
        setAvailableTimeSlots(slots);
        setSelectedTime(null); // Reset selected time when date changes
      } else {
        setAvailableTimeSlots([]);
        setSelectedTime(null);
      }
    }
  }, [date, days]);

  // Check if selected date is available
  const isDateAvailable = (date: Date): boolean => {
    const dayName = format(date, "EEEE");
    return days.some((d) => d.day === dayName);
  };

  // Custom day renderer for calendar
  const isDayAvailable = (date: Date) => {
    return isDateAvailable(date);
  };

  // Handle week navigation
  const goToPreviousWeek = () => {
    setCurrentWeekOffset((prev) => prev - 1);
    if (date) {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() - 7);
      setDate(newDate);
    }
  };

  const goToNextWeek = () => {
    setCurrentWeekOffset((prev) => prev + 1);
    if (date) {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 7);
      setDate(newDate);
    }
  };

  // Handle booking
  const handleBookNow = () => {
    if (date && selectedTime) {
      const dayName = format(date, "EEEE");
      const daySchedule = days.find((d) => d.day === dayName);

      // Here you would typically make an API call to create a booking
      console.log("Booking details:", {
        date: format(date, "yyyy-MM-dd"),
        day: dayName,
        time: selectedTime,
        startTime: daySchedule?.startTime,
        endTime: daySchedule?.endTime,
        hourlyRate,
        providerName,
      });

      // Show success message or redirect
      alert(
        `Booking confirmed for ${format(date, "MMMM d, yyyy")} at ${selectedTime}`,
      );
    }
  };

  if (!days || days.length === 0) {
    return (
      <div className="p-8 bg-gray-50 border border-gray-200 container rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-[#001f3f]">
          Select Available Time slot
        </h2>
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
          <CardContent className="p-10 text-center text-gray-500">
            No availability information available
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 border border-gray-200 container rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-[#001f3f]">
        Select Available Time slot
      </h2>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <CardContent className="p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Date Picker */}
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 border border-gray-50">
            <Calendar
              mode="single"
              required={true}
              selected={date}
              onSelect={setDate}
              className="rounded-md border-none"
              classNames={{
                day_selected:
                  "bg-blue-600 text-white hover:bg-blue-600 focus:bg-blue-600",
                head_cell: "text-gray-500 font-normal text-[0.8rem]",
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-full",
              }}
              modifiers={{
                available: isDayAvailable,
              }}
              modifiersClassNames={{
                available: "bg-green-50 text-green-700 font-medium",
              }}
              disabled={(date) => !isDateAvailable(date)}
            />
          </div>

          {/* Middle: Time Slots */}
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-50 flex flex-col items-center w-full max-w-lg">
            <p className="text-gray-400 text-sm mb-1">Available Time for</p>
            <h3 className="text-2xl font-semibold mb-6 text-gray-700">
              {date ? format(date, "EEEE, MMMM d, yyyy") : "Select a date"}
            </h3>

            {date && !isDateAvailable(date) ? (
              <div className="text-center text-red-500 py-4">
                No availability for this day
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-3 w-full">
                  {availableTimeSlots.length > 0 ? (
                    availableTimeSlots.map((time, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          "py-3 px-2 border rounded-xl text-sm transition-all",
                          selectedTime === time
                            ? "border-blue-600 bg-blue-50 text-blue-600 font-medium"
                            : "border-gray-200 text-gray-600 hover:border-blue-300",
                        )}
                      >
                        {time}
                      </button>
                    ))
                  ) : (
                    <div className="col-span-3 text-center text-gray-500 py-4">
                      No time slots available
                    </div>
                  )}
                </div>

                <div className="flex justify-between w-full mt-6">
                  <ChevronLeft
                    className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600"
                    onClick={goToPreviousWeek}
                  />
                  <span className="text-sm text-gray-500">
                    Week {currentWeekOffset + 1}
                  </span>
                  <ChevronRight
                    className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600"
                    onClick={goToNextWeek}
                  />
                </div>
              </>
            )}
          </div>

          {/* Right: Action Button */}
          <div className="flex-1 flex justify-center w-full">
            <Button
              className="bg-[#003366] hover:bg-[#002244] text-white px-16 py-7 rounded-full text-lg font-medium transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!date || !isDateAvailable(date) || !selectedTime}
              onClick={handleBookNow}
            >
              Book Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Availability Summary */}
      <div className="mt-6 text-sm text-gray-500">
        <p>Available days: {days.map((d) => d.day).join(", ")}</p>
        {date && isDateAvailable(date) && (
          <p className="mt-1">
            Selected time: {format(date, "MMMM d, yyyy")} at{" "}
            {selectedTime || "not selected"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Booking;