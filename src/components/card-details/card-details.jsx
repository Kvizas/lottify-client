import React, { useRef, useEffect } from 'react'
import { FRONT_URL } from '../../settings';

import "./card-details.scss";
export default function CardDetails({ jwt }) {

    useEffect(() => {
        /* global SecureTrading*/
        var st = SecureTrading({ jwt, livestatus: 1 });

        st.Components();
        return () => {
            st.destroy();
        }
    }, [jwt])

    const payButton = useRef()

    useEffect(() => {

        function handlePay() {
            payButton.current.click();
            console.log(jwt);
        }

        document.addEventListener("payment:submit", handlePay);

        return () => {
            document.removeEventListener("payment:submit");
        }
    }, [jwt])

    return (
        <>
            <form id="st-form" action={FRONT_URL + "/payment-success"} method="GET">
                <div id="st-card-number" className="card-form-field"></div>
                <div id="st-expiration-date" className="card-form-field"></div>
                <div id="st-security-code" className="card-form-field"></div>
                <button ref={payButton} style={{display: "none"}} type="submit">Pay securely</button>
                <div id="st-notification-frame"></div>
            </form>
        </>
    )
}
