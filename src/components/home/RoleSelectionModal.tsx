// components/modals/RoleSelectionModal.tsx
"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface RoleSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    categoryName: string; // e.g. "Pet Care", "Child Care"
}

export default function RoleSelectionModal({
    isOpen,
    onClose,
    categoryName,
}: RoleSelectionModalProps) {
    const router = useRouter();

    if (!isOpen) return null;

    const handleFindCare = () => {
        router.push(`/find-care/1`);
        onClose();
    };

    const handleFindJob = () => {
        // Example: /find-job?category=pet-care
        const slug = categoryName.toLowerCase().replace(/\s+/g, "-");
        router.push(`/find-job?=${slug}`);
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 h-full flex items-center justify-center w-full bg-black bg-opacity-50 !z-50">
            <div className="relative w-full h-[90vh] max-w-7xl mx-4 bg-[#E6EBF0] rounded-2xl shadow-2xl overflow-hidden">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-800"
                    aria-label="Close modal"
                >
                    <X size={28} />
                </button>

                <div className="p-8 pt-12 pb-10 text-center flex flex-col items-center justify-center h-full">
                    <h2 className="text-2xl md:text-4xl text-[#0A0A23] font-bold mb-[56px]">
                        Let&apos;s get started. Choose an option:
                    </h2>

                    <div className="flex  gap-6">
                        {/* Card 1 - Looking for caregiver */}
                        <button
                            onClick={handleFindCare}
                            className="group relative  !bg-white  p-6  rounded-xl transition-all duration-200 hover:shadow-xl "
                        >
                            <div className="mb-6 w-[104px] h-[104px]  ">
                                {/* You can replace with real icon */}
                                <Image src={`/icon1.png`} alt="Caregivers smiling" width={1000} height={1000} className="object-cover w-full h-full" />
                            </div>
                            <h3 className="text-2xl text-left font-semibold mb-2 text-[#0A0A23]">
                                I&apos;m looking for a caregiver
                            </h3>
                            <p className="text-sm text-left text-[#3B3B4F] mb-4">
                                Start your free search for {categoryName.toLowerCase()} in your area.
                            </p>
                            <div className=" mt-10 w-[351px] py-3 px-6 bg-[#003366] text-white rounded-full font-medium group-hover:bg-[#003366]/90 transition-colors">
                                Find Care →
                            </div>
                        </button>

                        {/* Card 2 - Looking for job */}
                        <button
                            onClick={handleFindJob}
                            className="group relative !bg-white p-6 rounded-xl transition-all duration-200 hover:shadow-xl"
                        >
                            <div className="mb-6 w-[104px] h-[104px]">
                                <Image
                                    src={`/icon2.png`}   
                                    alt="Caregiving jobs"
                                    width={1000}
                                    height={1000}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            <h3 className="text-2xl text-left font-semibold mb-2 text-[#0A0A23]">
                                I&apos;m looking for a caregiving job
                            </h3>

                            <p className="text-sm text-left text-[#3B3B4F] mb-4">
                                Create a profile and search for {categoryName.toLowerCase()} jobs.
                            </p>

                            <div className=" mt-10 w-[351px] py-3 px-6 bg-[#003366] text-white rounded-full font-medium group-hover:bg-[#003366]/90 transition-colors">
                                Find Job →
                            </div>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}