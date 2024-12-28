import { useParams} from "react-router-dom";
import useSongStore from "../store/store.ts";
import { useState } from "react";
import "../scss/SongInfo&Add.scss";

const SongInfo = () => {
    const { id } = useParams();
    const songs = useSongStore((state) => state.songs);
    const updateSong = useSongStore((state) => state.updateSong);

    const [isEdit, setIsEdit] = useState(false);
    const [editedSong, setEditedSong] = useState(null);

    const song = songs.find((song) => song.id === id);

    if (!song) {
        throw new Error("Song not found");
    }

    const handleEdit = () => {
        setIsEdit(true);
        setEditedSong({ ...song });
    };

    const handleSave = () => {
        updateSong(id, editedSong);
        setIsEdit(false);
    };

    const handleCancel = () => {
        setIsEdit(false);
        setEditedSong(null);
    };

    const handleChange = (field, value) => {
        setEditedSong((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <section className="song__info">
                <div className="song__info__header">
                    <button
                        className="song__info--button"
                        onClick={() => window.history.back()}
                    >
                        Back
                    </button>
                    <h1 className="song__info__header--title">Music Card Details</h1>
                    <button className={`song__info--button ${isEdit ? "song__info--button-disabled" : ""}`}
                            onClick={handleEdit}>
                        Edit
                    </button>
                </div>
                <div className="song__info__content">
                    {isEdit ? (
                        <>
                            <div className="columns">
                                <label>
                                    Image:
                                    <input
                                        type="text"
                                        value={editedSong.image}
                                        onChange={(e) => handleChange("image", e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="columns">
                                <label>
                                    Name:
                                    <input
                                        type="text"
                                        value={editedSong.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                    />
                                </label>
                                <label>
                                    Link:
                                    <input
                                        type="text"
                                        value={editedSong.link}
                                        onChange={(e) => handleChange("link", e.target.value)}
                                    />
                                </label>
                                <label>
                                    Album:
                                    <input
                                        type="text"
                                        value={editedSong.album}
                                        onChange={(e) => handleChange("album", e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="columns">
                                <label>
                                    Artists:
                                    <input
                                        type="text"
                                        value={editedSong.artists}
                                        onChange={(e) => handleChange("artists", e.target.value)}
                                    />
                                </label>
                                <label>
                                    Release Date:
                                    <input className="song__info--date"
                                           type="date"
                                           value={editedSong.release_date}
                                           onChange={(e) => handleChange("release_date", e.target.value)}
                                    />
                                </label>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="columns">
                                <div className="inline-elements">
                                    <span>Image: </span>
                                    <img src={song.image} alt={song.name}/>
                                </div>
                            </div>
                            <div className="columns">
                                <div className="inline-elements">
                                    <span>Name: {song.name}</span>
                                </div>
                                <div className="inline-elements">
                                    <span>Link: {song.link}</span>
                                </div>
                                <div className="inline-elements">
                                    <span>Album: {song.album}</span>
                                </div>
                            </div>
                            <div className="columns">
                                <div className="inline-elements">
                                    <span>Artists: {song.artists}</span>
                                </div>
                                <div className="inline-elements">
                                    <span>Release Date: {song.release_date}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="song__info__actions">
                    {isEdit ? (
                        <>
                            <button className="song__info--button" onClick={handleSave}>
                                Save
                            </button>
                            <button className="song__info--button" onClick={handleCancel}>
                                Cancel
                            </button>
                        </>
                    ) : null}
                </div>
        </section>
    );
};

export default SongInfo;
