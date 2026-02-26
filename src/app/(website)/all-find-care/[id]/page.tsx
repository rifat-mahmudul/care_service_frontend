import React from "react";
import { ProfileHero } from "./_components/profile-hero";
import About from "./_components/about";
import BookingComponent from "./_components/booking";
import ReviewSection from "./_components/review-section";
import { ServiceDetails } from "./_components/service-details";

const page = () => {
  return (
    <div className="mt-20 space-y-16">
      <ProfileHero />
      <About />
      <BookingComponent />
      <ReviewSection />
      <ServiceDetails />
    </div>
  );
};

export default page;
