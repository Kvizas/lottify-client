import React, { useRef } from 'react'

import "./checkbox.scss";

export default function Checkbox(props) {
    const id = props.id;

    const checkbox = useRef();

    const click = () => {
        checkbox.current.checked = true;
        props.onChange();
    }

    return (
        <div className="w-100 d-flex align-center checkbox-margin" onClick={click}>
            <input id={id} name={props.name} type="radio" className="checkbox" ref={checkbox}></input>
            <label htmlFor={id} className="c-label">{props.children}</label>
        </div>
    )
}
