import React, { useContext } from 'react'

import NumberSpinner from '../number-spinner/number-spinner'
import { CartContext } from "../../contexts/cart-context-provider";
import { API_URL } from '../../settings';

import { fixPrice } from '../../utilities/prices';

import "./cart-item-mobile.scss";

import RemoveSVG from "../../assets/misq/remove.svg";

export default function CartItemMobile({ queryData, product, indexInArray }) {

    const { cart, setCart } = useContext(CartContext);

    const remove = () => {
        const products = [...cart.products];
        products.splice(indexInArray, 1);
        setCart({ products: products });
    }

    const changeQuantity = value => {
        const products = [...cart.products];
        products[indexInArray].quantity = value;
        setCart({ products: products });
    }

    return (
        <div className="cart-item-m">
            <div className="cart-item-m-img" style={{ backgroundImage: `url(${API_URL + queryData.Images[0].url})` }} />
            <div className="cart-item-m-content">
                <h2 className="w-100">{queryData.Title}</h2>
                <NumberSpinner min={1} default={product.quantity} max={queryData.AvailableTickets} change={changeQuantity} />
                <img onClick={remove} alt="" className="cart-item-m-delete" src={RemoveSVG}></img>
                <p className="w-100"><b>A: </b>{queryData.Answers.find(answer => answer.id === parseInt(product.answer)).Answer}</p>
                <p className="w-100">Total: <b>£{fixPrice(product.quantity * queryData.Price)}</b></p>
            </div>
        </div>
    )
}
