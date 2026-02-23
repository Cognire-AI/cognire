"use client";

import { useEffect, useState } from "react";

const features = [
  {
    title: "Resume Intelligence",
    desc: "AI-powered ATS scoring, keyword optimization and recruiter-ready rewrites.",
  },
  {
    title: "Job Match AI",
    desc: "Compare your CV against real job descriptions with match percentage.",
  },
  {
    title: "Interview AI",
    desc: "Mock interviews powered by AI tailored to your resume.",
  },
  {
    title: "Skill Gap Detection",
    desc: "Uncover hidden missing skills from real job descriptions.",
  },
  {
    title: "Role-Based Optimization",
    desc: "Customize resume for specific job roles instantly.",
  },
];

export default function FeatureCarousel() {
  const [active, setActive] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % features.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center gap-6 mt-20 overflow-hidden">
      {features.map((feature, index) => {
        const isActive = index === active;

        return (
          <div
            key={index}
            className={`transition-all duration-700 ease-in-out rounded-2xl p-6 w-72
              ${isActive
                ? "scale-110 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/50 shadow-2xl"
                : "scale-90 bg-white/5 border border-white/10 opacity-60"
              }
            `}
          >
            <h3 className="text-lg font-semibold text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-sm text-zinc-400">
              {feature.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}