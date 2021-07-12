import React, { useContext, useEffect } from 'react'
import { getData } from '../requests/get-data';
import { API_URL } from '../settings';

import { UserContext } from './user-context-provider'

export const UserUpdateContext = React.createContext();

export default function UserUpdateContextProvider({ children }) {

    const { setUser } = useContext(UserContext)

    const forceUpdate = () => {
        getData(API_URL + "/users/me").then(resp => {
            console.log(resp);
            setUser(resp)
        }).catch(() => {
            console.log("Failed to fetch userdata.")
        })
    }

    useEffect(() => {
        forceUpdate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <UserUpdateContext.Provider value={forceUpdate}>
            {children}
        </UserUpdateContext.Provider>
    )
}
