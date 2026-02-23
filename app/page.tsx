export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Cosmic Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.25),transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.25),transparent_40%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        </div>
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tight">
          Cognire<span className="text-blue-500">AI</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          <a href="#">Features</a>
          <a href="#">How It Works</a>
          <a href="#">Pricing</a>
          <a href="/auth/login">Login</a>
          <a
            href="/dashboard"
            className="bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-2 rounded-lg text-white font-medium"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center px-6 mt-20">

        <h1 className="text-6xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
          AI That Turns Your Resume Into Interviews.
        </h1>

        <p className="mt-8 max-w-3xl text-lg text-zinc-400">
          Cognire uses advanced AI to analyze your CV against real job descriptions,
          uncover hidden skill gaps, optimize for ATS systems, and generate
          recruiter-ready rewrites in seconds.
        </p>

        <div className="mt-10 flex gap-6">
          <a
            href="/dashboard"
            className="bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 rounded-xl text-lg font-medium shadow-lg hover:opacity-90 transition"
          >
            Get Started Free
          </a>

          <a
            href="/dashboard"
            className="border border-zinc-700 px-8 py-4 rounded-xl text-lg hover:border-zinc-500 transition"
          >
            Analyze My Resume
          </a>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="mt-28 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
          <h3 className="text-xl font-semibold mb-4">Resume Intelligence</h3>
          <p className="text-zinc-400 text-sm">
            AI-powered resume analysis with ATS scoring, keyword optimization,
            and recruiter-ready rewrites.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
          <h3 className="text-xl font-semibold mb-4">Job Match AI</h3>
          <p className="text-zinc-400 text-sm">
            Compare your CV against real job descriptions and receive
            match percentages with actionable insights.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
          <h3 className="text-xl font-semibold mb-4">Interview AI</h3>
          <p className="text-zinc-400 text-sm">
            Practice mock interviews powered by AI with tailored questions
            based on your resume and target role.
          </p>
        </div>

      </section>

      {/* FOOTER STRIP */}
      <section className="mt-24 text-center text-zinc-500 text-sm pb-16">
        Empowering your career journey with AI precision.
      </section>

    </main>
  );
}