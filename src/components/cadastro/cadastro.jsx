// Cadastro.jsx
import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { registro } from '../../services/loginService'; // Importe o serviço de registro
import styles from './cadastro.module.css';

const Cadastro = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [fieldErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registro(email, name, password, cpf, phone, confirmPassword);
            console.log('Registro bem-sucedido:', response);
            setIsModalOpen(true); // Abre a modal
        } catch (error) {
            console.error('Erro ao fazer registro:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleForm = () => {};

    return (
        <div>
            <h2 className={styles.welcomeMessage}>Cadastre-se</h2>
            <form className={styles.registerForm} onSubmit={handleSubmit}>
                <div className={styles.informacoesPessoais}>
                    <input
                        type="email"
                        placeholder="E-mail"
                        className={`${styles.input} ${fieldErrors.email ? styles.errorInput : ''}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {fieldErrors.email && <p className={styles.error}>{fieldErrors.email}</p>}
                    
                    <input
                        type="text"
                        placeholder="Nome"
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {fieldErrors.name && <p className={styles.error}>{fieldErrors.name}</p>}

                    <InputMask
                        mask="999.999.999-99"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    >
                        {(inputProps) => <input {...inputProps} type="text" placeholder="CPF" className={styles.input} />}
                    </InputMask>
                    {fieldErrors.cpf && <p className={styles.error}>{fieldErrors.cpf}</p>}
                            
                    <InputMask
                        mask="(99) 99999-9999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    >
                        {(inputProps) => <input {...inputProps} type="text" placeholder="Telefone" className={styles.input} />}
                    </InputMask>
                    {fieldErrors.phone && <p className={styles.error}>{fieldErrors.phone}</p>}
                </div>

                <div className={styles.confirmarSenha}>
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
                </div>

                <button type="submit" className={styles.button}>Cadastrar</button>
                <p className={styles.message}>
                    Já tem uma conta? <a href="/login" className={styles.link} onClick={toggleForm}>Login</a>
                </p>
            </form>

            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={closeModal}>&times;</span>
                        <p>Usuário criado com sucesso!</p>
                        <button className={styles.button} href="/login" onClick={toggleForm}>Login</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cadastro;