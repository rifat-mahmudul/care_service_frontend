"use client";
import Banner from "@/components/shared/find-job-care/banner";
import ProfileCard from "@/components/shared/find-job-care/profile-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, ListFilter, MapPin, Smile, Star } from "lucide-react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import FindCareReviewCarousel from "../../all-find-care/_components/find-care-review-carousel";
import { useSearchParams } from "next/navigation";
import { ProfileCardSkeleton } from "@/components/shared/find-job-care/profile-card-skeleton";
import { BannerSkeleton } from "@/components/shared/find-job-care/banner-skeleton";

// Types for the API response
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  language: string[];
  agegroup: string[];
  education: string[];
  canHelpWith: string[];
  professionalSkill: string[];
  perferences: string[];
  location: string;
  profileImage: string;
  bio: string;
  phone: string;
}

interface Day {
  day: string;
  startTime: string;
  endTime: string;
  _id: string;
}

interface Category {
  _id: string;
  name: string;
  description: string;
  banner: string[];
  logo: string;
}

interface ServiceBaseUser {
  _id: string;
  zip: string;
  location: string;
  gender: string;
  hourRate: number;
  days: Day[];
  status: string;
  createdAt: string;
  user: User;
  category?: Category;
  totalRatings?: number;
  averageRating?: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: ServiceBaseUser[];
}

const stats = [
  {
    icon: <Smile className="w-6 h-6 text-slate-900" />,
    text: (
      <span>
        <span className="font-semibold">161,089</span> babysitters are listed on
        This platform
      </span>
    ),
  },
  {
    icon: <DollarSign className="w-6 h-6 text-slate-900" />,
    text: (
      <span>
        The average post rate is{" "}
        <span className="font-semibold">$19.57/hr</span> as of November 2025
      </span>
    ),
  },
  {
    icon: <Star className="w-6 h-6 text-slate-900 fill-slate-900" />,
    text: (
      <span>
        The average star rating for rated babysitters is{" "}
        <span className="font-semibold">4.7</span>
      </span>
    ),
  },
];

const AllFindJobs = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  console.log("id: ", id);

  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ["all-find-care"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/service/service-base-user/699489273ab231272513e4dc?role=find job`,
      );
      const data = await res.json();
      return data;
    },
  });

  const caregivers = data?.data || [];

  const categoryData = caregivers[0]?.category;

  const generateTags = (caregiver: ServiceBaseUser) => {
    const tags = [];

    if (caregiver.days && caregiver.days.length > 0) {
      tags.push(`${caregiver.days.length} days availability`);
    }

    if (caregiver.user?.perferences && caregiver.user.perferences.length > 0) {
      tags.push(...caregiver.user.perferences.slice(0, 2));
    }

    if (
      caregiver.user?.professionalSkill &&
      caregiver.user.professionalSkill.length > 0
    ) {
      tags.push(...caregiver.user.professionalSkill.slice(0, 1));
    }

    return tags.slice(0, 3);
  };

  return (
    <div className="space-y-16">
      {/* Show Banner Skeleton while loading, otherwise show dynamic Banner */}
      {isLoading ? (
        <BannerSkeleton />
      ) : (
        <Banner
          title={categoryData?.name}
          description={categoryData?.description}
          banner={categoryData?.banner}
        />
      )}

      <div className="container flex lg:flex-row flex-col-reverse gap-10">
        {/* all card here */}
        <div className="space-y-8 flex-1">
          <div>
            <h1 className="text-3xl font-semibold">
              {categoryData?.name} jobs available in your area:
            </h1>

            <div className="flex items-center gap-3 mt-5">
              {/* City Select Component */}
              <Select>
                <SelectTrigger className="w-[180px] rounded-full border-blue-500 bg-blue-50/50 h-11 px-4 hover:bg-blue-100/50 transition-colors focus:ring-1 focus:ring-blue-400">
                  <div className="flex items-center gap-2 w-full">
                    <MapPin className="w-4 h-4 text-red-500 fill-red-500/10 shrink-0" />
                    <div className="flex-1 text-left">
                      <SelectValue placeholder="City" />
                    </div>
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="tokyo">Tokyo</SelectItem>
                </SelectContent>
              </Select>

              {/* Filter All Button */}
              <Button
                variant="outline"
                className="rounded-full border-blue-500 bg-blue-50/50 h-11 px-6 hover:bg-blue-100/50 transition-colors flex items-center gap-2 border"
              >
                <ListFilter className="w-4 h-4 text-slate-700" />
                <span className="text-slate-900 font-medium">Filter All</span>
              </Button>
            </div>
          </div>

          {isLoading ? (
            <>
              <ProfileCardSkeleton />
              <ProfileCardSkeleton />
              <ProfileCardSkeleton />
              <ProfileCardSkeleton />
            </>
          ) : (
            <div className="space-y-8">
              {caregivers.map((caregiver) => (
                <ProfileCard
                  key={caregiver._id}
                  image={
                    caregiver.user?.profileImage || "/placeholder-image.jpg"
                  }
                  title={
                    `${caregiver.user?.firstName || ""} ${caregiver.user?.lastName || ""}`.trim() ||
                    "Caregiver"
                  }
                  tags={generateTags(caregiver)}
                  bio={caregiver.user?.bio || "No bio available"}
                  hourRate={caregiver.hourRate}
                  location={caregiver.location}
                  userId={caregiver.user?._id}
                />
              ))}
            </div>
          )}
        </div>

        {/* all states here */}
        <div className="lg:w-[25%]">
          <div className="flex flex-col gap-6 sticky top-24 z-30">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-4 text-slate-700 leading-tight"
              >
                {/* Circular Icon Container */}
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 shrink-0">
                  {stat.icon}
                </div>

                {/* Text Content */}
                <p>{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FindCareReviewCarousel />
    </div>
  );
};

export default AllFindJobs;
