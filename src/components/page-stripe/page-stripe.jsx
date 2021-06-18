import React from 'react'

import "./page-stripe.scss";

export default function PageStripe(props) {
    return (
        <div className="page-stripe-margin">
            <div className="page-stripe">
                {props.children}
            </div>
        </div>
    )

}
