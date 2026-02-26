export default function CortexPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Ambient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-blue-700/10 to-purple-700/20" />
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="flex h-full">

        {/* Left Conversational Panel */}
        <div className="w-3/5 p-12 border-r border-white/10">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Cognire Cortex
          </h1>

          <p className="text-white/60">
            Let’s align your resume with your next opportunity.
          </p>
        </div>

        {/* Right Intelligence Panel */}
        <div className="w-2/5 p-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h3 className="text-lg text-white/70 mb-4">
              Intelligence Overview
            </h3>
            <p className="text-white/40 text-sm">
              Your analysis metrics will appear here.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}