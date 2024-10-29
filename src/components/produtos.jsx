// src/components/produtos.js
import React, { useContext } from 'react';
/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext'; // Importar o CartContext
import Footer from './footer';
import NavbarComponent from './navbar';
import styles from './produtos.module.css';

function CardProduto({ imageSrc, title, price, buttonText, description }) {
    const navigate = useNavigate();
    const { addToCart, stock } = useContext(CartContext);

    const handleBuyClick = () => {
        if (stock[title] > 0) {
            addToCart({ title, imageSrc, price });
            alert(`${title} adicionado ao carrinho!`);
        } else {
            alert(`Desculpe, ${title} está fora de estoque.`);
        }
    };

    return (
        <div className={styles.productCard}>
            <img className={styles.productImage} src={imageSrc} alt={title} />
            <h3 className={styles.productTitle}>{title}</h3>
            <p className={styles.productPrice}>{price}</p>
            <p className={styles.stockInfo}>Em estoque: {stock[title]}</p>
            <button className={styles.productButton} onClick={handleBuyClick}>{buttonText}</button>
            <button className={styles.detailsButton} onClick={() => navigate('/detalhesProduto', { state: { title, imageSrc, price, description } })}>Detalhes</button>
        </div>
    );
}

function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/product');
                setProdutos(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
                setError('Erro ao carregar produtos');
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
    }, []);

    if (loading) return <div>Carregando produtos...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={styles.produtosPage}>
            <NavbarComponent />
            <div className={styles.productList}>
                {produtos.map((produto) => (
                    <CardProduto
                        key={produto.id}
                        imageSrc={produto.imageSrc}
                        title={produto.title}
                        price={produto.price}
                        buttonText={produto.buttonText}
                        description={produto.description}
                        stock={produto.stock} // Passando a quantidade em estoque
                    />
                ))}
            </div>
            <br /> <br />
            <Footer />
        </div>
    );
}

export default Produtos;