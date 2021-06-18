import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import FAQSection from '../../sections/faq-section/faq-section'

export default function FAQ() {
    return (
        <div>
            <QueryClientProvider client={new QueryClient()}>
                <FAQSection></FAQSection>
            </QueryClientProvider>
        </div>
    )
}
