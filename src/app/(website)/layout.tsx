import Navbar from "@/components/shared/navbar";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>

      <main>{children}</main>
    </div>
  );
};

export default layout;
