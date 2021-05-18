import React from 'react'
import { QueryClientProvider, QueryClient } from "react-query";

import "./Homepage.scss"

import HeaderSlides from "../../sections/header-slides/HeaderSlides";
import TimeUntilClose from "../../sections/time-until-close/TimeUntilClose";
import AboutUs from "../../sections/about-us/about-us";
import HowItWorks from "../../sections/how-it-works/how-it-works";
import Competitions from "../../sections/competitions/competitions";
import RecentWinners from '../../sections/recent-winners/recent-winners';

const slidesQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnmount: false,
            refetchOnReconnect: false,
            retry: false,
        },
    },
});

export default function Homepage() {
    return (
        <div>
            <QueryClientProvider client={slidesQueryClient}>
                <HeaderSlides></HeaderSlides>
            </QueryClientProvider>
            <QueryClientProvider client={new QueryClient()}>
                <TimeUntilClose></TimeUntilClose>
            </QueryClientProvider>
            <AboutUs></AboutUs>
            <HowItWorks></HowItWorks>
            <Competitions firstWide={true} limit={5}></Competitions>
            <RecentWinners></RecentWinners>
        </div>
    )
}
