"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

const SocketContext = createContext<{
  socket: Socket | null;
  onlineUsers: string[];
}>({
  socket: null,
  onlineUsers: [],
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.accessToken) {
      const newSocket = io(process.env.NEXT_PUBLIC_API_URL, {
        query: { token: session.user.accessToken },
        transports: ["websocket"],
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => setOnlineUsers(users));

      return () => {
        newSocket.close();
      };
    }
  }, [session]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
