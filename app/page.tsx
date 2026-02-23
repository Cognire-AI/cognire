export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold text-center">
        Land Your Dream Tech Job Faster
      </h1>

      <p className="mt-6 text-lg text-zinc-400 text-center max-w-2xl">
        Optimise your resume for any software job in seconds.
        Get ATS score, missing skills, and a fully rewritten resume instantly.
      </p>

      <div className="mt-8 flex gap-4">
        <a
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
        >
          Get Started
        </a>

        <a
          href="/auth/login"
          className="border border-zinc-700 hover:border-zinc-500 px-6 py-3 rounded-lg"
        >
          Login
        </a>
      </div>
    </main>
  );
}