import React, { useContext } from 'react'
import { fixPrice } from '../../utilities/prices';
import NumberSpinner from '../number-spinner/number-spinner'

import Remove from "../../assets/misq/remove.svg";

import { CartContext } from "../../contexts/cart-context-provider";

import "./cart-item.scss"
import { API_URL } from '../../settings';

export default function CartItem(props) {

    const index = props.indexInArray;
    const product = props.product;
    const data = props.queryData;

    const { cart, setCart } = useContext(CartContext);

    const remove = () => {
        const products = [...cart.products];
        products.splice(index, 1);
        setCart({ products: products });
    }

    const changeQuantity = value => {
        const products = [...cart.products];
        products[index].quantity = value;
        setCart({ products: products });
    }

    return (
        <tr className="cart-item">
            <td>
                <div className="w-100 flex-content-center">
                    <div className="cart-item-img" style={{ backgroundImage: `url(${API_URL + data.Images[0].url})` }}></div>
                    <span className="cart-item-title">{data.Title}</span>
                </div>
            </td>
            <td className="w-100 flex-content-center cart-item-quantity">
                <NumberSpinner min={1} default={product.quantity} max={data.AvailableTickets} change={changeQuantity} />
            </td>
            <td className="cart-item-answer">{data.Answers.find(answer => answer.id === parseInt(product.answer)).Answer}</td>
            <td>£{fixPrice(product.quantity * data.Price)}</td>
            <td><img onClick={remove} alt="" className="cart-item-remove" src={Remove}></img></td>
        </tr>
    )
}
