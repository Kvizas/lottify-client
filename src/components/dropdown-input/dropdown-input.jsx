import React, { useState } from 'react'

import "./dropdown-input.scss";

import { ReactComponent as Arrow } from "../../assets/misq/ios-arrow-down.svg";

export default function DropdownInput(props) {

    const [selected, setSelected] = useState()
    const [opened, setOpened] = useState()

    const select = option => {
        setSelected(option);
        props.onSelect(option);
    }

    return (
        <div className={`dropdown ${props.className || ""}`} style={props.style} onClick={() => setOpened(prev => !prev)}>
            <div className="d-flex w-100">
                {props.icon ?
                    <div className="text-input-icon">
                        <img alt="" src={props.icon} style={props.iconStyle}></img>
                    </div>
                    : ""}
                <div className="d-flex justify-space-between" style={{ marginRight: "10px", width: "inherit" }}>
                    <div className={`custom-select ${selected ? '' : 'custom-select-placeholder'}`}>
                        {selected ?
                            selected :
                            props.placeholder
                        }
                    </div>
                    <Arrow className={`dropdown-arrow ${opened ? "dropdown-arrow-opened" : ""}`} />
                </div>

            </div>
            <div className="custom-options" style={opened ? {} : { display: "none" }}>
                {props.options.map((option, i) => <div key={i} className="custom-option" onClick={() => select(option)}>{option}</div>)}
            </div>
        </div>
    )
}
