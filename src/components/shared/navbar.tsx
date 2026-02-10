"use client";
import Image from "next/image";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
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
import NavCategory from "./nav-component/nav-category";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

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

  const navItems = [
    {
      title: "Find Care",
      content: <NavCategory />,
    },
    {
      title: "Find Jobs",
      content: <NavCategory />,
    },
    {
      title: "Resources",
      content: <NavCategory />,
    },
  ];

  const navbarClasses = `w-full fixed z-30 top-0 transition-all duration-300 ${
    scrolled ? "bg-white" : "bg-transparent"
  }`;

  return (
    <nav className={navbarClasses}>
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href={`/`}>
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
            <button className="text-sm font-medium hover:text-primary">
              Log in
            </button>
            <Button className="rounded-3xl">Join Now</Button>
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
                  <Button variant="outline" className="w-full justify-center">
                    Log in
                  </Button>
                  <Button className="w-full justify-center rounded-3xl">
                    Join Now
                  </Button>
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
