import React, { useContext, useState } from 'react'

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


export default function Checkout() {

    const { user } = useContext(UserContext);
    const { cart } = useContext(CartContext);

    const { isLoading, error, data } = useQuery('cart-comps',
        () => getData(API_URL + '/competitions?id_in=' +
            cart.products.map(prod => prod.compId).join("&id_in=")
        )
    );

    const [address, setAddress] = useState()
    const [addressSubmitted, setAddressSubmitted] = useState()

    const [guestEmail, setGuestEmail] = useState()

    const history = useHistory();

    return (
        <section className="section">
            <h2 style={{ width: "95%" }}>Checkout</h2>
            {!addressSubmitted ?
                <ContentCard>
                    {
                        user ?
                            <>
                                <h4>Select your billing address</h4>
                                <QueryClientProvider client={new QueryClient()}>
                                    <AddressList onSelect={address => setAddress(address)} />
                                </QueryClientProvider>
                            </>
                            :
                            <GuestAddress onSuccess={(address, email) => {
                                setAddress(address);
                                setGuestEmail(email);
                            }} />
                    }

                    <div className="w-100 d-flex justify-space-between" style={{ marginTop: "24px" }}>
                        <Button onClick={() => history.push('/cart')} black={true}>Return to cart</Button>
                        <Button onClick={() => setAddressSubmitted(true)} disabled={!address}>Proceed payment</Button>
                    </div>
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
                                            <p><b>Total:</b> <span className="red">£{fixPrice(cart.products.map(prod =>
                                                fixPrice(prod.quantity * data.find(comps => comps.id === parseInt(prod.compId)).Price))
                                                .reduce((a, b) => a + b, 0))}</span></p>
                                        </>
                                }
                            </div>
                            <div className="w-50 text-right">
                                <p><b>Billing address</b></p>
                                <p style={{ margin: "6px 0" }}>{address.FirstName} {address.LastName}</p>
                                <p style={{ margin: "6px 0" }}>{user ? user.email : guestEmail}</p>
                                <p style={{ margin: "6px 0" }}>{address.StreetAddress}</p>
                                <p style={{ margin: "6px 0" }}>{address.City}, {address.PostCode}</p>
                                <p style={{ margin: "6px 0" }}>{address.Country}</p>
                                <p style={{ margin: "6px 0" }}>{address.Phone}</p>
                            </div>
                        </div>
                    </ContentCard>
                    <ContentCard>
                        <h4>Enter your credit/debit card details</h4>
                        <CardDetails></CardDetails>
                        <div className="w-100 d-flex justify-space-between" style={{ marginTop: "24px" }}>
                            <Button onClick={() => setAddressSubmitted(false)} black={true}>Change address</Button>
                            <Button onClick={() => setAddressSubmitted(true)} disabled={!address}>Confirm payment</Button>
                        </div>
                    </ContentCard>
                </>
            }
        </section>
    )
}
