import React from 'react'
import { QueryClientProvider, QueryClient } from "react-query";

import Competitions from "../../sections/competitions/competitions";
import HowItWorks from "../../sections/how-it-works/how-it-works";

export default function CompetitionsPage() {
    return (
        <div>
            <Competitions firstWide={true}></Competitions>
            <HowItWorks></HowItWorks>
        </div>
    )
}
