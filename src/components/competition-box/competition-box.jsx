import React from 'react'

import "./competition-box.scss";

export default function CompetitionBox(props) {
    return (
        <div className={props.width ? "comp-box comp-wide" : "comp-box"}>
            <div className="comp-price-tag">Ticket price: £{props.price}</div>
            <div className="comp-img" style={{ backgroundImage: `url(${props.img}` }}>
            </div>
            <div className="comp-footer">
                <div className="comp-text-box">
                    <div className="w-100">
                        <h2>{props.title}</h2>
                    </div>
                    <div className="w-75">
                        <div className="w-100">
                            <p>Price value: £{props.value}</p>
                            <p>Competition ends on: {props.end}</p>
                        </div>
                    </div>
                    <div className="w-25 d-flex">
                        <div className="comp-enter">
                            ENTER
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
