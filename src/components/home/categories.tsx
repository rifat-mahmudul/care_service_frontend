// src/components/home/categories.tsx
"use client";

import { MoveRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import RoleSelectionModal from "./RoleSelectionModal";

// ─── Types ────────────────────────────────────────────────────────────────
interface Category {
  image: string;
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
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

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

  // Fetch user profile if logged in
  const { data: userProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!token) return null;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) return null;
      const json = await response.json();
      return json.data;
    },
    enabled: !!token,
  });

  // Check if category is disabled (user already has this category)
  const isCategoryDisabled = (categoryId: string) => {
    if (!userProfile?.category) return false;
    return userProfile.category.includes(categoryId);
  };

  return (
    <div className="container mx-auto space-y-10 py-10 px-4 md:px-6 lg:px-8">
      <h1 className="text-center text-3xl md:text-4xl font-bold tracking-tight lg:max-w-3xl mx-auto opacity-85">
        One membership gives you access to trusted local support across borders
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
          categories.map((cat) => {
            const disabled = isCategoryDisabled(cat._id);
            
            return (
              <button
                key={cat._id}
                type="button"
                onClick={() => !disabled && setSelectedCategory(cat)}
                disabled={disabled}
                className={`group text-left shadow-[0_4px_24px_rgba(0,0,0,0.15)] p-4 rounded-xl transition-all duration-200 bg-white border border-gray-100 ${
                  disabled 
                    ? 'opacity-50 cursor-not-allowed hover:scale-100' 
                    : 'hover:scale-[1.04] hover:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                }`}
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
                  <span className={`text-lg font-semibold transition-colors ${
                    disabled ? 'text-gray-400' : 'text-gray-900 group-hover:text-indigo-700'
                  }`}>
                    {cat.name}
                    {disabled && " (Already Added)"}
                  </span>
                  <MoveRight className={`w-6 h-6 transition-colors ${
                    disabled ? 'text-gray-400' : 'text-gray-500 group-hover:text-indigo-600'
                  }`} />
                </div>
              </button>
            );
          })
        )}

        {/* Role Selection Modal */}
        {selectedCategory && (
          <RoleSelectionModal
            isOpen={!!selectedCategory}
            onClose={() => setSelectedCategory(null)}
            categoryName={selectedCategory.name}
            categoryId={selectedCategory._id}
            userProfile={userProfile}
          />
        )}
      </div>
    </div>
  );
}