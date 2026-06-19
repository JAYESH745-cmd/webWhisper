"use client";

import React, { useState } from "react";
import { AlertCircle, Check, Code, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EmbedCodeConfig = ({
  chatbotId,
}: {
  chatbotId: string | undefined;
}) => {
  const [copied, setCopied] = useState(false);

  const embedCode = `<script
  src="${process.env.NEXT_PUBLIC_WEBSITE_URI}/widget.js" data-id="${chatbotId || "..."}" defer>
</script>`;

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Card className="bg-[#0A0A0E] border border-white/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4 text-zinc-500" />
          <CardTitle className="text-white uppercase tracking-wider text-sm">
            Embed Code
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Code Block */}
        <div className="relative">
          <div className="rounded-2xl border border-white/10 bg-[#0B0B0F] p-5">
            <pre className="overflow-x-auto whitespace-pre-wrap break-all font-mono text-sm leading-6 text-zinc-300">
              {embedCode}
            </pre>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopyCode}
            className="absolute right-4 top-4 h-10 w-10 rounded-xl border border-white/10 bg-zinc-800 hover:bg-zinc-700"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4 text-white" />
            )}
          </Button>
        </div>

        {/* Warning Box */}
        <div className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-400">
          <AlertCircle className="h-4 w-4 shrink-0" />

          <span>
            Paste this code before the closing{" "}
            <code className="font-mono text-amber-300">&lt;/head&gt;</code>{" "}
            tag on your website.
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmbedCodeConfig;