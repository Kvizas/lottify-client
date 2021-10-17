import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../contexts/cart-context-provider';
import { fixPrice } from '../../utilities/prices';
import Button from '../button/button';
import CartPopupItem from '../cart-popup-item/cart-popup-item';
import { useHistory } from 'react-router-dom';

import "./cart-popup.scss"

import { ReactComponent as Exit } from "../../assets/misq/remove_black.svg"
import { CartPopupContext } from '../../contexts/cart-popup-context-provider';

export default function CartPopup({show}) {

    const { cart } = useContext(CartContext);
    const { setCartPopupActive } = useContext(CartPopupContext);
    const history = useHistory();
    
    if (!show) return null;
    
    const redirectToCheckout = () => {
        history.push({
            pathname: '/checkout',
            state: {
                discountCode: undefined,
                discount: undefined
            }
        })
    }
    
    return (
        <div className="cart-pop">
            <div className="cart-pop-dir">
                <svg style={{transform: "scale(.7)"}} width="61" height="32" viewBox="0 0 61 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.5 0L60.3779 32.25H0.622124L30.5 0Z" fill="#F4F4F4"/>
                </svg>
                <Exit onClick={() => setCartPopupActive(false)} style={{width: "100%", height: "21px", cursor: "pointer"}}></Exit>
            </div>
            <h3 style={{marginTop: "0"}}>MY BAG, <span>{cart.products.length} item</span></h3>
            <div className="cart-pop-content">
                {cart.products.map((prod, i) => {
                    const key = prod.compId + prod.answer;
                    return <><CartPopupItem product={prod} key={key}></CartPopupItem>
                    {i !== cart.products.length - 1 ? <div key={"div" + key} className="cart-pop-spacer"></div> : <></>}</>
                })}
            </div>
            <div className="subtotal">
                <h3>Subtotal:</h3>
                <h3>£{fixPrice(cart.products.map(prod => prod.compData.Price).reduce((a, b) => a + b, 0))}</h3>
            </div>
            <div className="cart-pop-btns">
                <NavLink style={{textDecoration: "none"}} to="/cart"><Button onClick={() => setCartPopupActive(false)} black={true}>View Cart</Button></NavLink>
                <Button onClick={() => {
                    redirectToCheckout();
                    setCartPopupActive(false);
                }}>Checkout</Button>
            </div>
        </div>
    )
}
