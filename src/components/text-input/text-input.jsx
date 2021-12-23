import React, { useEffect, useState } from 'react'

import "./text-input.scss";

export default function TextInput(props) {

    const [ev, setEv] = useState({v: props.default })

    const change = c => {
        setEv({v: c.target.value, c: c});
    }

    useEffect(() => {
        try {
            if (props.value) props.value.current = ev.v;
            if (props.onChange) props.onChange(ev.c.target.value, ev.c);
        } catch (ex) {
            console.log(ex)
        }
    }, [props.value, ev])

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
                        value={ev.v}
                        onChange={change} />
            }
        </div>
    )
}
