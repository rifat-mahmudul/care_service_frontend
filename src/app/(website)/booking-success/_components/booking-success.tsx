"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const BookingSuccess = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      router.replace("/");
    }
  }, [sessionId, router]);

  if (!sessionId) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 w-16 h-16" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Booking Successful 🎉
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Your booking has been successfully completed.
          {/* A confirmation email has */}
          {/* been sent with your booking details. */}
        </p>

        {/* Session ID */}
        <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-500 mb-6 break-all">
          Session ID: {sessionId}
        </div>

        {/* Buttons */}
        <div>
          <Link href={`/`}>
            <button className="px-5 py-2 bg-primary text-white rounded-lg transition">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
