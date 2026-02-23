"use client";
import { useState } from "react";

export default function StudioPage() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setResult("");

    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume, jobDescription }),
    });

    const data = await response.json();
    setResult(data.result || data.error);
    setLoading(false);
  };

  return (
    <div className="p-10 space-y-8 max-w-6xl">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Resume / CV Intelligence Studio
        </h1>
        <p className="text-white/60 mt-2">
          Upload your resume and paste a job description to get an ATS score.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <textarea
          placeholder="Paste your resume..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl p-4 min-h-[300px] backdrop-blur-lg focus:outline-none focus:border-cyan-400/40"
        />

        <textarea
          placeholder="Paste job description..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl p-4 min-h-[300px] backdrop-blur-lg focus:outline-none focus:border-cyan-400/40"
        />
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold hover:opacity-90 transition-all"
      >
        {loading ? "Analyzing..." : "Analyze with AI"}
      </button>

      {result && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  );
}