import React from 'react'

import "./text-input.scss";

export default function TextInput(props) {

    const change = c => {
        if (props.value) props.value.current = c.target.value;
        if (props.onChange) props.onChange(c.target.value, c);
    }

    return (
        <div className={`text-input ${props.className || ""}`} style={props.style}>
            {props.icon ?
                <div className="text-input-icon">
                    <img alt="" src={props.icon} style={props.iconStyle}></img>
                </div>
                : ""}
            {
                props.textArea ?
                    <textarea
                        className={props.icon ? "" : "text-input-no-icon"}
                        type={props.type ? props.type : "text"}
                        placeholder={props.placeholder}
                        onChange={change} />
                    :
                    <input
                        className={props.icon ? "" : "text-input-no-icon"}
                        type={props.type ? props.type : "text"}
                        placeholder={props.placeholder}
                        value={props.default}
                        onChange={change} />
            }
        </div>
    )
}
