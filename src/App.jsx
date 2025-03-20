import { Route, Routes } from 'react-router-dom';
import { CartProvider } from './CartContext';
import PrivateRoute from './authenticate/privateRoute';
import Carrinho from './components/carrinho';
import Checkout from './components/checkout';
import Contato from './components/contato/contato';
import DetalhesProduto from './components/detalhesProduto';
import Login from './components/login/login';
import NossasLojas from './components/nossasLojas/nossasLojas';
import PaginaInicial from './components/paginaInicial/paginaInicial';
import UserProfile from './components/perfil/UserProfile';
import Produtos from './components/produtos';
import SobreCafeConnect from './components/sobreCafeConnect/sobreCafeConnect';
import TrabalheConosco from './components/trabalheConosco/trabalheConosco';
import './styles/App.css';

function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/login" element={<Login />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/detalhesProduto" element={<DetalhesProduto />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/nossas-lojas" element={<NossasLojas />} />
        <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
        <Route path="/sobre-cafe-connect" element={<SobreCafeConnect />} />

        {/* Rotas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/perfil" element={<UserProfile />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
