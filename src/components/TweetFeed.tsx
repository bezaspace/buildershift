import React from "react";
import { 
  ExternalLink, 
  AlertCircle 
} from "lucide-react";

interface TweetData {
  id: string;
  name: string;
  handle: string;
  avatarColor: string;
  avatarText: string;
  verified: boolean;
  isGoldVerified?: boolean;
  content: string;
  date: string;
  likes: string;
  reposts: string;
  replies: string;
  url: string;
}

const TWEETS_ROW1: TweetData[] = [
  {
    id: "2067050300150567071",
    name: "Yağız Nizipli",
    handle: "yagiznizipli",
    avatarColor: "bg-blue-600",
    avatarText: "YN",
    verified: true,
    content: "If you're a developer applying for roles in 2026, stop writing lists of technologies you've 'touched.' Show me your GitHub commits, your open-source pull requests, or a live URL to an app you shipped. Proof of work over credentials, always.",
    date: "Jun 24, 2026",
    likes: "3.2K",
    reposts: "582",
    replies: "124",
    url: "https://x.com/yagiznizipli/status/2067050300150567071"
  },
  {
    id: "2068991244558291041",
    name: "Guillermo Rauch",
    handle: "rauchg",
    avatarColor: "bg-black border border-neutral-800",
    avatarText: "GR",
    verified: true,
    isGoldVerified: true,
    content: "The ultimate resume is a URL. It loads in 100ms, shows your design taste, your ability to handle database load, and your code organization. If your project has active users, you're already in the top 1% of applicants.",
    date: "Jun 27, 2026",
    likes: "12.4K",
    reposts: "2.3K",
    replies: "341",
    url: "https://x.com/rauchg/status/2068991244558291041"
  },
  {
    id: "2069191560382885942",
    name: "Connor",
    handle: "connoratlunon",
    avatarColor: "bg-orange-600",
    avatarText: "C",
    verified: true,
    content: "Looking for hungry full-stack builders at Lunon. Send me a DM with a link to a live app you designed, coded, and launched. If the system is real, fast, and explains the data flows cleanly, we'll bypass the resume screen entirely. Let's build.",
    date: "Jun 28, 2026",
    likes: "1.8K",
    reposts: "234",
    replies: "89",
    url: "https://x.com/connoratlunon/status/2069191560382885942"
  },
  {
    id: "2068551412581902231",
    name: "Gergely Orosz",
    handle: "GergelyOrosz",
    avatarColor: "bg-emerald-600",
    avatarText: "GO",
    verified: true,
    content: "I talk to dozens of engineering managers weekly. The biggest complaint is 'AI-generated resumes.' It's impossible to tell who can actually code. The only solution we're seeing work: look at active GitHub contributions and live project URLs first.",
    date: "Jun 25, 2026",
    likes: "4.9K",
    reposts: "812",
    replies: "198",
    url: "https://x.com/GergelyOrosz/status/2068551412581902231"
  },
  {
    id: "2068112458992019441",
    name: "Kelsey Hightower",
    handle: "kelseyhightower",
    avatarColor: "bg-indigo-600",
    avatarText: "KH",
    verified: true,
    content: "Building a prototype and writing a detailed 'Why I made these technical trade-offs' document is worth more than any certification. It shows empathy for the maintainer and proof you can actually solve problems.",
    date: "Jun 23, 2026",
    likes: "5.5K",
    reposts: "721",
    replies: "109",
    url: "https://x.com/kelseyhightower/status/2068112458992019441"
  }
];

