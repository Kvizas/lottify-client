import React from 'react'

import { API_URL } from "../../settings";

import "./thumbnail.scss";

export default function Thumbnail(props) {

    return (
        <div
            className={`thumbnail ${props.firstHidden ? "thumbnail-first-hidden" : ""} ${props.lastWide ? "thumbnail-last-wide" : ""}`}
            style={{ backgroundImage: `url(${API_URL + props.url})` }}
            onClick={props.onClick}
        >
        </div>
    )
}
