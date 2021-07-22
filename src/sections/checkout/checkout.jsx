import React, { useContext, useState, useEffect } from 'react'

import ContentCard from '../../components/content-card/content-card'
import AddressList from '../../components/address-list/address-list'
import { QueryClient, useQuery } from 'react-query'
import { QueryClientProvider } from 'react-query'
import { useHistory } from "react-router-dom";
import { UserContext } from '../../contexts/user-context-provider';
import { CartContext } from '../../contexts/cart-context-provider'
import Button from '../../components/button/button'
import CardDetails from '../../components/card-details/card-details'
import Loader from '../../components/loader/loader'
import DBError from '../../components/db-error/db-error'
import GuestAddress from '../../components/guest-address/guest-address'
import { getData } from '../../requests/get-data'
import { API_URL } from '../../settings'
import { fixPrice } from '../../utilities/prices'
import postData from '../../requests/post-data'
import Success from "../../components/success/success";
import UserUpdateContextProvider from '../../contexts/user-update-context-provider'


export default function Checkout({ props }) {

    const { user } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);

    const { isLoading, error, data } = useQuery('cart-comps',
        () => getData(API_URL + '/competitions?id_in=' +
            cart.products.map(prod => prod.compId).join("&id_in=")
        )
    );

    const [success, setSuccess] = useState()
    const [paymentError, setPaymentError] = useState()
    const [waitingPayment, setWaitingPayment] = useState()

    const [discount] = useState(props.location.state.discount)
    const [discountCode] = useState(props.location.state.discountCode)

    const [address, setAddress] = useState()
    const [addressSubmitted, setAddressSubmitted] = useState()
    const [addingAddress, setAddingAddress] = useState()

    const [card, setCard] = useState(false)

    const [total, setTotal] = useState()

    const history = useHistory();

    const pay = () => {
        setPaymentError();
        setWaitingPayment(true);

        postData(API_URL + "/lottify/pay", {
            card,
            cart,
            total,
            address: address,
            discountCode
        }).then(resp => {
            if (resp.statusCode !== 200) return setPaymentError(resp.message);

            setSuccess(true);
            setCart({ products: [] })

        }).catch(() => {
            setPaymentError("Server error. Please try again later.")
        }).finally(() => setWaitingPayment(false))
    }

    useEffect(() => {
        if (!data) return;
        setTotal(fixPrice(cart.products.map(prod =>
            fixPrice(prod.quantity * data.find(comps => comps.id === parseInt(prod.compId)).Price))
            .reduce((a, b) => a + b, 0)))
    }, [cart, data])

    if (success)
        return (
            <section className="section">
                <Success title="Your payment was successful!">
                    We sent a confirmation email to <b>{user ? user.email : address.Email}</b>
                    <br />Email will arrive in a few moments!
                </Success>
            </section>
        )

    const getSubtotal = () => {

        if (!discount) return '£' + total;

        const discounted = fixPrice(total * (1 - discount / 100));

        return <><s>£{total}</s> £{discounted}</>;
    }

    return (
        <section className="section">
            <h2 className="mobile-section-h" style={{ width: "95%" }}>Checkout</h2>
            {!addressSubmitted ?
                <ContentCard>
                    {
                        user ?
                            <>
                                <h4>Select your billing address</h4>
                                <UserUpdateContextProvider>
                                    <AddressList onSelect={address => setAddress(address)} onAdding={val => setAddingAddress(val)} />
                                </UserUpdateContextProvider>
                            </>
                            :
                            <GuestAddress onSuccess={(address) => {
                                setAddress(address);
                            }} />
                    }

                    {
                        addingAddress ?
                            ""
                            :
                            <div className="w-100 d-flex justify-space-between" style={{ marginTop: "24px" }}>
                                <Button onClick={() => history.push('/cart')} black={true}>Return to cart</Button>
                                <Button onClick={() => setAddressSubmitted(true)} disabled={!address}>Proceed</Button>
                            </div>
                    }
                </ContentCard>
                :
                <>
                    <ContentCard>
                        <h4>Your order information</h4>
                        <div className="d-flex">
                            <div className="w-50">
                                <p><b>Tickets</b></p>
                                {isLoading ?
                                    <Loader></Loader>
                                    :
                                    error ?
                                        <DBError></DBError>
                                        :
                                        <>
                                            {cart.products.map(ticket => {
                                                const compData = data.find(data => data.id === parseInt(ticket.compId));
                                                return <p style={{ margin: "6px 0" }}><span className="red">{ticket.quantity}</span> <b>×</b> {compData.Title}</p>;
                                            })}
                                            <p><b>Total:</b> <span className="red">{getSubtotal()}</span></p>
                                        </>
                                }
                            </div>
                            <div className="w-50 text-right">
                                <p><b>Billing address</b></p>
                                <p style={{ margin: "6px 0" }}>{address.FirstName} {address.LastName}</p>
                                <p style={{ margin: "6px 0" }}>{user ? user.email : address.Email}</p>
                                <p style={{ margin: "6px 0" }}>{address.StreetAddress}</p>
                                <p style={{ margin: "6px 0" }}>{address.City}, {address.PostCode}</p>
                                <p style={{ margin: "6px 0" }}>{address.Country}</p>
                                <p style={{ margin: "6px 0" }}>{address.Phone}</p>
                            </div>
                        </div>
                    </ContentCard>
                    <ContentCard>
                        <h4>Enter your credit/debit card details</h4>
                        {
                            waitingPayment ?
                                <Loader></Loader>
                                :
                                <CardDetails setData={setCard}></CardDetails>
                        }
                        <p className="red">{paymentError}</p>
                        <div className="w-100 d-flex justify-space-between align-center" style={{ marginTop: "24px" }}>
                            <Button onClick={() => setAddressSubmitted(false)} black={true}>Change address</Button>
                            <Button onClick={pay} disabled={card === false}>Confirm payment</Button>
                        </div>
                    </ContentCard>
                </>
            }
        </section>
    )
}
