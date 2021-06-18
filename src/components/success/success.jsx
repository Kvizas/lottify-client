import React from 'react'

import TickSVG from "./tick.svg";

import "./success.scss";

export default function Success(props) {
    return (
        <div className="success-block">
            <h3 className={`w-100 ${props.small ? "success-small-title" : ""}`}>{props.title}</h3>
            <img alt="" src={props.icon || TickSVG} className={props.small ? "success-small-tick" : ""}></img>
            <p className="w-100">{props.children}</p>
        </div>
    )
}
