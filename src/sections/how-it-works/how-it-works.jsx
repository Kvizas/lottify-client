import React from 'react'

import "./how-it-works.scss"

import ChooseSVG from "./assets/choose.svg";
import TicketSVG from "./assets/ticket.svg";
import WinSVG from "./assets/win.svg";

export default function HowItWorks() {
    return (
        <div className="section hiw-main" id="how-it-works">
            <h1 style={{ marginBottom: "48px" }} className="hiw-title">How it works?</h1>
            <div className="d-flex f-wrap justify-space-between">
                <div className="hiw-step">
                    <img className="hiw-img" src={ChooseSVG} alt="" />
                    <h3>Choose a competition</h3>
                    <p>
                        Answer qualifying questions and purchase tickets to be entered in our draws
                    </p>
                </div>
                <div className="hiw-break"></div>
                <div className="hiw-step">
                    <img className="hiw-img" src={TicketSVG} alt="" />
                    <h3>Buy a lucky ticket</h3>
                    <p>
                        All correct answers are entered in the draw
                    </p>
                </div>
                <div className="hiw-break"></div>
                <div className="hiw-step">
                    <img className="hiw-img" src={WinSVG} alt="" />
                    <h3>Win amazing prizes</h3>
                    <p>
                        We will pick the winners during our live draw on social media
                    </p>
                </div>
            </div>
        </div>
    )
}
