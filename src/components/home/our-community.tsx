import { MoveRight, SquareCheckBig } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const OurCommunity = () => {
  return (
    <div className="container flex flex-col lg:flex-row gap-10 justify-between">
      <div className="relative">
        <Image
          src={`/our-community.png`}
          alt=""
          width={1000}
          height={1000}
          className="h-[400px] w-fit object-cover"
        />

        <button className="bg-[#55b9ff] py-4 px-4 rounded-lg font-medium absolute -top-7 left-6 lg:left-10">
          Setting the standard
        </button>
      </div>

      <div className="lg:w-1/2">
        <h1 className="font-bold text-3xl">
          Safety is the foundation of our community
        </h1>

        <div className="my-10 space-y-5">
          <p className="flex items-center gap-2 text-gray-600">
            <span>
              <SquareCheckBig className="h-5 w-5" />
            </span>

            <span>
              Every caregiver on this platform begins with a mandatory
              background check.
            </span>
          </p>

          <p className="flex items-center gap-2 text-gray-600">
            <span>
              <SquareCheckBig className="h-5 w-5" />
            </span>

            <span>
              Screened job posts, message oversight, and round-the-clock safety
              support.
            </span>
          </p>

          <p className="flex items-center gap-2 text-gray-600">
            <span>
              <SquareCheckBig className="h-5 w-5" />
            </span>

            <span>
              Helpful information and resources for making safe hiring choices.
            </span>
          </p>

          <p className="flex items-start gap-2 text-gray-600">
            <span>
              <SquareCheckBig className="h-5 w-5" />
            </span>

            <span>
              From required background checks to monitored activity and trusted
              safety resources, we’re committed to helping you hire with
              confidence.
            </span>
          </p>
        </div>

        <div>
          <Button className="rounded-3xl h-[40px]">
            <span>Get Started</span>
            <span>
              <MoveRight />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OurCommunity;
