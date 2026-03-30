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

  // ✅ ONE RETURN ONLY
  if (submitted) {
    return (
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#DDFF00",
          marginTop: "24px",
        }}
      >
        You're in. You'll be the first to know.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{
          background: "transparent",
          border: "none",
          borderBottom: "1px solid rgba(255,255,255,0.3)",
          padding: "12px 0",
          color: "#fff",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      />

      <input
        type="text"
        placeholder="Your city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        style={{
          background: "transparent",
          border: "none",
          borderBottom: "1px solid rgba(255,255,255,0.3)",
          padding: "12px 0",
          color: "#fff",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      />

      <button
        type="submit"
        style={{
          marginTop: "16px",
          background: "#DDFF00",
          color: "#000",
          padding: "12px",
          fontFamily: "'DM Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          border: "none",
          cursor: "pointer",
        }}
      >
        I'm interested
      </button>
    </form>
  );
}