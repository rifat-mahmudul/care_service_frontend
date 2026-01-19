"use client";
import * as React from "react";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FindCareNav from "./nav-component/find-care-nav";
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

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    {
      title: "Find Care",
      content: <FindCareNav />,
    },
    {
      title: "Find Jobs",
      content: <FindCareNav />,
    },
    {
      title: "Resources",
      content: <FindCareNav />,
    },
  ];

  return (
    <nav className="w-full backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="h-[50px] w-[50px] object-cover sm:h-[60px] sm:w-[60px]"
            priority
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <DropdownMenu key={item.title}>
              <DropdownMenuTrigger className="flex items-center gap-1 focus-visible:ring-0 focus-visible:ring-offset-0">
                {item.title} <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
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
