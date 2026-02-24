"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Signup successful! Check your email to confirm.");
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-zinc-900 p-8 rounded-xl space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Create Account</h1>

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-medium"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        {message && (
          <p className="text-sm text-center text-red-400">{message}</p>
        )}
      </form>
    </main>
  );
}