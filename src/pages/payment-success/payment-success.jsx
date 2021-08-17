import React, { useContext, useEffect } from 'react'
import Success from '../../components/success/success'
import { useHistory } from "react-router-dom";
import { CartContext } from '../../contexts/cart-context-provider'

export default function PaymentSuccess() {

    const history = useHistory();
    const { setCart } = useContext(CartContext);

    useEffect(() => {
        setCart({ products: [] })
    }, [setCart])

    setTimeout(() => {
        history.push("/");
    }, 4000)
    return (
        <section className="section">
            <Success title="Payment confirmed!">
                Receipt with ticket numbers will be sent to your email shortly!
                <br></br>
                Registered users can view their tickets in their dashboard.
            </Success>
        </section>
    )
}
