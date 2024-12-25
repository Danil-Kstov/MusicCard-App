import React from 'react';
import useSongState from '../store/store';
import {Song} from '../store/store';
import "../scss/SongItem.scss"

interface SongItemProps {
    song: Song[];
}

const SongItem : React.FC<SongItemProps> = ({name, isFavorite}) => {
    const {toggleLike} = useSongState();

    return (
        <div className="song__item">
            <div className="song__title-panel">
                <h3 className="song__title">{name}</h3>
                <button onClick={() => useSongState.dispatch({type: 'DELETE_SONG', payload: name})}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <p>ЗАГУГЛИТЬ ПРО HEIGHT 100%</p>
            <p>Имя артиста</p>
            <p>Альбом</p>
            <p>Длительность</p>
            <button className={`song__button-like ${isFavorite ? 'song__button-like--active' : ''}`}
                    onClick={() => toggleLike(name)}>
                <i className="fa-solid fa-heart"></i>
            </button>
        </div>
    )
}

export default SongItem;