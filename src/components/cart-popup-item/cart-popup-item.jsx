import React from 'react'

import "./cart-popup-item.scss"

import { API_URL } from '../../settings';

export default function CartPopupItem({product}) {

    const data = product.compData;

    return (
        <div style={{display: "flex", padding: "24px 16px"}}>
            <img src={API_URL + data.Images[0].formats.small.url} alt={data.Title} style={{width: "160px"}} />
            <div style={{margin: "0 16px", display: "flex", flexWrap: "wrap", alignContent: "space-between"}}>
                <p style={{}}>£{data.Price.toFixed(2)}</p>
                <p style={{color: "#6A6A6A", fontWeight: "normal", textTransform: "none"}}>{data.Title}</p>
                <p style={{color: "#6A6A6A", fontWeight: "normal", textTransform: "none"}}>Qty: {product.quantity}
                </p>
            </div>
        </div>
    )
}
