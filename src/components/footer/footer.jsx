import React from 'react'
import WordMark from '../wordmark/WordMark';

import { NavLink } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';

import { ReactComponent as Facebook } from "../../assets/socialmedia/facebook.svg";
import { ReactComponent as WhatsApp } from "../../assets/socialmedia/whatsapp.svg";
import { ReactComponent as YouTube } from "../../assets/socialmedia/youtube.svg";
import { ReactComponent as Messenger } from "../../assets/socialmedia/messenger.svg";

import "./footer.scss";

export default function Footer(props) {
    return (
        <div className="footer-wrapper">

            <div style={{ backgroundColor: "#fff" }}>
                {props.children}
            </div>

            <div className="footer-main">
                <div className="footer-top">
                    <div className="footer-top-margin">
                        <div className="footer-w-3rd">
                            <WordMark></WordMark>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.</p>
                            <div className="footer-medias">
                                <a className="footer-media" href="https://facebook.com/"><Facebook></Facebook></a>
                                <a className="footer-media" href="https://facebook.com/"><WhatsApp></WhatsApp></a>
                                <a className="footer-media" href="https://facebook.com/"><YouTube></YouTube></a>
                                <a className="footer-media" href="https://facebook.com/"><Messenger></Messenger></a>
                            </div>
                        </div>
                        <div className="footer-w-3rd d-flex justify-space-between f-wrap">
                            <div className="footer-nc-break footer-nav footer-media-margin">
                                <h3>Navigation</h3>
                                <NavHashLink to="/#aboutus" className="footer-nav-item">About us</NavHashLink>
                                <NavHashLink to="/#how-it-works" className="footer-nav-item">How it works?</NavHashLink>
                                <NavLink to="/competitions" className="footer-nav-item">Competitions</NavLink>
                                <NavLink to="/faq" className="footer-nav-item">FAQ</NavLink>
                                <NavLink to="/contact-us" className="footer-nav-item">Contact us</NavLink>
                            </div>
                            <div className="footer-nc-break footer-contacts footer-media-margin">
                                <h3>Contact us</h3>
                                <p>Support number: +44 7778 823</p>
                                <p>Email: info@lottify.co.uk</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bot">
                    <div className="footer-copyright">
                        Copyright © Lottify 2020. All rights reserved
                </div>
                    <div className="footer-links">
                        <NavLink to="/terms" className="footer-link">Terms & Contitions</NavLink>
                        <NavLink to="/privacy" className="footer-link">Privacy policy</NavLink>
                        <NavLink to="/cookies" className="footer-link">Cookie policy</NavLink>
                    </div>
                </div>
            </div>
        </div>

    )
}
