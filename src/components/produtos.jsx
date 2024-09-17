import React from 'react'; // Importando useState não é necessário aqui
import styles from './produtos.module.css'; // Importando o CSS Module
import NavbarComponent from './navbar'; // Importando o componente Navbar
import Footer from './footer'; // Importando o componente Footer
import produto1 from '../assets/images/produto1.png'; // Importando a imagem do produto 1
import produto2 from '../assets/images/produto2.png'; // Importando a imagem do produto 2
import produto3 from '../assets/images/produto3.png'; // Importando a imagem do produto 3
import produto4 from '../assets/images/produto4.png'; // Importando a imagem do produto 4

function CardProduto({ imageSrc, title, price, buttonText }) {
    return (
        <div className={styles.productCard}>
            <img className={styles.productImage} src={imageSrc} alt={title} />
            <h3 className={styles.productTitle}>{title}</h3>
            <p className={styles.productPrice}>{price}</p>
            <button className={styles.productButton}>{buttonText}</button>
        </div>
    );
}

function Produtos() {
    const produtos = [
        {
            imageSrc: produto1,
            title: '3 Corações Café Torrado E Moído Extraforte Pacote 500G',
            price: 'R$17,00',
            buttonText: 'Comprar'
        },
        {
            imageSrc: produto2,
            title: 'Café União Tradicional Torrado E Moído 500g',
            price: 'R$16,50',
            buttonText: 'Comprar'
        },
        {
            imageSrc: produto3,
            title: 'Café Melitta Tradicional Torrado E Moído 500g',
            price: 'R$18,00',
            buttonText: 'Comprar'
        },
        {
            imageSrc: produto4,
            title: 'Café Melitta Extraforte Torrado E Moído 500g',
            price: 'R$19,00',
            buttonText: 'Comprar'
        }
    ];

    return (
        <div className={styles.produtosPage}>
            <NavbarComponent />
            <div className={styles.productList}>
                {produtos.map((produto, index) => (
                    <CardProduto
                        key={index}
                        imageSrc={produto.imageSrc}
                        title={produto.title}
                        price={produto.price}
                        buttonText={produto.buttonText}
                    />
                ))}
            </div>
            <br /> <br /> 
            <Footer />
        </div>
    );
}

export default Produtos;