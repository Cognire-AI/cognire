export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center px-6 overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 blur-3xl opacity-60" />

      <div className="max-w-5xl w-full text-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl px-12 py-20 shadow-[0_0_80px_rgba(0,0,0,0.6)]">
        
        {/* Brand */}
        <div className="mb-6">
          <span className="text-sm tracking-widest uppercase text-white/50">
            COGNIRE AI
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Your Resume. Engineered for Interviews.
        </h1>

        {/* Subheadline */}
        <p className="mt-8 text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
          Cognire uses advanced AI to analyze your CV against real job descriptions, 
          detect hidden skill gaps, optimize for ATS systems, and generate recruiter-ready rewrites in seconds.
        </p>

        {/* CTA */}
        <div className="mt-12 flex justify-center gap-6">
          <a
            href="/dashboard"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold text-lg hover:opacity-90 transition-all"
          >
            Get Started
          </a>

          <a
            href="/auth/login"
            className="px-8 py-4 rounded-xl border border-white/20 text-white text-lg hover:border-white/40 transition-all"
          >
            Login
          </a>
        </div>
      </div>
    </main>
  );
}