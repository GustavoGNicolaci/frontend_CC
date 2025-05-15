"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../CartContext"
import NavbarComponent from "./navbar/navbar"
import Footer from "./footer"
import styles from "./checkout.module.css"
import { ShoppingBag, CreditCard, Truck, MapPin, ArrowLeft } from "lucide-react"

function Checkout() {
    const [selectedPayment, setSelectedPayment] = useState("")
    const [showCardDetails, setShowCardDetails] = useState(false)
    const [isAddressComplete, setIsAddressComplete] = useState(true)
    const [formData, setFormData] = useState({
        cep: "",
        city: "",
        neighborhood: "",
        street: "",
        number: "",
        complement: "",
        cardNumber: "",
        cardName: "",
        expiryMonth: "1",
        expiryYear: new Date().getFullYear().toString(),
        cvv: "",
    })
    const navigate = useNavigate()
    const { cartItems = [] } = useContext(CartContext)

    const handlePaymentChange = (paymentMethod) => {
        setSelectedPayment(paymentMethod)
        setShowCardDetails(paymentMethod === "creditCard")
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target
        let processedValue = value

        if (id === "cep" || id === "number") {
            processedValue = value.replace(/[^0-9]/g, "")
        }

        setFormData({
            ...formData,
            [id]: processedValue,
        })

        if (["cep", "city", "neighborhood", "street", "number"].includes(id)) {
            validateAddress()
        }
    }

    const validateAddress = () => {
        const { cep, city, neighborhood, street, number } = formData
        setIsAddressComplete(cep && city && neighborhood && street && number)
    }

    useEffect(() => {
        validateAddress()
    }, [formData.cep, formData.city, formData.neighborhood, formData.street, formData.number])

    // Calcular preços
    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.price || 0; // Já extraído no carrinho
            const quantity = item.quantity || 1;
            return total + (price * quantity);
        }, 0);
    }

    // Estado para o frete
    const [shippingCost, setShippingCost] = useState(15.0); // Valor padrão ou calculado

    // Cálculo do total
    const subtotal = calculateSubtotal();
    const totalPrice = subtotal + shippingCost;

    const getContainerClass = () => {
        return styles.mainContainer
    }

    return (
        <div className={getContainerClass()} data-payment={selectedPayment}>
            <NavbarComponent />
            <div className={styles.checkoutPage}>
                <div className={styles.headerContainer}>
                    <h1 className={styles.title}>
                        <ShoppingBag className={styles.titleIcon} size={28} />
                        Finalizar Compra
                    </h1>
                </div>

                <div className={styles.checkoutContent}>
                    {/* Coluna 1: Endereço */}
                    <div className={styles.addressSection}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionIconWrapper}>
                                <MapPin size={20} />
                            </div>
                            <h2>Endereço de Entrega</h2>
                        </div>
                        <form className={styles.addressForm}>
                            <div className={styles.formRow}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="cep">CEP</label>
                                    <input
                                        type="text"
                                        id="cep"
                                        value={formData.cep}
                                        onChange={handleInputChange}
                                        placeholder="00000-000"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="city">Cidade</label>
                                    <input
                                        type="text"
                                        id="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="Sua cidade"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="neighborhood">Bairro</label>
                                    <input
                                        type="text"
                                        id="neighborhood"
                                        value={formData.neighborhood}
                                        onChange={handleInputChange}
                                        placeholder="Seu bairro"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="street">Rua</label>
                                    <input
                                        type="text"
                                        id="street"
                                        value={formData.street}
                                        onChange={handleInputChange}
                                        placeholder="Nome da rua"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="number">Número</label>
                                    <input
                                        type="text"
                                        id="number"
                                        value={formData.number}
                                        onChange={handleInputChange}
                                        placeholder="123"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="complement">Complemento</label>
                                    <input
                                        type="text"
                                        id="complement"
                                        value={formData.complement}
                                        onChange={handleInputChange}
                                        placeholder="Apto, Bloco, etc. (opcional)"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Coluna 2: Pagamento */}
                    <div className={`${styles.paymentSection} ${!isAddressComplete ? styles.disabled : ""}`}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionIconWrapper}>
                                <CreditCard size={20} />
                            </div>
                            <h2>Método de Pagamento</h2>
                        </div>
                        <div className={styles.paymentOptions}>
                            <div
                                className={`${styles.paymentOption} ${selectedPayment === "pix" ? styles.selected : ""}`}
                                onClick={() => isAddressComplete && handlePaymentChange("pix")}
                            >
                                <div className={styles.paymentOptionIcon}>🪙</div>
                                <div className={styles.paymentOptionText}>
                                    <h3>PIX</h3>
                                    <p>Pagamento instantâneo</p>
                                </div>
                            </div>
                            <div
                                className={`${styles.paymentOption} ${selectedPayment === "creditCard" ? styles.selected : ""}`}
                                onClick={() => isAddressComplete && handlePaymentChange("creditCard")}
                            >
                                <div className={styles.paymentOptionIcon}>💳</div>
                                <div className={styles.paymentOptionText}>
                                    <h3>Cartão de Crédito</h3>
                                    <p>Pagamento em até 12x</p>
                                </div>
                            </div>
                        </div>

                        {showCardDetails && (
                            <div className={styles.cardDetailsForm}>
                                <h3>Detalhes do Cartão</h3>
                                <div className={styles.formRow}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="cardNumber">Número do Cartão</label>
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            placeholder="0000 0000 0000 0000"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className={styles.formRow}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="cardName">Nome no Cartão</label>
                                        <input
                                            type="text"
                                            id="cardName"
                                            value={formData.cardName}
                                            onChange={handleInputChange}
                                            placeholder="Nome como aparece no cartão"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="expiryMonth">Data de Expiração</label>
                                        <div className={styles.expiryDateContainer}>
                                            <select id="expiryMonth" value={formData.expiryMonth} onChange={handleInputChange} required>
                                                {Array.from({ length: 12 }, (_, i) => (
                                                    <option key={i} value={`${i + 1}`}>
                                                        {i + 1}
                                                    </option>
                                                ))}
                                            </select>
                                            <span>/</span>
                                            <select id="expiryYear" value={formData.expiryYear} onChange={handleInputChange} required>
                                                {Array.from({ length: 21 }, (_, i) => (
                                                    <option key={i} value={`${new Date().getFullYear() + i}`}>
                                                        {new Date().getFullYear() + i}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="cvv">CVV</label>
                                        <input
                                            type="text"
                                            id="cvv"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            placeholder="123"
                                            maxLength="4"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Coluna 3: Resumo do Pedido */}
                    <div className={styles.orderSummary}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionIconWrapper}>
                                <Truck size={20} />
                            </div>
                            <h2>Resumo do Pedido</h2>
                        </div>

                        <div className={styles.orderItems}>
                            {cartItems.length > 0 ? (
                                <div className={styles.itemsList}>
                                    {cartItems.map((item, index) => {
                                        const price = item.price || 0;
                                        const quantity = item.quantity || 1;

                                        return (
                                            <div key={index} className={styles.orderItem}>
                                                <div className={styles.itemInfo}>
                                                    <span className={styles.itemName}>
                                                        {item.title || item.titulo || "Produto"} x{quantity}
                                                    </span>
                                                </div>
                                                <span className={styles.itemPrice}>R$ {(price * quantity).toFixed(2)}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <p className={styles.emptyCart}>Seu carrinho está vazio</p>
                            )}
                        </div>

                        <div className={styles.orderSummaryDetails}>
                            <div className={styles.summaryRow}>
                                <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'})</span>
                                <span>R$ {subtotal.toFixed(2)}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Frete</span>
                                <span>R$ {shippingCost.toFixed(2)}</span>
                            </div>
                            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                                <span>Total</span>
                                <span>R$ {totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className={styles.actionButtons}>
                            <button type="button" className={styles.backButton} onClick={() => navigate("/carrinho")}>
                                <ArrowLeft size={16} />
                                Voltar
                            </button>

                            <button
                                type="submit"
                                className={`${styles.checkoutButton} ${!selectedPayment || !isAddressComplete ? styles.disabledButton : ""}`}
                                disabled={!selectedPayment || !isAddressComplete}
                            >
                                Finalizar Compra
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Checkout
