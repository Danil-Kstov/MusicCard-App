import useSongStore, { Song } from "../store/store.ts";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SongAdd = () => {
    const addSong = useSongStore((state) => state.addSong);
    const navigate = useNavigate();

    const [newSong, setNewSong] = useState<Song>({
        id: '',
        image: '',
        name: '',
        link: '',
        album: '',
        artists: '',
        release_date: '',
        isFavorite: false
    });

    const [errors, setErrors] = useState({
        image: '',
        name: '',
        link: '',
        album: '',
        artists: '',
        release_date: ''
    });

    const validate = () => {
        const newErrors = { ...errors };

        newErrors.image = newSong.image.trim() ? '' : 'Image URL is required.';
        newErrors.name = newSong.name.trim() ? '' : 'Name is required.';
        newErrors.link =
            newSong.link.trim() && newSong.link.startsWith('http')
                ? ''
                : 'Valid URL is required.';
        newErrors.album = newSong.album.trim() ? '' : 'Album name is required.';
        newErrors.artists = newSong.artists.trim() ? '' : 'Artist(s) name is required.';
        newErrors.release_date = newSong.release_date ? '' : 'Release date is required.';

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');
    };

    const handleSave = () => {
        if (validate()) {
            const id = nanoid();
            addSong(newSong, id);
            navigate('/products');
        }
    };

    const handleChange = (field: string, value: string) => {
        setNewSong((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: '' }));
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
                        {errors.image && <span className="error">{errors.image}</span>}
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
                        {errors.name && <span className="error">{errors.name}</span>}
                    </label>
                    <label>
                        Link:
                        <input
                            type="text"
                            value={newSong.link}
                            onChange={(e) => handleChange("link", e.target.value)}
                        />
                        {errors.link && <span className="error">{errors.link}</span>}
                    </label>
                    <label>
                        Album:
                        <input
                            type="text"
                            value={newSong.album}
                            onChange={(e) => handleChange("album", e.target.value)}
                        />
                        {errors.album && <span className="error">{errors.album}</span>}
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
                        {errors.artists && <span className="error">{errors.artists}</span>}
                    </label>
                    <label>
                        Release Date:
                        <input
                            className="song__add--date"
                            type="date"
                            value={newSong.release_date}
                            onChange={(e) => handleChange("release_date", e.target.value)}
                        />
                        {errors.release_date && (
                            <span className="error">{errors.release_date}</span>
                        )}
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
};

export default SongAdd;

