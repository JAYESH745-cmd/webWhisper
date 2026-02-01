"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Globe, FileText, Upload, Loader2 } from "lucide-react";

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  defaultTab: string;
  setDefaultTab: (tab: string) => void;
  onImport: (data: any) => Promise<void>;
  isLoading: boolean;
  existingSources: any[];
};

export default function Quickadd({
  isOpen,
  setIsOpen,
  defaultTab,
  setDefaultTab,
  onImport,
  isLoading,
  existingSources,
}: Props) {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [docsTitle, setDocsTitle] = useState("");
  const [docsContent, setDocsContent] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return ["http:", "https:"].includes(parsed.protocol);
    } catch {
      return false;
    }
  };

  const handleImportWrapper = async () => {
    setError(null);

    let payload: any = { type: defaultTab };

    if (defaultTab === "website") {
      if (!websiteUrl) return setError("Website URL is required.");
      if (!validateUrl(websiteUrl)) return setError("Invalid URL.");
      payload.url = websiteUrl;
    }

    if (defaultTab === "text") {
      if (!docsTitle || !docsContent)
        return setError("Title and content are required.");
      payload.title = docsTitle;
      payload.content = docsContent;
    }

    if (defaultTab === "upload") {
      if (!uploadedFile) return setError("Please upload a file.");
      payload.file = uploadedFile;
    }

    await onImport(payload);

    // reset
    setWebsiteUrl("");
    setDocsTitle("");
    setDocsContent("");
    setUploadedFile(null);
    setError(null);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogOverlay className="fixed inset-0 bg-black/50 z-40" />

      <DialogContent className="z-50 sm:max-w-[600px] bg-[#0E0E12] border border-white/10 p-0">
        <DialogHeader className="p-6 pb-3">
          <DialogTitle>Add New Source</DialogTitle>
          <DialogDescription>
            Choose a content type to train your assistant.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={defaultTab}
          onValueChange={setDefaultTab}
          className="w-full"
        >
          {/* Tabs */}
          <div className="px-6 border-b border-white/10">
            <TabsList className="bg-transparent p-0 gap-6">
              {["website", "text", "upload"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="
                    relative bg-transparent px-0 pb-3
                    text-zinc-400 hover:text-white
                    data-[state=active]:text-black
                    data-[state=active]:after:relative
                    data-[state=active]:after:left-0
                    data-[state=active]:after:-bottom-[1px]
                    data-[state=active]:after:h-[2px]
                    data-[state=active]:after:w-full
                    data-[state=active]:after:bg-indigo-500
                  "
                >
                  {tab === "website"
                    ? "Website"
                    : tab === "text"
                    ? "Q&A / Text"
                    : "File Upload"}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Website */}
          <TabsContent value="website" className="p-6 space-y-4">
            <div className="p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex gap-3">
              <Globe className="w-5 h-5 text-indigo-400 mt-1" />
              <div>
                <p className="font-medium">Crawl Website</p>
                <p className="text-xs text-indigo-300/80">
                  Enter a website URL to crawl significant pages.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Website URL *</Label>
              <Input
                placeholder="https://example.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="bg-white/5 border-white/10"
              />
            </div>
          </TabsContent>

          {/* Text */}
          <TabsContent value="text" className="p-6 space-y-4">
            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 flex gap-3">
              <FileText className="w-5 h-5 text-purple-400 mt-1" />
              <div>
                <p className="font-medium">Raw Text</p>
                <p className="text-xs text-purple-300/80">
                  Paste FAQs, policies, or internal notes.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                placeholder="e.g. Refund Policy"
                value={docsTitle}
                onChange={(e) => setDocsTitle(e.target.value)}
                className="bg-white/5 border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                placeholder="Paste text here..."
                value={docsContent}
                onChange={(e) => setDocsContent(e.target.value)}
                className="bg-white/5 border-white/10 h-32 resize-none"
              />
            </div>
          </TabsContent>

          {/* Upload */}
          <TabsContent value="upload" className="p-6 space-y-4">
            <div className="relative p-6 rounded-lg border border-dashed border-white/15 flex flex-col items-center justify-center text-center gap-2">
              <Upload className="w-6 h-6 text-zinc-400" />
              <p className="text-sm">
                {uploadedFile
                  ? uploadedFile.name
                  : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-zinc-500">CSV (max 10MB)</p>

              <input
                type="file"
                accept=".csv"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) =>
                  setUploadedFile(e.target.files?.[0] || null)
                }
              />
            </div>
          </TabsContent>
        </Tabs>

        {error && (
          <div className="px-6 text-sm text-red-400">{error}</div>
        )}

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="text-zinc-400 hover:text-white"
          >
            Cancel
          </Button>

          <Button
            onClick={handleImportWrapper}
            disabled={isLoading}
            className="bg-white text-black hover:bg-zinc-200 min-w-[140px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Importing
              </>
            ) : (
              "Import Source"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
