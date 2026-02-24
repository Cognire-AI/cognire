"use client";
import { useEffect, useState } from "react";

const features = [
  { title: "Resume Intelligence", desc: "AI ATS scoring and recruiter-ready rewrites." },
  { title: "Job Match AI", desc: "Real-time job description matching." },
  { title: "Interview AI", desc: "Mock interviews powered by advanced AI." },
  { title: "Skill Gap Detection", desc: "Uncover missing skills instantly." },
  { title: "Role Optimization", desc: "Tailor resume for specific roles." }
];

export default function Home() {
  const [active, setActive] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen text-white overflow-hidden">

      {/* ENHANCED COSMIC BACKGROUND */}
        <div className="absolute inset-0 -z-10 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,191,255,0.25),transparent_50%)] blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.25),transparent_50%)] blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_60%)] blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      </div>

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold">
          Cognire<span className="text-cyan-400">AI</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          <a href="#">Features</a>
          <a href="#">How It Works</a>
          <a href="#">Pricing</a>
          <a href="/auth/login">Login</a>
          <a
            href="/dashboard"
            className="bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-2 rounded-lg text-white font-medium shadow-lg"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center text-center px-6 mt-12">
        <h1 className="text-6xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
          AI That Turns Your Resume Into Interviews.
        </h1>

        <p className="mt-6 max-w-3xl text-lg text-zinc-400">
          Cognire uses advanced AI to analyze your CV against real job
          descriptions, uncover hidden skill gaps, optimize for ATS systems,
          and generate recruiter-ready rewrites in seconds.
        </p>

        <div className="mt-6 flex gap-6">
          <a
            href="/dashboard"
            className="bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 rounded-xl text-lg font-medium shadow-xl hover:opacity-90 transition"
          >
            Get Started Free
          </a>

          <a
            href="/dashboard"
            className="border border-zinc-700 px-8 py-4 rounded-xl text-lg hover:border-zinc-500 transition"
          >
            Analyze My Resume
          </a>
        </div>
      </section>

{/* TRUE SYMMETRICAL 5-LAYER DEPTH CAROUSEL */}
<section className="relative mt-12 flex justify-center">
  <div className="relative w-full max-w-7xl h-[380px] flex items-center justify-center">

    {features.map((feature, index) => {

      const offset = index - active;
      const total = features.length;

      // normalize offset to circular range (-2 → 2)
      const position =
        ((offset + total + Math.floor(total / 2)) % total) -
        Math.floor(total / 2);

      let style = "";

      switch (position) {
        case 0:
          style = "translate-x-0 scale-110 opacity-100 z-30";
          break;
        case 1:
          style = "translate-x-[260px] scale-95 opacity-80 z-20";
          break;
        case -1:
          style = "-translate-x-[260px] scale-95 opacity-80 z-20";
          break;
        case 2:
          style = "translate-x-[520px] scale-75 opacity-40 z-10";
          break;
        case -2:
          style = "-translate-x-[520px] scale-75 opacity-40 z-10";
          break;
        default:
          style = "opacity-0 pointer-events-none";
      }

      return (
        <div
          key={index}
          className={`absolute w-[320px] p-8 rounded-3xl text-center
          backdrop-blur-2xl border border-white/10
          bg-gradient-to-br from-white/5 to-white/[0.02]
          shadow-[0_0_80px_rgba(0,255,255,0.05)]
          transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${style}`}
        >
          <h3 className="text-xl font-semibold mb-4">
            {feature.title}
          </h3>
          <p className="text-sm text-zinc-400">
            {feature.desc}
          </p>
        </div>
      );
    })}
  </div>
</section>

      <section className="mt-24 text-center text-zinc-500 text-sm pb-16">
        Empowering your career journey with AI precision.
      </section>

    </main>
  );
}