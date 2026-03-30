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
