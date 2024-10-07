import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './detalhesProduto.module.css'; 
import NavbarComponent from './navbar';
import Footer from './footer';

function DetalhesProduto() {
    const location = useLocation();
    const { title, imageSrc, price, description } = location.state || {}; // Protegendo contra erros

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
                    <button className={styles.buyButton}>Comprar</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DetalhesProduto;