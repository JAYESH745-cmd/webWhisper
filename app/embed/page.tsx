"use client";

import { Textarea } from "@/components/ui/textarea";
import { knowledge_source } from "@/db/schema";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Bot,
  ChevronDown,
  MessageCircle,
  Send,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Section } from "@/@types/types";
import image from "../../public/image.png"


interface ChatbotMetadata {
  id: string;
  color: string;
  welcome_message: string;
}

const EmbedPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [metadata, setMetadata] = useState<ChatbotMetadata | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const scrollViewportRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim() || !token) return;

    const currentSection = sections.find((s) => s.name === activeSection);
    const sourceIds = currentSection?.source_ids || [];

    const userMsg = { role: "user", content: input, section: activeSection };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat/public", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          knowledge_source_ids: sourceIds,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.response,
            section: null,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I'm having trouble connecting right now. Please try again.",
            setion: null,
          },
        ]);
      }
    } catch (error) {
      console.error(error)
    } finally{
      setIsTyping(false)
    }
  };

  /* initial iframe size */
  useEffect(() => {
    document.body.style.backgroundColor = "transparent";
    document.documentElement.style.backgroundColor = "transparent";

    window.parent.postMessage(
      {
        type: "resize",
        width: "60px",
        height: "60px",
        borderRadius: "30px",
      },
      "*",
    );
  }, []);

  const toggleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    if (newState) {
      window.parent.postMessage(
        {
          type: "resize",
          width: "380px",
          height: "520px",
          borderRadius: "12px",
        },
        "*",
      );
    } else {
      window.parent.postMessage(
        {
          type: "resize",
          width: "60px", // ✅ FIXED (was 60x)
          height: "60px",
          borderRadius: "30px",
        },
        "*",
      );
    }
  };

  /* load widget config */
  useEffect(() => {
    if (!token) {
      setError("Missing session token");
      setLoading(false);
      return;
    }

    const fetchConfig = async () => {
      try {
        const res = await fetch(`/api/widget/config?token=${token}`);
        if (!res.ok) throw new Error("Failed to load widget configuration");

        const data = await res.json();

        setMetadata(data.metadata);
        setSections(data.sections || []);

        setMessages([
          {
            role: "assistant",
            content:
              data.metadata?.welcome_message || "Hi! How can I help you?",
            isWelcome: true,
            section: null,
          },
        ]);
      } catch (err) {
        console.error(err);
        setError("Unable to load chat. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [token]);

  /* auto scroll */
  useEffect(() => {
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const primaryColor = "#4f46e5";


  if (loading) return null;

  if (error && isOpen) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white">
        <AlertCircle className="w-10 h-10 mb-2 text-red-500" />
        <p className="text-sm text-gray-700">{error}</p>
      </div>
    );
  }

  /* closed state (floating button) */
  if (!isOpen) {
  return (
    <button
      onClick={toggleOpen}
      style={{
        backgroundColor: primaryColor,
        fontSize: "20px",       // 👈 FORCE FONT SIZE
        lineHeight: "1",
      }}
      className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      aria-label="Open chat"
    >
      💬
    </button>
  );
}


  const handleSectionClick = (sectionName: string) => {
    setActiveSection(sectionName);
    const userMsg = { role: "user", content: sectionName, section: null };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg = {
        role: "assistant",
        content: `You can ask me any question related to "${sectionName}"`,
        section: sectionName,
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 800);
  };

  /* open state */
  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden rounded-xl border border-white/10 shadow-2xl">
      <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-[#0E0E12] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
            <Image
              src={image}
              alt="Support agent"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white/80 leading-none">
              Support
            </h1>
            <span className="text-[11px] text-emerald-400 font-medium">
              Online
            </span>
          </div>
        </div>
        <button
          onClick={toggleOpen}
          className="p-2 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition"
          aria-label="Minimize Chat"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* messages */}
      {/* messages */}
      <div className="flex-1 overflow-y-auto bg-zinc-950/30 p-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="space-y-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex items-end gap-2",
                msg.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {msg.role !== "user" && (
                <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={image}
                    alt="Support agent"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-2 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-indigo-600 text-white rounded-br-md"
                    : "bg-white text-black rounded-bl-md",
                )}
              >
                {msg.content}
              </div>

              {msg.isWelcome && sections.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1 ml-1 animate-in fade-in slide-in-from-top-1 duration-300">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleSectionClick(section.name)}
                      className="px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700 hover:border-zinc-600 text-zinc-300 text-xs font-medium transition-all"
                    >
                      {section.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex w-full justify-start">
              <div className="flex max-w-[85%] gap-3 flex-row">
                <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={image}
                    alt="Support agent"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 rounded-2xl bg-white text-zinc-900  rounded-tl-sm shadow-sm flex items-center gap1">
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce "></div>
                </div>
              </div>
            </div>
          )}
          <div ref={scrollViewportRef} />
        </div>
      </div>

      {/* input (placeholder for now) */}
      {/* input */}
      <div className="p-4 border-t border-white/10 bg-[#0E0E12] shrink-0  z-20">
        <div className="flex items-center gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!activeSection}
            placeholder={
              activeSection ? "Type a message..." : "Select a topic above..."
            }
            className="min-h-12.5 max-h-30 pr-12 outline-none text-white bg-zinc-900/50 border-white/10 resize-none rounded-xl disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-zinc-600 focus:ring-1 focus:ring-white/20"
          />

          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 transition"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="mt-2 text-center">
          <Link
            href={"/"}
            className="text-[10px] text-zinc-600 font-medium hover:text-zinc-500 transition-colors  "
          >
            Powered by webWhisper.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmbedPage;