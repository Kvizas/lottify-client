import React, { useEffect, useState } from 'react'

export const CartContext = React.createContext();

export default function CartContextProvider({ children }) {

    const localData = localStorage.getItem("cart");

    const [cart, setCart] = useState(localData !== null ? JSON.parse(localData) : { products: [] });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    )
}
