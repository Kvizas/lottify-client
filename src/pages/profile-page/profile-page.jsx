import React, { useContext } from 'react'
import Profile from '../../sections/profile/profile'

import { useHistory } from "react-router-dom";
import { UserContext } from '../../contexts/user-context-provider';
import UserUpdateContextProvider from '../../contexts/user-update-context-provider';

export default function ProfilePage() {

    const { user, setUser } = useContext(UserContext);
    const history = useHistory();

    if (!user) {
        history.push("/");
        return <></>
    }

    if (user.guest) {
        setUser(undefined);
        history.push("/");
        return <></>
    }

    return (
        <UserUpdateContextProvider>
            <Profile></Profile>
        </UserUpdateContextProvider>
    )
}
