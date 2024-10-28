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
    const [confirmPassword, setConfirmPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();

    const toggleForm = (e) => {
        e.preventDefault();
        setIsLogin(!isLogin);
    };

    const validateFields = () => {
        const errors = {};
        if (!email) errors.email = 'E-mail é obrigatório';
        if (!password) errors.password = 'Senha é obrigatória';
        if (!isLogin) {
            if (!confirmPassword) errors.confirmPassword = 'Confirmação de senha é obrigatória';
            if (password !== confirmPassword) errors.confirmPassword = 'As senhas não coincidem';
            if (!cpf) errors.cpf = 'CPF é obrigatório';
            if (!phone) errors.phone = 'Telefone é obrigatório';
        }
        return errors;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const errors = validateFields();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }
        try {
            const data = await login(email, password);
            console.log('Login bem-sucedido:', data);
            navigate('/produtos');
        } catch (error) {
            setError('Nome de usuário ou senha incorretos');
        }
    };

    return (
        <div className={styles.loginPage}>
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
                        {fieldErrors.email && <p className={styles.error}>{fieldErrors.email}</p>}
                        <input
                            type="password"
                            placeholder="Senha"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {fieldErrors.password && <p className={styles.error}>{fieldErrors.password}</p>}
                        <button type="submit" className={styles.button}>login</button>
                        {error && <p className={styles.error}>{error}</p>}
                        <p className={styles.message}>
                            Não tem uma conta? <a href="#" onClick={toggleForm}>Crie uma agora</a>
                        </p>
                    </form>
                ) : (
                    <form className={styles.registerForm} onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="E-mail"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {fieldErrors.email && <p className={styles.error}>{fieldErrors.email}</p>}
                        <input
                            type="text"
                            placeholder="Nome de usuário"
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {fieldErrors.password && <p className={styles.error}>{fieldErrors.password}</p>}
                        <input
                            type="password"
                            placeholder="Confirmar Senha"
                            className={styles.input}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {fieldErrors.confirmPassword && <p className={styles.error}>{fieldErrors.confirmPassword}</p>}
                        <input
                            type="text"
                            placeholder="CPF"
                            className={styles.input}
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                        {fieldErrors.cpf && <p className={styles.error}>{fieldErrors.cpf}</p>}
                        <input
                            type="text"
                            placeholder="Telefone"
                            className={styles.input}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {fieldErrors.phone && <p className={styles.error}>{fieldErrors.phone}</p>}
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