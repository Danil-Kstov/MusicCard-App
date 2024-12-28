import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export interface Song {
    id: string;
    image: string,
    name: string,
    link: string,
    artists: string,
    album: string,
    release_date: string,
    isFavorite: boolean,
}

interface SongStore {
    songs: Song[];
    fetchSongs: () => void;
    isLoading: boolean;
    toggleLike : (name: string) => void;
    updateSong: (id: string, updatedSong: Song) => void;
    addSong: (song: Song, id: string) => void;
    deleteSong: (id: string) => void;
}

const getSpotifyToken = async (): Promise<string | null> => {
    const clientId = '185304eaef4b4875a5ec4da8f372cf8a';
    const clientSecret = '558b4f8d7d2148a09c48cb2b04548618';

    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const authString = btoa(`${clientId}:${clientSecret}`);

    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${authString}`,
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Spotify token');
        }

        const data = await response.json();
        return data.access_token;
    }
    catch (error) {
        console.error('Error fetching token:', error);
        return null;
    }
};


const useSongStore = create<SongStore>(persist((set) => ({
    songs: [],
    isLoading: false,
    fetchSongs: async () => {
        set({ isLoading: true });

        const token = await getSpotifyToken();
        if (!token) {
            console.error('No token available');
            set({ isLoading: false });
            return;
        }

        const playlistId = '6qv7CRaZr9nJaamM8Xtrv6';
        const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`;

        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            console.log(data);
            set({
                songs: data.items.map((song: any) => ({
                    id: song.track.id,
                    image: song.track.album.images[1].url,
                    name: song.track.name,
                    link: song.track.external_urls.spotify,
                    artists: song.track.artists.map((artist: string) => artist.name).join(', '),
                    album: song.track.album.name,
                    release_date: formatDateToEuropean(song.track.album.release_date),
                    isFavorite: false,
                })),
                isLoading: false,
            });
        } catch (error) {
            console.error('Error fetching songs:', error);
            set({ isLoading: false });
        }
    },
    toggleLike: (name: string) => {
        set((state) => ({
            songs: state.songs.map((s) =>
                s.name === name ? { ...s, isFavorite: !s.isFavorite } : s
            ),
        }));
    },
    updateSong: (id: string, updatedSong: Song) => {
        set((state) => ({
            songs: state.songs.map((song) =>
                song.id === id ? { ...song, ...updatedSong } : song
            ),
        }));
    },
    addSong: (song: Song, id: string) => {
        set((state) => ({
            songs: [song, ...state.songs],
        }));
    },
    deleteSong: (id: string) => {
        set((state) => ({
            songs: state.songs.filter((song) => song.id !== id),
        }));
    }
})));

const formatDateToEuropean = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
}

export default useSongStore;