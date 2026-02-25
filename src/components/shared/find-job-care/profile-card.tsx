import Image from "next/image";
import React from "react";

const ProfileCard = () => {
  const tags = ["Part time", "$18 - $25/hr", "starts Jan 23", "Warwick, RI"];

  return (
    <div>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-6 relative">
        {/* Top Section: Image and Info */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <Image
              src="/when-you.jpg"
              alt="Caregiver Profile"
              width={1000}
              height={1000}
              className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover shadow-sm"
            />
          </div>

          {/* Title and Tags */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#001D3D] leading-tight">
              Caregiver For 4-month Old (January Start)
            </h2>

            {/* Tags/Pills Container */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#E9E9E9] text-[#333333] px-4 py-1.5 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Description and Button */}
        <div className="space-y-4">
          <p className="text-[#4A4A4A] text-base md:text-lg leading-relaxed max-w-[80%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum. We also...
            <button className="text-[#003566] font-bold underline ml-1 hover:text-[#001D3D] transition-colors">
              read more
            </button>
          </p>

          {/* See Profile Button - Absolute positioned on desktop for precise alignment */}
          <div className="md:absolute md:bottom-8 md:right-8 flex justify-end">
            <button className="bg-[#003566] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#001D3D] transition-all shadow-md active:scale-95">
              See Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
