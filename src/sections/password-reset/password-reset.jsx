import React, { useRef, useState, useContext } from 'react'
import TextInput from '../../components/text-input/text-input'
import { useHistory } from "react-router-dom";

import "./password-reset.scss"

import PasswordSvg from "../../assets/auth/password.svg";
import Loader from '../../components/loader/loader';
import postData from '../../requests/post-data';
import { API_URL } from '../../settings';
import { checkPassword } from '../../utilities/input-checks';
import Success from '../../components/success/success';

import { UserContext } from "../../contexts/user-context-provider"
import PageStripe from '../../components/page-stripe/page-stripe';
import Button from '../../components/button/button';

export default function PasswordReset(props) {

    const { setUser } = useContext(UserContext)

    const [loading, setLoading] = useState()
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    const password = useRef()
    const password2nd = useRef()

    const history = useHistory();

    const reset = () => {

        setError();

        const passCheckRes = checkPassword(password.current)
        if (passCheckRes !== true) {
            setError(passCheckRes);
            return;
        }

        if (password.current !== password2nd.current) {
            setError("Passwords must match!");
            return;
        }

        setLoading(true);

        postData(API_URL + "/auth/reset-password", {
            code: props.code,
            password: password.current,
            passwordConfirmation: password2nd.current
        }).then(resp => {
            console.log(resp);
            if (resp.statusCode !== 200) {
                setError(resp.data[0].messages[0].message);
            }
            else {
                setSuccess(true);
                setUser(resp.user);
                setTimeout(() => {
                    history.push("/");
                }, 4000)
            }
        }).catch(resp => {
            console.log(resp);
            setError("Server error. Please try again later.")
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <>
            <PageStripe>
                <div className="d-flex justify-center">
                    <div className="password-reset-stripe">
                        <span className="w-100">SOMETIMES WE ALL FORGET</span>
                        <span className="w-50">SOMETHING</span>
                        <div className="password-reset-stripe-reset">Reset your password</div>
                    </div>
                </div>
            </PageStripe>
            <section className="section">
                {
                    loading ?
                        <Loader></Loader>
                        :
                        success ?
                            <Success title="Your password was reset!">
                                You are being redirected to main page...
                            </Success>
                            :
                            <form className="password-reset-form">
                                <h3 className="w-100">Enter your new password</h3>
                                <p className="w-100">Please enter your new password and repeat it in the second field.</p>
                                <TextInput value={password} type="password" icon={PasswordSvg} placeholder="New password"></TextInput>
                                <TextInput value={password2nd} type="password" icon={PasswordSvg} placeholder="Repeat new password"></TextInput>
                                <p className="auth-error">{error}</p>
                                <div className="password-reset-button">
                                    <Button onClick={reset}>Reset</Button>
                                </div>
                            </form>
                }
            </section>
        </>
    )
}
