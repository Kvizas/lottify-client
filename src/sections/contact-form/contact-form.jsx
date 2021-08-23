import React, { useRef, useState } from 'react'

import TextInput from '../../components/text-input/text-input'
import Button from '../../components/button/button'
import Success from '../../components/success/success'

import EmailSVG from "../../assets/misq/mail.svg"
import { useHistory } from 'react-router-dom'
import postData from '../../requests/post-data'
import { API_URL } from '../../settings'

export default function ContactForm() {

    const [isLoading, setIsLoading] = useState()
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    const email = useRef()
    const firstName = useRef()
    const lastName = useRef()
    const message = useRef()

    const history = useHistory();

    const post = () => {
        setIsLoading(true);
        setError();
        postData(API_URL + "/email/contact-us", {
            from: email.current,
            firstName: firstName.current,
            lastName: lastName.current,
            msg: message.current
        }).then(resp => {
            if (resp.statusCode === 200) {
                setSuccess(true);
            } else {
                console.log(resp);
                setError(resp.data.messages[0].message);
            }
        }).catch(resp => {
            console.log(resp);
            setError("Internal server error. Please try again later.");
        })
            .finally(() => {
                setIsLoading();
            })
    }

    return (
        <section className="section">
            {
                success ?
                    <Success title="We will be in touch!">Your contact form was successfully sent.<br />We will answer it as soon as possible!</Success>
                    :
                    <>
                        <h2 className="w-100 no-margin mobile-section-h">Contact us</h2>
                        <p className="w-100" style={{ marginTop: "8px" }}>Reach us and we will provide you all the information needed</p>
                        <form className="w-100">
                            <TextInput value={email} icon={EmailSVG} placeholder="E-Mail" />
                            <div className="w-100 d-flex justify-space-between">
                                <TextInput value={firstName} style={{ width: "49.5%", margin: "0" }} placeholder="First name" />
                                <TextInput value={lastName} style={{ width: "49.5%", margin: "0" }} placeholder="Last name" />
                            </div>
                            <TextInput value={message} textArea={true} placeholder="Your message" />
                            <div className="w-100 d-flex justify-space-between" style={{ marginTop: "32px" }}>
                                <p className="red no-margin">{error}</p>
                                <Button disabled={isLoading} onClick={post}>Send</Button>
                            </div>
                        </form>
                    </>
            }

            {
                window.location.pathname !== "/faq" ?
                    <>
                        <h2 className="w-100" style={{ marginTop: "84px" }}>Contact info</h2>
                        <div className="w-100 d-flex align-center justify-space-between f-wrap">
                            {/* <p className="small-p-margin no-margin m-w-100">
                                <b>Support number:</b> <span className="no-break">+44 924 569 100</span>
                            </p> */}
                            <p className="small-p-margin no-margin m-w-100">
                                <b>E-mail:</b> support@lottify.co.uk
                            </p>
                            <Button className="small-p-margin" onClick={() => history.push('/faq')}>
                                FAQ
                            </Button>
                        </div>
                    </>
                    :
                    ""
            }
        </section>
    )
}
