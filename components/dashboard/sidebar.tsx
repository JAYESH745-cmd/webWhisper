"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  Bot,
  MessageSquare,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Metadata = {
  business_name: string;
};

const SIDEBAR_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Knowledge", href: "/dashboard/knowledge", icon: BookOpen },
  { label: "Sections", href: "/dashboard/sections", icon: Layers },
  { label: "Chatbot", href: "/dashboard/chatbot", icon: Bot },
  {
    label: "Conversations",
    href: "/dashboard/conversations",
    icon: MessageSquare,
  },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await fetch("/api/metadata/fetch");
        const response=await res.json();
        const data = await response.data;
        // console.log(data);

        if (data) {
          setMetadata({...data});
        }
      } catch (err) {
        console.error("Failed to fetch metadata", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMetadata();
  }, []);

  const initials =
    metadata?.business_name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "..";

  return (
    <aside className="w-64 h-screen bg-[#050509] border-r border-white/5 flex flex-col">
      {/* Top Logo */}
      <div className="h-16 px-6 flex items-center border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-[2px]" />
          </div>
          <span className="text-sm font-medium text-white/90">
           webWhisper
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition",
                isActive
                  ? "bg-white/5 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Profile / Org */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center">
            <span className="text-xs font-semibold text-zinc-300">
              {initials}
            </span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm text-zinc-200 truncate">
              {isLoading
                ? "Loading..."
                : metadata?.business_name
                ? `${metadata.business_name}'s Workspace`
                : "Workspace"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
