"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  User,
  CreditCard,
  Settings,
  Briefcase,
  Menu,
  LogOut,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const UserDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const role = session?.user?.role;

  const menuItems = [
    {
      label: "Edit Profile",
      icon: User,
      href: "/profile",
      show: true,
    },
    {
      label: "Set Up Stripe",
      icon: CreditCard,
      href: "/dashboard/stripe",
      show: role === "find job",
    },
    {
      label: "My Services",
      icon: Briefcase,
      href: "/profile/services",
      show: true,
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/profile/settings",
      show: true,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* --- Mobile Sidebar Overlay --- */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- Sidebar --- */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#003366] text-white transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 relative">
            <Link href="/" className="block">
              <Image
                src="/logo.png"
                alt="Logo"
                width={85}
                height={85}
                className="mx-auto object-contain"
                priority
              />
            </Link>
            {/* Mobile Close Button */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-4 right-4 lg:hidden text-white/70 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
            {menuItems.map(
              (item) =>
                item.show && (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group",
                      pathname === item.href
                        ? "bg-[#00D1C1] text-black font-semibold shadow-md"
                        : "hover:bg-white/10 text-gray-300 hover:text-white",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {pathname === item.href && <ChevronRight size={16} />}
                  </Link>
                ),
            )}
          </nav>

          {/* Logout Section */}
          <div className="p-4 border-t border-white/10">
            <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5">
              <LogOut size={20} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header (Mobile Toggle) */}
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200 lg:hidden sticky top-0 z-30 shadow-sm">
          <h2 className="text-[#003366] font-bold text-lg">JetSet Cares</h2>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-10">
          <div className="mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
