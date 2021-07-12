import React, { useContext } from 'react'
import Profile from '../../sections/profile/profile'

import { useHistory } from "react-router-dom";
import { UserContext } from '../../contexts/user-context-provider';
import Entries from '../../sections/entries/entries';
import UserUpdateContextProvider from '../../contexts/user-update-context-provider';

export default function ProfilePage() {

    const { user } = useContext(UserContext);
    const history = useHistory();

    if (!user) {
        history.push("/");
        return <></>
    }

    return (
        <UserUpdateContextProvider>
            <Profile></Profile>
            <Entries></Entries>
        </UserUpdateContextProvider>
    )
}
