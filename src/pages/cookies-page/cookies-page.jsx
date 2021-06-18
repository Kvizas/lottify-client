import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import MarkedSection from "../../sections/fullmarked/fullmarked";

export default function CookiesPage() {

    return (
        <QueryClientProvider client={new QueryClient()}>
            <MarkedSection link="/cookies-policy" markedKey="Policy"></MarkedSection>
        </QueryClientProvider>
    )
}
