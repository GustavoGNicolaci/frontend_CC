import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './navbar.module.css';

function NavbarComponent() {
  return (
    <Navbar expand="lg" className={`${styles.navbar} ${styles.navColor} fixed-top`}>
      <Container>
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
            <Nav.Link href="/login" className={styles.navIcon}>
              <FaUser size={24} />
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
