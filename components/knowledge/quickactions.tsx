"use client";

import { Globe, Upload, FileText } from "lucide-react";

type QuickActionsProps = {
  onOpenModal: (tab: "website" | "upload" | "text") => void;
};

export default function QuickActions({ onOpenModal }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Website */}
      <div
        onClick={() => onOpenModal("website")}
        className="cursor-pointer rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.04] transition"
      >
        <div className="w-9 h-9 rounded-md bg-indigo-500/10 flex items-center justify-center mb-4">
          <Globe className="w-5 h-5 text-indigo-400" />
        </div>

        <h3 className="text-sm font-medium text-white mb-1">
          Add Website
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Crawl your website or specific pages to sync knowledge automatically.
        </p>
      </div>

      {/* Upload */}
      <div
        onClick={() => onOpenModal("upload")}
        className="cursor-pointer rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.04] transition"
      >
        <div className="w-9 h-9 rounded-md bg-emerald-500/10 flex items-center justify-center mb-4">
          <Upload className="w-5 h-5 text-emerald-400" />
        </div>

        <h3 className="text-sm font-medium text-white mb-1">
          Upload File
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Upload CSV or documents to instantly train your assistant.
        </p>
      </div>

      {/* Text */}
      <div
        onClick={() => onOpenModal("text")}
        className="cursor-pointer rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.04] transition"
      >
        <div className="w-9 h-9 rounded-md bg-zinc-500/10 flex items-center justify-center mb-4">
          <FileText className="w-5 h-5 text-zinc-300" />
        </div>

        <h3 className="text-sm font-medium text-white mb-1">
          Add Text
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Manually add FAQs, policies, or internal notes.
        </p>
      </div>
    </div>
  );
}
