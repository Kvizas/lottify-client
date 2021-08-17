import React, { useContext, useEffect } from 'react'
import Success from '../../components/success/success'
import { useHistory } from "react-router-dom";
import { CartContext } from '../../contexts/cart-context-provider'
import queryString from 'query-string';

export default function PaymentSuccess(props) {

    const history = useHistory();
    const { setCart } = useContext(CartContext);

    const params = queryString.parse(props.location.search);
    const error = params.errorcode;

    useEffect(() => {
        if (error === "0") setCart({ products: [] })
    }, [setCart, error])



    if (error === "0"){

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
        

    else return (
        <section className="section">
            <p className="w-100 text-center"><strong>Error: please contact our support!</strong></p>
            Error keys:
            <br/>
            {Object.entries(params).map((param, i) => <p className="w-100">{`${i + 1}. ${param[0]}: ${param[1]}`}</p>)}
        </section>
    )
}
