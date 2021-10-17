import React, { useContext } from 'react'

import "./cart-popup-mobile.scss";

import { CartContext } from '../../contexts/cart-context-provider';
import { CartPopupContext } from '../../contexts/cart-popup-context-provider';
import CartPopupItem from '../cart-popup-item/cart-popup-item';
import ContentCard from '../content-card/content-card';
import { NavLink } from 'react-router-dom';

import ExitSVG from "../../assets/misq/remove_white.svg";

export default function CartPopupMobile() {

    const { cart: { products }} = useContext(CartContext);
    const { cartPopupActive, setCartPopupActive, latestProduct } = useContext(CartPopupContext);

    try {
        return (
            <div className={`m-cart-popup ${cartPopupActive ? "m-cart-popup-active" : ""}`}>
                <ContentCard>
                    <div className="m-cart-popup-btn" onClick={() => setCartPopupActive(false)}>
                        <img src={ExitSVG} alt=""></img>
                    </div>
                    {
                    latestProduct !== undefined ?
                    <CartPopupItem
                        product={products[latestProduct]}
                    />
                    :
                    <></>
                    }
                    <div className="m-cart-popup-btn m-cart-popup-btn-cart">
                        <NavLink onClick={() => setCartPopupActive(false)} to="/cart">Go to cart</NavLink>
                    </div>
                </ContentCard>
            </div>
        )
    } catch {
        return <></>;
    }
}
