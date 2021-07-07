import React, { useContext, useState, useEffect } from 'react'
import { useQuery } from 'react-query';
import CartItem from '../../components/cart-item/cart-item';
import CartItemMobile from '../../components/cart-item-mobile/cart-item-mobile';

import { getData } from '../../requests/get-data';
import postData from '../../requests/post-data';

import { CartContext } from '../../contexts/cart-context-provider';

import "./cart.scss";
import { API_URL } from '../../settings';
import Loader from '../../components/loader/loader';
import DBError from '../../components/db-error/db-error';
import TextInput from "../../components/text-input/text-input";
import Button from "../../components/button/button";
import { fixPrice } from '../../utilities/prices';
import { NavLink } from 'react-router-dom';

import SaleSVG from "./sale.svg";
import { useHistory } from 'react-router-dom';

export default function Cart() {

    const { cart } = useContext(CartContext)

    const history = useHistory();

    const { isLoading, error, data } = useQuery('cart-comps',
        () => getData(API_URL + '/competitions?id_in=' +
            cart.products.map(prod => prod.compId).join("&id_in=")
        )
    );

    const [discountCode, setDiscountCode] = useState()
    const [discountStatus, setDiscountStatus] = useState('none')
    const [discount, setDiscount] = useState()

    useEffect(() => {
        if (!discountCode) return setDiscountStatus('none');
        setDiscountStatus('checking')
        const t = setTimeout(() => {
            postData(API_URL + "/lottify/checkCode", {
                Code: discountCode
            }).then(resp => {
                if (resp.statusCode === 200) {
                    setDiscount(resp.percentage || undefined);
                    setDiscountStatus(resp.percentage ? 'valid' : 'invalid')
                }
            }).catch(() => setDiscountStatus('invalid'))
        }, 500)
        return () => clearTimeout(t);
    }, [discountCode])

    const getDiscountText = () => {
        switch (discountStatus) {
            case 'none':
                return;
            case 'invalid':
                return <>Code invalid</>;
            case 'checking':
                return <>Checking...</>;
            default:
                return <><b>-{discount}%</b> code was applied</>
        }
    }

    const getSubtotal = () => {
        const subtotal = fixPrice(cart.products.map(prod =>
            prod.quantity * data.find(comps => comps.id === parseInt(prod.compId)).Price)
            .reduce((a, b) => a + b))

        if (!discount) return '£' + subtotal;

        const discounted = fixPrice(subtotal * (1 - discount / 100));

        return <><s>£{subtotal}</s> £{discounted}</>;
    }

    const redirectToCheckout = () => {
        history.push({
            pathname: '/checkout',
            state: {
                discountCode: discountStatus === 'valid' ? discountCode : undefined,
                discount: discountStatus === 'valid' ? discount : undefined
            }
        })
    }

    return (
        <section className="section">
            <h2 className="w-100 mobile-section-h">Shopping cart</h2>
            {
                isLoading ?
                    <Loader />
                    :
                    error ?
                        <DBError />
                        :
                        cart.products.length > 0 ?
                            <>
                                <div className="w-100 cart-desktop">
                                    <table className="cart-card">
                                        <colgroup>
                                            <col className="cart-col-product" />
                                            <col className="cart-col-quantity" />
                                            <col className="cart-col-answer" />
                                            <col className="cart-col-price" />
                                            <col className="cart-col-remove" />
                                        </colgroup>
                                        <tbody className="w-100">
                                            <tr>
                                                <th><div className="cart-card-header">Product</div></th>
                                                <th><div className="cart-card-header">Quantity</div></th>
                                                <th><div className="cart-card-header">Answer</div></th>
                                                <th><div className="cart-card-header">Price</div></th>
                                                <th></th>
                                            </tr>
                                            {
                                                cart.products.map((prod, i) => <CartItem queryData={data.find(comps => comps.id === parseInt(prod.compId))} key={i} indexInArray={i} product={prod}></CartItem>)
                                            }
                                        </tbody>

                                    </table>
                                </div>
                                <div className="cart-mobile">
                                    {cart.products.map((prod, i) => <CartItemMobile queryData={data.find(comps => comps.id === parseInt(prod.compId))} key={i} indexInArray={i} product={prod}></CartItemMobile>)}
                                </div>
                                <div className="cart-card">
                                    <table cellPadding="20" className="w-100">
                                        <colgroup>
                                            <col className="cart-col-discount cart-m-hide" />
                                            <col className="cart-col-all" />
                                            <col className="cart-col-subtotal" />
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <th className="cart-m-hide"></th>
                                                <th><div className="cart-card-header">Total tickets</div></th>
                                                <th><div className="cart-card-header">Subtotal</div></th>
                                            </tr>
                                            <tr className="cart-m-hide">
                                                <td style={{ paddingBottom: "0", paddingTop: "0" }} className="text-left">Got a discount?</td>
                                            </tr>
                                            <tr className="cart-row-border">
                                                <td style={{ paddingTop: "0", paddingBottom: "0" }} className="cart-m-hide">
                                                    <TextInput onChange={v => setDiscountCode(v)} className="cart-code-margin" icon={SaleSVG} placeholder="Discount code"></TextInput>
                                                </td>
                                                <td style={{ paddingTop: "0", paddingBottom: "0" }}>{cart.products.map(prod => prod.quantity).reduce((a, b) => a + b, 0)}</td>
                                                <td style={{ paddingTop: "0", paddingBottom: "0" }} className="red">{getSubtotal()}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ paddingTop: "0" }}>
                                                    <p className="cart-m-hide" style={{ fontSize: ".7rem", margin: "0", textAlign: "left" }}>{getDiscountText()}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="cart-m-discount w-100">
                                    Got a discount?
                                    <TextInput onChange={v => setDiscountCode(v)} className="cart-code-margin" icon={SaleSVG} placeholder="Discount code"></TextInput>
                                    <p style={{ fontSize: ".7rem", margin: "0", textAlign: "left" }}>{getDiscountText()}</p>
                                </div>
                                <div className="cart-checkout">
                                    <Button onClick={redirectToCheckout}>Checkout</Button>
                                </div>
                            </>
                            :
                            <div style={{ margin: "10% 0", textAlign: "center" }}>
                                <p className="no-margin">There are no items in the cart.</p>
                                <NavLink className="red" to="/competitions">Browse competitions</NavLink>
                            </div>
            }
        </section>
    )
}
