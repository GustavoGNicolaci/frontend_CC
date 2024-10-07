// components/Carrinho.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import NavbarComponent from './navbar';
import Footer from './footer';
import styles from './carrinho.module.css';

function Carrinho() {
    const location = useLocation();
    const { cartItems } = location.state || { cartItems: [] }; // Protegendo contra erros

    return (
        <div className={styles.carrinhoPage}>
            <NavbarComponent />
            <h2>Seu Carrinho</h2>
            {cartItems.length === 0 ? (
                <p>Seu carrinho está vazio.</p>
            ) : (
                <div className={styles.cartItems}>
                    {cartItems.map((item, index) => (
                        <div key={index} className={styles.cartItem}>
                            <img src={item.imageSrc} alt={item.title} className={styles.cartImage} />
                            <h3>{item.title}</h3>
                            <p>{item.price}</p>
                        </div>
                    ))}
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Carrinho;