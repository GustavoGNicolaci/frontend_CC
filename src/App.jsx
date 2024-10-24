import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Produtos from './components/produtos';
import DetalhesProduto from './components/detalhesProduto';
import Carrinho from './components/carrinho';
import { CartProvider } from './CartContext'; // Import the CartProvider
import UserProfile from './components/perfil/UserProfile'; 
import './styles/App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Produtos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/detalhesProduto" element={<DetalhesProduto />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/perfil" element={<UserProfile />} /> 
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
