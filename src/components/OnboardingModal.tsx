import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, ArrowLeft, Check, SkipForward, Loader2 } from "lucide-react";
import db from "../lib/db";

// ---------------------------------------------------------------------------
// Onboarding step definitions
// ---------------------------------------------------------------------------
// Each step has one or more questions. Single-select questions store a string;
// multi-select questions store a string[] (persisted as JSON in InstantDB).

type QuestionOption = {
  label: string;
  value: string;
  desc?: string;
};

type Question = {
  id: string;
  prompt: string;
  helper?: string;
  multi: boolean;
  options: QuestionOption[];
};

type Step = {
  id: string;
  title: string;
  questions: Question[];
};

const STEPS: Step[] = [
  {
    id: "role",
    title: "Who are you becoming?",
    questions: [
      {
        id: "role",
        prompt: "Which best describes you right now?",
        helper: "Pick the one that fits closest. You can change this later.",
        multi: false,
        options: [
          { label: "CS Student", value: "cs-student", desc: "Currently in a CS or related program" },
          { label: "Self-Taught Builder", value: "self-taught", desc: "Learning outside a formal program" },
          { label: "Career Switcher", value: "career-switcher", desc: "Coming into dev from another field" },
          { label: "Recent Grad", value: "recent-grad", desc: "Out of school, hunting for the first role" },
        ],
      },
    ],
  },
  {
    id: "interests",
    title: "What do you want to build?",
    questions: [
      {
        id: "buildInterests",
        prompt: "Which areas excite you the most?",
        helper: "Select all that apply — we'll surface relevant build sessions.",
        multi: true,
        options: [
          { label: "Web Apps", value: "web-apps", desc: "Full-stack SaaS, dashboards, marketplaces" },
          { label: "AI / LLM Tools", value: "ai-llm-tools", desc: "Agents, RAG, model integrations" },
          { label: "Mobile Apps", value: "mobile-apps", desc: "React Native, Expo, native" },
          { label: "Dev Tools", value: "dev-tools", desc: "CLIs, editors, infra, automation" },
          { label: "Games", value: "games", desc: "Interactive, real-time, engines" },
          { label: "Hardware / IoT", value: "hardware-iot", desc: "Embedded, robotics, edge" },
        ],
      },
    ],
  },
  {
    id: "experience",
    title: "Where are you on the path?",
    questions: [
      {
        id: "experienceLevel",
        prompt: "How much have you shipped so far?",
        helper: "Be honest — this helps us pair you with the right peers.",
        multi: false,
        options: [
          { label: "Just Starting", value: "beginner", desc: "Learning the basics, no projects yet" },
          { label: "A Few Projects", value: "intermediate", desc: "Built tutorials, nothing fully live" },
          { label: "Shipping Live", value: "advanced", desc: "Deployed real apps with users" },
          { label: "Shipping Often", value: "expert", desc: "Multiple live projects, fluent end-to-end" },
        ],
      },
    ],
  },
  {
    id: "goals",
    title: "What brings you here?",
    questions: [
      {
        id: "goals",
        prompt: "What do you want out of BuilderShift?",
        helper: "Select all that apply.",
        multi: true,
        options: [
          { label: "Land an Internship", value: "internship", desc: "Get hired into a dev role" },
          { label: "Build a Portfolio", value: "portfolio", desc: "Create proof-of-work that stands out" },
          { label: "Find Co-Founders", value: "cofounders", desc: "Meet builders to start something with" },
          { label: "Learn AI Tooling", value: "ai-tooling", desc: "Get fluent with LLM-assisted dev" },
          { label: "Ship a Side Project", value: "side-project", desc: "Finally launch that idea" },
          { label: "Just Explore", value: "explore", desc: "See what the community is about" },
        ],
      },
    ],
  },
  {
    id: "stack",
    title: "What's in your toolbox?",
    questions: [
      {
        id: "stack",
        prompt: "Which tools do you already use?",
        helper: "Select all that apply. Don't worry if it's a short list.",
        multi: true,
        options: [
          { label: "JavaScript / TypeScript", value: "js-ts" },
          { label: "Python", value: "python" },
          { label: "React / Next.js", value: "react-next" },
          { label: "Go / Rust", value: "go-rust" },
          { label: "InstantDB / Supabase / Firebase", value: "backend-baas" },
          { label: "Just AI Assistants", value: "ai-assistants", desc: "Cursor, Claude, Copilot, etc." },
        ],
      },
    ],
  },
];

