import React from 'react';
import '../scss/Header.scss';

interface HeaderProps {
    isAdd?: boolean
}

const Header: React.FC<HeaderProps> = ({isAdd=false}) => {
    return (
        <header className="header">
            <nav className="nav">
                <a className="nav__logo" href="/products">
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                    <i className="fa-solid fa-music"></i>
                </a>
                <ul className="nav__list">
                    <li className={`nav__item ${isAdd ? "" : "nav__item--active"}`}>
                        <a href="/products">List</a>
                    </li>
                    <li className={`nav__item ${isAdd ? "nav__item--active" : ""}`}>
                        <a href="/create-product">Add</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;