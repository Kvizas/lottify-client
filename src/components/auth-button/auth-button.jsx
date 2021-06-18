import React from 'react'

import "./auth-button.scss";

export default function AuthButton(props) {
    return (
        <div className="auth-button" onClick={props.onClick}>
            {props.children}
        </div>
    )
}
