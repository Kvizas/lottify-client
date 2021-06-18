import React from 'react'
import Success from '../../components/success/success'
import { useHistory } from "react-router-dom";

export default function RegistrationSuccess() {

    const history = useHistory();

    setTimeout(() => {
        history.push("/");
    }, 4000)
    return (
        <section className="section">
            <Success title="Registered successfully!">
                Now you can login.
                <br></br>
                You are being redirected to main page.
            </Success>
        </section>
    )
}
