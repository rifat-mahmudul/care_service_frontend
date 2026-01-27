import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const services1 = [
  {
    img: "/services/Babysitting.png",
    level: "Babysitting",
    link: "/services/babysitting",
  },
  {
    img: "/services/pet-sitting.png",
    level: "Pet sitting",
    link: "/services/pet-sitting",
  },
  {
    img: "/services/Drivers.png",
    level: "Drivers",
    link: "/services/drivers",
  },

  {
    img: "/services/tour-guide.png",
    level: "Tour Guide",
    link: "/services/tour-guide",
  },
  {
    img: "/services/Tutoring.png",
    level: "Tutoring",
    link: "/services/tutoring",
  },
  {
    img: "/services/Caregiving.png",
    level: "Caregiving",
    link: "/services/caregiving",
  },
];

const Categories = () => {
  return (
    <div className="container space-y-10">
      <h1 className="text-center text-3xl font-bold">
        One membership connects you to your Global Concierge
      </h1>

      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:max-w-[1200px] mx-auto">
          {services1.map((item, index) => (
            <Link key={index} href={item.link}>
              <div className="shadow-[0px_4px_24px_0px_#0000003D] p-4 rounded-lg hover:scale-105 transition-all duration-200">
                <Image
                  src={item.img}
                  alt="img.png"
                  width={1000}
                  height={1000}
                  className="object-cover h-[150px] w-fit  mx-auto"
                />

                <h1 className="flex items-center justify-between gap-2 mt-8">
                  <span>{item?.level}</span>
                  <span>
                    <MoveRight />
                  </span>
                </h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
