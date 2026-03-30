export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import SignalForm from "./SignalForm";

interface PageProps {
  params: { slug: string };
}

export default async function ArtistPage({ params }: PageProps) {
  const supabase = createClient();

  const { data: artist, error } = await supabase
    .from("artists")
    .select("id, name, genre, city")
    .eq("slug", params.slug)
    .single();

    const { count } = await supabase
  .from("fan_signals")
  .select("*", { count: "exact", head: true })
  .eq("artist_id", artist!.id);

  

  if (error || !artist) {
    return (
      <main
        style={{ background: "#0A0A23" }}
        className="min-h-screen flex items-center justify-center px-8"
      >
        <div className="text-center">
          <p
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "1.5rem",
              textTransform: "uppercase" as const,
              letterSpacing: "0.02em",
              color: "#FFFFFF",
              marginBottom: "12px",
            }}
          >
            Artist not found
          </p>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.3)",
            }}
          >
            This link may be invalid or expired
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: "#0A0A23", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          margin: "0 auto",
          padding: "64px 32px 80px",
        }}
      >
        {/* Brand */}
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#DDFF00",
            marginBottom: "64px",
          }}
        >
          Rootd<span style={{ color: "#DDFF00" }}>.</span>Live
        </div>

        {/* Artist name */}
        <h1
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(3.8rem, 13vw, 6.5rem)",
            textTransform: "uppercase",
            lineHeight: 0.88,
            letterSpacing: "0.01em",
            color: "#FFFFFF",
            marginBottom: "24px",
          }}
        >
          {artist.name}
        </h1>

        {/* Genre · City */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "48px",
          }}
        >
          {artist.genre && (
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {artist.genre}
            </span>
          )}
          {artist.genre && artist.city && (
            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                flexShrink: 0,
                display: "inline-block",
              }}
            />
          )}
          {artist.city && (
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {artist.city}
            </span>
          )}
        </div>

        {/* Yellow rule */}
        <div
          style={{
            width: "48px",
            height: "2px",
            background: "#DDFF00",
            marginBottom: "40px",
          }}
        />

        {/* Hook */}
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.05rem",
            fontWeight: 300,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.7,
            marginBottom: "48px",
          }}
        >
          Be among the first to experience{" "}
          <span style={{ color: "#FFFFFF", fontWeight: 400 }}>
            {artist.name}
          </span>{" "}
          live.
        </p>

        {typeof count === "number" && count > 0 && (
  <p
    style={{
      fontFamily: "'DM Mono', monospace",
      fontSize: "11px",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: "#DDFF00",
      marginBottom: "40px",
    }}
  >
    {count} potential audience
  </p>
)}

        {/* Form */}
        <SignalForm artistId={artist.id} />
      </div>
    </main>
  );
}
