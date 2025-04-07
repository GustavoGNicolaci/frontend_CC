// src/components/detalhesProduto.js
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './detalhesProduto.module.css'; 
import NavbarComponent from './navbar/navbar';
import Footer from './footer';
import { CartContext } from '../CartContext';

function DetalhesProduto() {
    const location = useLocation();
    const { title, imageSrc, price, description } = location.state || {};
    const { addToCart, stock = {} } = useContext(CartContext);

    // Verifique se os dados do produto estão disponíveis
    if (!title || !imageSrc || !price || !description) {
        return <div>Erro: Detalhes do produto não encontrados.</div>;
    }

    const handleAddToCart = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Você precisa estar logado para comprar!');
            return;
        }

        if ((stock[title] || 0) > 0) {
            addToCart({ title, imageSrc, price });
            alert(`${title} adicionado ao carrinho!`);
        } else {
            alert('Produto esgotado!');
        }
    };

    const isOutOfStock = (stock[title] || 0) <= 0;

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
                    <p className={styles.stockInfo}>Em estoque: {stock[title] || 0}</p>
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