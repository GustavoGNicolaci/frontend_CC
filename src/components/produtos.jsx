import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './produtos.module.css';
import NavbarComponent from './navbar';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';

function CardProduto({ imageSrc, title, price, buttonText, description, stock }) {
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const handleBuyClick = async () => {
        if (stock > 0) {
            try {
                addToCart({ title, imageSrc, price });

                await axios.put(`http://localhost:8080/product/${title}`, { quantidadeEstoque: stock - 1 });

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
            <p className={styles.productPrice}>{price}</p>
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
                onClick={() => navigate('/detalhesProduto', { state: { title, imageSrc, price, description } })}
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
                const response = await axios.get('http://localhost:8080/product');
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
                        key={produto._doc.id}
                        imageSrc={produto._doc.imagem}
                        title={produto._doc.titulo}
                        price={`R$${produto._doc.preco.toFixed(2)}`}
                        buttonText="Comprar"
                        description={produto._doc.descricao}
                        stock={produto._doc.quantidadeEstoque}
                    />
                ))}
            </div>
            <br /> <br />
            <Footer />
        </div>
    );
}

export default Produtos;