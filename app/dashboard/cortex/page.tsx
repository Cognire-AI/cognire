"use client";

import { useState, useEffect } from "react";

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

    // Minimum 3s thinking experience
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
      }, index * 1100);
    });
  }

  return (
    <div className="relative min-h-screen bg-[#0b0f1a] text-white overflow-hidden">

      {/* Cosmic Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#0b0f1a]" />
        <div className="absolute -top-[300px] -left-[300px] w-[900px] h-[900px] bg-indigo-600/20 rounded-full blur-[200px]" />
        <div className="absolute -bottom-[300px] -right-[300px] w-[900px] h-[900px] bg-purple-600/20 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-12">
          Cognire Cortex
        </h1>

        {/* Input Section */}
        {!result && (
          <div className="space-y-6 max-w-2xl">
            <textarea
              placeholder="Paste your resume..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              className="w-full h-40 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-sm focus:outline-none"
            />

            <textarea
              placeholder="Paste job description..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-40 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-sm focus:outline-none"
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

        {/* Thinking Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center animate-pulse text-indigo-400 text-lg">
              Cortex is constructing your strategic brief...
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-14">

            {/* Strategic Brief */}
            {visibleSections.includes("brief") && (
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_rgba(99,102,241,0.08)] animate-[fadeUp_0.8s_ease-out]">
                <h3 className="text-sm uppercase tracking-wider text-indigo-400 mb-6">
                  Cortex Strategic Brief
                </h3>
                <p className="text-white/80 leading-relaxed whitespace-pre-line">
                  {result.cortex_narrative}
                </p>
              </div>
            )}

            {/* Metrics */}
            {visibleSections.includes("metrics") && (
              <div className="grid md:grid-cols-2 gap-12 text-center animate-[fadeUp_0.8s_ease-out]">

                <MetricCard
                  title="Overall Alignment"
                  value={result.overall_score}
                  description="Composite score across skill overlap, experience weight and positioning clarity."
                />

                <MetricCard
                  title="JD Match"
                  value={result.jd_match_score}
                  description="Measures how closely your experience aligns with this specific job description."
                />
              </div>
            )}

            {/* Strengths */}
            {visibleSections.includes("strengths") && (
              <SectionCard title="Positioning Strengths">
                {result.positioning_strengths}
              </SectionCard>
            )}

            {/* Gaps */}
            {visibleSections.includes("gaps") && (
              <SectionCard title="Strategic Gaps">
                {result.strategic_gaps}
              </SectionCard>
            )}

            {/* Moves */}
            {visibleSections.includes("moves") && (
              <SectionCard title="Recommended Next Moves">
                {result.recommended_next_moves}
              </SectionCard>
            )}

            {/* CTA */}
            {visibleSections.includes("cta") && (
              <div className="bg-indigo-500/10 border border-indigo-400/30 rounded-2xl p-8 animate-[fadeUp_0.8s_ease-out]">
                <h4 className="text-lg font-semibold mb-4">
                  What would you like to do next?
                </h4>

                <p className="text-white/70 mb-6">
                  I can generate an optimized version of your resume aligned to this job, 
                  or simulate the interview panel's likely questions.
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

/* ---------- COMPONENTS ---------- */

function SectionCard({ title, children }: any) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_rgba(99,102,241,0.08)] animate-[fadeUp_0.8s_ease-out]">
      <h3 className="text-indigo-400 mb-6">{title}</h3>
      <p className="text-white/80 leading-relaxed whitespace-pre-line">
        {children}
      </p>
    </div>
  );
}

function MetricCard({ title, value, description }: any) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-[0_0_40px_rgba(99,102,241,0.08)] group relative">

      <div className="text-4xl font-bold text-indigo-400 mb-4">
        {value}
      </div>

      <div className="text-sm text-white/80 font-medium mb-2">
        {title}
      </div>

      <div className="text-xs text-white/40">
        {description}
      </div>

    </div>
  );
}