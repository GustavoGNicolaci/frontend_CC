import { useState } from 'react'
// import Vitrine from './components/Vitrine'
import Login from './components/login'
import Footer from './components/footer'
import './styles/App.css'

function App() {
  return (
    <div>
      <Login />
    <footer className="footer">
      <Footer/>
    </footer>
    </div>
  );
}

export default App;
