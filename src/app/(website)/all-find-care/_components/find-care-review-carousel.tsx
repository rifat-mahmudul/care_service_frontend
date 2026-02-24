import * as React from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const reviews = [
  {
    name: "Maya Russo",
    date: "February 13, 2025",
    rating: 5,
    image: "/avatar1.png", // Replace with your image paths
    text: "They didn't just design a beautiful space—they really understood what I wanted and brought it to life. I love coming home now. I wanted something modern but cozy.",
  },
  // Add more review objects here...
];

export default function FindCareReviewCarousel() {
  return (
    <section className="bg-[#BDE3F9] py-16 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full relative"
        >
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
              Recent babysitter reviews from local parents in Chongqing
            </h2>
            <div className="flex gap-2 relative">
              <CarouselPrevious className="static translate-y-0 h-10 w-10 border-slate-400 bg-transparent text-slate-700 hover:bg-white/20" />
              <CarouselNext className="static translate-y-0 h-10 w-10 border-slate-400 bg-transparent text-slate-700 hover:bg-white/20" />
            </div>
          </div>

          {/* Carousel Content */}
          <CarouselContent className="-ml-4">
            {reviews.map((review, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="border-none shadow-lg rounded-xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Left Side: Avatar and Name */}
                      <div className="flex flex-col items-center gap-2 shrink-0">
                        <Avatar className="h-20 w-20 border-2 border-white">
                          <AvatarImage
                            src={review.image}
                            alt={review.name}
                            className="object-cover"
                          />
                          <AvatarFallback>MR</AvatarFallback>
                        </Avatar>
                        <span className="font-bold text-slate-900 text-sm">
                          {review.name}
                        </span>
                      </div>

                      {/* Right Side: Rating and Text */}
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <span className="text-xs font-semibold text-slate-600 ml-1">
                            (5)
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                          {review.date}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          &quot;{review.text}{" "}
                          <button className="text-blue-600 font-semibold hover:underline decoration-2">
                            Read More
                          </button>
                          &quot;{review.text}{" "}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
