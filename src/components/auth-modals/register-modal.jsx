import React, { useRef, useState } from 'react'

import TextInput from '../text-input/text-input';
import AuthButton from '../auth-button/auth-button';
import Loader from "../loader/loader";
import Checkbox from "../checkbox/checkbox"

import UserSvg from "../../assets/auth/user.svg";
import PasswordSvg from "../../assets/auth/password.svg";

import postData from "../../requests/post-data";

import "./auth-modal.scss";
import { API_URL } from '../../settings';
import { checkEmail, checkPassword, checkUsername } from '../../utilities/input-checks';
import Success from '../success/success';

export default function RegisterModal(props) {

    const [sentToEmail, setSentToEmail] = useState(false)

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const username = useRef()
    const email = useRef()
    const password = useRef()
    const password2nd = useRef()
    const [marketingConsent, setMarketingConsent] = useState(false)

    const signUp = () => {

        const usernameCheckRes = checkUsername(username.current)
        if (usernameCheckRes !== true) {
            setError(usernameCheckRes);
            return;
        }

        const emailCheckRes = checkEmail(email.current)
        if (emailCheckRes !== true) {
            setError(emailCheckRes);
            return;
        }

        const passCheckRes = checkPassword(password.current)
        if (passCheckRes !== true) {
            setError(passCheckRes);
            return;
        }

        if (password.current !== password2nd.current) {
            setError("Passwords do not match!");
            return;
        }

        setError();
        setLoading(true);

        postData(API_URL + "/auth/local/register", {
            username: username.current,
            email: email.current,
            password: password.current,
            marketing: marketingConsent
        }).then(resp => {
            setLoading(false);
            if (resp.statusCode === 400) {
                console.log(resp);
                setError(resp.data[0].messages[0].message);
            }
            else {
                setSentToEmail(email.current);
            }
        }).catch(() => {
            setError("Server error. Please try again later.")
            setLoading(false);
        })

    }

    return (
        <div className="auth-modal">
            <div className="auth-top">
                <div>
                    <h1>Sign up to become a competitor</h1>
                    <p>It might be your lucky day.</p>
                </div>
            </div>
            <div className="auth-content">
                <div className="w-100">
                    {loading ?
                        <Loader></Loader>
                        :
                        sentToEmail ?
                            <Success title="Success!" small={true}>
                                Check your email (<u>{sentToEmail}</u>) to verify your account
                            </Success>
                            :
                            <form>
                                <TextInput value={username} icon={UserSvg} placeholder={"Username"}></TextInput>
                                <TextInput value={email} icon={UserSvg} placeholder={"Email"}></TextInput>
                                <TextInput value={password} icon={PasswordSvg} type="password" placeholder={"Password"}></TextInput>
                                <TextInput value={password2nd} icon={PasswordSvg} type="password" placeholder={"Repeat password"}></TextInput>
                                <Checkbox small={true} checked={marketingConsent} onChange={() => setMarketingConsent(prev => !prev)}>
                                    I would like to receive discounts, marketing offers and newsletters related to Lottify
                                </Checkbox>
                                <p className="auth-error">{error}</p>
                                <AuthButton onClick={signUp}>Sign up</AuthButton>
                            </form>
                    }
                    <div className="login-register">Already have an account? <span onClick={props.openLogin}>Login</span></div>
                </div>
            </div>
        </div>
    )
}
