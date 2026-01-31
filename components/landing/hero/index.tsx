import Link from "next/link";
import Image from "next/image";

const Hero = () => {
    const Avatar = () => (
  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
    <Image
      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
      alt="Agent"
      width={32}
      height={32}
      className="object-cover"
    />
  </div>
);

const UserIcon = () => (
  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-700 text-zinc-200 text-xs">
    👤
  </div>
);
  return (
    <section className="relative pt-32 pb-28 md:pt-48 md:pb-40 px-6 overflow-hidden">
      <div id="top" className="max-w-4xl mx-auto text-center relative z-20">

        {/* Version badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
          <span className="text-xs text-zinc-300 tracking-wide font-light">
            Version 1.0.0 available now
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-white mb-6">
          Human-friendly support,
          <br />
          powered by AI
        </h1>

        {/* Subheading */}
        <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto mb-10">
          webWhisper helps you deliver instant, accurate customer support
          using AI trained on your own content — no code required.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/api/auth"
            className="px-6 py-3 text-sm font-medium rounded-md bg-white text-black hover:bg-zinc-200 transition"
          >
            Get started
          </Link>

          <Link
            href="#features"
            className="px-6 py-3 text-sm font-medium rounded-md border border-white/15 text-white hover:bg-white/5 transition"
          >
            Learn more
          </Link>
        </div>
      </div>
       {/* Chat Preview */}
    {/* Chat Preview */}
<div className="max-w-xl mx-auto mt-24">
  <div className="rounded-2xl p-1 md:p-2 relative overflow-hidden ring-1 ring-white/10 bg-black/40 backdrop-blur">
    <div className="flex flex-col h-[580px] w-full bg-[#0a0a0e] rounded-xl">

      {/* Header */}
      <div className="h-12 border-b border-white/5 flex items-center px-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-medium text-zinc-300">
            webWhisper Inc.
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-6 py-5 space-y-6 overflow-y-auto bg-zinc-950">

        {/* Bot message + chips */}
        <div className="flex items-start gap-3 max-w-[75%]">
          <Avatar />
          <div>
            <div className="bg-white text-black text-sm px-4 py-2 rounded-2xl">
              Hi there, How can I help you today?
            </div>

            <div className="flex gap-2 mt-4">
              {["FAQ", "Pricing", "Support"].map((item) => (
                <button
                  key={item}
                  className="px-3 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User message */}
        <div className="flex justify-end">
          <div className="flex items-center gap-2 max-w-[75%]">
            <div className="bg-zinc-800 text-zinc-200 text-sm px-4 py-2 rounded-2xl">
              I need some information about webWhisper
            </div>
            <UserIcon />
          </div>
        </div>

        {/* Bot reply */}
        <div className="flex items-start gap-3 max-w-[80%]">
          <Avatar />
          <div className="bg-white text-black text-sm px-4 py-3 rounded-2xl leading-relaxed">
            webWhisper is an AI-powered support platform that helps businesses
            answer customer questions instantly using their own knowledge base,
            without writing any code.
          </div>
        </div>

      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-2 bg-zinc-900 rounded-xl px-4 py-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-500"
          />
          <button className="text-zinc-400 hover:text-white transition">
            ➤
          </button>
        </div>
      </div>

    </div>
  </div>
</div>


    </section>
  );
};

export default Hero;
