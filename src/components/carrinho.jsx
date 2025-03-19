import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import NavbarComponent from './navbar/navbar';
import Footer from './footer';
import styles from './carrinho.module.css';

function Carrinho() {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate(); // Inicializar useNavigate

    console.log("Itens no carrinho:", cartItems);

    const handleCheckout = () => {
        // Redirecionar para a página de checkout
        navigate('/checkout');
    };

    return (
        <div className={styles.carrinhoPage}>
            <NavbarComponent />
            <h1 className={styles.title}>Seu Carrinho</h1>
            {cartItems.length === 0 ? (
                <div className={styles.emptyCart}>
                    <p>Seu carrinho está vazio.</p>
                </div>
            ) : (
                <>
                    {cartItems.map((item, index) => (
                        <div key={index} className={styles.cartItem}>
                            <img src={item.imageSrc} alt={item.title} className={styles.cartImage} />
                            <div className={styles.cartDetails}>
                                <h3>{item.title}</h3>
                                <p>{item.price}</p>
                                <button onClick={() => removeFromCart(item.title)}>Remover</button>
                            </div>
                        </div>
                    ))}
                    <button className={styles.checkoutButton} onClick={handleCheckout}>
                        Fechar Compra
                    </button>
                </>
            )}
            <Footer />
        </div>
    );
}

export default Carrinho;