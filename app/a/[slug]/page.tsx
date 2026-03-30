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
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-gray-400 text-lg">Artist not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md space-y-10">

        {/* Artist info */}
        <div className="space-y-2">
          <h1 className="text-5xl font-bold tracking-tight">{artist.name}</h1>
          <div className="flex gap-3 text-gray-400 text-sm">
            {artist.genre && <span>{artist.genre}</span>}
            {artist.genre && artist.city && <span>·</span>}
            {artist.city && <span>{artist.city}</span>}
          </div>
        </div>

        {/* Signal CTA + form */}
        <div className="space-y-6">
          <p className="text-xl text-gray-200">
            Be among the first to see{" "}
            <span className="text-white font-semibold">{artist.name}</span> live.
          </p>

          <SignalForm artistId={artist.id} />
        </div>

      </div>
    </main>
  );
}