const TWEETS_ROW2: TweetData[] = [
  {
    id: "2068655425705157007",
    name: "William LeGate",
    handle: "williamlegate",
    avatarColor: "bg-[#1A1A1A]",
    avatarText: "WL",
    verified: true,
    isGoldVerified: true,
    content: "We are actively hiring engineering talent. Absolutely zero requirement for college degrees. DM me with links to your best projects, active GitHub repositories, or live web applications that you've personally hosted and deployed. That is the only filter.",
    date: "Jun 26, 2026",
    likes: "8.4K",
    reposts: "1.1K",
    replies: "412",
    url: "https://x.com/williamlegate/status/2068655425705157007"
  },
  {
    id: "2069223145558190291",
    name: "Lee Robinson",
    handle: "leeerob",
    avatarColor: "bg-zinc-800",
    avatarText: "LR",
    verified: true,
    content: "The best developers I know don't just follow tutorials. They find a personal annoyance, build a full-stack tool to solve it, deploy it, and tell the world about it. That curiosity is what great startup teams are starving for.",
    date: "Jun 29, 2026",
    likes: "6.1K",
    reposts: "921",
    replies: "204",
    url: "https://x.com/leeerob/status/2069223145558190291"
  },
  {
    id: "2067881245582910481",
    name: "Tobi Lütke",
    handle: "tobi",
    avatarColor: "bg-green-600",
    avatarText: "TL",
    verified: true,
    isGoldVerified: true,
    content: "Curiosity and a history of shipped projects are the leading indicators of engineering excellence. Show me what you built when nobody was paying you or grading you. That's where the real magic happens.",
    date: "Jun 22, 2026",
    likes: "9.2K",
    reposts: "1.4K",
    replies: "312",
    url: "https://x.com/tobi/status/2067881245582910481"
  },
  {
    id: "2067114589920194452",
    name: "Marc Lou",
    handle: "marclou",
    avatarColor: "bg-yellow-500",
    avatarText: "ML",
    verified: true,
    content: "Stop learning in secret. Build a simple landing page, wire up a SQLite or PostgreSQL database, add a proxy API route, and ship it. Then post the link. The feed will tell you if it's good. Speed is a competitive advantage.",
    date: "Jun 21, 2026",
    likes: "3.7K",
    reposts: "451",
    replies: "112",
    url: "https://x.com/marclou/status/2067114589920194452"
  },
  {
    id: "2066991245582910411",
    name: "Pieter Levels",
    handle: "levelsio",
    avatarColor: "bg-purple-600",
    avatarText: "PL",
    verified: true,
    content: "You don't need a massive architecture to start. Just build a single functional page that solves one problem perfectly, host it, and get users. Shipped code beats perfect code every single time. Just ship it!",
    date: "Jun 20, 2026",
    likes: "15.2K",
    reposts: "3.2K",
    replies: "678",
    url: "https://x.com/levelsio/status/2066991245582910411"
  }
];

