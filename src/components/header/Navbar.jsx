import React, { useRef, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import WordMark from "../wordmark/WordMark";

import "./Navbar.scss";

import { ReactComponent as Facebook } from "../../assets/socialmedia/facebook.svg";
import { ReactComponent as WhatsApp } from "../../assets/socialmedia/whatsapp.svg";
import { ReactComponent as YouTube } from "../../assets/socialmedia/youtube.svg";
import { ReactComponent as Messenger } from "../../assets/socialmedia/messenger.svg";

export default function Navbar() {

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
            <div className="navbar-height"></div>
            <div className="nav-modal-background" ref={modalBackground} onClick={clickOnBurger}></div>
            <div className="nav-modal-container" ref={modal}>
                <div className="nav-modal-menu">
                    <NavLink to="/profile" className="nav-item nav-item-inmodal d-flex align-center" activeClassName="nav-item-active">
                        <div className="nav-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30.109" height="25.75" viewBox="0 0 30.109 25.75">
                                <g id="Group_1361" data-name="Group 1361" transform="translate(22760.609 16380.5)">
                                    <path id="Path_48" data-name="Path 48" d="M29.32,5.625H9.633A3.235,3.235,0,0,0,6.4,8.859a.984.984,0,0,0,1.969,0A1.269,1.269,0,0,1,9.633,7.594H29.32a1.269,1.269,0,0,1,1.266,1.266V27.141a1.269,1.269,0,0,1-1.266,1.266H9.633a1.269,1.269,0,0,1-1.266-1.266.984.984,0,0,0-1.969,0,3.235,3.235,0,0,0,3.234,3.234H29.32a3.235,3.235,0,0,0,3.234-3.234V8.859A3.235,3.235,0,0,0,29.32,5.625Z" transform="translate(-22763.555 -16385.625)" fill="#e05955" stroke="#e05955" stroke-width="1" />
                                    <path id="Path_49" data-name="Path 49" d="M15.75,23.5a.993.993,0,0,0,0,1.392l.007.007a1.017,1.017,0,0,0,.689.274.95.95,0,0,0,.7-.288L22.95,19.09a1.381,1.381,0,0,0,0-2.053L17,11.1a.978.978,0,0,0-.7-.288.961.961,0,0,0-.7.288.98.98,0,0,0,0,1.392l4.584,4.514H4.43a.984.984,0,0,0,0,1.969H20.222Z" transform="translate(-22763.555 -16385.625)" fill="#e05955" stroke="#e05955" />
                                </g>
                            </svg>
                        </div>
                        Log in/Sign up
                    </NavLink>
                    <NavLink to="/about" className="nav-item nav-item-inmodal d-block" activeClassName="nav-item-active">About us</NavLink>
                    <NavLink to="/how-it-works" className="nav-item nav-item-inmodal d-block" activeClassName="nav-item-active">How it works</NavLink>
                    <NavLink to="/competitions" className="nav-item nav-item-inmodal d-block" activeClassName="nav-item-active">Competitions</NavLink>
                    <NavLink to="/faq" className="nav-item nav-item-inmodal d-block" activeClassName="nav-item-active">FAQ</NavLink>
                    <NavLink to="/contact-us" className="nav-item nav-item-inmodal d-block" activeClassName="nav-item-active">Contact us</NavLink>
                </div>
                <div className="nav-modal-footer">
                    <a className="w-100 flex-content-center" href="https://facebook.com/"><Facebook className="nav-media-icon"></Facebook></a>
                    <a className="w-100 flex-content-center" href="https://facebook.com/"><WhatsApp className="nav-media-icon"></WhatsApp></a>
                    <a className="w-100 flex-content-center" href="https://facebook.com/"><YouTube className="nav-media-icon"></YouTube></a>
                    <a className="w-100 flex-content-center" href="https://facebook.com/"><Messenger className="nav-media-icon"></Messenger></a>
                </div>
            </div>
            <div className="navbar-background">
                <div className="navbar-content">
                    <NavLink to="/" className="td-none">
                        <WordMark></WordMark>
                    </NavLink>
                    <div className="nav-burger" onClick={clickOnBurger}>
                        <div className="nav-burger-stack"></div>
                        <div className="nav-burger-stack"></div>
                        <div className="nav-burger-stack"></div>
                    </div>
                    <div className="nav-outside-burger">
                        <div className="navigation">
                            <NavLink to="/about" className="nav-item" activeClassName="nav-item-active">About us</NavLink>
                            <NavLink to="/how-it-works" className="nav-item" activeClassName="nav-item-active">How it works</NavLink>
                            <NavLink to="/competitions" className="nav-item" activeClassName="nav-item-active">Competitions</NavLink>
                            <NavLink to="/faq" className="nav-item" activeClassName="nav-item-active">FAQ</NavLink>
                            <NavLink to="/contact-us" className="nav-item" activeClassName="nav-item-active">Contact us</NavLink>
                        </div>
                        <div className="nav-right">
                            <NavLink to="/profile" className="nav-item d-flex align-center" activeClassName="nav-item-active">
                                Account
                                <div className="nav-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30.109" height="25.75" viewBox="0 0 30.109 25.75">
                                        <g id="Group_1361" data-name="Group 1361" transform="translate(22760.609 16380.5)">
                                            <path id="Path_48" data-name="Path 48" d="M29.32,5.625H9.633A3.235,3.235,0,0,0,6.4,8.859a.984.984,0,0,0,1.969,0A1.269,1.269,0,0,1,9.633,7.594H29.32a1.269,1.269,0,0,1,1.266,1.266V27.141a1.269,1.269,0,0,1-1.266,1.266H9.633a1.269,1.269,0,0,1-1.266-1.266.984.984,0,0,0-1.969,0,3.235,3.235,0,0,0,3.234,3.234H29.32a3.235,3.235,0,0,0,3.234-3.234V8.859A3.235,3.235,0,0,0,29.32,5.625Z" transform="translate(-22763.555 -16385.625)" fill="#e05955" stroke="#e05955" stroke-width="1" />
                                            <path id="Path_49" data-name="Path 49" d="M15.75,23.5a.993.993,0,0,0,0,1.392l.007.007a1.017,1.017,0,0,0,.689.274.95.95,0,0,0,.7-.288L22.95,19.09a1.381,1.381,0,0,0,0-2.053L17,11.1a.978.978,0,0,0-.7-.288.961.961,0,0,0-.7.288.98.98,0,0,0,0,1.392l4.584,4.514H4.43a.984.984,0,0,0,0,1.969H20.222Z" transform="translate(-22763.555 -16385.625)" fill="#e05955" stroke="#e05955" />
                                        </g>
                                    </svg>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
