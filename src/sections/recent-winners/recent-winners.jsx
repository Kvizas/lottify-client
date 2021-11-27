import React, { useRef } from 'react'
import { useQuery } from 'react-query';

import "./recent-winners.scss";

import Loader from "../../components/loader/loader";
import { getData } from '../../requests/get-data';
import { API_URL } from '../../settings';
import DBError from '../../components/db-error/db-error';

import Carousel from '../../components/carousel/carousel';
import Winner from '../../components/winner/winner';

export default function RecentWinners() {

    const { isLoading, error, data } = useQuery('winners', () =>
        getData(API_URL + "/winners")
    )

    const callNextSlideRef = useRef({})

    const callNextSlide = forward => callNextSlideRef.current.call(forward);

    return (
        <div className="rw-main section">
            <h1 style={{ marginBottom: "60px" }}>Recent winners</h1>
            {
                isLoading ?
                    <Loader />
                    :
                    error ?
                        <DBError />
                        :
                        data.length >= 1 ?
                            <Carousel callNextSlideRef={callNextSlideRef} slides={
                                data.map(obj => {
                                    console.log(obj)
                                    return {
                                    img: (obj.Competition && obj.Competition.Images[0].url) || "",
                                    title: <h4 style={{ margin: "20px 0" }} className="w-100 text-center rw-title"><span className="red">WON: </span>{(obj.Competition && obj.Competition.Title) || "Competition not found"}</h4>,
                                    content: <Winner {...obj} onControl={callNextSlide}></Winner>
                                }
                                }).filter(e => e !== undefined)
                            } />
                            :
                            <p className="w-100 text-center">There are <strong>no winners</strong> yet.<br />Participate and be the first!</p>
            }

        </div>
    )
}
