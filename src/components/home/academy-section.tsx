"use client";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { BookOpen, Award, Globe, Play } from "lucide-react";

const AcademySection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[#E9E5FF] to-[#D9D0FF] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* বাম পাশে কন্টেন্ট */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#9B87F5]/20 rounded-full px-4 py-2">
              <BookOpen className="w-4 h-4 text-[#7C3AED]" />
              <span className="text-[#7C3AED] text-sm font-medium">
                Coming Soon
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-[#1E1B4B] leading-tight">
              JetSet Academy is getting ready for takeoff
            </h2>

            <p className="text-gray-700 text-lg">
              A new learning experience is on the way. JetSet Academy will help
              families build confidence before they travel through language
              lessons, cultural etiquette, and destination-based learning.
            </p>

            <p className="text-gray-600">
              Users will also be able to earn badges as they complete lessons
              and prepare more thoughtfully for life across borders.
            </p>

            <Button className="rounded-full h-12 px-10 bg-[#7C3AED] hover:bg-[#6D28D9] text-white transition-all shadow-lg hover:shadow-purple-200">
              Coming Soon
            </Button>
          </div>

          {/* ডান পাশে ভিডিও এবং ব্যাজেস */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px] md:max-w-[550px] aspect-square flex justify-center items-center">
              {/* ভিডিও কন্টেইনার */}
              <div className="relative w-[90%] h-[90%] rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl border-4 border-white bg-black/20 group">
                <video
                  ref={videoRef}
                  src="/cat_video.mp4"
                  className="w-full h-full object-contain"
                  loop
                  muted
                  playsInline
                />

                {/* Play Button Overlay */}
                {!isPlaying && (
                  <button
                    onClick={handlePlayVideo}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all group-hover:bg-black/40"
                  >
                    <div className="bg-white/90 hover:bg-white rounded-full p-4 md:p-6 transition-all transform hover:scale-110 shadow-xl">
                      <Play className="w-8 h-8 md:w-12 md:h-12 text-[#7C3AED] fill-[#7C3AED]" />
                    </div>
                  </button>
                )}

                {/* Pause button when video is playing - optional, appears on hover */}
                {isPlaying && (
                  <button
                    onClick={handlePlayVideo}
                    className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="bg-white rounded-full p-1">
                      <svg
                        className="w-4 h-4 text-[#7C3AED]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    </div>
                  </button>
                )}
              </div>

              {/* ব্যাজেস - দুই কর্নারে */}
              <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white rounded-2xl p-4 md:p-5 shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-gray-100 z-20 animate-bounce-slow">
                <Award className="w-10 h-10 md:w-14 md:h-14 text-[#F59E0B]" />
              </div>

              <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white rounded-2xl p-4 md:p-5 shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-gray-100 z-20">
                <Globe className="w-10 h-10 md:w-14 md:h-14 text-[#40E0D0]" />
              </div>

              {/* ডেকোরেটিভ ব্যাকগ্রাউন্ড এলিমেন্ট */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#7C3AED]/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0) rotate(12deg);
          }
          50% {
            transform: translateY(-10px) rotate(12deg);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
          transform: rotate(12deg);
        }
      `}</style>
    </section>
  );
};

export default AcademySection;
