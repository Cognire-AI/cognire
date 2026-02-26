"use client";

import { useState } from "react";

export default function CortexPage() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (!resume || !jobDescription) return;

    setLoading(true);
    setResult(null);

    const response = await fetch("/api/cortex/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resume, jobDescription }),
    });

    const data = await response.json();
    setResult(data);
    setLoading(false);
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
              Your intelligence metrics will appear here.
            </div>
          )}

          {loading && (
            <div className="text-white/60">
              Cortex is analyzing your positioning...
            </div>
          )}

          {result && !result.error && (
            <div className="space-y-6">

              <div>
                <h3 className="text-xl font-semibold text-indigo-400">
                  Overall Score: {result.overall_score}
                </h3>
                <p className="text-white/60 mt-2">
                  Role Detected: {result.role_detected}
                </p>
                <p className="text-white/60">
                  Career Level: {result.career_level_detected}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-white">Strengths</h4>
                <ul className="list-disc list-inside text-white/70 text-sm">
                  {result.strengths?.map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-white">Improvement Areas</h4>
                <ul className="list-disc list-inside text-white/70 text-sm">
                  {result.improvement_areas?.map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

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