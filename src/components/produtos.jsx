// src/components/produtos.js
import React, { useContext } from 'react';
import styles from './produtos.module.css';
import NavbarComponent from './navbar';
import Footer from './footer';
import produto1 from '../assets/images/produto1.png';
import produto2 from '../assets/images/produto2.png';
import produto3 from '../assets/images/produto3.png';
import produto4 from '../assets/images/produto4.png';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext'; // Importar o CartContext

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
    const produtos = [
        {
            id: 1,
            imageSrc: produto1,
            title: '3 Corações Café Torrado E Moído Extraforte Pacote 500G',
            price: 'R$17,00',
            buttonText: 'Comprar',
            description: 'Café torrado e moído com sabor intenso e aroma marcante. Ideal para quem aprecia um café forte.',
            stock: 10 // Adicionando a quantidade em estoque
        },
        {
            id: 2,
            imageSrc: produto2,
            title: 'Café União Tradicional Torrado E Moído 500g',
            price: 'R$16,50',
            buttonText: 'Comprar',
            description: 'Café tradicional com sabor equilibrado e aroma suave. Perfeito para o dia a dia.',
            stock: 5 // Adicionando a quantidade em estoque
        },
        {
            id: 3,
            imageSrc: produto3,
            title: 'Café Melitta Tradicional Torrado E Moído 500g',
            price: 'R$18,00',
            buttonText: 'Comprar',
            description: 'Café com grãos selecionados, proporcionando um sabor rico e encorpado.',
            stock: 0 // Adicionando a quantidade em estoque
        },
        {
            id: 4,
            imageSrc: produto4,
            title: 'Café Melitta Extraforte Torrado E Moído 500g',
            price: 'R$19,00',
            buttonText: 'Comprar',
            description: 'Um café forte e encorpado, ideal para quem busca uma experiência intensa.',
            stock: 8 // Adicionando a quantidade em estoque
        }
    ];

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