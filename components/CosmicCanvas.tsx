"use client";

export default function CosmicCanvas() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">

      {/* Deep base */}
      <div className="absolute inset-0 bg-[#070B1A]" />

      {/* Main gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br 
        from-[#0D1333] 
        via-[#0A1026] 
        to-[#090E20]" 
      />

      {/* Blue atmospheric glow */}
      <div className="absolute -top-72 -left-72 w-[1200px] h-[1200px] 
        bg-indigo-600/30 rounded-full blur-[260px]" 
      />

      {/* Purple atmospheric glow */}
      <div className="absolute -bottom-80 -right-72 w-[1300px] h-[1300px] 
        bg-purple-700/30 rounded-full blur-[280px]" 
      />

      {/* Center AI light core */}
      <div className="absolute -bottom-80 -right-72 w-[1300px] h-[1300px] 
        bg-purple-700/30 rounded-full blur-[280px] animate-pulse-slow" />

      {/* Subtle vignette for depth */}
      <div className="absolute inset-0 
        bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" 
      />

    </div>
  );
}