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
