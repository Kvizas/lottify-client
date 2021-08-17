import React from 'react';
import "./WordMark.scss";

import Logo from "./baltas_logo.svg"

export default function WordMark() {
    // return (
    //     <div id="wordmark">
    //         Lottify
    //     </div>
    // )

    return (
        <img alt="Logo" src={Logo} style={{width: "140px"}}/>
    )
}
