"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Heart,
  Briefcase,
  Users,
  Trash2,
  AlertCircle,
  Loader2,
  Plus,
  CheckCircle2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Category {
  _id: string;
  name: string;
  image?: string;
  description?: string;
  findCareUser?: string[];
  findJobUser?: string[];
  createdAt: string;
  updatedAt: string;
}

interface UserProfile {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  category: string[];
  country: string;
  countery?: string;
  city: string;
  gender: string;
  hourRate?: number;
  nidNumber?: string;
  subscription?: string;
}

const MyServices = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [addingCategoryId, setAddingCategoryId] = useState<string | null>(null);

  // Fetch user profile
  const {
    data: userProfile,
    isLoading: profileLoading,
    refetch: refetchProfile,
  } = useQuery<UserProfile>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!token) throw new Error("Not authenticated");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) throw new Error("Failed to fetch profile");
      const json = await response.json();
      return {
        ...json.data,
        country: json.data.country || json.data.countery || "",
      };
    },
    enabled: !!token,
  });

  // Fetch all categories
  const { data: allCategories, isLoading: categoriesLoading } = useQuery<
    Category[]
  >({
    queryKey: ["allCategories"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category`,
      );
      if (!response.ok) throw new Error("Failed to fetch categories");
      const json = await response.json();
      return json.data;
    },
  });

  // Get user's services/categories
  const userServices = React.useMemo(() => {
    if (!allCategories || !userProfile?.category) return [];
    return allCategories.filter((cat) =>
      userProfile.category.includes(cat._id),
    );
  }, [allCategories, userProfile]);

  const availableCategories = React.useMemo(() => {
    if (!allCategories || !userProfile?.category) return [];
    return allCategories.filter(
      (cat) => !userProfile.category.includes(cat._id),
    );
  }, [allCategories, userProfile]);

  // Delete service mutation
  const deleteService = async (categoryId: string) => {
    setDeletingId(categoryId);
    try {
      const updatedCategories = userProfile?.category.filter(
        (id) => id !== categoryId,
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            category: updatedCategories,
          }),
        },
      );

      if (!response.ok) throw new Error("Failed to delete service");

      await refetchProfile();
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting service:", error);
    } finally {
      setDeletingId(null);
    }
  };

  // Get service type (care or job)
  const getServiceType = (category: Category) => {
    const hasCare = category.findCareUser?.includes(userProfile?._id || "");
    const hasJob = category.findJobUser?.includes(userProfile?._id || "");

    if (hasCare && hasJob) return "Both";
    if (hasCare) return "Find Care";
    if (hasJob) return "Find Job";
    return "Unknown";
  };

  const handleAddService = async (categoryId: string) => {
    if (!token || !userProfile) return;

    if (userProfile.role !== "find job") {
      toast.error("Only Find Trusted Care accounts can add services.");
      return;
    }

    setAddingCategoryId(categoryId);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/service/register-service`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            role: userProfile.role,
            categoryId,
            gender: userProfile.gender,
            ...(userProfile.country ? { country: userProfile.country } : {}),
            ...(userProfile.city ? { city: userProfile.city } : {}),
            ...(userProfile.hourRate && userProfile.hourRate > 0
              ? { hourRate: userProfile.hourRate }
              : {}),
            subscriptionId: userProfile.subscription || "",
          }),
        },
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to add service");
      }

      toast.success("Service added successfully.");
      setIsAddDialogOpen(false);
      await refetchProfile();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add service",
      );
    } finally {
      setAddingCategoryId(null);
    }
  };

  // Get service icon
  const getServiceIcon = (category: Category) => {
    const type = getServiceType(category);
    if (type === "Find Care") return <Heart className="w-5 h-5" />;
    if (type === "Find Job") return <Briefcase className="w-5 h-5" />;
    return <Users className="w-5 h-5" />;
  };

  // Get service color
  const getServiceColor = (category: Category) => {
    const type = getServiceType(category);
    if (type === "Find Care") return "text-pink-600 bg-pink-50";
    if (type === "Find Job") return "text-blue-600 bg-blue-50";
    return "text-purple-600 bg-purple-50";
  };

  if (profileLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-gray-500">Loading your services...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Not Authenticated
            </h2>
            <p className="text-gray-500 mb-6">
              Please login to view your services
            </p>
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (userProfile.role !== "find job") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Briefcase className="w-16 h-16 text-primary/60 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            My Services is only for Find Trusted Care
          </h2>
          <p className="text-gray-500 mb-6">
            Parent accounts can browse and book services, but they cannot add
            services here.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-primary text-white"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div>
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  My Services
                </span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {userServices.length} Active
                </span>
              </h1>
              <p className="text-gray-500 mt-2">
                Manage the service categories you offer
              </p>
            </div>
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 self-start"
            >
              <Plus className="w-4 h-4" />
              New Service
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Services</p>
                <p className="text-3xl font-bold text-gray-900">
                  {userServices.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Available to Add</p>
                <p className="text-3xl font-bold text-emerald-600">
                  {availableCategories.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Provider Services</p>
                <p className="text-3xl font-bold text-blue-600">
                  {userServices.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {userServices.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
              <Heart className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Services Added Yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start by adding the service categories you want to offer
            </p>
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add Your First Service
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {userServices.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Service Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        {getServiceIcon(service)}
                      </div>
                    )}
                    {/* Service Type Badge */}
                    <div className="absolute top-3 right-3">
                      <div
                        className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 ${getServiceColor(
                          service,
                        )}`}
                      >
                        {getServiceIcon(service)}
                        <span>{getServiceType(service)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Service Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {service.name}
                    </h3>
                    {service.description && (
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                        {service.description}
                      </p>
                    )}

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{service.findCareUser?.length || 0} Parents</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        <span>
                          {service.findJobUser?.length || 0} Providers
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="flex-1 px-3 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg">
                        Added to your profile
                      </div>
                      <button
                        onClick={() => setShowDeleteConfirm(service._id)}
                        className="px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>

                    {/* Delete Confirmation */}
                    {showDeleteConfirm === service._id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-3 bg-red-50 rounded-lg"
                      >
                        <p className="text-sm text-red-700 mb-3">
                          Are you sure you want to remove this service?
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => deleteService(service._id)}
                            disabled={deletingId === service._id}
                            className="flex-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
                          >
                            {deletingId === service._id ? (
                              <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                            ) : (
                              "Yes, Remove"
                            )}
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(null)}
                            className="flex-1 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>
                Choose a category to add it directly to your Find Trusted Care
                profile.
              </DialogDescription>
            </DialogHeader>

            {availableCategories.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 p-10 text-center text-gray-500">
                You already added all available service categories.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {availableCategories.map((category) => (
                  <button
                    key={category._id}
                    type="button"
                    onClick={() => handleAddService(category._id)}
                    disabled={addingCategoryId === category._id}
                    className="overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg disabled:opacity-60"
                  >
                    <div className="relative h-40 w-full bg-gray-100">
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-primary">
                          <Briefcase className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {category.name}
                          </h3>
                          {category.description && (
                            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                              {category.description}
                            </p>
                          )}
                        </div>
                        {addingCategoryId === category._id ? (
                          <Loader2 className="w-5 h-5 animate-spin text-primary" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-primary/70" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                <X className="w-4 h-4 mr-2" />
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MyServices;
