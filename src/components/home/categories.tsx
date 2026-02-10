// import { MoveRight } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const services1 = [
//   {
//     img: "/services/Babysitting.png",
//     level: "Babysitting",
//     link: "/services/babysitting",
//   },
//   {
//     img: "/services/pet-sitting.png",
//     level: "Pet sitting",
//     link: "/services/pet-sitting",
//   },
//   {
//     img: "/services/Drivers.png",
//     level: "Drivers",
//     link: "/services/drivers",
//   },

//   {
//     img: "/services/tour-guide.png",
//     level: "Tour Guide",
//     link: "/services/tour-guide",
//   },
//   {
//     img: "/services/Tutoring.png",
//     level: "Tutoring",
//     link: "/services/tutoring",
//   },
//   {
//     img: "/services/Caregiving.png",
//     level: "Caregiving",
//     link: "/services/caregiving",
//   },
// ];

// const services2 = [
//   {
//     img: "/services/home-garden.png",
//     level: "Home & Garden",
//     link: "/services/home-garden",
//   },
//   {
//     img: "/services/Construction.png",
//     level: "Construction",
//     link: "/services/construction",
//   },
//   {
//     img: "/services/Cleaning.png",
//     level: "Cleaning",
//     link: "/services/cleaning",
//   },

//   {
//     img: "/services/senior-care.png",
//     level: "Senior Care",
//     link: "/services/senior-care",
//   },
//   {
//     img: "/services/Medical.png",
//     level: "Medical",
//     link: "/services/medical",
//   },
// ];

// const Categories = () => {
//   return (
//     <div className="container space-y-10">
//       <h1 className="text-center text-3xl font-bold">
//         One membership connects you to your Global Concierge
//       </h1>

//       <div className="space-y-8">
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:max-w-[1300px] mx-auto">
//           {services1.map((item, index) => (
//             <Link key={index} href={item.link}>
//               <div className="shadow-[0px_4px_24px_0px_#0000003D] p-4 rounded-lg hover:scale-105 transition-all duration-200">
//                 <Image
//                   src={item.img}
//                   alt="img.png"
//                   width={1000}
//                   height={1000}
//                   className="object-cover h-[150px] w-fit  mx-auto"
//                 />

//                 <h1 className="flex items-center justify-between gap-2 mt-8">
//                   <span>{item?.level}</span>
//                   <span>
//                     <MoveRight />
//                   </span>
//                 </h1>
//               </div>
//             </Link>
//           ))}
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:max-w-[1100px] mx-auto">
//           {services2.map((item, index) => (
//             <Link key={index} href={item.link}>
//               <div className="shadow-[0px_4px_24px_0px_#0000003D] p-4 rounded-lg hover:scale-105 transition-all duration-200">
//                 <Image
//                   src={item.img}
//                   alt="img.png"
//                   width={1000}
//                   height={1000}
//                   className="object-cover h-[150px] w-fit  mx-auto"
//                 />

//                 <h1 className="flex items-center justify-between mt-8">
//                   <span>{item?.level}</span>
//                   <span>
//                     <MoveRight />
//                   </span>
//                 </h1>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Categories;

// src/components/home/categories.tsx
"use client";

import { MoveRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import RoleSelectionModal from "./RoleSelectionModal";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

// ─── Types ────────────────────────────────────────────────────────────────
interface Category {
  image: string | StaticImport;
  _id: string;
  name: string;
  findCareUser: string[];
  findJobUser: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  image: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: Category[];
}

// ─── Fetch Function ───────────────────────────────────────────────────────
const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", 
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }

  const json: ApiResponse = await response.json();

  if (!json.success || !Array.isArray(json.data)) {
    throw new Error(json.message || "Invalid API response format");
  }

  return json.data;
};

// ─── Skeleton ─────────────────────────────────────────────────────────────
const CategorySkeleton = () => (
  <div className="shadow-[0_4px_24px_#0000003D] p-4 rounded-xl bg-white animate-pulse">
    <div className="h-[150px] w-full bg-gray-200 rounded-lg" />
    <div className="mt-6 flex items-center justify-between">
      <div className="h-6 w-32 bg-gray-300 rounded" />
      <div className="h-6 w-6 bg-gray-300 rounded-full" />
    </div>
  </div>
);
export default function Categories() {
  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <div className="container mx-auto space-y-10 py-10 px-4 md:px-6 lg:px-8">
      <h1 className="text-center text-3xl md:text-4xl font-bold tracking-tight">
        One membership connects you to your Global Concierge
      </h1>

      {error && (
        <div className="text-center text-red-600 py-8">
          Failed to load categories: {error.message}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 lg:gap-8 max-w-[1400px] mx-auto">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <CategorySkeleton key={i} />)
        ) : categories.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No categories available at the moment.
          </div>
        ) : (
          categories.map((cat) => (
            <button
              key={cat._id}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className="group text-left shadow-[0_4px_24px_rgba(0,0,0,0.15)] p-4 rounded-xl hover:scale-[1.04] transition-all duration-200 bg-white border border-gray-100 hover:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <div className="relative w-full h-[202px] overflow-hidden rounded-lg">
                <Image
                  src={cat?.image}
                  alt={`${cat.name} category`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full"
                  priority={false}
                />
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                  {cat.name}
                </span>
                <MoveRight className="w-6 h-6 text-gray-500 group-hover:text-indigo-600 transition-colors" />
              </div>
            </button>
          ))
        )}
      </div>

      {/* Role Selection Modal */}
      {selectedCategory && (
        <RoleSelectionModal
          isOpen={!!selectedCategory}
          onClose={() => setSelectedCategory(null)}
          categoryName={selectedCategory.name}
        />
      )}
    </div>
  );
}