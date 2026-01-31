import React from "react";
import { Check } from "lucide-react";

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="relative py-32 px-6 overflow-hidden scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
          Simple, transparent pricing.
        </h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-20">
          Start free. Upgrade when you’re ready.
          Paid plans are launching soon.
        </p>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

          {/* FREE PLAN */}
          <div className="rounded-xl p-8 bg-white/[0.02] ring-1 ring-white/10 backdrop-blur text-left">
            <h3 className="text-xl font-medium text-white mb-2">
              Free
            </h3>

            <div className="mb-6">
              <span className="text-5xl font-medium text-white">$0</span>
              <span className="text-zinc-400"> / month</span>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "Basic AI chat widget",
                "Limited conversations",
                "Trained on public pages",
                "Standard response speed",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-300">
                  <Check className="w-4 h-4 mt-1 text-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button className="w-full py-3 rounded-md bg-white/10 text-white hover:bg-white/15 transition">
              Get started for free
            </button>
          </div>

          {/* PRO PLAN */}
          <div className="relative rounded-xl p-8 bg-white/[0.04] ring-1 ring-white/20 backdrop-blur text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-xs text-zinc-300">
                Launching soon
              </span>
            </div>

            <h3 className="text-xl font-medium text-white mb-2">
              Pro
            </h3>

            <div className="mb-6">
              <span className="text-5xl font-medium text-white">$29</span>
              <span className="text-zinc-400"> / month</span>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "Unlimited AI conversations",
                "Private knowledge base",
                "Strict guardrails & tone control",
                "Advanced analytics",
                "Priority support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-300">
                  <Check className="w-4 h-4 mt-1 text-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              disabled
              className="w-full py-3 rounded-md bg-white/10 text-zinc-400 cursor-not-allowed"
            >
              Coming soon
            </button>

            <p className="text-xs text-zinc-500 mt-4">
              Early access pricing will be available at launch.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;
