"use client"

import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../CartContext"
import NavbarComponent from "./navbar/navbar"
import Footer from "./footer"
import LoadingModal from "./shared/loadingModal/loadingModal"
import styles from "./carrinho.module.css"
import { fetchCart, removeProductFromCart, updateCartItemQuantity } from "../services/carrinhoService"
import { ShoppingCart, Package, Plus, Minus } from "lucide-react"

function Carrinho() {
  const { cartItems = [], setCartItems } = useContext(CartContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [itemQuantities, setItemQuantities] = useState({})

  useEffect(() => {
    const loadCart = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          console.error("Token não encontrado")
          return
        }

        const data = await fetchCart(token)
        console.log("Dados recebidos do carrinho:", data)

        if (data.success) {
          // Verifica se data.data é um array
          if (Array.isArray(data.data)) {
            console.log("Itens do carrinho:", data.data)
            setCartItems(data.data)

            // Inicializa as quantidades
            const quantities = {}
            data.data.forEach((item) => {
              const id = item.id || item._id
              quantities[id] = item.quantidade || item.quantity || 1
            })
            setItemQuantities(quantities)
          } else if (data.data && typeof data.data === "object") {
            // Se não for um array, mas for um objeto, tenta extrair os itens
            const items = data.data.items || data.data.produtos || Object.values(data.data)
            if (Array.isArray(items)) {
              console.log("Itens extraídos do carrinho:", items)
              setCartItems(items)

              // Inicializa as quantidades
              const quantities = {}
              items.forEach((item) => {
                const id = item.id || item._id
                quantities[id] = item.quantidade || item.quantity || 1
              })
              setItemQuantities(quantities)
            } else {
              console.error("Formato de dados inválido:", data.data)
              setCartItems([])
            }
          } else {
            console.error("Formato de dados inválido:", data.data)
            setCartItems([])
          }
        } else {
          console.error(data.message)
          setCartItems([])
        }
      } catch (error) {
        console.error("Erro ao carregar o carrinho:", error)
        setCartItems([])
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [setCartItems])

  const handleRemoveItem = async (idProduto) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        return
      }

      const response = await removeProductFromCart(idProduto)
      if (response.success) {
        // Atualize o estado do carrinho localmente
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== idProduto))

        // Remova a quantidade do item
        setItemQuantities((prev) => {
          const newQuantities = { ...prev }
          delete newQuantities[idProduto]
          return newQuantities
        })
      }
    } catch (error) {
      console.error("Erro ao remover o produto do carrinho:", error)
    }
  }

  const handleQuantityChange = async (idProduto, newQuantity) => {
    // Não permitir quantidades menores que 1
    if (newQuantity < 1) return

    try {
      // Atualiza localmente primeiro para feedback imediato
      setItemQuantities((prev) => ({
        ...prev,
        [idProduto]: newQuantity,
      }))

      // Atualiza no servidor
      await updateCartItemQuantity(idProduto, newQuantity)
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error)
      // Reverte para o valor anterior em caso de erro
      setItemQuantities((prev) => ({
        ...prev,
        [idProduto]: prev[idProduto],
      }))
    }
  }

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        cartItems: cartItems.map(item => ({
          ...item,
          price: extractPrice(item),
          quantity: itemQuantities[item.id || item._id] || 1
        })),
        subtotal: calculateSubtotal()
      }
    });
  }

  // Função para extrair o preço numérico de um item
  const extractPrice = (item) => {
    if (typeof item.price === "string") {
      // Se for uma string como "R$99.99"
      return Number.parseFloat(item.price.replace(/[^\d.,]/g, "").replace(",", "."))
    } else if (item.price) {
      // Se for um número direto
      return item.price
    }
    return 0
  }

  // Formata o preço para exibição
  const formatPrice = (price) => {
    return `R$ ${price.toFixed(2)}`
  }

  // Calcula o preço total de um item (preço unitário * quantidade)
  const calculateItemTotal = (item) => {
    const id = item.id || item._id
    const quantity = itemQuantities[id] || 1
    const price = extractPrice(item)
    return price * quantity
  }

  // Calcula o subtotal do carrinho
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + calculateItemTotal(item)
    }, 0)
  }

  // Determina a classe de padding com base na quantidade de itens
  const getContainerClass = () => {
    if (cartItems.length === 0) return `${styles.mainContainer} ${styles.noProducts}`
    if (cartItems.length === 2) return `${styles.mainContainer} ${styles.twoProducts}`
    if (cartItems.length === 3) return `${styles.mainContainer} ${styles.threeProducts}`
    if (cartItems.length === 4) return `${styles.mainContainer} ${styles.fourProducts}`
    if (cartItems.length <= 3) return `${styles.mainContainer} ${styles.fewProducts}`
    return styles.mainContainer
  }

  if (loading) {
    return <LoadingModal />
  }

  return (
    <div className={getContainerClass()}>
      <NavbarComponent />
      <div className={styles.carrinhoPage}>
        <div className={styles.headerContainer}>
          <h1 className={styles.title}>
            <ShoppingCart className={styles.titleIcon} size={28} />
            Seu Carrinho {cartItems.length > 0 ? `(${cartItems.length})` : ""}
          </h1>
        </div>

        {console.log("Renderizando carrinho, itens:", cartItems)}

        {!cartItems || cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <Package size={48} className={styles.emptyCartIcon} />
            <p>Seu carrinho está vazio.</p>
            <button className={styles.continueShopping} onClick={() => navigate("/produtos")}>
              Continuar Comprando
            </button>
          </div>
        ) : (
          <div className={styles.cartContent}>
            <div className={styles.cartList}>
              {cartItems.map((item, index) => {
                const id = item.id || item._id
                const quantity = itemQuantities[id] || 1
                const unitPrice = extractPrice(item)
                const itemTotal = unitPrice * quantity

                return (
                  <div key={index} className={styles.cartItem}>
                    <img
                      src={item.imageSrc || item.imagem || "/placeholder.svg"}
                      alt={item.title || item.titulo || "Produto"}
                      className={styles.cartImage}
                    />
                    <div className={styles.cartDetails}>
                      <h3 className={styles.itemTitle}>{item.title || item.titulo || "Produto"}</h3>

                      <div className={styles.priceContainer}>
                        <p className={styles.itemPrice}>
                          {formatPrice(unitPrice)} <span className={styles.unitLabel}>un.</span>
                        </p>
                        <p className={styles.itemTotalPrice}>Total: {formatPrice(itemTotal)}</p>
                      </div>

                      <div className={styles.quantityControl}>
                        <button
                          className={styles.quantityButton}
                          onClick={() => handleQuantityChange(id, quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className={styles.quantityValue}>{quantity}</span>
                        <button
                          className={styles.quantityButton}
                          onClick={() => handleQuantityChange(id, quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button className={styles.removeButton} onClick={() => handleRemoveItem(id)}>
                        Remover
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className={styles.checkoutSection}>
              <div className={styles.cartSummary}>
                <h3>Resumo do Pedido</h3>
                <div className={styles.summaryItem}>
                  <span>
                    Subtotal ({cartItems.length} {cartItems.length === 1 ? "item" : "itens"})
                  </span>
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span>Frete</span>
                  <span>Calculado no checkout</span>
                </div>
                <div className={`${styles.summaryItem} ${styles.totalItem}`}>
                  <span>Total</span>
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>
              </div>

              <button className={styles.checkoutButton} onClick={handleCheckout}>
                Finalizar Compra
              </button>

              <button className={styles.continueShoppingButton} onClick={() => navigate("/produtos")}>
                Continuar Comprando
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Carrinho
