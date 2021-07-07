import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import Checkout from '../../sections/checkout/checkout'

export default function CheckoutPage(props) {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <Checkout props={props}></Checkout>
        </QueryClientProvider>
    )
}
