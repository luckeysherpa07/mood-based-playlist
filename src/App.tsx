import { useState, useEffect } from "react";
import { fetchSongsByMood } from "./spotifyService.ts";

const moods = ["Happy", "Chill", "Sad", "Love"];

interface Playlist {
  id: string;
  name: string;
  external_urls: { spotify: string };
}

function App() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<(Playlist | null)[]>([]);

  useEffect(() => {
    if (selectedMood) {
      fetchSongsByMood(selectedMood).then((data: (Playlist | null)[]) => {
        console.log(data);
        setPlaylists(data);
      });
    }
  }, [selectedMood]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">🎶 Mood-Based Playlist 🎶</h1>

      <div className="grid grid-cols-2 gap-4">
        {moods.map((mood) => (
          <button
            key={mood}
            className={`px-6 py-3 rounded-lg text-lg font-semibold bg-blue-500 hover:bg-blue-600 transition ${
              selectedMood === mood ? "ring-4 ring-blue-300" : ""
            }`}
            onClick={() => setSelectedMood(mood)}
          >
            {mood}
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">
            Playlists for {selectedMood} Mood:
          </h2>
          <ul className="mt-4 space-y-2">
            {playlists.map((playlist) =>
              playlist?.external_urls?.spotify ? (
                <li key={playlist.id}>
                  <a
                    href={playlist.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {playlist.name}
                  </a>
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
