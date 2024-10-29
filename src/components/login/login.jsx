import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/loginService';
import Cadastro from '../cadastro/cadastro';
import Footer from '../footer';
import NavbarComponent from '../navbar';
import styles from './login.module.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const validateFields = () => {
        const errors = {};
        if (isRegistering) {
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

    const handleRegister = async (e) => {
        e.preventDefault();
        const errors = validateFields();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }
        try {
            const data = await login.registro(email, password, cpf, phone);
            console.log('Cadastro bem-sucedido:', data);
            navigate('/produtos');
        } catch (error) {
            setError('Erro no cadastro');
        }
    };

    const toggleForm = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <div className={styles.loginPage}>
            <NavbarComponent />
            <div className={styles.form}>
                {isRegistering ? (
                    <Cadastro
                        email={email}
                        setEmail={setEmail}
                        cpf={cpf}
                        setCpf={setCpf}
                        phone={phone}
                        setPhone={setPhone}
                        password={password}
                        setPassword={setPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        fieldErrors={fieldErrors}
                        handleRegister={handleRegister}
                    />
                ) : (
                    <div>
                        <h2 className={styles.welcomeMessage}>Seja Bem-vindo(a)!</h2>
                        <form className={styles.loginForm} onSubmit={handleLogin}>
                            <input
                                type="email"
                                placeholder="E-mail"
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
                            <button type="submit" className={styles.button}>Login</button>
                            {error && <p className={styles.error}>{error}</p>}
                            <p className={styles.message}>
                                Não tem uma conta? <a href="#" onClick={toggleForm}>Crie uma agora</a>
                            </p>
                        </form>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Login;