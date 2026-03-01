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
      }, index * 1200);
    });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060B1A]">

      {/* Cosmic Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0B1026] via-[#0A0F1F] to-[#050816] -z-30" />
      <div className="fixed -top-40 -left-40 w-[800px] h-[800px] bg-purple-700/20 rounded-full blur-[200px] -z-20" />
      <div className="fixed -bottom-60 -right-40 w-[900px] h-[900px] bg-indigo-600/20 rounded-full blur-[220px] -z-20" />

      <div className="relative max-w-5xl mx-auto px-8 py-24">

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-semibold bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Cognire Cortex
          </h1>
          <p className="text-white/50 mt-3 text-lg">
            Strategic Career Intelligence Briefing
          </p>
        </div>

        {/* INPUT */}
        {!result && (
          <div className="space-y-6 max-w-3xl">
            <textarea
              placeholder="Paste your resume..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              className="w-full h-44 bg-[#0B1026]/80 border border-white/10 rounded-2xl p-6 text-white/80"
            />

            <textarea
              placeholder="Paste job description..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-44 bg-[#0B1026]/80 border border-white/10 rounded-2xl p-6 text-white/80"
            />

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-medium"
            >
              Analyze with Cortex
            </button>
          </div>
        )}

        {/* THINKING */}
        {loading && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-indigo-300 text-lg animate-pulse">
              Cortex is constructing your strategic brief...
            </div>
          </div>
        )}

        {/* RESULTS */}
        {result && (
          <div className="space-y-16">

            {/* BRIEF */}
            {visibleSections.includes("brief") && (
              <SectionCard title="Cortex Strategic Brief">
                {result.cortex_narrative}
              </SectionCard>
            )}

            {/* METRICS */}
            {visibleSections.includes("metrics") && (
              <div className="grid md:grid-cols-2 gap-12">

                <MetricRing
                  label="Overall Alignment"
                  value={result.overall_score}
                  description="Composite score across experience and positioning."
                />

                <MetricRing
                  label="JD Match"
                  value={result.jd_match_score}
                  description="Measures alignment with this job description."
                />

              </div>
            )}

            {/* STRENGTHS */}
            {visibleSections.includes("strengths") && (
              <SectionCard title="Positioning Strengths">
                {result.positioning_strengths}
              </SectionCard>
            )}

            {/* GAPS */}
            {visibleSections.includes("gaps") && (
              <SectionCard title="Strategic Gaps">
                {result.strategic_gaps}
              </SectionCard>
            )}

            {/* MOVES */}
            {visibleSections.includes("moves") && (
              <SectionCard title="Recommended Next Moves">
                {result.recommended_next_moves}
              </SectionCard>
            )}

            {/* CTA */}
            {visibleSections.includes("cta") && (
              <div className="p-10 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-400/30">
                <h3 className="text-2xl font-semibold mb-4">
                  This role is within reach — but not in its current form.
                </h3>

                <p className="text-white/70 mb-8 text-lg">
                  I can rebuild your resume specifically for this role and
                  simulate the exact interview pressure points you'll face.
                </p>

                <div className="flex gap-6 flex-wrap">
                  <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition">
                    Rebuild Resume For This Role (Free)
                  </button>

                  <button className="px-8 py-4 rounded-xl border border-indigo-400/40 hover:bg-indigo-500/10 transition">
                    Unlock Hiring Manager Strategy (Pro)
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

/* ---------- SECTION CARD ---------- */

function SectionCard({ title, children }: any) {
  return (
    <div className="bg-[#0B1026]/80 border border-white/10 rounded-3xl p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(99,102,241,0.12)]">
      <h3 className="text-sm uppercase tracking-wider text-indigo-300 mb-6">
        {title}
      </h3>
      <p className="text-white/85 leading-relaxed whitespace-pre-line text-lg">
        {children}
      </p>
    </div>
  );
}