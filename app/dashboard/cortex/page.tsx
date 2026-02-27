"use client";

import { useState } from "react";

export default function CortexPage() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [thinkingStage, setThinkingStage] = useState<string | null>(null);

    async function handleAnalyze() {
    if (!resume || !jobDescription) return;

    setLoading(true);
    setResult(null);
    setVisibleSections([]);
    setThinkingStage("Reviewing your experience...");

    await new Promise(r => setTimeout(r, 800));
    setThinkingStage("Mapping alignment signals...");

    await new Promise(r => setTimeout(r, 800));
    setThinkingStage("Evaluating perception risk...");

    await new Promise(r => setTimeout(r, 800));
    setThinkingStage("Constructing advisory brief...");

    const response = await fetch("/api/cortex/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription }),
    });

    const data = await response.json();

    setThinkingStage(null);
    setResult(data);
    setLoading(false);

    // Controlled reveal
    const sections = [
        "narrative",
        "metrics",
        "strengths",
        "gaps",
        "moves",
        "reflection"
    ];

    sections.forEach((section, index) => {
        setTimeout(() => {
        setVisibleSections(prev => [...prev, section]);
        }, index * 700);
    });
    }
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600/20 via-blue-700/10 to-purple-700/20" />

      <div className="flex h-full">

        {/* LEFT PANEL */}
        <div className="w-3/5 p-10 border-r border-white/10 space-y-6">

          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Cognire Cortex
          </h1>

          <textarea
            placeholder="Paste your resume..."
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none"
          />

          <textarea
            placeholder="Paste job description..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition font-medium"
          >
            {loading ? "Analyzing..." : "Analyze with Cortex"}
          </button>
        </div>

{/* RIGHT PANEL */}
<div className="w-2/5 p-10 overflow-y-auto">

  {!result && !loading && (
    <div className="text-white/40">
      Your intelligence briefing will appear here.
    </div>
  )}

  {/* Consultant Thinking Mode */}
  {thinkingStage && (
    <div className="text-indigo-400 text-sm animate-pulse">
      {thinkingStage}
    </div>
  )}

  {result && !result.error && (
    <div className="space-y-8">

      {/* Narrative */}
      {visibleSections.includes("narrative") && (
        <div className="bg-white/5 border border-indigo-400/20 rounded-2xl p-6 backdrop-blur-xl transition-opacity duration-700 opacity-100">
          <h3 className="text-sm uppercase tracking-wider text-indigo-400 mb-4">
            Cortex Strategic Brief
          </h3>
          <p className="text-white/80 leading-relaxed whitespace-pre-line">
            {result.cortex_narrative}
          </p>
        </div>
      )}

      {/* Metrics */}
      {visibleSections.includes("metrics") && (
        <div className="grid grid-cols-2 gap-6 text-sm transition-opacity duration-700 opacity-100">
          <div>
            <p className="text-white/50">Overall Alignment</p>
            <p className="text-2xl font-semibold text-indigo-400">
              {result.overall_score}
            </p>
          </div>
          <div>
            <p className="text-white/50">Role Detected</p>
            <p className="text-white">{result.role_detected}</p>
          </div>
          <div>
            <p className="text-white/50">Career Level</p>
            <p className="text-white">{result.career_level_detected}</p>
          </div>
          <div>
            <p className="text-white/50">JD Match</p>
            <p className="text-white">{result.jd_match_score}</p>
          </div>
        </div>
      )}

      {/* Positioning Strengths */}
      {visibleSections.includes("strengths") && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xl transition-opacity duration-700 opacity-100">
          <h4 className="text-indigo-400 mb-3">Positioning Strengths</h4>
          <p className="text-white/80 leading-relaxed">
            {result.positioning_strengths}
          </p>
        </div>
      )}

      {/* Strategic Gaps */}
      {visibleSections.includes("gaps") && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xl transition-opacity duration-700 opacity-100">
          <h4 className="text-purple-400 mb-3">Strategic Gaps</h4>
          <p className="text-white/80 leading-relaxed">
            {result.strategic_gaps}
          </p>
        </div>
      )}

      {/* Recommended Moves */}
      {visibleSections.includes("moves") && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xl transition-opacity duration-700 opacity-100">
          <h4 className="text-white mb-3">Recommended Next Moves</h4>
          <p className="text-white/80 leading-relaxed">
            {result.recommended_next_moves}
          </p>
        </div>
      )}

      {/* Reflective Question */}
      {visibleSections.includes("reflection") && result.reflective_questions && (
        <div className="border-l-2 border-indigo-400 pl-4 italic text-indigo-300/80 transition-opacity duration-700 opacity-100">
          {result.reflective_questions}
        </div>
      )}

    </div>
  )}

  {result?.error && (
    <div className="text-red-400">
      {result.error}
    </div>
  )}

</div>

      </div>
    </div>
  );
}