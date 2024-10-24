import React, { useState } from 'react';
import { login } from '../../services/loginService';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer';
import NavbarComponent from '../navbar';
import styles from './login.module.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isResetPassword, setIsResetPassword] = useState(false);
    const navigate = useNavigate();

    const toggleForm = (e) => {
        e.preventDefault();
        setIsLogin(!isLogin);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            console.log('Login bem-sucedido:', data);
            navigate('/produtos');
        } catch (error) {
            setError('E-mail do usuário ou senha incorretos');
        }
    };

    const [resetEmail, setResetEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleResetPassword = (e) => {
        e.preventDefault();
        console.log('Resetar senha para:', resetEmail, newPassword);
        setIsResetPassword(false);
    };

    return (
        <div className={styles.loginPage}>
            <NavbarComponent />
            <div className={styles.form}>
                {isResetPassword ? (
                    <div className={styles.modalContent}>
                        <h2 className={styles.welcomeMessage}>Trocar Senha</h2>
                        <form onSubmit={handleResetPassword}>
                            <input
                                type="email"
                                placeholder="E-mail"
                                className={styles.input}
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Nova Senha"
                                className={styles.input}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button type="submit" className={styles.button}>Resetar Senha</button>
                        </form>
                        <p className={styles.message}>
                            Lembrou a senha? <a href="#" onClick={() => setIsResetPassword(false)}>Voltar ao Login</a>
                        </p>
                    </div>
                ) : (
                    isLogin ? (
                        <form className={styles.loginForm} onSubmit={handleLogin}>
                            <h2 className={styles.welcomeMessage}>Seja Bem-vindo(a)!</h2>
                            <input
                                type="text"
                                placeholder="E-mail do usuário"
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
                            <p className={styles.message}>
                                Esqueceu a senha? <a href="#" onClick={() => setIsResetPassword(true)}>Trocar senha</a>
                            </p>
                        </form>
                    ) : (
                        <div>
                            <h2 className={styles.welcomeMessage}>Cadastro</h2>
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
                        </div>
                    
                    )
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Login;
