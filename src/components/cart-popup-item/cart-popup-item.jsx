import React from 'react'

import "./cart-popup-item.scss"

import { API_URL } from '../../settings';

export default function CartPopupItem({product}) {

    try {
    const data = product.compData;

        return (
            <div className="cart-popup-item">
                <img src={API_URL + data.Images[0].formats.small.url} alt={data.Title} />
                <div className="cart-popup-item-text">
                    <p className="cart-popup-item-m bold black">Added to cart</p>
                    <p className="bold black">{data.Title}</p>
                    <p>
                        Price: £{data.Price.toFixed(2)}
                        <br/>
                        Qty: {product.quantity}
                    </p>
                </div>
            </div>
        )
    } catch {
        return <></>;
    }
}
