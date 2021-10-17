import React, { useState } from 'react'

export const CartPopupContext = React.createContext();

export default function CartPopupContextProvider({ children }) {

    const [cartPopupActive, setCartPopupActive] = useState(false);
    const [latestProduct, setLatestProduct] = useState();

    return (
        <CartPopupContext.Provider value={{ cartPopupActive, setCartPopupActive, latestProduct, setLatestProduct }}>
            {children}
        </CartPopupContext.Provider>
    )
}
