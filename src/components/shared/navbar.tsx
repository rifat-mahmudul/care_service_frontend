/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import FindCareCategory from "./nav-component/find-care-category";
import FindJobCategory from "./nav-component/find-job-category";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (!isHomePage) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const data = await response.json();
          if (data.success) {
            setUserData(data.data);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [token]);

  const navItems = [
    {
      title: "Find Care",
      content: <FindCareCategory />,
    },
    {
      title: "Find Jobs",
      content: <FindJobCategory />,
    },
  ];

  // Dynamic Classes
  const navbarClasses = `w-full fixed z-50 top-0 transition-all duration-300 ${
    scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
  }`;

  // কন্ডিশনাল টেক্সট কালার (হোমপেজে টপে থাকলে সাদা, স্ক্রল করলে ডার্ক)
  const textColorClasses = isHomePage
    ? scrolled
      ? "text-slate-900"
      : "text-white"
    : "text-slate-900";

  const getUserInitials = () => {
    if (userData?.firstName && userData?.lastName) {
      return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
    }
    return session?.user?.email?.[0].toUpperCase() || "U";
  };

  return (
    <nav className={navbarClasses}>
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="h-[50px] w-[50px] object-cover sm:h-[55px] sm:w-[55px]"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div
          className={`hidden items-center gap-8 lg:flex ${textColorClasses}`}
        >
          {navItems.map((item) => (
            <DropdownMenu
              key={item.title}
              modal={false}
              onOpenChange={(open) => {
                setOpenDropdown(open ? item.title : null);
              }}
            >
              <DropdownMenuTrigger className="flex items-center gap-1 font-medium transition-colors hover:opacity-80 focus:outline-none">
                {item.title}
                {openDropdown === item.title ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="mt-2">
                {item.content}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}

          <div className="flex items-center space-x-5">
            {session ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 focus:outline-none">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarImage
                        src={userData?.profileImage || ""}
                        alt={userData?.firstName || "User"}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className={`h-4 w-4 ${textColorClasses}`} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">
                      {userData?.firstName
                        ? `${userData.firstName} ${userData.lastName || ""}`
                        : session.user?.email}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {userData?.role || "User"}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className={`text-sm font-medium hover:bg-white/10 ${textColorClasses}`}
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="rounded-3xl px-6">Join Now</Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`h-10 w-10 p-0 ${textColorClasses} hover:bg-transparent`}
              >
                {isOpen ? (
                  <X className="h-7 w-7" />
                ) : (
                  <Menu className="h-7 w-7" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <div className="flex items-center">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={50}
                      height={50}
                      className="mr-3 h-[50px] w-[50px] object-cover"
                    />
                    <span>Menu</span>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-8 flex flex-col space-y-6">
                {/* Mobile Menu Content (Same as before) */}
                {session && (
                  <div className="flex items-center gap-3 pb-4 border-b">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={userData?.profileImage} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {userData?.firstName || "User"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {userData?.role}
                      </p>
                    </div>
                  </div>
                )}
                <Accordion type="single" collapsible className="w-full">
                  {navItems.map((item) => (
                    <AccordionItem key={item.title} value={item.title}>
                      <AccordionTrigger className="text-lg font-medium">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-4">{item.content}</div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <div className="flex flex-col space-y-4 pt-4 border-t">
                  {!session ? (
                    <>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Log in
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={() => setIsOpen(false)}>
                        <Button className="w-full rounded-3xl">Join Now</Button>
                      </Link>
                    </>
                  ) : (
                    <Button variant="destructive" onClick={() => signOut()}>
                      Log out
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
