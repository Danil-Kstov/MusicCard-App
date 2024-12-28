import {useEffect, useState} from 'react';
import useSongStore from "../store/store.ts";
import SongItem from "../Components/SongItem";
import {Song} from "../store/store.ts";
import "../scss/MusicList.scss";

const MusicList = () => {
    const {songs, isLoading, fetchSongs} = useSongStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        if (!isLoading && !songs.length) {
            fetchSongs();
        }
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1)
    };

    const querySongs = songs.filter((song: Song) =>
        song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artists.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedSongs = querySongs.slice(startIndex, endIndex);
    const totalPages = Math.ceil(querySongs.length / itemsPerPage);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <section>
            <div className="main__header">
                <h2 className="main__title">Music List</h2>
                <div className="main__search">
                    <button className={`main__filter-button ${filter ? 'main__filter-button--active' : ""}`}
                            title={filter ? 'Show All' : 'Show Liked'}
                            onClick={() => setFilter(!filter)}>
                        <i className="fa-solid fa-filter"></i>
                    </button>
                    <input className="main__input"
                           type="text"
                           placeholder="Search..."
                           value={searchQuery}
                           onChange={handleSearchChange}/>
                </div>
            </div>
            <div className="music-list">{
                filter ? (querySongs.filter(song => song.isFavorite === true)
                        .map(song => <SongItem song={song}/>)
                ) : (paginatedSongs.map(song =>
                    <SongItem song={song}/>
                ))}</div>
            {totalPages > 1 && <div className="pagination">
                <button className={`pagination__arrow ${currentPage === 1 && 'pagination__arrow--disabled'}`}
                        onClick={() => handlePageChange(currentPage - 1)}>
                    &lt;
                </button>
                {Array.from({length: totalPages}, (_, index) => (
                    <button
                        key={index + 1}
                        className={`pagination__button ${currentPage === index + 1 ? 'pagination__button--active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button className={`pagination__arrow ${currentPage === totalPages && 'pagination__arrow--disabled'}`}
                        onClick={() => handlePageChange(currentPage + 1)}>
                    &gt;
                </button>
            </div>}
        </section>
    )
}

export default MusicList;