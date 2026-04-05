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
} from "lucide-react";
import { cn } from "@/lib/utils"; // Shadcn utility

const UserDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const role = session?.user?.role; // 'find job' or others

  // Sidebar Menu Items Logic
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
      // Role logic: Only show if user is 'find job'
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
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#003366] text-white transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo / Brand */}
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-[#00D1C1]">JetSet Cares</h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
              User Dashboard
            </p>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2 mt-4">
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
                        ? "bg-[#00D1C1] text-black font-semibold"
                        : "hover:bg-white/10 text-gray-300",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </div>
                    {pathname === item.href && <ChevronRight size={16} />}
                  </Link>
                ),
            )}
          </nav>

          {/* Logout Section */}
          <div className="p-4 border-t border-white/10">
            <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-white transition-colors">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header (Mobile Toggle) */}
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200 lg:hidden">
          <h2 className="text-black font-bold">JetSet Cares</h2>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-black"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
