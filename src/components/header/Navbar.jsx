import React, { useRef, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import WordMark from "../wordmark/WordMark";

import "./Navbar.scss";

import { ReactComponent as Facebook } from "../../assets/socialmedia/facebook.svg";
import { ReactComponent as WhatsApp } from "../../assets/socialmedia/whatsapp.svg";
import { ReactComponent as YouTube } from "../../assets/socialmedia/youtube.svg";
import { ReactComponent as Messenger } from "../../assets/socialmedia/messenger.svg";

export default function Navbar() {

    const location = useLocation();

    const [burgerActive, setBurgerActive] = useState(false);

    const modalBackground = useRef(null);
    const modal = useRef(null);

    function clickOnBurger(e, exit = false) {
        setBurgerActive(prev => {
            if (exit) prev = true;
            if (!prev) {
                modal.current.style.right = "0";
                modalBackground.current.style.visibility = "visible";
                modalBackground.current.style.opacity = 1;
            }
            else {
                modal.current.style.right = "-60%";
                modalBackground.current.style.visibility = "hidden";
                modalBackground.current.style.opacity = 0;
            }
            return !prev
        });
    }

    return (
        <div>
            <div class="navbar-height"></div>
            <div class="nav-modal-background" ref={modalBackground} onClick={clickOnBurger}></div>
            <div class="nav-modal-container" ref={modal}>
                <div class="nav-modal-menu">
                    <NavLink to="/about" className="nav-item nav-item-inmodal d-block" activeClassName="nav-item-active">About us</NavLink>
                    <NavLink to="/how-it-works" className="nav-item nav-item-inmodal d-block" activeClassName="nav-item-active">How it works</NavLink>
                    <NavLink to="/competitions" className="nav-item nav-item-inmodal d-block" activeClassName="nav-item-active">Competitions</NavLink>
                    <NavLink to="/faq" className="nav-item nav-item-inmodal d-block" activeClassName="nav-item-active">FAQ</NavLink>
                    <NavLink to="/contact-us" className="nav-item nav-item-inmodal d-block" activeClassName="nav-item-active">Contact us</NavLink>
                </div>
                <div class="nav-modal-footer">
                    <a class="w-100 flex-content-center" href="https://facebook.com/"><Facebook className="nav-media-icon"></Facebook></a>
                    <a class="w-100 flex-content-center" href="https://facebook.com/"><WhatsApp className="nav-media-icon"></WhatsApp></a>
                    <a class="w-100 flex-content-center" href="https://facebook.com/"><YouTube className="nav-media-icon"></YouTube></a>
                    <a class="w-100 flex-content-center" href="https://facebook.com/"><Messenger className="nav-media-icon"></Messenger></a>
                </div>
            </div>
            <div class="navbar-background">
                <div class="navbar-content">
                    <NavLink to="/" className="td-none">
                        <WordMark></WordMark>
                    </NavLink>
                    <div class="nav-burger" onClick={clickOnBurger}>
                        <div class="nav-burger-stack"></div>
                        <div class="nav-burger-stack"></div>
                        <div class="nav-burger-stack"></div>
                    </div>
                    <div class="nav-outside-burger">
                        <div class="navigation">
                            <NavLink to="/about" className="nav-item" activeClassName="nav-item-active">About us</NavLink>
                            <NavLink to="/how-it-works" className="nav-item" activeClassName="nav-item-active">How it works</NavLink>
                            <NavLink to="/competitions" className="nav-item" activeClassName="nav-item-active">Competitions</NavLink>
                            <NavLink to="/faq" className="nav-item" activeClassName="nav-item-active">FAQ</NavLink>
                            <NavLink to="/contact-us" className="nav-item" activeClassName="nav-item-active">Contact us</NavLink>
                        </div>
                        <div class="nav-menu">
                            <div class="nav-item">
                                Account
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
