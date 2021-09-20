import React from 'react'

import "./competition-box.scss";

import PriceTag from "../../components/price-tag/price-tag";
import { useHistory } from "react-router-dom";

import { API_URL } from "../../settings";
import moment from 'moment';

export default function CompetitionBox(props) {

    const history = useHistory();

    const comp = props.comp;

    const goTo = () => {
        history.push("/competition/" + comp.id);
    }

    return (
        <div className={props.width ? "comp-box comp-wide" : "comp-box"}>
            <PriceTag price={comp.Price}></PriceTag>
            <div className="comp-box-img" style={{ backgroundImage: `url(${API_URL + comp.Images[0].url}` }}>
                {comp.Deadline ? 
                    (new Date(comp.Deadline.Deadline) < new Date() ? <div className="comp-img-ended">Competition has ended</div> : "")
                : "No deadline"}
            </div>
            <div className="comp-footer">
                <div className="comp-text-box">
                    <div className="w-100">
                        <h2>{comp.Title}</h2>
                    </div>
                    <div className="w-2-3rd">
                        <div className="w-100">
                            <p>Price value: £{comp.Value}</p>
                            {
                                comp.Deadline ?
                                <p>Competition ends on: <span className="no-break">{moment(comp.Deadline.Deadline).format("MMMM Do")}</span></p>
                                :
                                <></>
                            }
                        </div>
                    </div>
                    <div className="w-3rd d-flex justify-end">
                        <div className="comp-enter" onClick={goTo}>
                            ENTER
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
