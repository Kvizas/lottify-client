import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';
import Competition from "../../sections/competition/competition";

export default function CompetitionPage(props) {
    const competitionId = props.location.pathname.replace('/competition/', '');

    return (
        <QueryClientProvider client={new QueryClient()}>
            <Competition id={competitionId}></Competition>
        </QueryClientProvider>
    )
}
