import React, { useEffect, useState } from 'react'

export const UserContext = React.createContext();

export default function UserContextProvider({ children }) {

    const localData = localStorage.getItem("user");

    const [user, setUser] = useState(localData !== "undefined" ? JSON.parse(localData) : undefined);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
