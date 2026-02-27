"use client";

import { useState } from "react";
import MetricRing from "@/components/MetricRing";

export default function CortexPage() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  async function handleAnalyze() {
    if (!resume || !jobDescription) return;

    setLoading(true);
    setResult(null);
    setVisibleSections([]);

    const startTime = Date.now();

    const response = await fetch("/api/cortex/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume, jobDescription }),
    });

    const data = await response.json();

    const elapsed = Date.now() - startTime;
    if (elapsed < 3000) {
      await new Promise((r) => setTimeout(r, 3000 - elapsed));
    }

    setResult(data);
    setLoading(false);

    const sections = ["brief", "metrics", "strengths", "gaps", "moves", "cta"];

    sections.forEach((section, index) => {
      setTimeout(() => {
        setVisibleSections((prev) => [...prev, section]);
      }, index * 1400); // slower reveal
    });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816]">

      {/* Cosmic Background */}
      <div className="fixed inset-0 -z-20 bg-[#050816]" />

      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-200px] left-[-200px] w-[700px] h-[700px] bg-indigo-600/20 rounded-full blur-[180px]" />
        <div className="absolute bottom-[-250px] right-[-250px] w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent mb-12">
          Cognire Cortex
        </h1>

        {/* INPUT SECTION */}
        {!result && (
          <div className="space-y-6 max-w-2xl">
            <textarea
              placeholder="Paste your resume..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              className="w-full h-40 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-sm focus:outline-none text-white/80"
            />

            <textarea
              placeholder="Paste job description..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-40 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-sm focus:outline-none text-white/80"
            />

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition font-medium"
            >
              Analyze with Cortex
            </button>
          </div>
        )}

        {/* THINKING OVERLAY */}
        {loading && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center text-indigo-300 text-lg animate-pulse">
              Cortex is constructing your strategic brief...
            </div>
          </div>
        )}

        {/* RESULTS */}
        {result && (
          <div className="space-y-16">

            {/* STRATEGIC BRIEF */}
            {visibleSections.includes("brief") && (
              <SectionCard title="Cortex Strategic Brief">
                {result.cortex_narrative}
              </SectionCard>
            )}

            {/* METRICS */}
            {visibleSections.includes("metrics") && (
              <div className="grid md:grid-cols-2 gap-12 justify-items-center">
                <MetricRing
                  value={result.overall_score}
                  label="Overall Alignment"
                  description="Composite score across skill overlap and positioning clarity."
                />

                <MetricRing
                  value={result.jd_match_score}
                  label="JD Match"
                  description="Measures alignment with this specific job description."
                />
              </div>
            )}

            {visibleSections.includes("strengths") && (
              <SectionCard title="Positioning Strengths">
                {result.positioning_strengths}
              </SectionCard>
            )}

            {visibleSections.includes("gaps") && (
              <SectionCard title="Strategic Gaps">
                {result.strategic_gaps}
              </SectionCard>
            )}

            {visibleSections.includes("moves") && (
              <SectionCard title="Recommended Next Moves">
                {result.recommended_next_moves}
              </SectionCard>
            )}

            {visibleSections.includes("cta") && (
              <div className="bg-indigo-500/10 border border-indigo-400/30 rounded-2xl p-10 backdrop-blur-xl">
                <h4 className="text-xl font-semibold mb-4 text-white">
                  What would you like to do next?
                </h4>

                <p className="text-white/70 mb-8 max-w-2xl">
                  Based on the gaps identified, your strongest leverage right now is to refine your positioning and prepare for targeted interviews.
                </p>

                <div className="flex gap-4 flex-wrap">
                  <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition">
                    Generate Optimized Resume (Free)
                  </button>

                  <button className="px-6 py-3 rounded-xl border border-indigo-400/40 hover:bg-indigo-500/10 transition">
                    Unlock Full Strategy (Pro)
                  </button>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- REUSABLE CARD ---------- */

function SectionCard({ title, children }: any) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_rgba(99,102,241,0.08)] transition-all duration-700">
      <h3 className="text-indigo-300 mb-6 uppercase text-sm tracking-wider">
        {title}
      </h3>
      <p className="text-white/85 leading-relaxed whitespace-pre-line">
        {children}
      </p>
    </div>
  );
}