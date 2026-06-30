import React, { useState } from "react";
import { Hammer, Menu, X, LogOut } from "lucide-react";
import db from "../lib/db";
import { useAuthModal } from "../context/AuthModalContext";

interface NavbarProps {
  currentPage: "manifesto" | "why-shift" | "hiring-signals";
}

export default function Navbar({ currentPage }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openAuthModal } = useAuthModal();
  const { isLoading: authLoading, user } = db.useAuth();

  const links = [
    { id: "manifesto", label: "The Manifesto" },
    { id: "why-shift", label: "The Paradigm" },
    { id: "hiring-signals", label: "Demand Signals" },
  ];

  const handleJoinClick = () => {
    setMobileOpen(false);
    if (!user) openAuthModal();
  };

  const handleSignOut = () => {
    db.auth.signOut();
    setMobileOpen(false);
  };

  const displayName = user?.email?.split("@")[0] || "Member";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1A1A1A] bg-[#FDFCFB]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-none bg-[#1A1A1A] text-[#FDFCFB]">
            <Hammer className="h-4 w-4" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-xl font-black tracking-tighter text-[#1A1A1A]">
              BUILDERSHIFT.
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.18em] italic">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`transition-all underline-offset-4 ${
                currentPage === link.id
                  ? "text-[#F27D26] underline font-extrabold"
                  : "text-[#1A1A1A] hover:underline"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {authLoading ? (
            <div className="h-9 w-32 bg-[#F5F3F0] animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#1A1A1A] truncate max-w-[140px]">
                {displayName}
              </span>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-4 py-2.5 border-2 border-[#1A1A1A] text-[#1A1A1A] text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="px-5 py-2.5 bg-[#F27D26] text-white text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-[#1A1A1A] transition-colors"
            >
              Join the Community
            </button>
          )}
        </div>

        <button
          className="md:hidden p-2 border border-[#1A1A1A] text-[#1A1A1A]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#1A1A1A] bg-[#FDFCFB] px-4 py-4 space-y-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileOpen(false)}
              className={`block text-[11px] font-bold uppercase tracking-[0.18em] italic ${
                currentPage === link.id ? "text-[#F27D26]" : "text-[#1A1A1A]"
              }`}
            >
              {link.label}
            </a>
          ))}
          {authLoading ? null : user ? (
            <>
              <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#1A1A1A] py-1">
                Signed in as {displayName}
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center justify-center gap-1.5 w-full px-5 py-3 border-2 border-[#1A1A1A] text-[#1A1A1A] text-[11px] font-mono font-bold uppercase tracking-widest"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={handleJoinClick}
              className="block w-full px-5 py-3 bg-[#F27D26] text-white text-[11px] font-mono font-bold uppercase tracking-widest text-center"
            >
              Join the Community
            </button>
          )}
        </div>
      )}
    </header>
  );
}
