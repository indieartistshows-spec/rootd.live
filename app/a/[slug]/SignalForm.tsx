"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface SignalFormProps {
  artistId: string;
}

export default function SignalForm({ artistId }: SignalFormProps) {
  const supabase = createClient();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: insertError } = await supabase
      .from("fan_signals")
      .insert({ artist_id: artistId, name: name.trim(), city: city.trim() });

    if (insertError) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <p className="text-gray-300 text-base">
        You&apos;re in.{" "}
        <span className="text-white font-medium">
          If this show happens, you&apos;ll be the first to know.
        </span>
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3
                     text-white placeholder-gray-500 text-sm
                     focus:outline-none focus:border-white/30 transition"
        />
        <input
          type="text"
          placeholder="Your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3
                     text-white placeholder-gray-500 text-sm
                     focus:outline-none focus:border-white/30 transition"
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-white text-black font-semibold rounded-lg px-4 py-3
                   text-sm hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting…" : "I'm interested"}
      </button>
    </form>
  );
}
