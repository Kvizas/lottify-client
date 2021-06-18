import React from 'react'

import "./price-tag.scss";

export default function PriceTag(props) {
    return (
        <div className="comp-price-tag">Ticket price: £{props.price}</div>
    )
}
