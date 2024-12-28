import useSongStore  from "../store/store.ts";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SongAdd = () => {
    const addSong = useSongStore((state) => state.addSong);
    const navigate = useNavigate();
    const [newSong, setNewSong] = useState({
        image: '',
        name: '',
        link: '',
        album: '',
        artists: '',
        release_date: ''
    });

    const handleSave = () => {
        const id = nanoid();
        addSong({ ...newSong, id });
        navigate('/products')
    };

    const handleChange = (field, value) => {
        setNewSong((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <section className="song__add">
            <div className="song__add__header">
                <h1 className="song__add__header--title">Create New Card</h1>
            </div>
            <div className="song__add__content">
                <div className="columns">
                    <label>
                        Image:
                        <input
                            type="text"
                            value={newSong.image}
                            onChange={(e) => handleChange("image", e.target.value)}
                        />
                    </label>
                </div>
                <div className="columns">
                    <label>
                        Name:
                        <input
                            type="text"
                            value={newSong.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                    </label>
                    <label>
                        Link:
                        <input
                            type="text"
                            value={newSong.link}
                            onChange={(e) => handleChange("link", e.target.value)}
                        />
                    </label>
                    <label>
                        Album:
                        <input
                            type="text"
                            value={newSong.album}
                            onChange={(e) => handleChange("album", e.target.value)}
                        />
                    </label>
                </div>
                <div className="columns">
                    <label>
                        Artists:
                        <input
                            type="text"
                            value={newSong.artists}
                            onChange={(e) => handleChange("artists", e.target.value)}
                        />
                    </label>
                    <label>
                        Release Date:
                        <input
                            className="song__add--date"
                            type="date"
                            value={newSong.release_date}
                            onChange={(e) => handleChange("release_date", e.target.value)}
                        />
                    </label>
                </div>
            </div>
            <div className="song__add__actions">
                <button className="song__info--button" onClick={handleSave}>
                    Save
                </button>
                <button className="song__info--button" onClick={() => navigate('/products')}>
                    Back
                </button>
            </div>
        </section>
    );
}

export default SongAdd;
