"use client";
import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <div className="container flex items-center justify-between py-4">
      {/* logo */}
      <div>
        <Image
          src={"/logo.png"}
          alt="img.png"
          width={1000}
          height={1000}
          className="h-[60px] w-[60px] object-cover"
        />
      </div>

      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Find Care</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Find Care compo</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Find Jobs</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Find Jobs compo</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Resources compo</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
          
          <div className="space-x-5 ml-2">
            <button>Log in</button>

            <Button className="rounded-3xl h-[45px] w-[120px]">Join Now</Button>
          </div>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Navbar;