function TweetCard({ tweet }: { tweet: TweetData; key?: string }) {
  return (
    <div 
      className="w-[280px] sm:w-[350px] h-[260px] sm:h-[280px] bg-white border-2 border-[#1A1A1A] p-4 sm:p-5 flex flex-col justify-between shrink-0 transition-all hover:shadow-[4px_4px_0px_0px_#1A1A1A] hover:border-[#F27D26]"
    >
      {/* Tweet Header */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Avatar */}
            <div className={`h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center text-white font-bold font-mono text-[10px] sm:text-xs shrink-0 ${tweet.avatarColor}`}>
              {tweet.avatarText}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-bold text-[#1A1A1A] text-xs sm:text-sm tracking-tight font-sans truncate block max-w-[100px] sm:max-w-[140px]">
                  {tweet.name}
                </span>
                {tweet.verified && (
                  <span 
                    className={`inline-flex items-center justify-center text-[10px] font-bold ${tweet.isGoldVerified ? "text-amber-500" : "text-sky-500"} shrink-0`}
                    title={tweet.isGoldVerified ? "Gold Verified Organization" : "Verified Account"}
                  >
                    <svg viewBox="0 0 24 24" aria-label="Verified account" className="h-3.5 w-3.5 fill-current">
                      <g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.17-2.9-.81-3.88s-2.49-1.27-3.88-.81C14.67 2.66 13.43 1.78 12 1.78c-1.43 0-2.67.88-3.34 2.19-1.39-.46-2.9-.17-3.88.81s-1.27 2.49-.81 3.88C2.66 13.33 1.78 14.57 1.78 16c0 1.43.88 2.67 2.19 3.34-.46 1.39-.17 2.9.81 3.88s2.49 1.27 3.88.81c.67 1.31 1.91 2.19 3.34 2.19 1.43 0 2.67-.88 3.34-2.19 1.39.46 2.9.17 3.88-.81s1.27-2.49.81-3.88c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.25l-3.5-3.5 1.41-1.42 2.09 2.08 5.14-5.14 1.42 1.42-6.56 6.56z"></path></g>
                    </svg>
                  </span>
                )}
              </div>
              <span className="text-gray-400 text-[10px] font-mono block truncate">
                @{tweet.handle}
              </span>
            </div>
          </div>

          {/* Original link */}
          <a 
            href={tweet.url}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="inline-flex items-center gap-1.5 p-1.5 border border-[#1A1A1A] bg-[#F5F3F0] hover:bg-[#1A1A1A] hover:text-[#FDFCFB] text-[10px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
            title="View original on X"
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Tweet Content */}
        <div className="my-3">
          <p className="text-gray-800 text-[11px] sm:text-xs leading-relaxed font-sans line-clamp-5 sm:line-clamp-6">
            {tweet.content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TweetFeed() {
  return (
    <section id="hiring-signals" className="py-24 bg-[#FDFCFB] border-b border-[#1A1A1A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Header Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#F27D26] uppercase tracking-widest block mb-3">
                [DEMAND SIGNALS]
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif italic text-[#1A1A1A] tracking-tight leading-none mb-4">
                The Proof is the Filter.
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed font-sans font-light">
                Recruiters, founders, and engineering leaders are bypassing traditional HR channels. They want active public evidence of competency.
              </p>
            </div>

            <div className="space-y-4 border-l-2 border-[#F27D26] pl-4 py-1">
              <p className="text-xs text-gray-500 italic">
                "We look at the live project demo first. If we can see your GitHub commits and understand how you resolved system trade-offs, we don't even open your resume."
              </p>
              <span className="text-[10px] font-mono font-bold text-gray-400 block uppercase tracking-widest">
                — Global Tech Recruitment Trend
              </span>
            </div>

            <div className="bg-[#F5F3F0] p-5 border border-[#1A1A1A]/10 space-y-3 font-mono text-xs text-gray-600">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-[10px] uppercase">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>The Resume Screening Crisis</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                With generic AI resumes flooding job boards, managers now prioritize direct project verification over pedigree. Your public proof-of-work is your only un-copiable edge.
              </p>
            </div>

            <div className="border border-[#F27D26]/30 bg-[#F27D26]/5 p-4">
              <p className="text-[10px] font-mono text-[#F27D26] uppercase tracking-widest font-bold mb-1">Sample Signals</p>
              <p className="text-[11px] text-gray-600 leading-relaxed font-sans">
                The tweets below are design placeholders. We will replace them with real embedded tweets from hiring managers and founders before launch.
              </p>
            </div>
          </div>

          {/* Tweets Column */}
          <div className="lg:col-span-8 space-y-8 overflow-hidden">

            {/* Marquee Wrapper */}
            <div className="space-y-6 relative">
              {/* Fade Overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#FDFCFB] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#FDFCFB] to-transparent z-10 pointer-events-none" />

              {/* Carousel 1: Leftward moving */}
              <div className="relative w-full overflow-hidden py-1.5 group">
                <div className="flex w-max group-hover:[animation-play-state:paused]">
                  <div className="flex gap-6 pr-6 shrink-0 animate-marquee-left">
                    {TWEETS_ROW1.map((tweet, i) => (
                      <TweetCard key={`row1-copy1-${tweet.id}-${i}`} tweet={tweet} />
                    ))}
                  </div>
                  <div className="flex gap-6 pr-6 shrink-0 animate-marquee-left">
                    {TWEETS_ROW1.map((tweet, i) => (
                      <TweetCard key={`row1-copy2-${tweet.id}-${i}`} tweet={tweet} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Carousel 2: Rightward moving */}
              <div className="relative w-full overflow-hidden py-1.5 group">
                <div className="flex w-max group-hover:[animation-play-state:paused]">
                  <div className="flex gap-6 pr-6 shrink-0 animate-marquee-right">
                    {TWEETS_ROW2.map((tweet, i) => (
                      <TweetCard key={`row2-copy1-${tweet.id}-${i}`} tweet={tweet} />
                    ))}
                  </div>
                  <div className="flex gap-6 pr-6 shrink-0 animate-marquee-right">
                    {TWEETS_ROW2.map((tweet, i) => (
                      <TweetCard key={`row2-copy2-${tweet.id}-${i}`} tweet={tweet} />
                    ))}
                  </div>
                </div>
              </div>
            </div>



          </div>

        </div>
      </div>
    </section>
  );
}
