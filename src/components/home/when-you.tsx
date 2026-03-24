"use client";
import React from "react";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";
import ReactStars from "react-stars";

const WhenYou = () => {
  return (
    <div className="bg-[#e6f5ff] py-16">
      <div className="container space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            JetSet Cares About You!
          </h1>

          <Button className="rounded-3xl h-[40px]">
            <span>Get Started</span>
            <span>
              <MoveRight />
            </span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div
            style={{
              backgroundImage: "url(/when-you.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "Cover",
            }}
            className="h-[400px] rounded-xl text-white p-5 flex flex-col justify-between"
          >
            <div>
              <h1 className="text-2xl font-bold mb-1">Albert</h1>
              <p className="text-white/90">Child Care Specialist</p>
            </div>

            <div>
              <ReactStars
                count={5}
                value={5}
                size={24}
                color2={"#ffd700"}
                edit={false}
              />
              <p className="text-white/90">Sitter with 8 years experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhenYou;
