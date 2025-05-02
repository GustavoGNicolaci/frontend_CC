import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from './navbar/navbar';
import Footer from './footer';
import styles from './checkout.module.css';

function Checkout() {
    const [selectedPayment, setSelectedPayment] = useState('');
    const [showCardDetails, setShowCardDetails] = useState(false);
    const [isAddressComplete, setIsAddressComplete] = useState(false);
    const navigate = useNavigate();

    const handlePaymentChange = (event) => {
        const paymentMethod = event.target.value;
        setSelectedPayment(paymentMethod);
        setShowCardDetails(paymentMethod === 'creditCard');
    };

    // const validateAddress = () => {
    //     const cep = document.getElementById('cep').value;
    //     const city = document.getElementById('city').value;
    //     const street = document.getElementById('street').value;
    //     const number = document.getElementById('number').value;

    //     setIsAddressComplete(cep && city && street && number);
    // };

    // const productPrice = item.totalPrice;
    const shippingCost = 0.00;
    // const totalPrice = productPrice + shippingCost;

    return (
        <div className={styles.checkoutPage}>
            <NavbarComponent />
            <h1 className={styles.title}>Finalizar Compra</h1>
            <div className={styles.checkoutContainer}>
                <div className={styles.addressSection}>
                    <h2>Informações do Endereço</h2>
                    <form>
                        <div className={styles.inputGroup}>
                            <label htmlFor="cep">CEP:</label>
                            <input
                                type="text"
                                id="cep"
                                required
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    e.target.value = value;
                                    // validateAddress();
                                }}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="city">Cidade:</label>
                            <input type="text" id="city" required  />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="street">Rua:</label>
                            <input type="text" id="street" required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="number">Número:</label>
                            <input
                                type="text"
                                id="number"
                                required
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    e.target.value = value;
                                   
                                }}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="complement">Complemento:</label>
                            <input type="text" id="complement" />
                        </div>
                    </form>
                </div>

                <div className={`${styles.paymentSection} ${!isAddressComplete ? styles.disabled : ''}`}>
                    <h2>Método de Pagamento</h2>
                    <div className={styles.paymentOptions}>
                        <div
                            className={`${styles.paymentOption} ${selectedPayment === 'pix' ? styles.selected : ''}`}
                            onClick={() => isAddressComplete && handlePaymentChange({ target: { value: 'pix' } })}
                        >
                            🪙 PIX
                        </div>
                        <div
                            className={`${styles.paymentOption} ${selectedPayment === 'creditCard' ? styles.selected : ''}`}
                            onClick={() => isAddressComplete && handlePaymentChange({ target: { value: 'creditCard' } })}
                        >
                            💳 Cartão de Crédito
                        </div>
                    </div>

                    {showCardDetails && (
                        <form className={styles.cardDetailsForm}>
                            <h3>Detalhes do Cartão</h3>
                            <div className={styles.inputGroup}>
                                <label htmlFor="cardNumber">Número do Cartão:</label>
                                <input type="text" id="cardNumber" required />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="cardName">Nome no Cartão:</label>
                                <input type="text" id="cardName" required />
                            </div>

                            <div className={`${styles.inputGroup} ${styles.expiryDate}`}>
                                <label htmlFor="expiryDate">Data de Expiração:</label>

                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <select id="expiryMonth" required style={{ width: '80px', marginRight: '5px' }}>
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <option key={i} value={`${i + 1}`}>{i + 1}</option>
                                        ))}
                                    </select>
                                    /
                                    <select id="expiryYear" required style={{ width: '80px', marginLeft: '5px' }}>
                                        {Array.from({ length: 21 }, (_, i) => (
                                            <option key={i} value={`${new Date().getFullYear() + i}`}>{new Date().getFullYear() + i}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="cvv">Código de Segurança (CVV):</label>
                                <input type="text" id="cvv" required />
                            </div>
                        </form>
                    )}
                </div>

                <div className={styles.totalSection}>
                    <h2>Total a Pagar</h2>
                    {/* <p>Preço dos Produtos: R$ {productPrice.toFixed(2)}</p> */}
                    <p>Preço de Frete: R$ {shippingCost.toFixed(2)}</p>
                    {/* <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Total: R$ {totalPrice.toFixed(2)}</p> */}
                </div>

            </div>

            <div className={styles.buttonContainer}>
                <button
                    type="button"
                    className={styles.backButton}
                    onClick={() => navigate('/carrinho')}
                >
                    Voltar ao Carrinho
                </button>

                <button
                    type="submit"
                    className={`${styles.submitButton} ${!selectedPayment ? styles.disabledButton : ''}`}
                    disabled={!selectedPayment}
                >
                    Finalizar Compra
                </button>
            </div>

            <Footer />
        </div>
    );
}

export default Checkout;