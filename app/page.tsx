import FeatureCarousel from "@/components/FeatureCarousel";
export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* COSMIC BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-[140px] rounded-full top-[-200px] right-[-200px]" />
        <div className="absolute w-[600px] h-[600px] bg-cyan-500/20 blur-[140px] rounded-full bottom-[-200px] left-[-200px]" />
        <div className="absolute inset-0 bg-black" />
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

      {/* FEATURE CAROUSEL */}
      <section className="relative mt-32 flex justify-center overflow-hidden">
        <div className="relative w-full max-w-6xl flex items-center justify-center">

          <div className="carousel-track flex gap-10 transition-transform duration-700 ease-in-out">

            {/* CARD 1 */}
            <div className="feature-card small">
              <h3>Resume Intelligence</h3>
              <p>AI ATS scoring and recruiter-ready rewrites.</p>
            </div>

            {/* CARD 2 */}
            <div className="feature-card medium">
              <h3>Job Match AI</h3>
              <p>Real-time job description matching.</p>
            </div>

            {/* CENTER CARD */}
            <div className="feature-card large">
              <h3>Interview AI</h3>
              <p>Mock interviews powered by advanced AI.</p>
            </div>

            {/* CARD 4 */}
            <div className="feature-card medium">
              <h3>Skill Gap Detection</h3>
              <p>Uncover missing skills instantly.</p>
            </div>

            {/* CARD 5 */}
            <div className="feature-card small">
              <h3>Role Optimization</h3>
              <p>Tailor resume for specific roles.</p>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER STRIP */}
      <section className="mt-24 text-center text-zinc-500 text-sm pb-16">
        Empowering your career journey with AI precision.
      </section>

    </main>
  );
}
<style jsx>{`
  .feature-card {
    min-width: 260px;
    padding: 32px;
    border-radius: 24px;
    text-align: center;
    background: linear-gradient(
      145deg,
      rgba(255,255,255,0.06),
      rgba(255,255,255,0.02)
    );
    border: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(20px);
    transition: all 0.6s ease;
  }

  .feature-card h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .feature-card p {
    font-size: 14px;
    color: #a1a1aa;
  }

  .small {
    transform: scale(0.8);
    opacity: 0.4;
  }

  .medium {
    transform: scale(0.92);
    opacity: 0.7;
  }

  .large {
    transform: scale(1.08);
    opacity: 1;
    background: linear-gradient(
      135deg,
      rgba(59,130,246,0.25),
      rgba(168,85,247,0.25)
    );
    border: 1px solid rgba(139,92,246,0.4);
  }
`}</style>