"use client";

import { useState, useEffect } from "react";

type Step = "resume" | "jd" | "analyzing" | "result";

export default function CortexPage() {
  const [step, setStep] = useState<Step>("resume");
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<any>(null);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [thinkingText, setThinkingText] = useState<string>("");

  const thinkingStages = [
    "Reviewing your experience...",
    "Mapping alignment signals...",
    "Evaluating perception risk...",
    "Constructing advisory brief..."
  ];

  // ---------- ANALYZE ----------
  async function handleAnalyze() {
    if (!resume || !jobDescription) return;

    setStep("analyzing");
    setThinkingText(thinkingStages[0]);

    let stageIndex = 0;
    const stageInterval = setInterval(() => {
      stageIndex = (stageIndex + 1) % thinkingStages.length;
      setThinkingText(thinkingStages[stageIndex]);
    }, 1200);

    const startTime = Date.now();

    const response = await fetch("/api/cortex/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume, jobDescription }),
    });

    const data = await response.json();

    const elapsed = Date.now() - startTime;
    const minimumDuration = 3000;

    if (elapsed < minimumDuration) {
      await new Promise((r) => setTimeout(r, minimumDuration - elapsed));
    }

    clearInterval(stageInterval);

    setResult(data);
    setStep("result");

    const sections = ["narrative", "metrics", "strengths", "gaps", "moves"];
    sections.forEach((section, index) => {
      setTimeout(() => {
        setVisibleSections((prev) => [...prev, section]);
      }, index * 1200);
    });
  }

  // ---------- Animated Counter ----------
  function useCountUp(target: number, trigger: boolean) {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!trigger) return;
      let start = 0;
      const duration = 1500;
      const increment = target / (duration / 16);

      const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(counter);
    }, [target, trigger]);

    return count;
  }

  const overall = useCountUp(result?.overall_score || 0, visibleSections.includes("metrics"));
  const jdMatch = useCountUp(result?.jd_match_score || 0, visibleSections.includes("metrics"));

  // ---------- Doughnut Component ----------
  function Doughnut({ value }: { value: number }) {
    const radius = 50;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="rgba(255,255,255,0.1)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="url(#grad)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset, transition: "stroke-dashoffset 1.5s ease" }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <defs>
          <linearGradient id="grad">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="18"
          fontWeight="bold"
        >
          {value}
        </text>
      </svg>
    );
  }

  // ---------- STATUS BAR ----------
  function StatusBar() {
    const items = [
      { label: "Resume", active: step !== "resume" },
      { label: "Job Description", active: step === "jd" || step === "analyzing" || step === "result" },
      { label: "Cortex Analysis", active: step === "analyzing" || step === "result" },
    ];

    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex justify-between mb-8">
        {items.map((item, i) => (
          <div key={i} className={`text-sm ${item.active ? "text-indigo-400" : "text-white/40"}`}>
            {item.label}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white px-10 py-10">

      <StatusBar />

      {/* STEP 1 */}
      {step === "resume" && (
        <div className="max-w-3xl mx-auto space-y-6">
          <textarea
            placeholder="Paste your resume..."
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            className="w-full h-64 bg-white/5 border border-white/10 rounded-xl p-4"
          />
          <button
            onClick={() => setStep("jd")}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl"
          >
            Next — Add Job Description
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === "jd" && (
        <div className="max-w-3xl mx-auto space-y-6">
          <textarea
            placeholder="Paste job description..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-64 bg-white/5 border border-white/10 rounded-xl p-4"
          />
          <button
            onClick={handleAnalyze}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl"
          >
            Analyze with Cortex
          </button>
        </div>
      )}

      {/* THINKING OVERLAY */}
      {step === "analyzing" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-xl">
          <div className="text-indigo-400 text-lg animate-pulse">
            {thinkingText}
          </div>
        </div>
      )}

      {/* RESULT */}
      {step === "result" && result && (
        <div className="max-w-5xl mx-auto space-y-12">

          {visibleSections.includes("narrative") && (
            <div className="bg-white/5 border border-indigo-400/20 rounded-2xl p-8">
              <h3 className="text-indigo-400 mb-4 uppercase text-sm tracking-wider">
                Cortex Strategic Brief
              </h3>
              <p className="leading-relaxed whitespace-pre-line">
                {result.cortex_narrative}
              </p>
            </div>
          )}

          {visibleSections.includes("metrics") && (
            <div className="flex gap-16 justify-center">
              <Doughnut value={overall} />
              <Doughnut value={jdMatch} />
            </div>
          )}

          {visibleSections.includes("strengths") && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h4 className="text-indigo-400 mb-3">Positioning Strengths</h4>
              <p>{result.positioning_strengths}</p>
            </div>
          )}

          {visibleSections.includes("gaps") && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h4 className="text-purple-400 mb-3">Strategic Gaps</h4>
              <p>{result.strategic_gaps}</p>
            </div>
          )}

          {visibleSections.includes("moves") && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h4 className="mb-3">Recommended Next Moves</h4>
              <p>{result.recommended_next_moves}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}