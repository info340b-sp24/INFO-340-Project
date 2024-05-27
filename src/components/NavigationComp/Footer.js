import React, { useEffect } from "react";
import "../../CSS/Footer.css";
import {FaGithub, FaEnvelope} from "react-icons/fa";

function Footer() {
    const [currentYr, setCurrentYr] = React.useState(0);

    useEffect(() => {
        const today = new Date();
        setCurrentYr(today.getFullYear());
    }, []);

    return (
        <footer className="og-footer">
            <div className="footer-contents-container">
                <div className="row">
                    <span className="links-section">
                        <a href="https://github.com/RandolphTang/NutriGenius" target="_blank"
                            rel="noopener noreferrer">
                        <FaGithub/>
                        </a>

                        <a href="mailto:y031125k@gmail.com?subject=Subject Text&body=Body Content" target="_blank"
                           rel="noopener noreferrer">
                        <FaEnvelope/>
                        </a>
                    </span>

                    <span className="copyright-section">
                        <span className="copyright-message"> Copyright © UW NutriGenius {currentYr}</span>
                        <span className="collaboration-message">Collaboration with Love</span>
                    </span>
                </div>
            </div>
        </footer>
    );
}


export default Footer;