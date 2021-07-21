import React from 'react'
import { useQuery } from 'react-query';
import Countdown from "react-countdown";

import "./TimeUntilClose.scss";

import Loader from "../../components/loader/loader";
import { getData } from '../../requests/get-data';
import { API_URL } from '../../settings';
import DBError from '../../components/db-error/db-error';

export default function TimeUntilClose() {

    const { isLoading, error, data } = useQuery('deadline', () =>
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

    if (isLoading) return (<div className="tuc-main"><Loader></Loader></div>)
    if (error) return (<div className="tuc-main"><DBError></DBError></div>)

    return (
        <div className="tuc-main">
            <div className="tuc-left tuc-block">
                <div className="tuc-text-box">
                    <h1 className="tuc-h1">Win something you always dreamt about</h1>
                    <p>Welcome to Lottify, our fixed odd competitions give you the chance to <strong>WIN your dream car, holiday, or expensive tech</strong></p>
                </div>
            </div>
            <div className="tuc-right tuc-block">
                <div className="tuc-text-box">
                    <h1 className="white tuc-h1">Time left until the draw closes:</h1>
                    <div className="tuc-timer">
                        {data.Deadline ? <Countdown date={data.Deadline.Deadline} renderer={renderer}></Countdown> : "All closed"}
                    </div>
                </div>
            </div>
        </div >

    )
}
