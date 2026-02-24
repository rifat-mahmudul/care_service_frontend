import React from "react";
import { ProfileHero } from "./_components/profile-hero";
import About from "./_components/about";

const page = () => {
  return (
    <div className="mt-20 space-y-16">
      <ProfileHero />
      <About />
    </div>
  );
};

export default page;
