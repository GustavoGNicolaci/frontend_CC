// src/CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [stock, setStock] = useState({
        '3 Corações Café Torrado E Moído Extraforte Pacote 500G': 10,
        'Café União Tradicional Torrado E Moído 500g': 5,
        'Café Melitta Tradicional Torrado E Moído 500g': 0,
        'Café Melitta Extraforte Torrado E Moído 500g': 8,
    });

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
        // Diminui o estoque
        setStock((prevStock) => ({
            ...prevStock,
            [item.title]: prevStock[item.title] > 0 ? prevStock[item.title] - 1 : 0,
        }));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, stock }}>
            {children}
        </CartContext.Provider>
    );
};