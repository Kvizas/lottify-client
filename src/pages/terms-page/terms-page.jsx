import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import MarkedSection from "../../sections/fullmarked/fullmarked";

export default function TermsPage() {

    return (
        <QueryClientProvider client={new QueryClient()}>
            <MarkedSection link="/terms-and-conditions" markedKey="Terms"></MarkedSection>
        </QueryClientProvider>
    )
}
