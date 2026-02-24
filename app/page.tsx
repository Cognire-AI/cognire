"use client";
import { useEffect, useState } from "react";

const features = [
  {
    title: "Resume Intelligence",
    desc: "AI ATS scoring and recruiter-ready rewrites."
  },
  {
    title: "Job Match AI",
    desc: "Real-time job description matching."
  },
  {
    title: "Interview AI",
    desc: "Mock interviews powered by advanced AI."
  },
  {
    title: "Skill Gap Detection",
    desc: "Uncover missing skills instantly."
  },
  {
    title: "Role Optimization",
    desc: "Tailor resume for specific roles."
  }
];

export default function Home() {
  const [active, setActive] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % features.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* COSMIC BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.25),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.25),transparent_50%)]" />
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
            className="bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-2 rounded-lg text-white font-medium"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center text-center px-6 mt-20">
        <h1 className="text-6xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
          AI That Turns Your Resume Into Interviews.
        </h1>

        <p className="mt-8 max-w-3xl text-lg text-zinc-400">
          Cognire uses advanced AI to analyze your CV against real job
          descriptions, uncover hidden skill gaps, optimize for ATS systems,
          and generate recruiter-ready rewrites in seconds.
        </p>

        <div className="mt-10 flex gap-6">
          <a
            href="/dashboard"
            className="bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 rounded-xl text-lg font-medium shadow-lg hover:opacity-90 transition"
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

      {/* REAL CAROUSEL */}
      <section className="relative mt-16 flex justify-center">
        <div className="relative w-full max-w-7xl flex items-center justify-center overflow-visible">

          {features.map((feature, index) => {

            const position =
              (index - active + features.length) % features.length;

            let style = "";
            if (position === 0)
              style =
                "scale-110 opacity-100 z-30 translate-x-0";
            else if (position === 1)
              style =
                "scale-95 opacity-70 z-20 translate-x-[260px]";
            else if (position === 4)
              style =
                "scale-95 opacity-70 z-20 -translate-x-[260px]";
            else
              style =
                "scale-75 opacity-30 z-10";

            return (
              <div
                key={index}
                className={`absolute transition-all duration-700 ease-in-out
                w-[320px] p-8 rounded-3xl text-center backdrop-blur-xl
                border border-white/10
                bg-gradient-to-br from-white/5 to-white/2
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