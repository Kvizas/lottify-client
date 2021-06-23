import React, { useContext } from 'react'
import Profile from '../../sections/profile/profile'

import { useHistory } from "react-router-dom";
import { UserContext } from '../../contexts/user-context-provider';

export default function ProfilePage() {

    const { user } = useContext(UserContext);
    const history = useHistory();

    if (!user) {
        history.push("/");
        return <></>
    }

    return (
        <Profile></Profile>
    )
}
