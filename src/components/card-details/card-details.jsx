import React from 'react'

import TextInput from '../text-input/text-input'

import UserSVG from "./user.svg";
import CardSVG from "./card.svg";

export default function CardDetails() {
    return (
        <>
            <TextInput iconStyle={{ width: "18px" }} icon={UserSVG} placeholder="Card holder name"></TextInput>
            <TextInput iconStyle={{ width: "18px" }} icon={CardSVG} placeholder="Card number"></TextInput>
            <div className="d-flex justify-space-between">
                <TextInput style={{ width: "49%", margin: "0" }} iconStyle={{ width: "18px" }} icon={CardSVG} placeholder="Card expiry date"></TextInput>
                <TextInput style={{ width: "49%", margin: "0" }} iconStyle={{ width: "18px" }} icon={CardSVG} placeholder="Card security code"></TextInput>
            </div>
        </>
    )
}
