import React, { useEffect, useState } from 'react'

export const CartPopupContext = React.createContext();

export default function CartPopupContextProvider({ children }) {

    const [cartPopupActive, setCartPopupActive] = useState(false);

    return (
        <CartPopupContext.Provider value={{ cartPopupActive, setCartPopupActive }}>
            {children}
        </CartPopupContext.Provider>
    )
}
