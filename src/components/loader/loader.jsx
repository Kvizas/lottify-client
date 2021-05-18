import React from 'react'

import "./loader.scss";

export default function Loader() {
    return (
        <div className="w-100 d-flex justify-center">
            <div class="lds-dual-ring"></div>
        </div>
    )
}
