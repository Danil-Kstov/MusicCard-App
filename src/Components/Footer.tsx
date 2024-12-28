import React from 'react';
import "../scss/Footer.scss";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <p className="footer__text">
                <i className="fa-regular fa-copyright"></i> Danil Khlyustov 2024 All rights reserved
            </p>
        </footer>
    );
};

export default Footer;
