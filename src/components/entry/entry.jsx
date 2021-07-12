import React, { useState } from 'react'

import "./entry.scss"
import { API_URL } from "../../settings"
import moment from 'moment'

export default function Entry({ comp, tickets }) {

    const [ended] = useState(new Date(comp.Deadline.Deadline) < new Date())

    return (
        <div className="w-100 d-flex entry">
            <div
                className="entry-img"
                style={{ backgroundImage: `url(${API_URL + comp.Images[0].url})` }}
            />
            <div className="entry-text-box">
                <div className="d-flex justify-space-between f-wrap m-hidden">
                    <div className="entry-top entry-border">You answered <span className="red">{tickets[0].Answer}</span></div>
                    <div className="entry-top entry-border">Competition {ended ? `has ended` : `ends`} on <span className="red">{moment(comp.Deadline.Deadline).format("MMMM Do")}</span></div>
                </div>
                <h3>{comp.Title}</h3>
                <p className="d-hidden">You answered <span className="red">{tickets[0].Answer}</span></p>
                <p className="no-margin">Ticket numbers <b>({tickets.length})</b>:</p>
                <div className="d-flex f-wrap">
                    {tickets.map((ticket, i) => <div key={i} className="entry-ticket-no entry-border">{ticket.Number}</div>)}
                </div>
                <div className="entries-m-deadline">
                    Competition {ended ? `has ended` : `ends`} on <span className="red no-break">{moment(comp.Deadline.Deadline).format("MMMM Do")}</span>
                </div>
            </div>
            <div className={`entry-status ${ended ? 'entry-status-ended' : ''}`}>
                {ended ? 'Ended' : 'Active'}
            </div>
        </div >
    )
}
