import React, { useRef, useState } from 'react'

import TextInput from '../text-input/text-input'

import UserSVG from "./user.svg";
import CardSVG from "./card.svg";

import "./card-details.scss";
import { checkCard, checkCVV, checkName } from '../../utilities/input-checks';

export default function CardDetails({ setData }) {

    const [error, setError] = useState()

    const [expiryField, setExpiryField] = useState()

    const holder = useRef()
    const card = useRef()
    const expiry = useRef()
    const security = useRef()

    const formCheck = () => {
        if (holder.current &&
            card.current &&
            expiry.current &&
            security.current)
            setData({
                holder: holder.current,
                card: card.current,
                expiry: expiry.current,
                security: security.current
            });
        else setData(false);
    }

    const onExpiryEnter = (value, c) => {
        expiry.current = false;

        const entryRegex = /^([0-1]{1}[0-9]{0,1}(|\/[0-9]{0,2})|)$/;
        if (!entryRegex.test(value)) return false;

        if (value.length === 2 && c.nativeEvent.inputType !== "deleteContentBackward") setExpiryField(value + "/");
        else setExpiryField(value);

        expiry.current = value;
        formCheck();
    }

    const onHolderEnter = value => {
        holder.current = false;
        setError();

        const splitted = value.split(' ');

        if (splitted.length < 2) return setError("Name has to consist of at least two words")

        splitted.forEach(name => {
            const nameCheck = checkName(name);
            if (nameCheck !== true) return setError(nameCheck);
        });

        holder.current = value;
        formCheck();
    }

    const onCardEnter = value => {
        card.current = false;
        setError();

        const cardCheck = checkCard(value);
        if (cardCheck !== true) return setError(cardCheck);

        card.current = value;
        formCheck();
    }

    const onSecurityEnter = value => {
        security.current = false;
        setError();

        const cvvCheck = checkCVV(value);
        if (cvvCheck !== true) return setError(cvvCheck);

        security.current = value;
        formCheck();
    }

    return (
        <>
            <TextInput onChange={onHolderEnter} iconStyle={{ width: "18px" }} icon={UserSVG} placeholder="Card holder name"></TextInput>
            <TextInput type="number" onChange={onCardEnter} iconStyle={{ width: "18px" }} icon={CardSVG} placeholder="Card number"></TextInput>
            <div className="d-flex justify-space-between f-wrap">
                <TextInput default={expiryField} onChange={onExpiryEnter} className="card-details-col" iconStyle={{ width: "18px" }} icon={CardSVG} placeholder="Card expiry date (MM/YY)"></TextInput>
                <TextInput onChange={onSecurityEnter} className="card-details-col" iconStyle={{ width: "18px" }} icon={CardSVG} placeholder="Card security code"></TextInput>
            </div>
            <p className="red">{error}</p>
        </>
    )
}
