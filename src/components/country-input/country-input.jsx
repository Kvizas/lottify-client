import React, { useState } from 'react'

import "./country-input.scss";

import { CountryDropdown } from 'react-country-region-selector';

export default function CountryInput(props) {

    const [value, setValue] = useState(props.default || null);

    return (
        <div className={`text-input ${props.className}`}>
            {props.icon ?
                <div className="text-input-icon">
                    <img alt="" src={props.icon}></img>
                </div>
                : ""}
            {/* <input
                className={props.icon ? "" : "text-input-no-icon"}
                type={props.type ? props.type : "text"}
                placeholder={props.placeholder}
                onChange={c => props.value.current = c.target.value}
            ></input> */}
            <CountryDropdown value={value} classes={`country-input ${props.icon ? "" : "text-input-no-icon"}`} onChange={v => {
                setValue(v);
                if (props.onChange) props.onChange(v);
            }}></CountryDropdown>
        </div>
    )
}
