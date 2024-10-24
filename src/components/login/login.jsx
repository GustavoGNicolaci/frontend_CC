import React, { useState } from 'react'; // Importando useState
import { login } from '../../services/loginService';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer'; // Importando o componente Footer
import NavbarComponent from '../navbar'; // Importando o componente Navbar
import styles from './login.module.css'; // Importando o CSS Module

const Login = () => {
    const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login e registro
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const toggleForm = (e) => {
        e.preventDefault(); // Previne o comportamento padrão do link
        setIsLogin(!isLogin); // Alterna entre os formulários
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            console.log('Login bem-sucedido:', data);
            navigate('/produtos');
        } catch (error) {
            setError('Nome de usuário ou senha incorretos');
        }
    };

    return (
        <div className={styles.loginPage}> {/* Usando classes do módulo CSS */}
            <NavbarComponent />
            <div className={styles.form}>
                {isLogin ? (
                        <form className={styles.loginForm} onSubmit={handleLogin}>
                            <h2 className={styles.welcomeMessage}>Seja Bem-vindo(a)!</h2>
                            <input
                                type="text"
                        placeholder="Nome de usuário"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Senha"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit" className={styles.button} onClick={handleLogin}>login</button>
                            {error && <p className={styles.error}>{error}</p>}
                            <p className={styles.message}>
                                Não tem uma conta? <a href="#" onClick={toggleForm}>Crie uma agora</a>
                            </p>
                        </form>
                    ) : (
                            <form className={styles.registerForm}>
                                <input type="text" placeholder="E-mail" className={styles.input} />
                                <input type="text" placeholder="Nome de usuário" className={styles.input} />
                                <input type="password" placeholder="Senha" className={styles.input} />
                                <input type="text" placeholder="CPF" className={styles.input} />
                                <input type="text" placeholder="Telefone" className={styles.input} />
                                <button type="submit" className={styles.button}>criar</button>
                                <p className={styles.message}>
                                    Já tem uma conta? <a href="#" onClick={toggleForm}>Login</a>
                                </p>
                            </form>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Login;