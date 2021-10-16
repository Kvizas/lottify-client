import React, { useRef, useState } from 'react'

import TextInput from '../../components/text-input/text-input'
import CountryInput from '../../components/country-input/country-input'
import Button from '../button/button'

import postData from "../../requests/post-data";
import { API_URL } from "../../settings";

import "./address-new.scss";

import { checkName, checkPhone } from '../../utilities/input-checks'

export default function AddressNew({ onCancel, onSuccess, editing = false }) {

    const [error, setError] = useState()

    const firstName = useRef(editing ? editing.FirstName : undefined);
    const lastName = useRef(editing ? editing.LastName : undefined);
    const country = useRef(editing ? editing.Country : undefined);
    const streetAddress = useRef(editing ? editing.StreetAddress : undefined);
    const city = useRef(editing ? editing.City : undefined);
    const postcode = useRef(editing ? editing.PostCode : undefined);
    const phone = useRef(editing ? editing.Phone : undefined);

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

        const endpoint = editing ? "/users/edit-address" : "/users/add-address";
        const address = {
            FirstName: firstName.current,
            LastName: lastName.current,
            Country: country.current,
            StreetAddress: streetAddress.current,
            City: city.current,
            PostCode: postcode.current,
            Phone: phone.current
        }
        if (editing) address.id = editing.id;

        postData(API_URL + endpoint, {
            address: {
                id: (editing && editing.id) || undefined,
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
        <form className="address-new">
            <h4>{editing ? "Editing" : "Adding new"} address</h4>
            <TextInput default={editing ? editing.FirstName : null} value={firstName} placeholder="First name"></TextInput>
            <TextInput default={editing ? editing.LastName : null} value={lastName} placeholder="Last name"></TextInput>
            <CountryInput default={editing ? editing.Country : null} onChange={value => country.current = value} placeholder="Country"></CountryInput>
            <TextInput default={editing ? editing.StreetAddress : null} value={streetAddress} placeholder="Street Address"></TextInput>
            <TextInput default={editing ? editing.City : null} value={city} placeholder="Town / City"></TextInput>
            <TextInput default={editing ? editing.PostCode : null} value={postcode} placeholder="Postcode"></TextInput>
            <TextInput default={editing ? editing.Phone : null} value={phone} placeholder="Phone number"></TextInput>
            <p className="red">{error}</p>
            <div className="w-100 d-flex justify-space-between">
                <Button className="address-new-btn" onClick={onCancel} black={true}>Go back</Button>
                <Button className="address-new-btn" onClick={add}>{editing ? "Update" : "Add"}</Button>
            </div>
        </form>
    )
}
