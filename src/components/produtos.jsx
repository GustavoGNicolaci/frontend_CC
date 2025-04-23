/* eslint-disable react/prop-types */
"use client"

import { useContext, useEffect, useState } from "react"
import axios from "axios"
import styles from "./produtos.module.css"
import NavbarComponent from "./navbar/navbar"
import Footer from "./footer"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../CartContext"
import { Search, SlidersHorizontal, Coffee, DollarSign, Package } from "lucide-react"
import MessageModal from "./shared/messageModal/messageModal"


function CardProduto({ imageSrc, title, price, buttonText, description, stock }) {
    const navigate = useNavigate()
    const { addToCart } = useContext(CartContext)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState("") 

    const handleBuyClick = async () => {
        if (stock > 0) {
            try {
                addToCart({ title, imageSrc, price })

                await axios.put(`http://localhost:5002/product/${title}`, { quantidadeEstoque: stock - 1 })

                setModalMessage(`${title} adicionado ao carrinho!`) // Define a mensagem de sucesso
                setIsModalOpen(true)
            } catch (error) {
                console.error("Erro ao atualizar estoque:", error)
                setModalMessage("Erro ao adicionar produto ao carrinho. Tente novamente.") // Define a mensagem de erro
                setIsModalOpen(true) 
            }
        } else {
            setModalMessage("Produto esgotado!") // Define a mensagem de produto esgotado
            setIsModalOpen(true)
        }
    }

    const closeModal = () => {
        setIsModalOpen(false) // Fecha a modal
    }

    return (
        <div className={styles.productCard}>
            <img className={styles.productImage} src={imageSrc || "/placeholder.svg"} alt={title} />
            <h3 className={styles.productTitle}>{title}</h3>
            <p className={styles.productPrice}>{price}</p>
            <p className={styles.stockInfo}>Em estoque: {stock}</p>
            <button
                className={`${styles.productButton} ${stock === 0 ? styles.disabledButton : ""}`}
                onClick={handleBuyClick}
                disabled={stock === 0}
            >
                {buttonText}
            </button>
            <button
                className={styles.detailsButton}
                onClick={() => navigate("/detalhesProduto", { state: { title, imageSrc, price, description } })}
            >
                Detalhes
            </button>

            {isModalOpen && (
                <MessageModal
                    icon={<span>✔️</span>}
                    message={modalMessage}
                    onClose={closeModal}
                />
            )}

        </div>
    )
}

function Produtos() {
    const [produtos, setProdutos] = useState([])
    const [filteredProdutos, setFilteredProdutos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterOptions, setFilterOptions] = useState({
        showOnlyInStock: false,
        sortBy: "default",
    })
    const [showFilters, setShowFilters] = useState(false)

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get("http://localhost:5002/product")
                setProdutos(response.data)
                setFilteredProdutos(response.data)
            } catch (error) {
                console.error("Erro ao buscar produtos:", error)
                setError("Erro ao carregar produtos")
            } finally {
                setLoading(false)
            }
        }

        fetchProdutos()
    }, [])

    useEffect(() => {
        let result = [...produtos]

        if (searchTerm) {
            result = result.filter((produto) =>
                produto._doc.titulo.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (filterOptions.showOnlyInStock) {
            result = result.filter((produto) => produto._doc.quantidadeEstoque > 0)
        }

        if (filterOptions.sortBy === "priceAsc") {
            result.sort((a, b) => a._doc.preco - b._doc.preco)
        } else if (filterOptions.sortBy === "priceDesc") {
            result.sort((a, b) => b._doc.preco - a._doc.preco)
        }

        setFilteredProdutos(result)
    }, [produtos, searchTerm, filterOptions])

    const handleSortChange = (e) => {
        setFilterOptions({
            ...filterOptions,
            sortBy: e.target.value,
        })
    }

    const handleStockFilterChange = (e) => {
        setFilterOptions({
            ...filterOptions,
            showOnlyInStock: e.target.checked,
        })
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            const filterContainer = document.querySelector(`.${styles.filterContainer}`)
            if (showFilters && filterContainer && !filterContainer.contains(event.target)) {
                setShowFilters(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [showFilters, styles.filterContainer])

    if (loading) return <div className={styles.loadingContainer}>Carregando produtos...</div>
    if (error) return <div className={styles.errorContainer}>{error}</div>

    // Determina a classe de padding com base na quantidade de produtos
    const getContainerClass = () => {
        if (filteredProdutos.length === 0) return `${styles.mainContainer} ${styles.noProducts}`
        if (filteredProdutos.length <= 3) return `${styles.mainContainer} ${styles.fewProducts}`
        return styles.mainContainer
    }

    return (
        <div className={getContainerClass()}>
            <NavbarComponent />
            <div className={styles.produtosPage}>
                <div className={styles.filterContainer}>
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Buscar produtos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                        <Search className={styles.searchIcon} size={20} />
                    </div>

                    <button className={styles.filterToggleButton} onClick={() => setShowFilters(!showFilters)}>
                        <SlidersHorizontal size={18} />
                        Filtros
                    </button>

                    {showFilters && (
                        <div className={styles.filtersDropdown}>
                            <div className={styles.filterOption}>
                                <h4>
                                    <Package size={16} style={{ display: "inline", marginRight: "6px" }} /> Disponibilidade
                                </h4>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={filterOptions.showOnlyInStock}
                                        onChange={handleStockFilterChange}
                                    />
                                    Mostrar apenas produtos em estoque
                                </label>
                            </div>

                            <div className={styles.filterOption}>
                                <h4>
                                    <DollarSign size={16} style={{ display: "inline", marginRight: "6px" }} /> Ordenar por
                                </h4>
                                <select
                                    value={filterOptions.sortBy}
                                    onChange={handleSortChange}
                                    className={styles.sortSelect}
                                >
                                    <option value="default">Relevância</option>
                                    <option value="priceAsc">Preço: Menor para Maior</option>
                                    <option value="priceDesc">Preço: Maior para Menor</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.productList}>
                    {filteredProdutos.length > 0 ? (
                        filteredProdutos.map((produto) => (
                            <CardProduto
                                key={produto.id}
                                imageSrc={produto.imagem}
                                title={produto.titulo}
                                price={`R$${produto.preco.toFixed(2)}`}
                                buttonText="Comprar"
                                description={produto.descricao}
                                stock={produto.quantidadeEstoque}
                            />
                        ))
                    ) : (
                        <div className={styles.noProductsMessage}>
                            <Coffee size={32} style={{ marginBottom: "10px" }} />
                            <p>Nenhum produto encontrado com os filtros selecionados.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Produtos