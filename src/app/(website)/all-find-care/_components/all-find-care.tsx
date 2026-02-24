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
import FindCareReviewCarousel from "./find-care-review-carousel";

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

const AllFindCare = () => {
  return (
    <div className="space-y-16">
      <Banner />

      <div className="container flex lg:flex-row flex-col-reverse gap-10">
        {/* all card here */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-semibold">
              Babysitters available in your area:
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

          <div className="space-y-8">
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
          </div>
        </div>

        {/* all states here */}
        <div className="lg:w-[50%]">
          <div className="flex flex-col gap-6  sticky top-24 z-30">
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

export default AllFindCare;
