import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Produtos from './components/produtos';
import DetalhesProduto from './components/detalhesProduto';
import Carrinho from './components/carrinho';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Produtos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/detalhesProduto" element={<DetalhesProduto />} />
        <Route path="/carrinho" element={<Carrinho />} />
      </Routes>
    </Router>
  );
}

export default App;