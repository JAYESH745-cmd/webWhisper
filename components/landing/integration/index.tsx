import React from "react";

const Integration = () => {
  return (
    <section
      id="how-it-works"
      className="relative py-32 px-6 overflow-hidden scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">
            Drop-in simplicity.
          </h2>

          <p className="text-lg text-zinc-400 mb-10 max-w-xl">
            No complex SDKs or user syncing. Just add our script tag and
            you’re live. We inherit your CSS variables automatically.
          </p>

          <div className="space-y-6">
            <Step number="1" text="Scan your documentation URL" />
            <Step number="2" text="Copy the embed snippet" />
            <Step number="3" text="Auto-resolve tickets" />
          </div>
        </div>

        {/* RIGHT CODE CARD */}
        <div className="relative">
          <div className="rounded-xl bg-white/[0.03] ring-1 ring-white/10 backdrop-blur p-6">
            
            {/* Window header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-zinc-500">index.html</span>
            </div>

            {/* Code */}
            <pre className="text-sm text-zinc-200 overflow-x-auto">
    <code>
            <span className="text-zinc-500">{`<!-- webWhisper Support -->`}</span>{"\n"}
            <span className="text-pink-400">{`<script`}</span>{"\n"}
            <span className="text-emerald-400">
            {`  src="https://webwhisper.ai/init.js"`}
            </span>{"\n"}
            <span className="text-blue-400">
            {`  data-id="b7885803-18ca-479b-baf6-c6b289e309a5"`}
            </span>{"\n"}
            <span className="text-zinc-300">{`  defer>`}</span>{"\n"}
            <span className="text-pink-400">{`</script>`}</span>
    </code>
            </pre>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Integration;

/* ---------- Step Item ---------- */

const Step = ({ number, text }: { number: string; text: string }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white/5 ring-1 ring-white/10 text-xs text-zinc-300">
        {number}
      </div>
      <p className="text-zinc-300">{text}</p>
    </div>
  );
};
