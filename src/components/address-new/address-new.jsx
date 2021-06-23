import React, { useRef, useState } from 'react'

import TextInput from '../../components/text-input/text-input'
import CountryInput from '../../components/country-input/country-input'
import Button from '../button/button'

import postData from "../../requests/post-data";
import { API_URL } from "../../settings";

import { checkName, checkPhone } from '../../utilities/input-checks'

export default function AddressNew({ onCancel, onSuccess }) {

    const [error, setError] = useState()

    const firstName = useRef();
    const lastName = useRef();
    const country = useRef();
    const streetAddress = useRef();
    const city = useRef();
    const postcode = useRef();
    const phone = useRef();

    const add = () => {

        setError();

        if (!firstName.current ||
            !lastName.current ||
            !country.current ||
            !streetAddress.current ||
            !city.current ||
            !postcode.current ||
            !phone.current)
            return setError("All fields have to be filled");

        if (checkName(firstName.current) !== true || checkName(lastName.current) !== true)
            return setError("Your first (or last) name has prohibited letters. Please change them into international letters.");

        const phoneCheck = checkPhone(phone.current)
        if (phoneCheck !== true) {
            setError(phoneCheck);
            return;
        }

        postData(API_URL + "/users/add-address", {
            address: {
                FirstName: firstName.current,
                LastName: lastName.current,
                Country: country.current,
                StreetAddress: streetAddress.current,
                City: city.current,
                PostCode: postcode.current,
                Phone: phone.current
            }
        }).then(resp => {
            if (resp.statusCode === 200) {
                onSuccess();
            } else {
                setError(resp.message)
                console.log(resp);
            }
        }).catch(resp => {
            setError("Server error. Please try again later.")
            console.log(resp);
        })
    }

    return (
        <form style={{ width: "70%", margin: "auto", marginBottom: "32px" }}>
            <h4>Adding new address</h4>
            <TextInput value={firstName} placeholder="First name"></TextInput>
            <TextInput value={lastName} placeholder="Last name"></TextInput>
            <CountryInput onChange={value => country.current = value} placeholder="Country"></CountryInput>
            <TextInput value={streetAddress} placeholder="Street Address"></TextInput>
            <TextInput value={city} placeholder="Town / City"></TextInput>
            <TextInput value={postcode} placeholder="Postcode"></TextInput>
            <TextInput value={phone} placeholder="Phone number"></TextInput>
            <p className="red">{error}</p>
            <div className="w-100 d-flex justify-space-between">
                <Button onClick={onCancel} black={true}>Go back</Button>
                <Button onClick={add}>Add</Button>
            </div>
        </form>
    )
}
