"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useState } from "react";
import { SocketProvider } from "./SocketContext";

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Prevent QueryClient from being recreated on each render
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <SocketProvider>{children}</SocketProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
