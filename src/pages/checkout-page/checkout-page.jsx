import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import Checkout from '../../sections/checkout/checkout'

export default function CheckoutPage() {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <Checkout></Checkout>
        </QueryClientProvider>
    )
}
