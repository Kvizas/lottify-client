import React from 'react'

import "./checkbox.scss";

export default function Checkbox({ small, onClick, children, ...props }) {
    return (
        <div className="d-flex align-center checkbox-margin" onClick={onClick}>
            <label className={`flex-content-center w-100 ${small ? "c-small" : ""}`}>
                <input {...props} type="checkbox" className="checkbox"></input>
                <p className="checkbox-p">{children}</p>
            </label>
        </div>
    )
}
