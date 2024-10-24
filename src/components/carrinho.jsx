// src/components/carrinho.js
import React, { useContext } from 'react';
import { CartContext } from '../CartContext'; // Importar contexto
import NavbarComponent from './navbar';
import Footer from './footer';
import styles from './carrinho.module.css';

function Carrinho() {
    const { cartItems, removeFromCart } = useContext(CartContext);

    console.log("Itens no carrinho:", cartItems); // Log para verificar os itens no carrinho

    return (
        <div className={styles.carrinhoPage}>
            <NavbarComponent />
            <h1 className={styles.title}>Seu Carrinho</h1> {/* Adicionada classe CSS */}
            {cartItems.length === 0 ? (
                <div className={styles.emptyCart}>
                    <p>Seu carrinho está vazio.</p>
                </div>
            ) : (
                cartItems.map((item, index) => (
                    <div key={index} className={styles.cartItem}>
                        <img src={item.imageSrc} alt={item.title} className={styles.cartImage} />
                        <div className={styles.cartDetails}>
                            <h3>{item.title}</h3>
                            <p>{item.price}</p>
                            <button onClick={() => removeFromCart(item.title)}>Remover</button>
                        </div>
                    </div>
                ))
            )}
            <Footer />
        </div>
    );
}

export default Carrinho;