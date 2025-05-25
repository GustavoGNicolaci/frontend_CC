"use client"

import { ArrowLeft, CreditCard, MapPin, ShoppingBag, Truck } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../../CartContext"
import Footer from "../footer"
import NavbarComponent from "../navbar/navbar"
import styles from "./checkout.module.css"

import { loadMercadoPago } from "@mercadopago/sdk-js"
import { criarOrderPix } from "../../services/mercadoPagoService"
import PixQrCodeModal from "./pix/pixQrCodeModal"

await loadMercadoPago()
const mp = new window.MercadoPago("TEST-87a3956a-bd8d-41fb-9054-4ff3582631f8")

function Checkout() {
  const [identificationType, setIdentificationType] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
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
    installments: "1",
  })

  const [showPixModal, setShowPixModal] = useState(false);
  const [pixQrCodeImage, setPixQrCodeImage] = useState("");
  const [pixQrCodeText, setPixQrCodeText] = useState("");
  const [loadingPix, setLoadingPix] = useState(false);

  const handlePixCheckout = async () => {
    setLoadingPix(true);
    try {
      const idempotencyKey = '82090445-5bb8-3b46-a226-b26c2e61f811-1748188399554';
      const accessToken = "TEST-6498827097104807-052115-4edc6595b11307a3b98e549b5e2cc6c0-716666768"; // NUNCA deixe isso no frontend em produção real!
      const externalReference = 'ext_ref_1234'
      const payerEmail = document.getElementById("form-checkout__email").value;
      const totalAmount = totalPrice.toFixed(2);

      console.log("Dados do pagamento:", {
        totalAmount,
        payerEmail,
        externalReference,
        idempotencyKey,
        accessToken
      });

      // Exemplo de chamada para o backend
      const response = await fetch("http://localhost:5002/criar-order-pix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Idempotency-Key": idempotencyKey
        },
        body: JSON.stringify({
          totalAmount,
          payerEmail,
          externalReference
        })
      });
      const order = await response.json();

      // Pegue os dados do QR Code da resposta
      const payment = order.transactions.payments[0];
      const qrCodeImage = payment.point_of_interaction.transaction_data.qr_code_base64
        ? `data:image/png;base64,${payment.point_of_interaction.transaction_data.qr_code_base64}`
        : "";
      const qrCodeText = payment.point_of_interaction.transaction_data.qr_code || "";

      setPixQrCodeImage(qrCodeImage);
      setPixQrCodeText(qrCodeText);
      setShowPixModal(true);
    } catch (err) {
      alert("Erro ao criar pagamento Pix: " + err.message);
    } finally {
      setLoadingPix(false);
    }
  };


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

  useEffect(() => {
    // Função para buscar os dados do usuário do localStorage ou API
    const fetchUserData = () => {
      try {
        // Verificar se há dados do usuário no localStorage
        const userData = localStorage.getItem("userData")

        if (userData) {
          const parsedUserData = JSON.parse(userData)

          // Preencher os campos de endereço se existirem no userData
          setFormData((prevData) => ({
            ...prevData,
            cep: parsedUserData.cep || "",
            city: parsedUserData.cidade || "",
            neighborhood: parsedUserData.bairro || "",
            street: parsedUserData.rua || "",
            number: parsedUserData.numero || "",
            complement: parsedUserData.complemento || "",
          }))

          // Validar o endereço após preencher os campos
          validateAddress()
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error)
      }
    }

    fetchUserData()
  }, [])

  // Calcular preços
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price || 0 // Já extraído no carrinho
      const quantity = item.quantity || 1
      return total + price * quantity
    }, 0)
  }

  // Estado para o frete
  const [shippingCost, setShippingCost] = useState(15.0) // Valor padrão ou calculado

  // Cálculo do total
  const subtotal = calculateSubtotal()
  const totalPrice = subtotal + shippingCost

  const getContainerClass = () => {
    return styles.mainContainer
  }

  function maskCPF(value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  }

  function maskCNPJ(value) {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  }

  const handleIdentificationNumberChange = (e) => {
    let value = e.target.value;
    if (identificationType === "CPF") {
      value = maskCPF(value);
    } else if (identificationType === "CNPJ") {
      value = maskCNPJ(value);
    }
    setIdentificationNumber(value);
  };

  // Adicionar as funções para obter tipos de documento
  function createSelectOptions(elem, options, labelsAndKeys = { label: "name", value: "id" }) {
    const { label, value } = labelsAndKeys

    elem.options.length = 0

    const tempOptions = document.createDocumentFragment()

    options.forEach((option) => {
      const optValue = option[value]
      const optLabel = option[label]

      const opt = document.createElement("option")
      opt.value = optValue
      opt.textContent = optLabel

      tempOptions.appendChild(opt)
    })

    elem.appendChild(tempOptions)
  }

  useEffect(() => {
    if (selectedPayment === "pix") {// Obter tipos de documento do Mercado Pago
      ; (async function getIdentificationTypes() {
        try {
          const identificationTypes = await mp.getIdentificationTypes()
          const identificationTypeElement = document.getElementById("form-checkout__identificationType")

          if (identificationTypeElement) {
            createSelectOptions(identificationTypeElement, identificationTypes)
          }
        } catch (e) {
          console.error("Error getting identificationTypes: ", e)
        }
      })()
    }
  }, [selectedPayment])

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
            {selectedPayment === "pix" && (
              <div className={styles.pixDetailsForm}>
                <h3>Detalhes do Pagamento PIX</h3>
                <form id="form-checkout">
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="payerFirstName">Nome</label>
                      <input id="form-checkout__payerFirstName" name="payerFirstName" type="text" />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="payerLastName">Sobrenome</label>
                      <input id="form-checkout__payerLastName" name="payerLastName" type="text" />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="email">E-mail</label>
                      <input id="form-checkout__email" name="email" type="text" />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="identificationType">Tipo de documento</label>
                      <select
                        id="form-checkout__identificationType" 
                        name="identificationType" 
                        type="text"
                        onChange={e => setIdentificationType(e.target.value)}
                      >
                       </select>
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="identificationNumber">Número do documento</label>
                      <input 
                        id="form-checkout__identificationNumber" 
                        name="identificationNumber" 
                        type="text"
                        value={identificationNumber}
                        onChange={handleIdentificationNumberChange}
                        placeholder={identificationType === "CNPJ" ? "00.000.000/0000-00" : "000.000.000-00"}
                        maxLength={identificationType === "CNPJ" ? 18 : 14} />
                    </div>
                  </div>
                  <input type="hidden" name="transactionAmount" id="transactionAmount" value={totalPrice.toFixed(2)} />
                  <input type="hidden" name="description" id="description" value="Compra na Loja" />
                </form>
              </div>
            )}

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
                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="installments">Parcelas</label>
                    <select id="installments" value={formData.installments} onChange={handleInputChange} required>
                      {Array.from({ length: 12 }, (_, i) => {
                        const installmentNumber = i + 1
                        const hasInterest = installmentNumber > 4
                        const totalWithInterest = hasInterest ? totalPrice * 1.05 : totalPrice
                        const installmentValue = (totalWithInterest / installmentNumber).toFixed(2)
                        return (
                          <option key={i} value={`${installmentNumber}`}>
                            {installmentNumber}x de R$ {installmentValue}
                            {!hasInterest ? " sem juros" : " com juros"}
                          </option>
                        )
                      })}
                    </select>
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
                    const price = item.price || 0
                    const quantity = item.quantity || 1

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
                <span>
                  Subtotal ({cartItems.length} {cartItems.length === 1 ? "item" : "itens"})
                </span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Frete</span>
                <span>R$ {shippingCost.toFixed(2)}</span>
              </div>
              {selectedPayment !== "creditCard" && (
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total</span>
                  <span>R$ {totalPrice.toFixed(2)}</span>
                </div>
              )}
              {selectedPayment === "creditCard" && (
                <>
                  <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                    <span>Total</span>
                    <span>
                      {Number(formData.installments) > 4
                        ? `R$ ${(totalPrice * 1.05).toFixed(2)}`
                        : `R$ ${totalPrice.toFixed(2)}`}
                    </span>
                  </div>
                  <div className={`${styles.summaryRow} ${styles.installmentRow}`}>
                    <span>Pagamento em {formData.installments}x</span>
                    <span>
                      {Number(formData.installments) > 4
                        ? `R$ ${((totalPrice * 1.05) / Number.parseInt(formData.installments)).toFixed(2)}/mês`
                        : `R$ ${(totalPrice / Number.parseInt(formData.installments)).toFixed(2)}/mês`}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className={styles.actionButtons}>
              <button type="button" className={styles.backButton} onClick={() => navigate("/carrinho")}>
                <ArrowLeft size={16} />
                Voltar
              </button>

              <button
                type="button"
                className={`${styles.checkoutButton} ${!selectedPayment || !isAddressComplete ? styles.disabledButton : ""}`}
                disabled={!selectedPayment || !isAddressComplete || loadingPix}
                onClick={() => {
                  if (selectedPayment === "pix") {
                    handlePixCheckout();
                  } else {
                    // Handle credit card payment logic
                    console.log("Processing credit card payment")
                    // Add your credit card payment submission logic here
                  }
                }}
              >
                 {loadingPix ? "Processando..." : "Finalizar Compra"}
              </button>

              <PixQrCodeModal
                show={showPixModal}
                onClose={() => setShowPixModal(false)}
                qrCodeImage={pixQrCodeImage}
                qrCodeText={pixQrCodeText}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Checkout
