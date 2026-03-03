export default function CosmicCanvas() {
  return (
    <>
      {/* Deep Space Base */}
      <div className="fixed inset-0 -z-50 bg-[#070B1A]" />

      {/* Large Indigo Nebula */}
      <div className="fixed -top-[400px] -left-[300px] w-[1200px] h-[1200px] 
        bg-indigo-600/30 rounded-full blur-[260px] -z-40" />

      {/* Large Purple Nebula */}
      <div className="fixed -bottom-[500px] -right-[300px] w-[1300px] h-[1300px] 
        bg-purple-600/30 rounded-full blur-[280px] -z-40" />

      {/* Soft Center Glow */}
      <div className="fixed inset-0 -z-30 
        bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_65%)]" />
    </>
  );
}