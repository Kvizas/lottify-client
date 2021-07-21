import React from 'react'
import { useQuery } from 'react-query';

import { API_URL } from "../../settings";
import { getData } from "../../requests/get-data";

import "./about-us.scss";

import Img1 from "./aus-1.webp";
import Img2 from "./aus-2.webp";
import Img3 from "./aus-3.webp";
import Loader from '../../components/loader/loader';
import DBError from "../../components/db-error/db-error"

export default function AboutUs() {

    const { isLoading, error, data } = useQuery('about-us', () =>
        getData(API_URL + `/statistics`)
    );

    return (
        <div className="section" id="aboutus">
            <div className="about-us-image-row">
                <div className="about-us-image" style={{ backgroundImage: `url(${Img1})` }}></div>
                <div className="about-us-image" style={{ backgroundImage: `url(${Img2})` }}></div>
                <div className="about-us-image about-us-image-disappear" style={{ backgroundImage: `url(${Img3})` }}></div>
            </div>
            <div className="section-text-box">
                <h1>What is Lottify?</h1>
                <p>
                    Lottify knows what you want, we run amazing prize competitions that will change your life.
                    We believe that you shouldn’t pay full retail price to make your dreams come true. Whether
                    you’re after high performance cars, a holiday for you and your family or the latest tech,
                    we are here to make it happen.
                </p>
                {isLoading ?
                    <Loader />
                    :
                    error ?
                        <DBError />
                        :
                        <div className="d-flex f-wrap">
                            <div className="about-us-stat">
                                <h2>{data.CompletedCompetitions}</h2>
                                <h3>Completed competitions</h3>
                            </div>
                            <div className="about-us-stat">
                                <h2>{data.TotalWinners}</h2>
                                <h3>Total winners</h3>
                            </div>
                            <div className="about-us-stat">
                                <h2>{data.WinnersThisMonth}</h2>
                                <h3>Winners this month</h3>
                            </div>
                        </div>
                }

            </div>
        </div>
    )
}
