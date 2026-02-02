"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Check, Code, Copy } from "lucide-react";
import React, { useState } from "react";

const EmbedCodeConfig = ({ chatbotId }: { chatbotId: string | undefined }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    setCopied(true);
    navigator.clipboard.writeText(
      `<script src="${process.env.NEXT_PUBLIC_WEBSITE_URI}/widget.js" data-id="${chatbotId}" defer></script>`,
    );
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <Card className="border-white/5 bg-[#0A0A0E]">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-zinc-500" />
          <CardTitle className="text-sm font-medium text-white uppercase tracking-wider">
            Embed Code
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="relative group">
          <div className="bg-[#050509] border border-white/10 rounded-xl p-4 overflow-hidden">
            <pre className="text-xs text-zinc-300 font-mono overflow-x-auto whitespace-pre rounded-lg">
              {`<script
            src="${process.env.NEXT_PUBLIC_WEBSITE_URI}/widget.js"
            data-id="${chatbotId || "..."}"
            defer
          ></script>`}
            </pre>
          </div>
          <Button
            variant={"secondary"}
            size={"icon"}
            onClick={handleCopyCode}
            className="absolute top-2 right-2 text-xs px-2 py-1 rounded bg-zinc-800 text-white transition"
          >
            {copied ? (
              <Check className="w-3 h-3" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </Button>
        </div>

        <div className="flex items-start gap-2 text-xs text-amber-500/80 bg-amber-500/10 p-2 rounded-md border border-amber-500/10">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            Paste this code before the closing &lt;/head&gt; tag on your
            website.
          </span>
        </div>

      
      </CardContent>
    </Card>
  );
};

export default EmbedCodeConfig;