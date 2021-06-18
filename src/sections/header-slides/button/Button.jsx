import React from 'react'

import "./Button.scss";

export default function Button(props) {
    return (
        <div className={`slider-button`} onClick={props.onClick}>
            {props.children}
        </div>
    )
}
