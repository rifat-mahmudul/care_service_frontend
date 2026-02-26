"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const timeSlots = [
  "10:00AM",
  "10:00AM",
  "10:00AM",
  "10:00AM",
  "10:00AM",
  "10:00AM",
  "10:00AM",
  "10:00AM",
  "10:00AM",
  "10:00AM",
  "10:00AM",
  "10:00AM",
];

const Booking = () => {
  const [date, setDate] = useState(new Date(2025, 0, 1));
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

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
            />
          </div>

          {/* Middle: Time Slots */}
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-50 flex flex-col items-center w-full max-w-lg">
            <p className="text-gray-400 text-sm mb-1">Available Time for</p>
            <h3 className="text-2xl font-semibold mb-6 text-gray-700">
              {date ? format(date, "MMMM, yyyy") : "Select a date"}
            </h3>

            <div className="grid grid-cols-3 gap-3 w-full">
              {timeSlots.map((time, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTime(index)}
                  className={cn(
                    "py-3 px-2 border rounded-xl text-sm transition-all",
                    selectedTime === index
                      ? "border-blue-600 bg-blue-50 text-blue-600 font-medium"
                      : "border-gray-200 text-gray-600 hover:border-blue-300",
                  )}
                >
                  {time}
                </button>
              ))}
            </div>

            <div className="flex justify-between w-full mt-6">
              <ChevronLeft className="w-5 h-5 text-gray-400 cursor-pointer" />
              <ChevronRight className="w-5 h-5 text-gray-400 cursor-pointer" />
            </div>
          </div>

          {/* Right: Action Button */}
          <div className="flex-1 flex justify-center w-full">
            <Button
              className="bg-[#003366] hover:bg-[#002244] text-white px-16 py-7 rounded-full text-lg font-medium transition-all shadow-lg active:scale-95"
              disabled={!date || selectedTime === null}
            >
              Book Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Booking;
