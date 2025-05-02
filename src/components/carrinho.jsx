import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';
import NavbarComponent from './navbar/navbar';
import Footer from './footer';
import LoadingModal from './shared/loadingModal/loadingModal';
import styles from './carrinho.module.css';
import { fetchCart, removeProductFromCart } from '../services/carrinhoService';

function Carrinho() {
    const { cartItems, setCartItems, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token não encontrado');
                    return;
                }

                const data = await fetchCart(token);
                if (data.success) {
                    setCartItems(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Erro ao carregar o carrinho:', error);
            } finally {
                setLoading(false);
            }
        };

        loadCart();
    }, [setCartItems]);


    const handleRemoveItem = async (idProduto) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }

            const response = await removeProductFromCart(idProduto);
            if (response.success) {
                // Atualize o estado do carrinho localmente
                setCartItems((prevItems) =>
                    prevItems.filter((item) => item.id !== idProduto)
                );
            }
        } catch (error) {
            console.error('Erro ao remover o produto do carrinho:', error);
        }
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (loading) {
        return <LoadingModal />;
    }

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
                                <button onClick={() => handleRemoveItem(item.id)}>Remover</button>
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