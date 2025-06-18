"use client"

import { useContext, useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import styles from "./detalhesProduto.module.css"
import NavbarComponent from "./navbar/navbar"
import Footer from "./footer"
import { CartContext } from "../CartContext"
import MessageModal from "../components/shared/messageModal/messageModal"
import iconeSucesso from "../assets/images/sucesso.svg"
import { ShoppingCart, Package, Star, ArrowLeft, Heart, Share2 } from "lucide-react"

function DetalhesProduto() {
  const location = useLocation()
  const { title, imageSrc, price, description } = location.state || {}
  const { addToCart, stock } = useContext(CartContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.fadeInUp)
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = contentRef.current?.querySelectorAll(`.${styles.animateOnScroll}`)
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleAddToCart = async () => {
    if (stock[title] > 0) {
      setIsLoading(true)
      // Simula um delay para mostrar o loading
      setTimeout(() => {
        addToCart({ title, imageSrc, price })
        setIsModalOpen(true)
        setIsLoading(false)
      }, 800)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleGoBack = () => {
    window.history.back()
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Confira este produto: ${title}`,
        url: window.location.href,
      })
    } else {
      // Fallback para copiar URL
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado para a área de transferência!")
    }
  }

  const isOutOfStock = stock[title] <= 0
  const stockLevel = stock[title] || 0

  return (
    <div className={styles.detalhesPage}>
      <NavbarComponent />
      <div className={styles.container} ref={contentRef}>
        {/* Breadcrumb e ações */}
        <div className={`${styles.headerActions} ${styles.animateOnScroll}`}>
          <button className={styles.backButton} onClick={handleGoBack}>
            <ArrowLeft size={20} />
            Voltar aos Produtos
          </button>
          <div className={styles.actionButtons}>
            <button
              className={`${styles.favoriteButton} ${isFavorite ? styles.favorited : ""}`}
              onClick={handleToggleFavorite}
            >
              <Heart size={20} />
            </button>
            <button className={styles.shareButton} onClick={handleShare}>
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className={styles.content}>
          {/* Container da imagem */}
          <div className={`${styles.imageContainer} ${styles.animateOnScroll}`}>
            <div className={styles.imageWrapper}>
              <img
                src={imageSrc || "/placeholder.svg"}
                alt={title}
                className={`${styles.detalhesImage} ${imageLoaded ? styles.imageLoaded : ""}`}
                onLoad={() => setImageLoaded(true)}
              />
              {stockLevel <= 5 && stockLevel > 0 && <div className={styles.lowStockBadge}>Últimas unidades!</div>}
              {isOutOfStock && <div className={styles.outOfStockBadge}>Esgotado</div>}
            </div>
          </div>

          {/* Container dos detalhes */}
          <div className={`${styles.detailsContainer} ${styles.animateOnScroll}`}>
            <div className={styles.productHeader}>
              <h1 className={styles.productTitle}>{title}</h1>
              <div className={styles.productRating}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={styles.starIcon} />
                ))}
                <span className={styles.ratingText}>(4.5) • 127 avaliações</span>
              </div>
            </div>

            <div className={styles.priceSection}>
              <span className={styles.currentPrice}>{price}</span>
              <span className={styles.originalPrice}>
                R$ {(Number.parseFloat(price.replace("R$", "")) * 1.2).toFixed(2)}
              </span>
              <span className={styles.discount}>17% OFF</span>
            </div>

            <div className={styles.descriptionSection}>
              <h3>
                <Package size={20} />
                Descrição do Produto
              </h3>
              <p className={styles.productDescription}>{description}</p>
            </div>

            <div className={styles.stockSection}>
              <div className={styles.stockInfo}>
                <Package size={16} />
                <span>Em estoque: {stockLevel} unidades</span>
              </div>
              <div className={styles.stockBar}>
                <div className={styles.stockFill} style={{ width: `${Math.min((stockLevel / 20) * 100, 100)}%` }}></div>
              </div>
            </div>

            <div className={styles.featuresSection}>
              <h4>Características:</h4>
              <ul className={styles.featuresList}>
                <li>✓ Produto 100% natural</li>
                <li>✓ Origem sustentável</li>
                <li>✓ Qualidade premium</li>
                <li>✓ Entrega rápida</li>
              </ul>
            </div>

            <div className={styles.actionsSection}>
              <button
                className={`${styles.buyButton} ${isOutOfStock ? styles.outOfStock : ""} ${isLoading ? styles.loading : ""}`}
                onClick={handleAddToCart}
                disabled={isOutOfStock || isLoading}
              >
                {isLoading ? (
                  <>
                    <div className={styles.spinner}></div>
                    Adicionando...
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    {isOutOfStock ? "Produto Esgotado" : "Adicionar ao Carrinho"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {isModalOpen && (
        <MessageModal
          icon="🛒"
          message={`Item adicionado ao carrinho!`}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default DetalhesProduto
