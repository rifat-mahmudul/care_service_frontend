/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Search, Send } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { useSocket } from "@/components/provider/SocketContext";

const getAvatarUrl = (value?: string | string[]) =>
  Array.isArray(value) ? value[0] || "/default-avatar.jpg" : value || "/default-avatar.jpg";

interface MessagingPageProps {
  initialConversationId?: string;
}

export default function MessagingPage({ initialConversationId }: MessagingPageProps) {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const myId = (session?.user as any)?.id;
  const { socket } = useSocket();

  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // ১. সব কনভারসেশন ফেচ করা
  useEffect(() => {
    if (!token) return;
    const fetchConversations = async () => {
      try {
        const res = await fetch(`${baseUrl}/conversation/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setConversations(data.data);
          if (initialConversationId) {
            const initialChat = data.data.find(
              (chat: any) => String(chat._id) === String(initialConversationId),
            );
            if (initialChat) setSelectedChat(initialChat);
          }
        }
      } catch (err) {
        console.error("Conversation fetch error", err);
      }
    };
    fetchConversations();
  }, [token, baseUrl, initialConversationId]);

  // ২. সিলেক্টেড চ্যাটের মেসেজ ফেচ করা
  useEffect(() => {
    if (!selectedChat?._id || !token) return;
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/message/conversation/${selectedChat._id}/messages`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const data = await res.json();
        if (data.success) setMessages(data.data);
      } catch (err) {
        console.error("Message fetch error", err);
      }
    };
    fetchMessages();
  }, [selectedChat, token, baseUrl]);

  // ৩. সকেট লিসেনার
  useEffect(() => {
    if (!socket) return;
    socket.on("newMessage", (newMessage) => {
      if (newMessage.conversationId === selectedChat?._id) {
        setMessages((prev) => [...prev, newMessage]);
      }
      setConversations((prev) =>
        prev.map((c) =>
          c._id === newMessage.conversationId
            ? {
                ...c,
                lastMessage: newMessage.message,
                updatedAt: new Date().toISOString(),
              }
            : c,
        ),
      );
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, selectedChat]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ১. বেসিক চেক
    if (!inputValue.trim() || !selectedChat || !token) {
      console.warn("Input, Chat or Token missing");
      return;
    }

    // ২. আপনার এপিআই রেসপন্স অনুযায়ী রিসিভার আইডি বের করা
    // যেহেতু participants এ একজনই থাকছে, আমরা সরাসরি প্রথমজনকে নিচ্ছি
    const otherUser = selectedChat.participants.find(
      (p: any) => String(p._id || p) !== String(myId),
    );
    const receiverId = otherUser?._id;

    console.log("Found Receiver ID:", receiverId);

    if (!receiverId) {
      console.error("Receiver ID not found in participants array");
      return;
    }

    const payload = {
      conversationId: selectedChat._id,
      receiverId: receiverId, // এখন আইডিটি ঠিকঠাক যাবে
      message: inputValue,
    };

    setIsSending(true);
    try {
      const res = await fetch(`${baseUrl}/message/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      
      if (result.success) {
        // মেসেজ লিস্ট আপডেট করা
        setMessages((prev) => [...prev, result.data]);
        setInputValue("");
        
        // কনভারসেশন লিস্টে লাস্ট মেসেজ আপডেট করা
        setConversations((prev) =>
          prev.map((c) =>
            c._id === selectedChat._id
              ? { ...c, lastMessage: result.data.message, updatedAt: new Date().toISOString() }
              : c
          )
        );
      } else {
        console.error("API Error Response:", result);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-[calc(100vh-100px)] bg-white overflow-hidden font-sans border rounded-lg m-4 shadow-sm">
      {/* Sidebar */}
      <div className="w-1/3 border-r flex flex-col bg-slate-50/50">
        <div className="p-4 border-b bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10 bg-gray-100 border-none rounded-lg"
              placeholder="Search Message ......"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((chat) => {
            const otherUser = chat.participants.find(
              (p: any) => String(p._id || p) !== String(myId),
            );
            return (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center gap-3 p-4 cursor-pointer border-b transition-colors ${
                  selectedChat?._id === chat._id
                    ? "bg-[#BDE3F9]"
                    : "hover:bg-gray-100 bg-white"
                }`}
              >
                <Avatar className="h-12 w-12 border">
                  <AvatarImage
                    src={getAvatarUrl(otherUser?.profileImage)}
                  />
                  <AvatarFallback>
                    {otherUser?.firstName?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-[#001F3F] truncate">
                      {otherUser?.firstName || "User"}
                    </h4>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {format(new Date(chat.updatedAt), "hh:mm a")}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {chat.lastMessage || "Start a conversation"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedChat ? (
          <>
            <div className="p-4 border-b flex items-center gap-3 bg-white">
              <Avatar className="h-10 w-10 border">
                <AvatarImage
                  src={getAvatarUrl(
                    selectedChat.participants.find(
                      (p: any) => String(p._id || p) !== String(myId),
                    )?.profileImage,
                  )}
                />
              </Avatar>
              <div>
                <h4 className="font-bold text-[#001F3F]">
                  {selectedChat.participants.find(
                    (p: any) => String(p._id || p) !== String(myId),
                  )?.firstName || "User"}
                </h4>
                <p className="text-[10px] text-green-600 font-semibold uppercase tracking-wider">
                  Online
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              {messages.map((msg) => {
                const isMe =
                  String(msg.senderId._id || msg.senderId) === String(myId);
                return (
                  <div
                    key={msg._id}
                    className={`flex ${isMe ? "justify-end" : "justify-start"} items-end gap-2`}
                  >
                    {!isMe && (
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage src="/default-avatar.jpg" />
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] p-3 px-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                        isMe
                          ? "bg-[#BDE3F9] text-gray-800 rounded-br-none"
                          : "bg-white border text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                );
              })}
              <div ref={scrollRef} />
            </div>

            <div className="p-4 bg-white border-t">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 focus-within:border-blue-300 transition-all"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Write Here"
                  className="border-none focus-visible:ring-0 shadow-none text-sm bg-transparent"
                  disabled={isSending}
                />
                <button
                  type="submit"
                  disabled={isSending || !inputValue.trim()}
                  className="bg-[#007A33] hover:bg-green-700 p-2.5 rounded-full transition-all disabled:opacity-30 flex-shrink-0"
                >
                  <Send
                    className={`h-4 w-4 text-white ${isSending ? "animate-pulse" : ""}`}
                  />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-slate-50">
            <div className="p-4 bg-white rounded-full shadow-inner mb-2 italic">
              Select a conversation
            </div>
            <p className="text-xs">
              Select a user from the left to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
