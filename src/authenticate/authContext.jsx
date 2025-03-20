import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Exportando AuthContext
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
    navigate('/'); // Redireciona após login
  };

  const logout = () => {
    setUser(null);
    navigate('/login'); // Redireciona após logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook para acessar o contexto
export function useAuth() {
  return useContext(AuthContext);
}
