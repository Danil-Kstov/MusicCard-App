import React from 'react';
import {useNavigate} from "react-router-dom";
import useSongState from '../store/store';
import {Song} from '../store/store';
import "../scss/SongItem.scss"

interface SongItemProps {
    song: Song;
}

const SongItem: React.FC<SongItemProps> = ({song}) => {
    const {toggleLike, deleteSong} = useSongState();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/products/${song.id}`);
    }

    function formatTextForCard(input: string): string {
        const trimmed = input.length > 36 ? input.slice(0, 33) : input;

        const hasSpaceBefore20 = trimmed.slice(0, 20).includes(" ");
        const withSpace = trimmed.length > 19 && !hasSpaceBefore20
            ? trimmed.slice(0, 20) + " " + trimmed.slice(20)
            : trimmed;

        return input.length > 36 ? withSpace + "..." : withSpace;
    }


    return (
        <div className="song__item" onClick={handleClick}>
            <button className="song__button-delete"
                    onClick={(event) => {
                        event.stopPropagation();
                        deleteSong(song.id);
                        }}>
                <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="song__content">
                <img className="song__image" src={song.image}/>
                <div className="song__text">
                    <h3 className="song__text__title">{formatTextForCard(song.name)}</h3>
                </div>
                <div className="song__text">
                    <h3 className="song__text__artists">{formatTextForCard(song.artists)}</h3>
                </div>
                <button className={`song__button-like ${song.isFavorite ? 'song__button-like--active' : ''}`}
                        onClick={(event) => {
                            event.stopPropagation();
                            toggleLike(song.name);
                        }}>
                    <i className="fa-solid fa-heart"></i>
                </button>
            </div>
        </div>
    )
}

export default SongItem;