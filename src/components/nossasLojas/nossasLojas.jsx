import NavbarComponent from "../navbar/navbar"
import Footer from "../footer"
import MapComponent from "./map-component"
import styles from "./nossasLojas.module.css"

const lojas = [
  { id: 1, localizacao: "Rua das Flores, 123 - São Paulo, SP" },
  { id: 2, localizacao: "Avenida Paulista, 456 - São Paulo, SP" },
  { id: 3, localizacao: "Praça da Sé, 789 - São Paulo, SP" },
  { id: 4, localizacao: "Rua da Consolação, 321 - São Paulo, SP" },
]

const NossasLojas = () => {
  return (
    <div className={styles.nossasLojasPage}>
      <NavbarComponent />
      <div className={styles.cardsWrapper}>
        <h1>CONHEÇA A LOJA MAIS PERTO DA SUA CASA!</h1>
        <div className={styles.cardsContainer}>
          {lojas.map((loja) => (
            <div key={loja.id} className={styles.card}>
              <div className={styles.cardContent}>
                <h2>Localização</h2>
                <p>{loja.localizacao}</p>
              </div>
              <div className={styles.mapWrapper}>
                <MapComponent address={loja.localizacao} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default NossasLojas

