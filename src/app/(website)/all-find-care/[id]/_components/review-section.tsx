import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";

const ReviewSection = () => {
  // Helper to render stars
  const StarRating = ({
    rating,
    size = 20,
  }: {
    rating: number;
    size?: number;
  }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < rating ? "#FFC107" : "none"}
          className={i < rating ? "text-[#FFC107]" : "text-gray-300"}
        />
      ))}
    </div>
  );

  return (
    <div className="container  text-[#1a2b3b]">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Most recent review</h2>
          <div className="flex items-center gap-4">
            <span className="text-5xl font-semibold">4.9</span>
            <StarRating rating={5} size={28} />
          </div>
          <p className="text-gray-500 mt-2 text-sm">Based on 2,529 reviews</p>
        </div>

        <button className="bg-[#003366] hover:bg-[#002244] text-white px-8 py-3 rounded-full font-medium transition-all shadow-sm">
          Write a Review
        </button>
      </div>

      {/* Review Card */}
      <div className="border border-gray-200 rounded-[2rem] p-8 mb-6">
        <div className="flex items-start gap-4 mb-4">
          <Image
            src="/logo.png"
            alt="User Avatar"
            width={1000}
            height={1000}
            className="w-12 h-12 rounded-full border border-gray-100 object-cover"
          />
          <div>
            <h4 className="text-[#005599] font-medium hover:underline cursor-pointer">
              Mr.Jakon Iliosion
            </h4>
            <p className="text-gray-400 text-xs mt-1">00/00/00</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <StarRating rating={5} size={22} />
          <span className="font-semibold text-lg text-[#1a2b3b]">
            Extremely satisfied
          </span>
        </div>

        <p className="text-gray-600 leading-relaxed text-[1.05rem] max-w-5xl">
          This bundle is amazing! It has everything I could need and more and I
          cant wait to use it. Everything is editable which I LOVE and I know it
          will make my classroom feel so homey for my students. If this
          particular design isnt your style, you HAVE to get another one from
          Shayna! She was incredible to work with and I will only buy her decor
          moving forward.
        </p>
      </div>

      {/* Footer Link */}
      <a
        href="#"
        className="text-[#00AAFF] font-medium hover:underline flex items-center gap-1"
      >
        See All Reviews
      </a>
    </div>
  );
};

export default ReviewSection;
