import React from "react";
import { Hammer } from "lucide-react";
import db from "../lib/db";
import { useAuthModal } from "../context/AuthModalContext";

export default function Footer() {
  const { openAuthModal } = useAuthModal();
  const { user } = db.useAuth();

  return (
    <footer className="bg-[#FDFCFB] border-t border-[#1A1A1A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-none bg-[#1A1A1A] text-[#FDFCFB]">
                <Hammer className="h-4 w-4" />
              </div>
              <span className="font-display text-xl font-black tracking-tighter text-[#1A1A1A]">
                BUILDERSHIFT.
              </span>
            </div>
            <p className="text-sm text-gray-600 font-sans leading-relaxed max-w-sm">
              A community for CS students who believe the best way to stand out in 2026 is to ship real projects and share the proof.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#F27D26]">Community</h4>
              <ul className="space-y-2 text-xs text-gray-600 font-sans">
                <li><a href="#manifesto" className="hover:text-[#F27D26] transition-colors">The Manifesto</a></li>
                <li><a href="#why-shift" className="hover:text-[#F27D26] transition-colors">The Paradigm</a></li>
                <li><a href="#hiring-signals" className="hover:text-[#F27D26] transition-colors">Demand Signals</a></li>
                <li>
                  {user ? (
                    <span className="text-[#1A1A1A]/40">You're a member</span>
                  ) : (
                    <button onClick={openAuthModal} className="hover:text-[#F27D26] transition-colors text-left">
                      Join Us
                    </button>
                  )}
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#F27D26]">Connect</h4>
              <ul className="space-y-2 text-xs text-gray-600 font-sans">
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F27D26] transition-colors">Twitter / X</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F27D26] transition-colors">LinkedIn</a></li>
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#F27D26] transition-colors">GitHub</a></li>
                <li><a href="mailto:hello@buildershift.dev" className="hover:text-[#F27D26] transition-colors">Email</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#F27D26]">Legal</h4>
              <ul className="space-y-2 text-xs text-gray-600 font-sans">
                <li><span className="cursor-pointer hover:text-[#F27D26] transition-colors">Privacy Policy</span></li>
                <li><span className="cursor-pointer hover:text-[#F27D26] transition-colors">Code of Conduct</span></li>
                <li><span className="cursor-pointer hover:text-[#F27D26] transition-colors">Terms</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
            © 2026 BuilderShift. Built by students, for students.
          </p>
          <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
            Ship in public. Let the build do the talking.
          </p>
        </div>
      </div>
    </footer>
  );
}
