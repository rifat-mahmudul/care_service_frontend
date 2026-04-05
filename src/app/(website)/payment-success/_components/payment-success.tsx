"use client";
import React from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight, LogIn, User } from "lucide-react";
import { useSession } from "next-auth/react";

const PaymentSuccess = () => {
  // Get session on server side
  const session = useSession();
  const isLoggedIn = !!session?.data?.user;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            Your subscription has been activated successfully. You can now
            access all premium features.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/login"
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <LogIn className="w-5 h-5" />
              Go to Login
            </Link>

            <Link
              href="/"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
            >
              Return to Homepage
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Help Text */}
          <p className="text-sm text-gray-500 mt-6">
            A confirmation email has been sent to your inbox.
            <br />
            <Link href="/support" className="text-blue-600 hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // If logged in, show different content
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Welcome Back!
        </h1>
        <p className="text-gray-600 mb-4">
          Your service has been registered successfully.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          You&apos;re all set to start finding care or jobs in your area.
        </p>

        {/* Action Buttons for Logged In Users */}
        <div className="space-y-3">
          <Link
            href="/profile"
            className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <User className="w-5 h-5" />
            View Profile
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
