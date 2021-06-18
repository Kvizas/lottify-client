import React from 'react'

import "./text-input.scss";

export default function TextInput(props) {
    return (
        <div className={`text-input ${props.className}`}>
            {props.icon ?
                <div className="text-input-icon">
                    <img alt="" src={props.icon}></img>
                </div>
                : ""}
            <input
                className={props.icon ? "" : "text-input-no-icon"}
                type={props.type ? props.type : "text"}
                placeholder={props.placeholder}
                onChange={c => props.value.current = c.target.value}
            ></input>
        </div>
    )
}
