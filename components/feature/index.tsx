import React from 'react'
import { BookOpen, ShieldCheck, MessageCircle } from "lucide-react";

const Feature = () => {
    const FeatureCard = ({
            icon,
            title,
            description,
            }: {
            icon: React.ReactNode;
            title: string;
            description: string;
            }) => {
            return (
                <div className="relative rounded-xl p-6 bg-white/[0.03] ring-1 ring-white/10 backdrop-blur">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 mb-6 text-white">
                    {icon}
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                    {title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    {description}
                </p>
                </div>
            );
            };
  return (
    <div>
    <section id='features' className="relative py-32 px-6 overflow-hidden scroll-mt-24">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <div className="max-w-2xl mb-20">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
            Designed for trust.
          </h2>
          <p className="text-lg text-zinc-400">
            Most AI support tools hallucinate. Ours is strictly grounded in
            your content, with a personality you control.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<BookOpen className="w-5 h-5" />}
            title="Knowledge Graph"
            description="We crawl your site and docs to build a structured understanding of your product. No manual training required."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-5 h-5" />}
            title="Strict Guardrails"
            description="Define exactly what the AI can and cannot say. It will politely decline out-of-scope questions."
          />
          <FeatureCard
            icon={<MessageCircle className="w-5 h-5" />}
            title="Tone Matching"
            description="Whether you're professional, quirky, or concise, the AI mimics your brand voice perfectly."
          />
        </div>
      </div>
    </section>
    </div>
  )
}

export default Feature
