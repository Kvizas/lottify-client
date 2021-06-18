import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Cart from '../../sections/cart/cart'

export default function CartPage() {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <Cart />
        </QueryClientProvider>

    )
}
