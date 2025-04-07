/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './produtos.module.css';
import NavbarComponent from './navbar/navbar';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';

function CardProduto({ id, imageSrc, title, price, buttonText, description, stock }) {
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const handleBuyClick = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Você precisa estar logado para comprar!');
            navigate('/login'); // Redireciona para a página de login
            return;
        }

        if (stock > 0) {
            try {
                addToCart({ id, title, imageSrc, price });

                await axios.put(`http://localhost:5002/product/${id}`, { quantidadeEstoque: stock - 1 });

                alert(`${title} adicionado ao carrinho!`);
            } catch (error) {
                console.error('Erro ao atualizar estoque:', error);
                alert('Erro ao adicionar produto ao carrinho. Tente novamente.');
            }
        } else {
            alert('Produto esgotado!');
        }
    };

    return (
        <div className={styles.productCard}>
            <img className={styles.productImage} src={imageSrc} alt={title} />
            <h3 className={styles.productTitle}>{title}</h3>
            <p className={styles.productPrice}>R$ {price.toFixed(2)}</p>
            <p className={styles.stockInfo}>Em estoque: {stock}</p>
            <button
                className={`${styles.productButton} ${stock === 0 ? styles.disabledButton : ''}`}
                onClick={handleBuyClick}
                disabled={stock === 0}
            >
                {buttonText}
            </button>
            <button
                className={styles.detailsButton}
                onClick={() => navigate('/detalhesProduto', { state: { id, title, imageSrc, price, description } })}
            >
                Detalhes
            </button>
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
                const response = await axios.get('http://localhost:5002/product');
                console.log("Dados da API:", response.data); // 👈 Adiciona um log
                setProdutos(response.data);
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
                        id={produto.id}
                        imageSrc={produto.imagem}
                        title={produto.titulo}
                        price={produto.preco}
                        buttonText="Comprar"
                        description={produto.descricao}
                        stock={produto.quantidadeEstoque}
                    />
                ))}
            </div>
            <br /> <br />
            <Footer />
        </div>
    );
}

export default Produtos;
