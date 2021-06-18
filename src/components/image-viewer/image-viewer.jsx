import React, { useState } from 'react'

import { API_URL } from "../../settings";

import Arrow from "./arrow.svg";
import Close from "./close.svg";

import "./image-viewer.scss";

export default function ImageViewer(props) {

    const [open, setOpen] = useState(false);
    const [openedId, setOpenedId] = useState(0);

    const openImage = id => {
        const images = props.children.map(c => c.props.url);
        const breakPoint = images.length - 1;
        if (id > breakPoint) id = 0;
        else if (id < 0) id = breakPoint;
        setOpen(images[id]);
        setOpenedId(id);
    }

    const close = () => {
        setOpen(false);
    }

    props.myRef.current.view = openImage;

    return (
        <div className="w-100 d-flex f-wrap justify-space-between">
            <div className={`iw-modal ${open ? "" : "iw-modal-closed"}`} onClick={close}></div>
            <div className={`iw-viewer d-flex f-wrap ${open ? "" : "iw-modal-closed"}`}>
                <div className="iw-controller">
                    <img alt="" src={Close} className="iw-close" onClick={close}></img>
                </div>
                <div className="iw-image-wrapper">
                    <img alt="" className="iw-image" src={API_URL + open}></img>
                </div>
                <div className="iw-controller">
                    <img alt="" src={Arrow} className="iw-arrow" onClick={() => openImage(openedId - 1)}></img>
                    <img alt="" src={Arrow} className="iw-arrow iw-arrow-reverse" onClick={() => openImage(openedId + 1)}></img>
                </div>
            </div>
            {props.children}
        </div>
    )
}
