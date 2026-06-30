import React from "react";
import { Terminal, BrainCircuit, Rocket, ShieldAlert, BadgeCheck, ArrowRight } from "lucide-react";

export default function ParadigmComparison() {
  const shifts = [
    {
      id: "learning",
      title: "Learning & Application",
      icon: BrainCircuit,
      old: {
        title: "The Legacy CS Student",
        desc: "Memorizing LeetCode templates, collecting generic completion certificates, and building cloned weather widgets that hundreds of other students have in their GitHub repositories.",
        points: [
          "Endless theoretical grinding without building anything real",
          "Tutorial Hell: Blindly copying YouTube tutorial code line-by-line",
          "Zero understanding of deployment, domain registers, or live APIs"
        ]
      },
      new: {
        title: "The AI-Augmented Builder",
        desc: "Mastering system core fundamentals, and using AI as an elite co-founder to skip boilerplate and build high-fidelity interactive SaaS MVPs in days.",
        points: [
          "Active learning: Instructing AI to explain complex system choices",
          "End-to-end focus: Knowing how backends, proxies, and webhooks tie together",
          "Live delivery: Deploying projects to production from day one"
        ]
      }
    },
    {
      id: "ai-tooling",
      title: "AI Collaboration Style",
      icon: Rocket,
      old: {
        title: "Fearing or Cheating",
        desc: "Treating AI either as a threat that is stealing software engineering jobs, or as a cheating utility to write university homework assignments without understanding the underlying logic.",
        points: [
          "Using AI to bypass coding, resulting in shallow system knowledge",
          "Getting stuck when AI hallucinations occur because basics are missing",
          "Anxiety that junior development roles are entirely disappearing"
        ]
      },
      new: {
        title: "Intelligent Augmentation",
        desc: "Using AI as a super-powered assistant that automates routine boilerplates, letting you focus entirely on systems architecture, data flows, and direct user value.",
        points: [
          "Leveraging LLMs for lightning-fast prototyping and code scaffolding",
          "Debugging complex systems by asking AI for structural reviews",
          "Focusing on product scope, UI excellence, and system interactions"
        ]
      }
    },
    {
      id: "resume",
      title: "How You Show Competence",
      icon: Terminal,
      old: {
        title: "The Passive PDF Resume",
        desc: "Submitting generic PDF resumes to thousands of online portals, relying solely on degrees and bullet points about classroom group projects that look identical to every classmate.",
        points: [
          "Relying on university GPA to prove practical engineering capability",
          "Listing 'Python, JavaScript, React' as keywords without any visual proof",
          "Code bases that sit dead in private, non-descript repositories"
        ]
      },
      new: {
        title: "Public Proof of Work",
        desc: "Creating high-impact proof-of-work: deployed, functional web links, engaging interactive documentations, and quick walk-through video demos that prove you can ship.",
        points: [
          "A 2-minute Loom walk-through highlighting real architecture choices",
          "Deployed URLs with user traffic, telemetry, or custom domains",
          "Clean GitHub READMEs written like high-end developer manuals"
        ]
      }
    }
  ];

  return (
    <section id="why-shift" className="py-24 bg-[#FDFCFB] border-y border-[#1A1A1A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-baseline border-b border-[#1A1A1A] pb-12 mb-16">
          <div className="lg:col-span-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#F27D26] block mb-3 font-mono">
              [THE REALITY SHIFT]
            </span>
            <h2 className="text-5xl sm:text-6xl font-serif italic text-[#1A1A1A] leading-[1.0]">
              The Bar<br />Has Changed.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-xl sm:text-2xl font-light text-[#1A1A1A] leading-relaxed mb-6 font-serif italic">
              Hiring managers no longer care about your school syllabus. In an era of infinite code generation, companies search for builders who can take complete ownership of a product and deliver real-world outcomes.
            </p>
            <p className="text-sm text-gray-500 font-sans leading-relaxed">
              Below is the objective layout of the old theoretical paradigm versus the high-agency shipping paradigm. Study the gaps, identify where you stand, and choose to make the leap.
            </p>
          </div>
        </div>



        <div className="space-y-16">
          {shifts.map((shift, idx) => {
            const IconComponent = shift.icon;
            return (
              <div 
                key={shift.id} 
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border-b border-gray-200 pb-16 last:border-0 last:pb-0"
              >
                {/* Left Side: Topic details */}
                <div className="lg:col-span-3 flex flex-col justify-between py-2">
                  <div className="space-y-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center bg-[#F5F3F0] border border-[#1A1A1A] text-[#1A1A1A]">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-serif italic font-semibold text-[#1A1A1A]">
                      0{idx + 1}. {shift.title}
                    </h3>
                  </div>
                  <div className="text-[10px] font-mono font-bold tracking-[0.2em] text-gray-400 uppercase mt-4">
                    SYSTEM_PARADIGM_SHIFT_0{idx + 1}
                  </div>
                </div>

                {/* Left Box: Obsolete Method */}
                <div className="lg:col-span-4 bg-[#F5F3F0] p-6 border border-[#1A1A1A]/20 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-rose-700 font-mono text-[10px] uppercase tracking-widest font-bold mb-4">
                      <ShieldAlert className="h-4 w-4 shrink-0" />
                      <span>The Obsolete Path</span>
                    </div>
                    <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">{shift.old.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-6 italic">{shift.old.desc}</p>
                    <ul className="space-y-3">
                      {shift.old.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                          <span className="text-rose-600 font-bold shrink-0 mt-0.5 font-mono">[-]</span>
                          <span className="line-through decoration-[#1A1A1A]/40">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-[9px] font-mono text-gray-400 font-bold uppercase tracking-wider mt-8 pt-4 border-t border-[#1A1A1A]/10">
                    REPLACED BY AUTOMATION
                  </div>
                </div>

                {/* Middle Arrow Accent */}
                <div className="hidden lg:flex lg:col-span-1 flex-col justify-center items-center">
                  <div className="h-10 w-10 rounded-full border border-[#1A1A1A] flex items-center justify-center bg-[#FDFCFB] shadow-sm">
                    <ArrowRight className="h-5 w-5 text-[#F27D26]" />
                  </div>
                </div>

                {/* Right Box: The Modern Builder */}
                <div className="lg:col-span-4 bg-[#1A1A1A] text-[#FDFCFB] p-6 border border-[#1A1A1A] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[#F27D26] font-mono text-[10px] uppercase tracking-widest font-bold mb-4">
                      <BadgeCheck className="h-4 w-4 shrink-0" />
                      <span>The Builder Path</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{shift.new.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6 italic">{shift.new.desc}</p>
                    <ul className="space-y-3">
                      {shift.new.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-200">
                          <span className="text-[#F27D26] font-bold shrink-0 mt-0.5 font-mono">[✓]</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-[9px] font-mono text-[#F27D26] font-bold uppercase tracking-wider mt-8 pt-4 border-t border-[#FDFCFB]/10">
                    HIGHLY EMPLOYABLE IN AI AGE
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Highlight Block */}
        <div className="mt-20 border-t-2 border-[#1A1A1A] pt-8 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="md:w-1/3">
            <div className="text-5xl font-black text-[#1A1A1A] tracking-tighter">42%</div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#F27D26] mt-1">GPA Requirements Remaining</div>
            <p className="text-xs text-gray-500 mt-2">Down from 73% in 2019. Employers are moving away from degree-first filters toward skills-based hiring.</p>
          </div>
          <div className="md:w-1/3">
            <div className="text-5xl font-black text-[#1A1A1A] tracking-tighter">92%</div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#F27D26] mt-1">Recruiters Check GitHub</div>
            <p className="text-xs text-gray-500 mt-2">They look at contribution patterns and real project URLs, not just green squares or resume keywords.</p>
          </div>
          <div className="md:w-1/3 border-l border-gray-300 pl-6 italic text-gray-600 text-sm leading-relaxed font-serif">
            "The computer science degree is no longer a golden ticket. Today, the ticket is a deployed, interactive web URL that solves a real technical problem and stands on its own."
            <div className="mt-2 text-[10px] font-mono uppercase tracking-wider text-gray-400 not-italic font-bold">
              — WHAT WE BELIEVE IN BUILDERSHIFT
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
