export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center px-6">

      {/* Ambient Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl top-[-200px] left-[-200px] animate-pulse" />
        <div className="absolute w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl bottom-[-200px] right-[-200px] animate-pulse" />
      </div>

      {/* Glass Container */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 max-w-4xl text-center shadow-2xl">

        <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Land Your Dream Tech Job Faster
        </h1>

        <p className="mt-8 text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
          Optimise your resume for any software job in seconds.
          Get your ATS score, uncover missing skills, and generate a
          recruiter-ready rewrite instantly.
        </p>

        <div className="mt-10 flex justify-center gap-6">

          <a
            href="/dashboard"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold hover:opacity-90 transition-all shadow-lg"
          >
            Get Started
          </a>

          <a
            href="/auth/login"
            className="px-8 py-3 rounded-xl border border-white/20 hover:border-white/40 transition-all"
          >
            Login
          </a>

        </div>

      </div>

    </main>
  );
}