export default function DashboardPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* FULL SCREEN AMBIENT BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-blue-700/10 to-purple-700/20" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* CONTENT WRAPPER */}
      <div className="p-10 space-y-12">

        <div>
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-white/60 mt-3 text-lg">
            Welcome back. Let’s accelerate your job search.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Resume Score */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]">
            <h3 className="text-lg text-white/70 mb-4">Resume Score</h3>
            <p className="text-5xl font-bold text-cyan-400">82</p>
            <p className="text-sm text-white/50 mt-3">
              Last ATS evaluation score
            </p>
          </div>

          {/* Applications */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)]">
            <h3 className="text-lg text-white/70 mb-4">Applications</h3>
            <p className="text-5xl font-bold text-cyan-400">14</p>
            <p className="text-sm text-white/50 mt-3">
              Jobs tracked this month
            </p>
          </div>

          {/* Interview Prep */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-400/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]">
            <h3 className="text-lg text-white/70 mb-4">Interview Prep</h3>
            <p className="text-5xl font-bold text-purple-400">5</p>
            <p className="text-sm text-white/50 mt-3">
              Practice sessions completed
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}