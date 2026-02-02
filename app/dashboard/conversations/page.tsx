"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Loader2, Search } from "lucide-react";
import React, { useRef, useState } from "react";

interface Conversation {
  id: string;
  user: string;
  lastMessage: string;
  time: string;
  visitor_ip?: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

const ConversationPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [replyContent, setReplyContent] = useState("");

  const messageEndRef = useRef<HTMLDivElement>(null);

  /* -----------------------------
     LOAD CONVERSATIONS (manual)
  ------------------------------*/
  const loadConversations = async () => {
    try {
      setIsLoadingList(true);
      const res = await fetch("/api/conversations", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch conversations");

      const data = await res.json();
      setConversations(data.conversations || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingList(false);
    }
  };

  /* -----------------------------
     LOAD MESSAGES ON CLICK
  ------------------------------*/
  const handleSelectConversation = async (id: string) => {
    try {
      setSelectedId(id);
      setIsLoadingMessages(true);
      setCurrentMessages([]);

      const res = await fetch(`/api/conversations/${id}`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch messages");

      const data = await res.json();
      setCurrentMessages(data.messages || []);

      setTimeout(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  /* -----------------------------
     SEND REPLY
  ------------------------------*/
  const sendReply = async () => {
    if (!replyContent.trim() || !selectedId) return;

    try {
      setIsSending(true);

      const res = await fetch(`/api/conversations/${selectedId}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: replyContent }),
      });

      if (!res.ok) throw new Error("Failed to send reply");

      setCurrentMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: replyContent,
          created_at: new Date().toISOString(),
        },
      ]);

      setReplyContent("");

      setTimeout(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-64px)] bg-black overflow-hidden">
      {/* LEFT */}
      <div className="w-[380px] flex flex-col border-r border-white/5 bg-[#050509]">
        <div className="p-4 border-b border-white/5 space-y-3">
          <div className="flex justify-between">
            <h1 className="text-white font-medium">Inbox</h1>
            <button
              onClick={loadConversations}
              className="text-xs text-indigo-400"
            >
              Refresh
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-zinc-500" />
            <Input
              className="pl-9 bg-[#0A0A0E] border-white/10"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          {isLoadingList ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-zinc-500" />
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="text-center py-10 text-zinc-500 text-sm">
              No conversations
            </div>
          ) : (
            filteredConversations.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelectConversation(c.id)}
                className={cn(
                  "p-4 border-b border-white/5 text-left hover:bg-white/10",
                  selectedId === c.id &&
                    "bg-white/5 border-l-2 border-indigo-500"
                )}
              >
                <div className="flex justify-between">
                  <span className="text-sm text-white truncate">{c.user}</span>
                  <span className="text-[10px] text-zinc-500">{c.time}</span>
                </div>
                <p className="text-xs text-zinc-500 truncate">
                  {c.lastMessage}
                </p>
              </button>
            ))
          )}
        </ScrollArea>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex flex-col bg-[#0a0a0e]">
        {!selectedId ? (
          <div className="flex-1 flex items-center justify-center text-zinc-500 text-sm">
            Select a conversation
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-4">
              {isLoadingMessages ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="animate-spin text-zinc-500" />
                </div>
              ) : (
                <div className="space-y-4">
                  {currentMessages.map((m) => (
                    <div
                      key={m.id}
                      className={cn(
                        "max-w-[75%] px-4 py-2 rounded-lg text-sm",
                        m.role === "user"
                          ? "mr-auto bg-white/10 text-zinc-200"
                          : "ml-auto bg-indigo-600 text-white"
                      )}
                    >
                      {m.content}
                    </div>
                  ))}
                  <div ref={messageEndRef} />
                </div>
              )}
            </ScrollArea>

            <div className="p-4 border-t border-white/5 flex gap-2">
              <Input
                placeholder="Type reply..."
                className="bg-[#0A0A0E] border-white/10"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <button
                onClick={sendReply}
                disabled={isSending}
                className="px-4 bg-indigo-600 text-white rounded-md disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConversationPage;
