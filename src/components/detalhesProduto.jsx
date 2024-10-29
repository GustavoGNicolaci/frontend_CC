// src/components/detalhesProduto.js
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './detalhesProduto.module.css'; 
import NavbarComponent from './navbar';
import Footer from './footer';
import { CartContext } from '../CartContext';

function DetalhesProduto() {
    const location = useLocation();
    const { title, imageSrc, price, description } = location.state || {};
    const { addToCart, stock } = useContext(CartContext);

    const handleAddToCart = () => {
        if (stock[title] > 0) {
            addToCart({ title, imageSrc, price });
            alert(`${title} adicionado ao carrinho!`);
        }
    };

    const isOutOfStock = stock[title] <= 0;

    return (
        <div className={styles.detalhesPage}>
            <NavbarComponent />
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <img src={imageSrc} alt={title} className={styles.detalhesImage} />
                </div>
                <div className={styles.detailsContainer}>
                    <h2>{title}</h2>
                    <p className={styles.detalhesPrice}>{price}</p>
                    <p className={styles.productDetails}>{description}</p> 
                    <p className={styles.stockInfo}>Em estoque: {stock[title]}</p> 
                    <button 
                        className={`${styles.buyButton} ${isOutOfStock ? styles.outOfStock : ''}`} 
                        onClick={handleAddToCart} 
                        disabled={isOutOfStock}
                    >
                        Comprar
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DetalhesProduto;