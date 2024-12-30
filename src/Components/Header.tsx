import React from 'react';
import '../scss/Header.scss';
import {Link} from "react-router-dom";

interface HeaderProps {
    isAdd?: boolean
}

const Header: React.FC<HeaderProps> = ({isAdd=false}) => {
    return (
        <header className="header">
            <nav className="nav">
                <Link className="nav__logo" to="/products">
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                    <i className="fa-solid fa-music"></i>
                </Link>
                <ul className="nav__list">
                    <li className={`nav__item ${isAdd ? "" : "nav__item--active"}`}>
                        <Link to="/products">List</Link>
                    </li>
                    <li className={`nav__item ${isAdd ? "nav__item--active" : ""}`}>
                        <Link to="/create-product">Add</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;