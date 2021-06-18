import React from 'react'

import "./progress-bar.scss";

export default function ProgressBar(props) {
    return (
        <div className="progress-margin">
            <div className="progress-top">
                <span>0</span>
                <span>{props.left} left</span>
                <span>{props.total}</span>
            </div>
            <div className="progress-bar">
                <div className="progress-active" style={{ width: props.progress + "%" }}></div>
            </div>
        </div>
    )
}
