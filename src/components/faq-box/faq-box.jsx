import React, { useState, useRef } from 'react'

import "./faq-box.scss";

import { ReactComponent as Arrow } from "../../assets/misq/ios-arrow-down.svg";

export default function FAQBox(props) {

    const [expanded, setExpanded] = useState(false);

    const [locked, setLocked] = useState(false);

    const para = useRef();
    const arrow = useRef();

    const expand = () => {
        if (locked) return;
        if (expanded) {
            para.current.style.opacity = "0";
            para.current.style.maxHeight = "0";
            para.current.style.margin = "0";
            arrow.current.style.transform = "scaleY(1)";
        }
        else {
            para.current.style.maxHeight = para.current.scrollHeight + "px";
            para.current.style.margin = "12px 0 0 0";
            arrow.current.style.transform = "scaleY(-1)";
            setLocked(true);
            setTimeout(() => {
                para.current.style.opacity = "1";
                setLocked(false);
            }, 400);
        }
        setExpanded(prev => !prev);
    }

    return (
        <div className="faq-box">
            <div className="faq-content">
                <p className="faq-title" onClick={expand}>{props.title}</p>
                <p style={{ opacity: "0", maxHeight: "0" }} ref={para}>{props.children}</p>
            </div>
            <Arrow className="faq-arrow" ref={arrow} onClick={expand}></Arrow>
        </div>
    )
}
