import React from 'react'

import { ReactComponent as ErrorSvg } from "./database-error.svg";

export default function DBError() {
    return (
        <div className="w-100 d-flex justify-center f-wrap">
            <ErrorSvg style={{ width: "40px", fill: "#E05955" }}></ErrorSvg>
            <h3 className="w-100 text-center">Server error: failed to fully load</h3>
        </div>
    )
}
