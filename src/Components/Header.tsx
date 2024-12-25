import React from 'react';
import '../scss/Header.scss';

const Header: React.FC = () => {
    return (
        <header className="header">
            <nav className="nav">
                <a className="nav__logo" href="#">
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                    <i className="fa-solid fa-music"></i>
                </a>
                <ul className="nav__list">
                <li className="nav__item nav__item--active">List</li>
                    <li className="nav__item">Add</li>
                </ul>
            </nav>
            <div className="switch-themes">
                <button className="switch-themes__btn switch-themes__btn--light switch-themes__btn--active">Light</button>
                <button className="switch-themes__btn switch-themes__btn--star">Star</button>
                <button className="switch-themes__btn switch-themes__btn--dark">Dark</button>
            </div>
        </header>
    )
}

export default Header;