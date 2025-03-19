import { useEffect } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import NavbarComponent from "../navbar/navbar"
import Footer from "../footer"
import styles from "./paginaInicial.module.css"
import banner1 from "./banner1.png"
import banner2 from "./banner2.png"
import banner3 from "./banner3.jpg"
import cafe1 from "./cafe01.png"
import cafe2 from "./cafe02.png"

const PaginaInicial = () => {
  useEffect(() => {
    if (window.jQuery && window.jQuery.fn.carousel) {
      window.jQuery("#carouselExample").carousel({
        interval: 5000,
      })
    }
  }, [])

  return (
    <div className={styles.paginaInicial}>
      <NavbarComponent />

      <div className={styles.carouselContainer}>
        <div id="carouselExample" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={banner1 || "/placeholder.svg"} className={styles.carouselImage} alt="Slide 1" />
              <div className={styles.carouselCaption}>
                <h5>Bem-vindo ao Café Connect</h5>
                <p>Desfrute de uma experiência única com nossos cafés.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={banner2 || "/placeholder.svg"} className={styles.carouselImage} alt="Slide 2" />
              <div className={styles.carouselCaption}>
                <h5>Eventos Especiais</h5>
                <p>Participe de nossos eventos culturais e sociais.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={banner3 || "/placeholder.svg"} className={styles.carouselImage} alt="Slide 3" />
              <div className={styles.carouselCaption}>
                <h5>Sustentabilidade</h5>
                <p>Comprometidos com práticas sustentáveis.</p>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExample" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Anterior</span>
          </a>
          <a className="carousel-control-next" href="#carouselExample" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Próximo</span>
          </a>
        </div>
      </div>

      <div className={`row ${styles.bottomContainer}`}>
        <div className={`col-12 col-md-4 ${styles.sobreDiv}`}>
          <Link to="/sobre-cafe-connect">
            <img src={cafe1 || "/placeholder.svg"} alt="Sobre Café Connect" />
          </Link>
        </div>

        <div className={`col-12 col-md-4 ${styles.loginDiv}`}>
          <Link to="/login">
            <img src={cafe2 || "/placeholder.svg"} alt="Acesse sua Conta" />
          </Link>
        </div>

        <div className={`col-12 col-md-4 ${styles.promocoesDiv}`}>
          <h3>Promoções do Dia</h3>
          <ul>
            <li>10% de desconto em todos os cafés!</li>
            <li>Compre 1, leve 2 em cafés selecionados!</li>
            <li>Frete grátis para pedidos acima de R$50!</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PaginaInicial
