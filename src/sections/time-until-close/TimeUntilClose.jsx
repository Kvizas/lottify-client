import React from 'react'

import "./TimeUntilClose.scss";

export default function TimeUntilClose() {
    return (
        <div className="tuc-main">
            <div className="tuc-left tuc-block">
                <div className="tuc-text-box">
                    <h1 className="tuc-h1">Win something you always dreamt about</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Velit id minima reprehenderit maiores nam laborum nihil
                    aperiam debitis.</p>
                </div>

            </div>
            <div className="tuc-right tuc-block">
                <div className="tuc-text-box">
                    <h1 className="white tuc-h1">Time left until the draw closes:</h1>
                    <div className="tuc-timer">21 : 07 : 22 : 45</div>
                </div>
            </div>
        </div >
    )
}
