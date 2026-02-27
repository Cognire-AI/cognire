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
      <div className="relative min-h-screen overflow-hidden bg-[#060B1A]">

        {/* Cosmic Background */}
        <div className="fixed inset-0 -z-30 bg-gradient-to-br 
          from-[#0B1026] via-[#0A0F1F] to-[#050816]" />

        {/* Nebula Glow Top */}
        <div className="fixed -top-40 -left-40 w-[800px] h-[800px] 
          bg-purple-700/20 rounded-full blur-[200px] -z-20" />

        {/* Nebula Glow Bottom */}
        <div className="fixed -bottom-60 -right-40 w-[900px] h-[900px] 
          bg-indigo-600/20 rounded-full blur-[220px] -z-20" />

        {/* Subtle center glow */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_60%)] -z-10" />

            <div className="relative max-w-5xl mx-auto px-8 py-24">
              <div className="relative backdrop-blur-xl bg-white/5 
                border border-white/10 rounded-3xl 
                shadow-[0_0_80px_rgba(99,102,241,0.08)] 
                p-12">

          <div className="mb-12">
            <h1 className="text-5xl font-semibold tracking-tight 
              bg-gradient-to-r from-indigo-300 to-purple-400 
              bg-clip-text text-transparent">
              Cognire Cortex
            </h1>

            <p className="text-white/50 mt-3 text-lg">
              Strategic Career Intelligence Briefing
            </p>
          </div>

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

              {visibleSections.includes("metrics") && (
                <div className="grid md:grid-cols-2 gap-12 mt-6">

                  <MetricRing
                    label="Overall Alignment"
                    value={result.overall_score}
                    description="Strong operational match, strategic repositioning required."
                  />

                  <MetricRing
                    label="JD Match"
                    value={result.jd_match_score}
                    description="Experience overlap present but gaps in presales expertise."
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
              <div className="mt-16 p-10 rounded-2xl 
                bg-gradient-to-br from-indigo-500/10 to-purple-500/10
                border border-indigo-400/30">

                <h3 className="text-2xl font-semibold mb-4">
                  This role is within reach — but not in its current form.
                </h3>

                <p className="text-white/70 mb-8 text-lg">
                  I can rebuild your resume specifically for this role and
                  generate the exact interview pressure points you'll face.
                </p>

                <div className="flex gap-6 flex-wrap">

                  <button className="px-8 py-4 rounded-xl 
                    bg-gradient-to-r from-indigo-500 to-purple-600 
                    text-white font-medium hover:scale-105 transition">
                    Rebuild Resume For This Role (Free)
                  </button>

                  <button className="px-8 py-4 rounded-xl 
                    border border-indigo-400/40 
                    hover:bg-indigo-500/10 transition">
                    Unlock Hiring Manager Strategy (Pro)
                  </button>

                </div>

                <div className="mt-8 text-white/40 text-sm flex gap-8 flex-wrap">
                  <span>✓ Interview question simulation</span>
                  <span>✓ Hidden rejection triggers</span>
                  <span>✓ Salary positioning insights</span>
                </div>

              </div>
            )}

          </div>
        )}
      </div>
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