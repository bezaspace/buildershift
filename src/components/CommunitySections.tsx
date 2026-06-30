import React from "react";
import { Users, Code2, Megaphone, Rocket, ShieldCheck, HeartHandshake, Flame, BookOpen } from "lucide-react";
import db from "../lib/db";
import { useAuthModal } from "../context/AuthModalContext";

const whatWeDo = [
  {
    icon: Code2,
    title: "Build Sessions",
    desc: "Regular co-working sprints where we ship side by side. Bring your project, get unstuck, and hit deploy before the session ends.",
  },
  {
    icon: Users,
    title: "Project Reviews",
    desc: "Peer feedback on live URLs, GitHub READMEs, and demo videos. We review what you built, not what you claim on a resume.",
  },
  {
    icon: Megaphone,
    title: "Hiring Intel",
    desc: "Shared job leads, recruiter insights, and portfolio reviews. We track what hiring managers actually look for in 2026.",
  },
];

const principles = [
  {
    icon: Rocket,
    title: "Ship before you perfect",
    desc: "A deployed, slightly rough project beats a polished repo that never leaves localhost.",
  },
  {
    icon: ShieldCheck,
    title: "Build in public",
    desc: "Share your work, your failures, and your learnings. Your public proof-of-work is your only un-copiable edge.",
  },
  {
    icon: HeartHandshake,
    title: "Help others debug",
    desc: "Teaching is the fastest way to solidify what you know. The community wins when everyone levels up.",
  },
  {
    icon: Flame,
    title: "No tutorial clones",
    desc: "We build tools that solve real problems for real users. Recruiters have seen enough weather apps.",
  },
];

export default function CommunitySections() {
  const { openAuthModal } = useAuthModal();
  const { user } = db.useAuth();

  return (
    <section className="bg-[#FDFCFB] border-b border-[#1A1A1A]">
      {/* What We Do */}
      <div className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#1A1A1A]/10 pb-10 mb-16">
          <span className="text-[10px] font-mono font-bold text-[#F27D26] uppercase tracking-widest block mb-3">
            [INSIDE THE COMMUNITY]
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif italic text-[#1A1A1A] leading-none">
            What We Do Together.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whatWeDo.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="border-2 border-[#1A1A1A] p-6 bg-white flex flex-col gap-4">
                <div className="inline-flex h-10 w-10 items-center justify-center bg-[#1A1A1A] text-[#FDFCFB]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-serif italic font-bold text-[#1A1A1A]">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-sans">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Member Showcase */}
      <div className="py-24 bg-[#F5F3F0] border-b border-[#1A1A1A]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#F27D26] uppercase tracking-widest block mb-3">
                [MEMBER SHIPS]
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif italic text-[#1A1A1A] leading-none">
                Projects Built Here.
              </h2>
            </div>
            <p className="text-xs text-gray-500 max-w-sm font-sans">
              Real projects shipped by real members. We will feature live URLs, the stack, and one lesson learned from each builder.
            </p>
          </div>

          <div className="border-2 border-dashed border-[#1A1A1A]/30 p-12 text-center bg-[#FDFCFB]">
            <div className="text-5xl font-black text-[#1A1A1A]/10 tracking-tighter mb-4">SOON</div>
            <h3 className="text-xl font-serif italic font-bold text-[#1A1A1A] mb-2">Member Showcase Coming Soon</h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto font-sans mb-6">
              We are just getting started. Once the first members ship, this wall will fill with proof-of-work.
            </p>
            {user ? (
              <span className="inline-block px-6 py-3.5 bg-[#1A1A1A] text-white text-[11px] font-mono font-bold uppercase tracking-widest">
                You're In. Start Shipping.
              </span>
            ) : (
              <button
                onClick={openAuthModal}
                className="inline-block px-6 py-3.5 border-2 border-[#1A1A1A] text-[#1A1A1A] text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors"
              >
                Be the First to Ship
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Community Principles */}
      <div className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-b border-[#1A1A1A]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <span className="text-[10px] font-mono font-bold text-[#F27D26] uppercase tracking-widest block mb-3">
              [THE RULES]
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif italic text-[#1A1A1A] leading-none">
              Community Principles.
            </h2>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="border border-[#1A1A1A]/20 p-5 bg-white flex flex-col gap-3">
                  <div className="inline-flex h-8 w-8 items-center justify-center bg-[#F5F3F0] border border-[#1A1A1A]/10 text-[#1A1A1A]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-lg font-serif italic font-bold text-[#1A1A1A]">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="py-24 bg-[#1A1A1A] text-[#FDFCFB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <span className="text-[10px] font-mono font-bold text-[#F27D26] uppercase tracking-widest block mb-3">
                [TOOLKIT]
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif italic leading-none">
                Shared Resources.
              </h2>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: BookOpen, title: "Deployment Checklist", status: "Coming Soon" },
                { icon: BookOpen, title: "README Template", status: "Coming Soon" },
                { icon: BookOpen, title: "Loom Walkthrough Guide", status: "Coming Soon" },
                { icon: BookOpen, title: "AI Tool Stack Recommendations", status: "Coming Soon" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="border border-[#FDFCFB]/10 p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-[#F27D26]" />
                      <span className="text-sm font-serif italic">{item.title}</span>
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400">{item.status}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
