import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useAuth } from '../../authenticate/authContext'; // Importa o contexto de autenticação
import OpcoesUsuarioModal from '../login/opcoesUsuario/opcoesUsuarioModal';
import styles from './navbar.module.css';


function NavbarComponent() {
  const [showModal, setShowModal] = useState(false);
  const { token, logout } = useAuth(); // Obtém o estado do usuário e a função de logout

  const handleMouseEnter = () => {
    setShowModal(true);
  };

  const handleMouseLeave = () => {
    setShowModal(false);
  };

  return (
    <Navbar expand="lg" className={`${styles.navbar} ${styles.navColor} fixed-top`}>
      <Navbar.Brand href="/" className={styles.titleFont}>Café Connect</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/" className={styles.navFont}>Página Inicial</Nav.Link>
          <Nav.Link href="/produtos" className={styles.navFont}>Produtos</Nav.Link>
          <NavDropdown className="btnVeja" title="Veja Mais" id="basic-nav-dropdown">
            <NavDropdown.Item href="/contato" className={styles.navFont}>Contato</NavDropdown.Item>
            <NavDropdown.Item href="/nossas-lojas" className={styles.navFont}>Nossas lojas</NavDropdown.Item>
            <NavDropdown.Item href="/trabalhe-conosco" className={styles.navFont}>Trabalhe conosco</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/sobre-cafe-connect" className={styles.navFont}>Sobre Café Connect</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <div className={styles.mxAuto}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Pesquisar"
              className="me-2 formControl"
              aria-label="Search"
            />
            <Button className={styles.btnPesquisa}>Pesquisar</Button>
          </Form>
        </div>

        <div className="d-flex align-items-center">
          <Nav.Link href="/carrinho" className={styles.navIcon}>
            <FaShoppingCart size={24} />
          </Nav.Link>

          {token ? (
            <div
              className={styles.userContainer}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className={styles.navIcon}>
                <FaUser size={24} />
              </div>
              {showModal && (
                <OpcoesUsuarioModal
                  onClose={() => setShowModal(false)}
                  onAlterarConta={() => console.log('Alterar Conta')}
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
  );
}

export default NavbarComponent;
