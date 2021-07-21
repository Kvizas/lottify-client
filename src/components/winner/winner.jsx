import React from 'react'

import { API_URL } from '../../settings';

import "./winner.scss";

import { ReactComponent as SwitchSVG } from '../../assets/misq/switch.svg';

export default function Winner({ Profile, FirstName, LastName, Quote, onControl }) {
    return (
        <div style={{ margin: "44px 0" }} className="d-flex f-wrap">
            <div className="m-w-100 flex-content-center">
                <div className="carousel-btn d-hidden" onClick={() => onControl(0)}><SwitchSVG /></div>
                <div className="winner-avatar" style={{ backgroundImage: `url(${API_URL + Profile.url})` }}></div>
                <div className="carousel-btn carousel-btn-reverse d-hidden" onClick={() => onControl(1)}><SwitchSVG /></div>
            </div>
            <div className="winner-line" />
            <div className="winner-text mobile-text-center m-w-100 no-margin">
                <h4 className="winner-name">{FirstName} {LastName}</h4>
                <p className="winner-quote">“{Quote}”</p>
            </div>
        </div>
    )
}
