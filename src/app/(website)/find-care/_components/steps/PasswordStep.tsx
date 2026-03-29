// src/components/steps/PasswordStep.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface PasswordStepProps {
  email: string;
  onNext: (data: { password: string }) => void;
  onBack: () => void;
}

export function PasswordStep({ onNext, onBack }: PasswordStepProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSetPassword = () => {
    if (password.length >= 6) {
      onNext({ password });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl text-[#0A0A23] font-bold text-center mb-8">
        Finish setting up your account
      </h1>

      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
        <div className="space-y-6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Write password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 pr-12 border-2 border-[#8E8E9A] rounded-full focus:outline-none focus:border-[#8E8E9A]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <p className="text-xs text-gray-500 -mt-2">At least 6 characters</p>

          <div className="flex gap-3">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 py-2 rounded-full font-semibold bg-transparent"
            >
              Back
            </Button>
            <Button
              onClick={handleSetPassword}
              disabled={password.length < 6}
              className="flex-1 bg-primary hover:bg-primary text-white py-2 rounded-full font-semibold disabled:opacity-50"
            >
              Set Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
