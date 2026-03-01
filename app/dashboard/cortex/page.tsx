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
    <div className="relative min-h-screen overflow-hidden text-white">

      {/* ===== CONTENT ===== */}

      <div className="relative z-10 max-w-5xl mx-auto px-12 py-28">

        {/* HEADER */}
        <div className="mb-20">
          <h1 className="text-6xl font-semibold tracking-tight bg-clip-text text-transparent">
            Cognire Cortex
          </h1>
          <p className="text-white/50 mt-4 text-lg">
            Strategic Career Intelligence Briefing
          </p>
        </div>

        {/* INPUT SECTION */}
        {!result && (
          <div className="space-y-8 max-w-3xl">
            <textarea
              placeholder="Paste your resume..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              className="w-full h-48 border-white/10 rounded-2xl p-6 text-white/80 backdrop-blur-xl focus:outline-none focus:border-indigo-400/40"
            />

            <textarea
              placeholder="Paste job description..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-48 border-white/10 rounded-2xl p-6 text-white/80 backdrop-blur-xl focus:outline-none focus:border-indigo-400/40"
            />

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="px-10 py-4 rounded-xl hover:scale-105 transition font-medium"
            >
              Analyze with Cortex
            </button>
          </div>
        )}

        {/* THINKING OVERLAY */}
        {loading && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-indigo-300 text-lg animate-pulse">
              Cortex is constructing your strategic brief...
            </div>
          </div>
        )}

        {/* RESULTS */}
        {result && (
          <div className="space-y-20">

            {/* STRATEGIC BRIEF */}
            {visibleSections.includes("brief") && (
              <SectionCard title="Cortex Strategic Brief">
                {result.cortex_narrative}
              </SectionCard>
            )}

            {/* METRICS */}
            {visibleSections.includes("metrics") && (
              <div className="grid md:grid-cols-2 gap-16">
                <MetricRing
                  label="Overall Alignment"
                  value={result.overall_score}
                  description="Composite score across experience weight and positioning clarity."
                />
                <MetricRing
                  label="JD Match"
                  value={result.jd_match_score}
                  description="Measures alignment with this specific job description."
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
              <div className="p-12 rounded-3xl border-indigo-400/30 backdrop-blur-xl shadow-[0_0_60px_rgba(99,102,241,0.12)]">
                <h3 className="text-3xl font-semibold mb-6">
                  This role is within reach — but not in its current form.
                </h3>

                <p className="text-white/70 mb-10 text-lg">
                  I can rebuild your resume specifically for this role and generate the exact interview pressure points you'll face.
                </p>

                <div className="flex gap-6 flex-wrap">
                  <button className="px-10 py-4 rounded-xl hover:scale-105 transition font-medium">
                    Rebuild Resume For This Role (Free)
                  </button>

                  <button className="px-10 py-4 rounded-xl border border-indigo-400/40 hover: transition">
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
    <div className="border-white/10 rounded-3xl p-12 backdrop-blur-xl shadow-[0_0_60px_rgba(99,102,241,0.12)]">
      <h3 className="text-sm uppercase tracking-wider text-indigo-300 mb-8">
        {title}
      </h3>
      <p className="text-white/85 leading-relaxed whitespace-pre-line text-lg">
        {children}
      </p>
    </div>
  );
}