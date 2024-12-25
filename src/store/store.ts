import {create} from 'zustand';

export interface Song {
    name: string;
    isFavorite: boolean;
}

interface SongStore {
    songs: Song[];
    fetchSongs: () => void;
    isLoading: boolean;
    toggleLike : (name: string) => void;
}

const useSongStore = create<SongStore>((set) => ({
    songs: [],
    isLoading: false,
    fetchSongs: async () => {
        set({isLoading: true});
        const response = await fetch('https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=4361c7c3cd640174b2a169830235b579&format=json');
        const data = await response.json();

        set({
                songs: data.tracks.track.map((song: any) => ({
                name: song.name,
                isFavorite: false,
            })), isLoading: false,
        });
    },
    toggleLike : (name: string) => {
        set(state => ({
            songs: state.songs.map(s =>
                s.name === name ? {...s, isFavorite: !s.isFavorite} : s)
        }));
    }
}));

export default useSongStore;