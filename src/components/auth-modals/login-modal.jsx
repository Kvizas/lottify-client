import React, { useState, useRef, useContext } from 'react'

import postData from "../../requests/post-data";
import { API_URL } from "../../settings";

import TextInput from '../text-input/text-input';
import AuthButton from '../auth-button/auth-button';
import Loader from "../loader/loader";

import UserSvg from "../../assets/auth/user.svg";
import PasswordSvg from "../../assets/auth/password.svg";
import SuccessEmailSvg from "../../assets/auth/mail.svg";

import "./auth-modal.scss";
import { UserContext } from '../../contexts/user-context-provider';
import Success from '../success/success';

export default function LoginModal(props) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const [forgotPassword, setForgotPassword] = useState(false)
    const [fpCheckEmail, setFpCheckEmail] = useState(false)

    const identifier = useRef()
    const password = useRef()

    const { setUser } = useContext(UserContext)

    const login = () => {
        setLoading(true);
        setError();

        //postData(API_URL + "/auth/local/logout")

        postData(API_URL + "/auth/local", {
            identifier: identifier.current,
            password: password.current
        }).then(resp => {
            if (resp.statusCode !== 200) {
                console.log(resp);
                setError(resp.data[0].messages[0].message);
            }
            else {
                setUser(resp.user);
                props.close();
            }
        }).catch(resp => {
            console.log(resp);
            setError("Server error. Please try again later.")
        }).finally(() => {
            setLoading(false);
        })
    }

    const resetPass = () => {
        setLoading(true);
        postData(API_URL + "/auth/forgot-password", {
            email: identifier.current
        }).then(resp => {
            if (!resp.ok) {
                console.log(resp);
                setError(resp.data[0].messages[0].message);
            }
            else {
                setFpCheckEmail(true);
            }
        }).catch(resp => {
            console.log(resp);
            setError("Server error. Please try again later.")
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <div className="auth-modal">
            <div className="auth-top">
                <div>
                    <h1>Log-in to your account</h1>
                    <p>It might be your lucky day.</p>
                </div>
            </div>
            <div className="auth-content">
                <div className="w-100">
                    {loading ?
                        <Loader></Loader>
                        :
                        forgotPassword ?
                            fpCheckEmail ?
                                <div>
                                    <Success title="Success!" icon={SuccessEmailSvg} small={true}>
                                        We sent an email to reset your password to <u>{identifier.current}</u> Email will arrive in a few moments!
                                    </Success>
                                    <div className="login-register" onClick={() => {
                                        setForgotPassword(false);
                                        setFpCheckEmail(false);
                                    }}><span>Go back to login</span></div>
                                </div>
                                :
                                <form>
                                    <TextInput value={identifier} icon={UserSvg} placeholder={"Email"}></TextInput>
                                    <p className="auth-error">{error}</p>
                                    <div className="auth-forgot-pass" onClick={() => setForgotPassword(false)}>Go back to login</div>
                                    <AuthButton onClick={resetPass}>Reset password</AuthButton>
                                </form>
                            :
                            <form>
                                <TextInput value={identifier} icon={UserSvg} placeholder={"Username / Email"}></TextInput>
                                <TextInput value={password} icon={PasswordSvg} type="password" placeholder={"Password"}></TextInput>
                                <p className="auth-error">{error}</p>
                                <div className="auth-forgot-pass" onClick={() => setForgotPassword(true)}>Forgot password?</div>
                                <AuthButton onClick={login}>Log in</AuthButton>
                            </form>
                    }
                    <div className="login-register">Don’t have an account yet? <span onClick={props.openRegister}>Register</span></div>
                </div>
            </div>
        </div>
    )
}
