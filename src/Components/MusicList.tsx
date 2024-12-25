import {useEffect} from 'react';
import useSongStore from "../store/store.ts";
import SongItem from "./SongItem";
import "../scss/MusicList.scss";

const MusicList = () => {
    const {songs, isLoading, fetchSongs} = useSongStore();

    useEffect(() => {
        if (!isLoading) {
            fetchSongs();
        }
    }, []);

    console.log(songs);

    return(
        <section className="main">
            <div className="main__header">
                <h2 className="main__title">Music List</h2>
                <div className="main__search">
                    <button className="main__filter-button">
                        <i className="fa-solid fa-filter"></i>
                    </button>
                    <input className="main__input"
                           type="text"
                           placeholder="Search..."/>
                </div>
            </div>
            <div className="music-list">{
                songs.map(song =>
                    <SongItem name={song.name}
                              isFavorite={song.isFavorite}/>
            )}</div>
        </section>
    )
}

export default MusicList;