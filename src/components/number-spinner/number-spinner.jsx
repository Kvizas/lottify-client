import React, { useState, useEffect } from 'react'

import "./number-spinner.scss";

import Plus from "./plus.svg";
import Minus from "./minus.svg";

export default function NumberSpinner(props) {

    const [count, setCount] = useState(props.default ? props.default : 0)

    useEffect(() => {
        setCount(props.default)
    }, [props.default])

    const min = props.min || -Infinity;
    const max = props.max || Infinity;

    const changeCount = byValue => {
        setCount(prev => {
            const newValue = prev + byValue;
            if (newValue < min || newValue > max) return prev;
            props.change(newValue);
            return newValue;
        })
    }

    return (
        <div className="number-spinner">
            <div className={`ns-side ${min === count ? "ns-disabled" : ""}`} onClick={() => changeCount(-1)}>
                <img alt="" src={Minus} className="ns-svg-size" draggable={false}></img>
            </div>
            <div className="ns-count">
                {count}
            </div>
            <div className={`ns-side ${max === count ? "ns-disabled" : ""}`} onClick={() => changeCount(1)}>
                <img alt="" src={Plus} className="ns-svg-size" draggable={false}></img>
            </div>
        </div>
    )
}
