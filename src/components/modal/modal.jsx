import React from 'react'

import "./modal.scss";

export default function Modal(props) {
    return (
        <div className={`modal-wrapper ${props.opened ? "modal-opened" : ""}`}>
            <div className={`modal-bg ${props.opened ? "" : "modal-closed"}`} onClick={props.close}></div>
            <div className={`modal-content ${props.opened ? "" : "modal-closed"}`}>
                {props.children}
            </div>
        </div>
    )
}
