import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { MapPin, Search } from "lucide-react";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, rgba(0, 0, 0, 0.637), rgba(0, 0, 0, 0)), url(/banner.png)",
        backgroundSize: "Cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay",
      }}
      className="min-h-[calc(100vh-100px)] bg-gradient-to-tr from-[black] via-[black] to-[black] flex flex-col justify-center"
    >
      <div className="container">
        <div className="text-5xl font-medium space-y-3">
          <h1>
            <span className="text-primary">Connecting</span> you to{" "}
          </h1>
          <h1 className="text-wh">safe, caring and vetted</h1>
          <h1 className="text-primary">local professionals</h1>
        </div>

        <div className="mt-8 space-x-4">
          <Button className="rounded-3xl px-8">Hire a Professional</Button>
          <Button className="rounded-3xl px-8">Offer a Service</Button>
        </div>

        <div className="w-full mt-8 flex items-center">
          <input
            type="text"
            className="h-[50px] rounded-l-3xl pl-4 focus:outline-none"
            placeholder="Search by services name"
          />
          <Separator
            orientation="vertical"
            className="w-px bg-black"
          ></Separator>{" "}
          <div className="relative">
            <input
              type="text"
              className="h-[50px] w-[300px] rounded-r-3xl pl-8 pr-28 focus:outline-none"
              placeholder="City"
            />

            <div className="absolute top-[28%] left-1">
              <MapPin className="text-red-500" />
            </div>

            <div className="absolute top-[10%] right-[5px]">
              <Button className="rounded-3xl h-[40px]">
                <Search /> Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
