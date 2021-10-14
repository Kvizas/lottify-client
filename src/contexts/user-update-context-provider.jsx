import React, { useContext, useEffect, useState } from 'react'
import { getData } from '../requests/get-data';
import { API_URL } from '../settings';

import { UserContext } from './user-context-provider'

export const UserUpdateContext = React.createContext();

export default function UserUpdateContextProvider({ children }) {

    const { setUser } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true);

    const forceUpdate = () => {
        getData(API_URL + "/users/me").then(resp => {
            setUser(resp)
        }).catch(() => {
            console.log("Failed to fetch userdata.")
        }).finally(() => setIsLoading(false))
    }

    useEffect(() => {
        forceUpdate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        isLoading ?
        ""
        :
        <UserUpdateContext.Provider value={forceUpdate}>
            {children}
        </UserUpdateContext.Provider>
    )
}