const TOTAL_STEPS = STEPS.length;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type AnswersMap = Record<string, string | string[]>;

function getInitialAnswers(): AnswersMap {
  const map: AnswersMap = {};
  STEPS.forEach((step) => {
    step.questions.forEach((q) => {
      map[q.id] = q.multi ? [] : "";
    });
  });
  return map;
}

function isStepAnswered(step: Step, answers: AnswersMap): boolean {
  return step.questions.every((q) => {
    const v = answers[q.id];
    if (q.multi) return Array.isArray(v) && v.length > 0;
    return typeof v === "string" && v.length > 0;
  });
}

// ---------------------------------------------------------------------------
// Option chip
// ---------------------------------------------------------------------------

type OptionChipProps = {
  option: QuestionOption;
  selected: boolean;
  multi: boolean;
  onToggle: () => void;
};

const OptionChip: React.FC<OptionChipProps> = ({
  option,
  selected,
  multi,
  onToggle,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full text-left p-4 border-2 transition-all flex items-start gap-3 ${
        selected
          ? "border-[#F27D26] bg-[#F27D26]/5"
          : "border-[#1A1A1A]/20 bg-white hover:border-[#1A1A1A]"
      }`}
    >
      <span
        className={`mt-0.5 shrink-0 inline-flex h-5 w-5 items-center justify-center border-2 ${
          selected ? "border-[#F27D26] bg-[#F27D26] text-white" : "border-[#1A1A1A]/30 text-transparent"
        } ${multi ? "rounded-sm" : "rounded-full"}`}
      >
        {selected && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
      <span className="flex flex-col gap-0.5 min-w-0">
        <span className="text-sm font-bold text-[#1A1A1A] font-sans">{option.label}</span>
        {option.desc && (
          <span className="text-[11px] text-gray-500 font-sans leading-snug">{option.desc}</span>
        )}
      </span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main modal
// ---------------------------------------------------------------------------

export default function OnboardingModal() {
  const { isLoading: authLoading, user } = db.useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  // Subscribe to the signed-in user's profile so we know whether onboarding
  // has already been completed or skipped. The query is gated on `user` so it
  // is only sent once authenticated.
  const {
    isLoading: queryLoading,
    data,
  } = db.useQuery(
    user ? { $users: { $: { where: { id: user.id } } } } : null as never
  );

  // Decide whether to show the modal once auth + profile are settled.
  useEffect(() => {
    if (authLoading || queryLoading) return;
    if (!user) {
      setIsOpen(false);
      setHasChecked(false);
      return;
    }
    // Only auto-open on the very first time we see a user with no onboarding
    // flag set. Read the flags from the queried profile record.
    const profile = data?.$users?.[0] as
      | { onboardingCompleted?: boolean; onboardingSkipped?: boolean }
      | undefined;
    const completed = profile?.onboardingCompleted;
    const skipped = profile?.onboardingSkipped;
    if (!completed && !skipped && !hasChecked) {
      setIsOpen(true);
      setHasChecked(true);
    }
  }, [authLoading, queryLoading, user, hasChecked, data]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <OnboardingDialog
          userId={user.id}
          onClose={() => setIsOpen(false)}
        />
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Dialog (keeps its own local answers state until submitted/skipped)
// ---------------------------------------------------------------------------

function OnboardingDialog({
  userId,
  onClose,
}: {
  userId: string;
  onClose: () => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswersMap>(getInitialAnswers);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const step = STEPS[stepIndex];
  const isLast = stepIndex === TOTAL_STEPS - 1;
  const currentAnswered = isStepAnswered(step, answers);

  function toggleOption(qid: string, value: string, multi: boolean) {
    setAnswers((prev) => {
      if (multi) {
        const arr = (prev[qid] as string[]) ?? [];
        return {
          ...prev,
          [qid]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
        };
      }
      return { ...prev, [qid]: value };
    });
  }

  async function persist(payload: Record<string, unknown>) {
    await db.transact([db.tx.$users[userId].update(payload)]);
  }

  function handleNext() {
    if (stepIndex < TOTAL_STEPS - 1) {
      setStepIndex((i) => i + 1);
    }
  }

  function handleBack() {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }

  async function handleFinish() {
    setSubmitting(true);
    setError(null);
    try {
      await persist({
        role: answers.role || undefined,
        buildInterests: answers.buildInterests || undefined,
        experienceLevel: answers.experienceLevel || undefined,
        goals: answers.goals || undefined,
        stack: answers.stack || undefined,
        onboardingCompleted: true,
        onboardingSkipped: false,
      });
      onClose();
    } catch (err) {
      setError(
        (err as Error)?.message || "Could not save your answers. Try again."
      );
      setSubmitting(false);
    }
  }

  async function handleSkip() {
    setSubmitting(true);
    setError(null);
    try {
      // Persist whatever was answered so far, but mark as skipped so we never
      // re-prompt the user.
      await persist({
        role: answers.role || undefined,
        buildInterests: answers.buildInterests || undefined,
        experienceLevel: answers.experienceLevel || undefined,
        goals: answers.goals || undefined,
        stack: answers.stack || undefined,
        onboardingCompleted: false,
        onboardingSkipped: true,
      });
      onClose();
    } catch (err) {
      setError(
        (err as Error)?.message || "Something went wrong. Try again."
      );
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleSkip}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-lg bg-[#FDFCFB] border-2 border-[#1A1A1A] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#1A1A1A]/10">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#F27D26] uppercase tracking-widest block mb-1">
              [WELCOME ABOARD]
            </span>
            <h2 className="text-xl font-serif italic text-[#1A1A1A] leading-tight">
              Let's get you set up.
            </h2>
          </div>
          <button
            onClick={handleSkip}
            aria-label="Skip onboarding"
            disabled={submitting}
            className="text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors disabled:opacity-40"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
              Step {stepIndex + 1} of {TOTAL_STEPS}
            </span>
            <span className="text-[10px] font-mono text-gray-400">
              {Math.round(((stepIndex + 1) / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          <div className="h-1 w-full bg-[#1A1A1A]/10">
            <motion.div
              className="h-full bg-[#F27D26]"
              initial={false}
              animate={{ width: `${((stepIndex + 1) / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.25 }}
            />
          </div>
        </div>

        {/* Scrollable step body */}
        <div className="px-6 py-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.18 }}
            >
              <h3 className="text-2xl font-serif italic font-bold text-[#1A1A1A] mb-1">
                {step.title}
              </h3>
              <div className="space-y-6 mt-4">
                {step.questions.map((q) => (
                  <div key={q.id}>
                    <p className="text-sm font-bold text-[#1A1A1A] font-sans mb-1">
                      {q.prompt}
                    </p>
                    {q.helper && (
                      <p className="text-[11px] text-gray-500 font-sans mb-3 leading-snug">
                        {q.helper}
                      </p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      {q.options.map((opt) => {
                        const v = answers[q.id];
                        const selected = q.multi
                          ? Array.isArray(v) && v.includes(opt.value)
                          : v === opt.value;
                        return (
                          <OptionChip
                            key={opt.value}
                            option={opt}
                            selected={selected}
                            multi={q.multi}
                            onToggle={() => toggleOption(q.id, opt.value, q.multi)}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {error && (
            <div className="mt-4 px-4 py-3 border-2 border-rose-600 bg-rose-50 text-rose-700 text-xs font-mono">
              {error}
            </div>
          )}
        </div>

        {/* Footer / nav */}
        <div className="px-6 py-4 border-t border-[#1A1A1A]/10 flex items-center justify-between gap-3">
          <button
            onClick={handleSkip}
            disabled={submitting}
            className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-gray-500 hover:text-[#1A1A1A] transition-colors disabled:opacity-40"
          >
            <SkipForward className="h-3.5 w-3.5" />
            Skip
          </button>

          <div className="flex items-center gap-2">
            {stepIndex > 0 && (
              <button
                onClick={handleBack}
                disabled={submitting}
                className="flex items-center gap-1.5 px-4 py-2.5 border-2 border-[#1A1A1A] text-[#1A1A1A] text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-[#F5F3F0] transition-colors disabled:opacity-40"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>
            )}

            {isLast ? (
              <button
                onClick={handleFinish}
                disabled={submitting || (!currentAnswered && false)}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-[#F27D26] text-white text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-[#1A1A1A] transition-colors disabled:opacity-40"
              >
                {submitting ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                )}
                {submitting ? "Saving" : "Finish"}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={submitting}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-[#1A1A1A] text-white text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-[#F27D26] transition-colors disabled:opacity-40"
              >
                Next
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
