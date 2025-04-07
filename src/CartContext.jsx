/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await axios.get('http://localhost:5002/carrinho', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCartItems(response.data.data);
            } catch (error) {
                console.error('Erro ao buscar carrinho:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const addToCart = async (item) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            await axios.post('http://localhost:5002/carrinho/adicionar', 
                { idProduto: item.id, quantidade: 1 }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setCartItems(prevCart => [...prevCart, item]);
        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
        }
    };

    const removeFromCart = async (idProduto) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            await axios.delete('http://localhost:5002/carrinho/remover', {
                data: { idProduto },
                headers: { Authorization: `Bearer ${token}` }
            });

            setCartItems(cartItems.filter(item => item.id !== idProduto));
        } catch (error) {
            console.error('Erro ao remover do carrinho:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, loading }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
