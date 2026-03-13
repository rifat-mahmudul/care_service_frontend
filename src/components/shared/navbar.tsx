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

  // Fetch user profile when authenticated
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

  const navbarClasses = `w-full fixed z-50 top-0 transition-all duration-300 ${
    scrolled ? "bg-white shadow-md" : "bg-transparent"
  }`;

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (userData?.firstName && userData?.lastName) {
      return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
    }
    return session?.user?.email?.[0].toUpperCase() || "U";
  };

  return (
    <nav className={navbarClasses}>
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={1000}
              height={1000}
              className="h-[50px] w-[50px] object-cover sm:h-[55px] sm:w-[55px]"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <DropdownMenu
              key={item.title}
              modal={false}
              onOpenChange={(open) => {
                setOpenDropdown(open ? item.title : null);
              }}
            >
              <DropdownMenuTrigger className="flex items-center gap-1 focus-visible:ring-0 focus-visible:ring-offset-0">
                {item.title}
                {openDropdown === item.title ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {item.content}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}

          <div className="flex items-center space-x-5">
            {session ? (
              // User is logged in - show avatar dropdown
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 focus-visible:ring-0 focus-visible:ring-offset-0">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarImage
                        src={userData?.profileImage || ""}
                        alt={userData?.firstName || "User"}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">
                      {userData?.firstName
                        ? `${userData.firstName} ${userData.lastName || ""}`
                        : session.user?.email}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {userData?.role || "User"}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="cursor-pointer flex items-center"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="cursor-pointer flex items-center"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // User is not logged in - show login/join buttons
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-sm font-medium hover:text-primary"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="rounded-3xl">Join Now</Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 p-0 focus-visible:ring-0"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
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
                {/* User info for mobile (if logged in) */}
                {session && (
                  <div className="flex items-center gap-3 pb-4 border-b">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={userData?.profileImage || ""}
                        alt={userData?.firstName || "User"}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {userData?.firstName
                          ? `${userData.firstName} ${userData.lastName || ""}`
                          : session.user?.email}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {userData?.role || "User"}
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
                  {session ? (
                    // Mobile menu when logged in
                    <>
                      <Link href="/profile" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Button>
                      </Link>
                      <Link href="/settings" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        className="w-full justify-start"
                        onClick={() => {
                          signOut({ callbackUrl: "/" });
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </>
                  ) : (
                    // Mobile menu when logged out
                    <>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full justify-center"
                        >
                          Log in
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={() => setIsOpen(false)}>
                        <Button className="w-full justify-center rounded-3xl">
                          Join Now
                        </Button>
                      </Link>
                    </>
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
