import { createClient } from "@/lib/supabase/server";
import SignalForm from "./SignalForm";

export default async function ArtistPage({ params }: { params: { slug: string } }) {
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

        <div className="space-y-2">
          <h1 className="text-5xl font-bold">{artist.name}</h1>
          <div className="text-gray-400 text-sm">
            {artist.genre} · {artist.city}
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-xl">
            Be among the first to see{" "}
            <span className="font-semibold">{artist.name}</span> live.
          </p>

          <SignalForm artistId={artist.id} />
        </div>

      </div>
    </main>
  );
}