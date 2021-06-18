import React from 'react'

import PasswordReset from "../../sections/password-reset/password-reset";

export default function PasswordResetPage(props) {

    const code = props.location.pathname.replace('/password-reset/', '');

    return (
        <PasswordReset code={code}></PasswordReset>
    )
}
