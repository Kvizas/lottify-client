import React from 'react'

import "./button.scss";

export default function Button(props) {
    return (
        <div
            className={`button ${props.className ? props.className : ""} ${props.disabled ? "btn-disabled" : ""} ${props.short ? "btn-short" : ""} ${props.black ? "btn-black" : ""} ${props.green ? "btn-green" : ""}`}
            style={props.style} onClick={props.disabled ? () => { } : props.onClick}>
            <p className="btn-text">{props.children}</p>
        </div>
    )
}
