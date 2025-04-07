import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from './navbar/navbar';
import Footer from './footer';
import axios from 'axios';
import styles from './carrinho.module.css';

function Carrinho() {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    console.log("Itens no carrinho:", cartItems);

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleRemove = async (idProduto) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            await axios.delete('http://localhost:5002/carrinho/remover', {
                data: { idProduto },
                headers: { Authorization: `Bearer ${token}` }
            });

            removeFromCart(idProduto);
        } catch (error) {
            console.error('Erro ao remover produto:', error);
            alert('Erro ao remover produto do carrinho.');
        }
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
                    {cartItems.map((item) => (
                        <div key={item.id} className={styles.cartItem}>
                            <img src={item.imageSrc} alt={item.title} className={styles.cartImage} />
                            <div className={styles.cartDetails}>
                                <h3>{item.title}</h3>
                                <p>Preço: R$ {item.price.toFixed(2)}</p>
                                <p>Quantidade: {item.quantity}</p>
                                <button onClick={() => handleRemove(item.id)}>Remover</button>
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
