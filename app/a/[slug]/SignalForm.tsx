"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignalForm({ artistId }: { artistId: string }) {
  const supabase = createClient();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("fan_signals").insert({
      artist_id: artistId,
      name,
      city,
    });

    if (!error) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return <p>You're in. If this show happens, you'll be the first to know.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-3 rounded bg-black border border-gray-600"
      />

      <input
        type="text"
        placeholder="Your city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        className="w-full p-3 rounded bg-black border border-gray-600"
      />

      <button
        type="submit"
        className="w-full p-3 bg-white text-black rounded font-semibold"
      >
        I'm interested
      </button>
    </form>
  );
}