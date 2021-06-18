import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import MarkedSection from "../../sections/fullmarked/fullmarked";

export default function PrivacyPage() {

    return (
        <QueryClientProvider client={new QueryClient()}>
            <MarkedSection link="/privacy-policy" markedKey="Policy"></MarkedSection>
        </QueryClientProvider>
    )
}
