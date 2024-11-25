import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaInicial from './components/paginaInicial/paginaInicial';
import Login from './components/login/login';
import Produtos from './components/produtos';
import DetalhesProduto from './components/detalhesProduto';
import Carrinho from './components/carrinho';
import Checkout from './components/checkout';
import { CartProvider } from './CartContext';
import UserProfile from './components/perfil/UserProfile'; 
import Contato from './components/contato/contato';
import NossasLojas from './components/nossasLojas/nossasLojas';
import TrabalheConosco from './components/trabalheConosco/trabalheConosco';
import SobreCafeConnect from './components/sobreCafeConnect/sobreCafeConnect';
import './styles/App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PaginaInicial />} />
          <Route path="/login" element={<Login />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/detalhesProduto" element={<DetalhesProduto />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/perfil" element={<UserProfile />} /> 
          <Route path="/contato" element={<Contato />} />
          <Route path="/nossas-lojas" element={<NossasLojas />} /> 
          <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
          <Route path="/sobre-cafe-connect" element={<SobreCafeConnect />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;