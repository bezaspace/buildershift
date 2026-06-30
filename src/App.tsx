import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Navbar from "./components/Navbar";
import ParadigmComparison from "./components/ParadigmComparison";
import TweetFeed from "./components/TweetFeed";
import CommunitySections from "./components/CommunitySections";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import { AuthModalProvider, useAuthModal } from "./context/AuthModalContext";
import db from "./lib/db";

type PageType = "manifesto" | "why-shift" | "hiring-signals";

const marketStats = [
  { value: "67%", label: "Drop in entry-level developer roles since 2022" },
  { value: "70%", label: "Employers now using skills-based hiring" },
  { value: "22%", label: "Of applicants use AI bots to spam job applications" },
];

export default function App() {
  return (
    <AuthModalProvider>
      <AppContent />
      <AuthModal />
    </AuthModalProvider>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageType>("manifesto");
  const { openAuthModal } = useAuthModal();
  const { user } = db.useAuth();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#why-shift") {
        setCurrentPage("why-shift");
      } else if (hash === "#hiring-signals") {
        setCurrentPage("hiring-signals");
      } else {
        setCurrentPage("manifesto");
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case "why-shift":
        return (
          <>
            <ParadigmComparison />
            <Footer />
          </>
        );
      case "hiring-signals":
        return (
          <>
            <TweetFeed />
            <Footer />
          </>
        );
      case "manifesto":
      default:
        return (
          <>
            {/* Hero Section */}
            <section id="manifesto" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-b border-[#1A1A1A]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Column: Headline */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <span className="text-[10px] font-mono font-bold text-[#F27D26] uppercase tracking-widest">
                    [A COMMUNITY FOR CS STUDENTS WHO SHIP]
                  </span>
                  <h1 className="text-6xl sm:text-7xl lg:text-8xl leading-[0.9] font-serif italic -ml-1 text-[#1A1A1A]">
                    The Build<br />Is the<br />Brand.
                  </h1>
                  <div className="h-[2px] w-32 bg-[#1A1A1A] my-2"></div>
                  <p className="text-lg sm:text-xl leading-relaxed font-serif italic text-gray-700 pr-4">
                    In 2026, degrees and PDFs are no longer enough. The only signal that cannot be faked is a shipped, live project that solves a real problem. Join a community of students building exactly that — together.
                  </p>
                  <p className="text-sm leading-relaxed text-gray-500 font-sans">
                    We run build sessions, project reviews, and hiring intel calls. No courses, no products, just people who help each other ship.
                  </p>
                  <div className="pt-4 flex flex-wrap gap-4">
                    {user ? (
                      <span className="px-6 py-3.5 bg-[#1A1A1A] text-white text-[11px] font-mono font-bold uppercase tracking-widest">
                        Welcome, {user.email}
                      </span>
                    ) : (
                      <button
                        onClick={openAuthModal}
                        className="px-6 py-3.5 bg-[#F27D26] text-white text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-[#1A1A1A] transition-colors"
                      >
                        Join the Community
                      </button>
                    )}
                    <a
                      href="#why-shift"
                      className="px-6 py-3.5 border-2 border-[#1A1A1A] text-[#1A1A1A] text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-[#F5F3F0] transition-colors"
                    >
                      Read the Paradigm
                    </a>
                  </div>

                  {/* Market Stats */}
                  <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#1A1A1A]/10 mt-4">
                    {marketStats.map((stat) => (
                      <div key={stat.label}>
                        <div className="text-3xl font-black text-[#1A1A1A] tracking-tighter">{stat.value}</div>
                        <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400 font-mono mt-1 leading-tight">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                    Sources: JobsByCulture 2026, Pin / NACE 2026, gitGood.dev 2026
                  </p>
                </div>

                {/* Right Column: Community Path */}
                <div className="lg:col-span-5 grid grid-cols-1 gap-6 h-full">
                  <div className="bg-[#F5F3F0] p-6 border border-[#1A1A1A]/20 flex flex-col justify-between min-h-[220px]">
                    <div>
                      <div className="text-2xl font-serif italic mb-4 tracking-tight">01. The Old Path</div>
                      <ul className="text-[11px] uppercase leading-loose tracking-wider text-gray-600 font-mono">
                        <li className="line-through decoration-[#1A1A1A]/40">Passive Classroom GPA</li>
                        <li className="line-through decoration-[#1A1A1A]/40">Generic LeetCode Grinding</li>
                        <li className="line-through decoration-[#1A1A1A]/40">Copied Portfolio Clones</li>
                        <li className="line-through decoration-[#1A1A1A]/40">Stagnating PDF Resumes</li>
                      </ul>
                    </div>
                    <div className="text-[9px] font-mono font-bold text-rose-700 uppercase tracking-widest mt-4">
                      [REPLACED BY AUTOMATION]
                    </div>
                  </div>

                  <div className="bg-[#1A1A1A] text-white p-6 border border-[#1A1A1A] flex flex-col justify-between min-h-[220px]">
                    <div>
                      <div className="text-2xl font-serif italic mb-4 tracking-tight text-[#F27D26]">02. The Builder Path</div>
                      <ul className="text-[11px] uppercase leading-loose tracking-wider font-mono text-gray-300">
                        <li>AI Pairing Mastery</li>
                        <li>Full-Stack Systems Thinking</li>
                        <li>Real-Time Live Webhooks</li>
                        <li>Public Walkthrough Videos</li>
                      </ul>
                    </div>
                    <div className="text-[9px] font-mono font-bold text-[#F27D26] uppercase tracking-widest mt-4">
                      [HIGH VALUE IN 2026]
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <CommunitySections />

            {/* Shipped Manifesto Checklist */}
            <section className="py-24 bg-[#FDFCFB] border-b border-[#1A1A1A]">
              <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="border-2 border-[#1A1A1A] p-6 sm:p-10 bg-white">
                  <div className="border-b border-[#1A1A1A]/10 pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#F27D26] uppercase tracking-widest">[COMMUNITY STANDARDS]</span>
                      <h3 className="text-2xl sm:text-3xl font-serif italic text-[#1A1A1A] font-bold mt-1">The Shipped Manifesto Checklist</h3>
                    </div>
                    <span className="font-mono text-xs text-gray-400 italic">Version_1.0 // Community Edition</span>
                  </div>

                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="h-5 w-5 bg-[#1A1A1A] text-white flex items-center justify-center font-mono text-[10px] font-bold mt-0.5 shrink-0">
                        ✓
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold font-mono text-[#1A1A1A] uppercase tracking-wider">Deploy early (Hour 1)</h4>
                        <p className="text-xs text-gray-500 leading-relaxed font-sans font-light">
                          Do not wait for a polished product to deploy. Host a blank page on Vercel or Netlify in your first hour. This ensures there are no late-night deployment or configuration errors during launch hour.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start border-t border-gray-100 pt-6">
                      <div className="h-5 w-5 bg-[#1A1A1A] text-white flex items-center justify-center font-mono text-[10px] font-bold mt-0.5 shrink-0">
                        ✓
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold font-mono text-[#1A1A1A] uppercase tracking-wider">Document the "Why" and "Hardest Decision"</h4>
                        <p className="text-xs text-gray-500 leading-relaxed font-sans font-light">
                          Hiring managers do not read hundreds of lines of code. They read your README. Add a section describing why you chose this design, how you bypassed performance issues, and what trade-offs you made.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start border-t border-gray-100 pt-6">
                      <div className="h-5 w-5 bg-[#1A1A1A] text-white flex items-center justify-center font-mono text-[10px] font-bold mt-0.5 shrink-0">
                        ✓
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold font-mono text-[#1A1A1A] uppercase tracking-wider">Avoid Over-Engineering (The MVP rule)</h4>
                        <p className="text-xs text-gray-500 leading-relaxed font-sans font-light">
                          Keep your scope to 3 actionable, interactive pages/views max. A bug-free, beautifully stylized single-view system beats a broken multi-page dashboard with empty placeholders every single day.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start border-t border-gray-100 pt-6">
                      <div className="h-5 w-5 bg-[#1A1A1A] text-white flex items-center justify-center font-mono text-[10px] font-bold mt-0.5 shrink-0">
                        ✓
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold font-mono text-[#1A1A1A] uppercase tracking-wider">Leverage the AI co-founder loop</h4>
                        <p className="text-xs text-gray-500 leading-relaxed font-sans font-light">
                          Use LLMs for generating boilerplate, CSS, and data structures. Spend your human effort on reviewing logs, writing tests, studying protocols, and refining the visual flow.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-[#F27D26]">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl sm:text-5xl font-serif italic text-white leading-none mb-6">
                  Stop Building Alone.
                </h2>
                <p className="text-sm sm:text-base text-white/90 font-sans mb-8 max-w-xl mx-auto">
                  Join a community of CS students who are replacing anxiety with shipped projects. The market is hard, but we are harder to ignore when we build together.
                </p>
                {user ? (
                  <span className="inline-block px-8 py-4 bg-white text-[#1A1A1A] text-[11px] font-mono font-bold uppercase tracking-widest">
                    You're a Builder Now. Start Shipping.
                  </span>
                ) : (
                  <button
                    onClick={openAuthModal}
                    className="inline-block px-8 py-4 bg-[#1A1A1A] text-white text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-white hover:text-[#1A1A1A] transition-colors"
                  >
                    Join the Community
                  </button>
                )}
              </div>
            </section>

            <Footer />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans selection:bg-[#F27D26] selection:text-white flex flex-col justify-between">
      <div>
        <Navbar currentPage={currentPage} />

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
