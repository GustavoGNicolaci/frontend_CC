import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css';

function NavbarComponent() {
  return (
    <Navbar expand="lg" className="nav-color fixed-top">
      <Container>
        <Navbar.Brand href="/" className="title-font">Café Connect</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="nav-font">Página Inicial</Nav.Link>
            <Nav.Link href="/produtos" className="nav-font">Produtos</Nav.Link>
            <NavDropdown className="btn-veja" title="Veja Mais" id="basic-nav-dropdown">
              <NavDropdown.Item href="/contato" className="nav-font">Contato</NavDropdown.Item>
              <NavDropdown.Item href="/nossas-lojas" className="nav-font">Nossas lojas</NavDropdown.Item>
              <NavDropdown.Item href="/trabalhe-conosco" className="nav-font">Trabalhe conosco</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/sobre-cafe-connect" className="nav-font">Sobre Café Connect</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <div className="mx-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Pesquisar"
                className="me-2"
                aria-label="Search"
              />
              <Button className="btn-pesquisa">Pesquisar</Button>
            </Form>
          </div>

          <div className="d-flex align-items-center">
            <Nav.Link href="/carrinho" className="nav-icon">
              <FaShoppingCart size={24} />
            </Nav.Link>
            <Nav.Link href="/login" className="nav-icon">
              <FaUser size={24} />
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;