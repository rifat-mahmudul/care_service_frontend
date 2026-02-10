"use client";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface Category {
  _id: string;
  name: string;
  image?: string;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: Category[];
}

const FindCareCategory = () => {
  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["nav-categories"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`);
      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      return await res.json();
    },
  });

  // Loading state with Shadcn Skeleton
  if (isLoading) {
    return (
      <div className="bg-white shadow-sm rounded-xl p-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-36" />
          </div>
          <Skeleton className="h-5 w-20" />
        </div>

        {/* Grid Skeleton with 6 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-10 rounded-full w-full"
            />
          ))}
        </div>

        {/* Stats Section Skeleton */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-center gap-6 text-center">
            <div className="space-y-2">
              <Skeleton className="h-8 w-16 mx-auto" />
              <Skeleton className="h-3 w-20 mx-auto" />
            </div>
            <Skeleton className="w-px h-8" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-16 mx-auto" />
              <Skeleton className="h-3 w-20 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white shadow-sm rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center text-red-600">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium">Failed to load categories</span>
          </div>
          <p className="text-red-500 text-sm mt-1">
            Please try again later or refresh the page.
          </p>
        </div>
      </div>
    );
  }

  const categories = data?.data || [];

  return (
    <div className="bg-white shadow-sm rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Browse Categories</h2>
          <p className="text-sm text-gray-500 mt-1">
            Choose from {categories.length} service categories
          </p>
        </div>
        {data?.meta && (
          <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
            {categories.length} of {data.meta.total}
          </div>
        )}
      </div>

      {/* Categories Grid - 6 columns responsive */}
      {categories.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {categories.map((category, index) => (
            <motion.button
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group relative overflow-hidden w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative px-4 py-3 rounded-full bg-primary transition-all duration-300 shadow-md hover:shadow-lg w-full">
                {/* Button text */}
                <span className="text-white font-medium text-sm md:text-base line-clamp-1">
                  {category.name}
                </span>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <div className="text-gray-400 font-medium mb-1">
            No categories found
          </div>
          <p className="text-sm text-gray-500">
            Categories will appear here once they are added to the system.
          </p>
        </div>
      )}

    
    </div>
  );
};

export default FindCareCategory;