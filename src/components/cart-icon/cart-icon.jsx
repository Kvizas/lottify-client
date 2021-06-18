import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';

import { CartContext } from '../../contexts/cart-context-provider';

import { ReactComponent as CartSvg } from "./shopping-cart.svg";

import "./cart-icon.scss";

export default function CartIcon() {

    const { cart } = useContext(CartContext);

    return (
        <NavLink to="/cart" className="nav-icon cart-icon">
            <CartSvg></CartSvg>
            {
                cart.products.length > 0 ?
                    <div class="badge badge-light">{cart.products.map(prod => prod.quantity).reduce((a, b) => a + b, 0)}</div>
                    : ""
            }
        </NavLink>
    )
}
