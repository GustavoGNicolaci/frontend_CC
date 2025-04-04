"use client"

import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import { FaShoppingCart, FaUser, FaCoffee, FaMapMarkerAlt, FaBriefcase, FaInfoCircle } from "react-icons/fa"
import { useAuth } from "../../authenticate/authContext"
import OpcoesUsuarioModal from "../login/opcoesUsuario/opcoesUsuarioModal"
import styles from "./navbar.module.css"

function NavbarComponent() {
  const [showModal, setShowModal] = useState(false)
  const { token, logout } = useAuth()

  const handleToggleModal = () => {
    setShowModal((prev) => !prev)
  }

  return (
    <Navbar expand="lg" className={`${styles.navbar} ${styles.navColor} fixed-top`}>
      <Navbar.Brand href="/" className={styles.titleFont}>
        Café Connect
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/" className={styles.navFont}>
            Página Inicial
          </Nav.Link>
          <Nav.Link href="/produtos" className={styles.navFont}>
            Produtos
          </Nav.Link>
          <div className={styles.navDropdownContainer}>
            <NavDropdown className={`${styles.btnVeja} text-center`} title="Veja Mais" id="basic-nav-dropdown" style={{ minWidth: "200px" }}>
              <NavDropdown.Item href="/contato" className={`${styles.navFont} ${styles.navDropdownItem}`}>
                <FaCoffee className={styles.dropdownIcon} /> Contato
              </NavDropdown.Item>
              <NavDropdown.Item href="/nossas-lojas" className={`${styles.navFont} ${styles.navDropdownItem}`}>
                <FaMapMarkerAlt className={styles.dropdownIcon} /> Nossas lojas
              </NavDropdown.Item>
              <NavDropdown.Item href="/trabalhe-conosco" className={`${styles.navFont} ${styles.navDropdownItem}`}>
                <FaBriefcase className={styles.dropdownIcon} /> Trabalhe conosco
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/sobre-cafe-connect" className={`${styles.navFont} ${styles.navDropdownItem}`}>
                <FaInfoCircle className={styles.dropdownIcon} /> Sobre Café Connect
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Nav>

        <div className={styles.iconContainer}>
          <Nav.Link href="/carrinho" className={styles.navIcon}>
            <FaShoppingCart size={24} />
          </Nav.Link>

          {token ? (
            <div className={styles.userContainer} onClick={handleToggleModal} style={{ cursor: 'pointer' }}>
              <div className={styles.navIcon}>
                <FaUser size={24} />
              </div>
              {showModal && (
                <OpcoesUsuarioModal
                  onClose={() => setShowModal(false)}
                  onAlterarConta={() => console.log("Alterar Conta")}
                  onSair={logout}
                />
              )}
            </div>
          ) : (
            <Nav.Link href="/login" className={styles.navIcon}>
              <FaUser size={24} />
            </Nav.Link>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarComponent

