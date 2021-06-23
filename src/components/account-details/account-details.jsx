import React, { useContext, useRef, useState } from 'react'

import TextInput from '../text-input/text-input'
import Button from '../button/button'

import postData from "../../requests/post-data";
import { checkEmail, checkPassword } from "../../utilities/input-checks";

import { UserContext } from '../../contexts/user-context-provider';

import EmailSVG from "../../assets/misq/mail.svg";
import PasswordSVG from "./password.svg"
import { API_URL } from '../../settings';

import "./account-details.scss"

export default function AccountDetails() {

    const { setUser } = useContext(UserContext)

    const email = useRef({})

    const [emailError, setEmailError] = useState();
    const [emailSuccess, setEmailSuccess] = useState();

    const changeEmail = () => {

        setEmailError();

        const emailValidation = checkEmail(email.current)
        if (emailValidation !== true) return setEmailError(emailValidation);

        postData(API_URL + "/users/change-email", {
            email: email.current
        }).then(resp => {
            if (resp.statusCode === 200) {
                setEmailSuccess(true)
                setTimeout(() => setEmailSuccess(false), 4000);
                setUser(resp.user);
            }
            else setEmailError(resp.message);
        }
        ).catch(() => {
            setEmailError("Internal server error. Try again later.")
        })

    }

    const password = useRef({})
    const password2nd = useRef({})

    const [passError, setPassError] = useState();
    const [passSuccess, setPassSuccess] = useState();

    const changePassword = () => {

        setPassError();

        const passValidation = checkPassword(password.current)
        if (passValidation !== true) return setPassError(passValidation);

        if (password.current !== password2nd.current) return setPassError("Passwords do not match!")

        postData(API_URL + "/users/change-password", {
            password: password.current
        }).then(resp => {
            if (resp.statusCode === 200) {
                setPassSuccess(true)
                setTimeout(() => setPassSuccess(false), 4000);
            }
            else setPassError(resp.message);
        }
        ).catch(() => {
            setPassError("Internal server error. Try again later.")
        })

    }

    return (
        <>
            <h4>Change your email</h4>
            <TextInput value={email} iconStyle={{ width: "14px" }} icon={EmailSVG} placeholder="Enter your new email address"></TextInput>
            <div className="w-100 d-flex justify-space-between">
                <p className={`account-details-subtitle red`}>{emailError}</p>
                <Button onClick={changeEmail} disabled={emailSuccess} green={emailSuccess}>{emailSuccess ? "Changed." : "Save changes"}</Button>
            </div>
            <h4 style={{ paddingTop: "24px" }}>Change your password</h4>
            <p className="account-details-subtitle">
                Password must contain minimum 8 characters (up to 64), at least one uppercase letter, one lowercase letter and one number.
            </p>
            <TextInput value={password} iconStyle={{ width: "14px" }} icon={PasswordSVG} type="password" placeholder="Enter your new password"></TextInput>
            <TextInput value={password2nd} iconStyle={{ width: "14px" }} icon={PasswordSVG} type="password" placeholder="Repeat your new password"></TextInput>
            <div className="w-100 d-flex justify-space-between">
                <p className={`account-details-subtitle red`}>{passError}</p>
                <Button onClick={changePassword} disabled={passSuccess} green={passSuccess}>{passSuccess ? "Changed." : "Save changes"}</Button>
            </div>
        </>
    )
}
