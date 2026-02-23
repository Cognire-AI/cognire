export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center px-6 overflow-hidden">

      {/* Ambient Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-cyan-500/20 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-purple-600/20 blur-[180px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-4xl w-full text-center bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl px-12 py-20 shadow-[0_0_60px_rgba(0,0,0,0.6)]">

        <h1 className="text-6xl font-bold tracking-tight leading-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Your Resume. Engineered for Interviews.
        </h1>

        <p className="mt-8 text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          Cognire analyzes your CV against real job descriptions,
          reveals hidden gaps, and generates recruiter-ready rewrites in seconds.
        </p>

        <div className="mt-12 flex justify-center gap-6">

          <a
            href="/dashboard"
            className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 text-black hover:opacity-90 transition-all shadow-lg"
          >
            Get Started
          </a>

          <a
            href="/auth/login"
            className="px-8 py-4 rounded-xl border border-white/20 hover:border-white/40 transition-all"
          >
            Login
          </a>

        </div>

      </div>
    </main>
  );
}