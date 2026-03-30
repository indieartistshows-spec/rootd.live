"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface SignalFormProps {
  artistId: string;
}

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(255,255,255,0.15)",
  padding: "10px 0 12px",
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: "1rem",
  fontWeight: 300,
  color: "rgba(255,255,255,0.5)",
  outline: "none",
  WebkitAppearance: "none",
  borderRadius: 0,
  transition: "border-color 0.2s, color 0.2s",
  boxSizing: "border-box",
};

export default function SignalForm({ artistId }: SignalFormProps) {
  const supabase = createClient();

  const [name, setName]           = useState("");
  const [city, setCity]           = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [focusedField, setFocus]  = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !city.trim()) {
      setError("Both fields are required.");
      return;
    }
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
      <div style={{ paddingTop: "24px" }}>
        <div
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "2rem",
            color: "#DDFF00",
            marginBottom: "16px",
            lineHeight: 1,
          }}
        >
          ✦
        </div>
        <p
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "2.8rem",
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            color: "#FFFFFF",
            lineHeight: 0.9,
            marginBottom: "16px",
          }}
        >
          You&apos;re in.
        </p>
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.95rem",
            fontWeight: 300,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.8,
          }}
        >
          If this show happens, you&apos;ll be<br />the first to know.
        </p>
      </div>
    );
  }

return (
    <main>
      <h1>{artist.name}</h1>

      {count && count > 0 && (
        <p>{count} people want to see them live</p>
      )}

      {/* form here */}
    </main>

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>

      {/* Name field */}
      <div style={{ marginBottom: "32px" }}>
        <label
          style={{
            display: "block",
            fontFamily: "'DM Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            marginBottom: "12px",
          }}
        >
          Your name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="What should we call you?"
          style={{
            ...inputStyle,
            borderBottomColor: focusedField === "name" ? "#DDFF00" : "rgba(255,255,255,0.15)",
            color: focusedField === "name" || name ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.5)",
          }}
          onFocus={() => setFocus("name")}
          onBlur={() => setFocus(null)}
        />
      </div>

      {/* City field */}
      <div style={{ marginBottom: "8px" }}>
        <label
          style={{
            display: "block",
            fontFamily: "'DM Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            marginBottom: "12px",
          }}
        >
          Your city
        </label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Where are you watching from?"
          style={{
            ...inputStyle,
            borderBottomColor: focusedField === "city" ? "#DDFF00" : "rgba(255,255,255,0.15)",
            color: focusedField === "city" || city ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.5)",
          }}
          onFocus={() => setFocus("city")}
          onBlur={() => setFocus(null)}
        />
      </div>

      {/* Error */}
      {error && (
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#FF3322",
            marginTop: "10px",
            marginBottom: "4px",
          }}
        >
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          display: "block",
          width: "100%",
          marginTop: "20px",
          background: "transparent",
          color: "#DDFF00",
          fontFamily: "'Anton', sans-serif",
          fontSize: "1rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "17px 24px",
          border: "1px solid #DDFF00",
          borderRadius: "2px",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.5 : 1,
          transition: "background 0.15s, color 0.15s",
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            (e.currentTarget as HTMLButtonElement).style.background = "#DDFF00";
            (e.currentTarget as HTMLButtonElement).style.color = "#0A0A23";
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          (e.currentTarget as HTMLButtonElement).style.color = "#DDFF00";
        }}
      >
        {loading ? "Sending..." : "I'm Interested"}
      </button>

      {/* Footnote */}
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "10px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.18)",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        Just a signal for your favourite artist.
      </p>
    </form>
  );
}
