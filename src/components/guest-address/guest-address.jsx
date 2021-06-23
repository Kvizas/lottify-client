import React, { useRef, useEffect, useState } from 'react'

import TextInput from '../text-input/text-input'
import CountryInput from '../../components/country-input/country-input'
import EmailSVG from "../../assets/misq/mail.svg";
import { checkEmail, checkName, checkPhone } from '../../utilities/input-checks';

export default function GuestAddress({ onSuccess }) {

    const email = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const country = useRef();
    const streetAddress = useRef();
    const city = useRef();
    const postcode = useRef();
    const phone = useRef();

    const [error, setError] = useState()

    const change = () => {
        onSuccess();

        if (!email.current ||
            !firstName.current ||
            !lastName.current ||
            !country.current ||
            !streetAddress.current ||
            !city.current ||
            !postcode.current ||
            !phone.current) {
            return;
        }

        const emailCheck = checkEmail(email.current);
        if (emailCheck !== true)
            return setError(emailCheck);

        if (checkName(firstName.current) !== true || checkName(lastName.current) !== true)
            return setError("Your first (or last) name has prohibited letters. Please change them into international letters.");

        const phoneCheck = checkPhone(phone.current)
        if (phoneCheck !== true)
            return setError(phoneCheck);

        setError();
        onSuccess({
            FirstName: firstName.current,
            LastName: lastName.current,
            Country: country.current,
            StreetAddress: streetAddress.current,
            City: city.current,
            PostCode: postcode.current,
            Phone: phone.current
        }, email.current);
    };

    return (
        <form style={{ margin: "auto", width: "70%" }}>
            <h4 style={{ marginBottom: "0" }}>Enter your email</h4>
            <p style={{ marginTop: "6px" }}>As you are not signed in, you will get all of your purchase information and tickets to the email you provide.</p>
            <TextInput onChange={change} value={email} icon={EmailSVG} placeholder="Email address"></TextInput>
            <h4 style={{ marginBottom: "0" }}>Enter your billing address</h4>
            <p style={{ marginTop: "6px" }}>Or sign in to use your saved addresses</p>
            <TextInput onChange={change} value={firstName} placeholder="First name"></TextInput>
            <TextInput onChange={change} value={lastName} placeholder="Last name"></TextInput>
            <CountryInput onChange={value => { country.current = value; change(); }}></CountryInput>
            <TextInput onChange={change} value={streetAddress} placeholder="Street Address"></TextInput>
            <TextInput onChange={change} value={city} placeholder="Town / City"></TextInput>
            <TextInput onChange={change} value={postcode} placeholder="Postcode"></TextInput>
            <TextInput onChange={change} value={phone} placeholder="Phone number"></TextInput>
            <p className="red">{error}</p>
        </form>
    )
}
