import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import Countdown from "react-countdown";

import "./TimeUntilClose.scss";

import Loader from "../../components/loader/loader";
import { getData } from '../../requests/get-data';
import { API_URL } from '../../settings';

export default function TimeUntilClose() {

    const { isLoading, data } = useQuery('deadline', () =>
        getData(API_URL + "/competitions-deadline")
    )

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return "ENDED";
        } else {
            return (
                <div className="d-flex justify-center">
                    <div style={{ width: "50px" }}>{days}</div>
                    :<div style={{ width: "50px" }}>{hours}</div>
                    :<div style={{ width: "50px" }}>{minutes}</div>
                    :<div style={{ width: "50px" }}>{seconds}</div>
                </div>);
        }
    };

    return (
        isLoading ?
            (<div className="tuc-main">
                <Loader></Loader>
            </div>) :
            (<div className="tuc-main">
                <div className="tuc-left tuc-block">
                    <div className="tuc-text-box">
                        <h1 className="tuc-h1">Win something you always dreamt about</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Velit id minima reprehenderit maiores nam laborum nihil
                        aperiam debitis.</p>
                    </div>
                </div> {console.log(data)}
                <div className="tuc-right tuc-block">
                    <div className="tuc-text-box">
                        <h1 className="white tuc-h1">Time left until the draw closes:</h1>
                        <div className="tuc-timer">
                            <Countdown date={data.Deadline.Deadline} renderer={renderer}></Countdown>
                        </div>
                    </div>
                </div>
            </div >)
    )
}
