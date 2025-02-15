// Cadastro.jsx
import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { registro } from '../../services/loginService';
import MessageModal from '../shared/messageModal/messageModal';
import LoadingModal from '../shared/loadingModal/loadingModal';
import styles from './cadastro.module.css';
import SucessoIcon from '../../assets/images/sucesso.svg';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [fieldErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await registro(email, name, password, cpf, phone, confirmPassword);
            console.log('Registro bem-sucedido:', response);
            setIsLoading(false);
            setIsModalOpen(true); 
        } catch (error) {
            console.error('Erro ao fazer registro:', error);
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/login');

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

            {isLoading && <LoadingModal />}
            {isModalOpen && (
                <MessageModal
                    icon={<img src={SucessoIcon} alt="Sucesso" />} // Exemplo de ícone, pode ser substituído por qualquer ícone desejado
                    message="Cadastro realizado com sucesso"
                    onClose={closeModal}
                />
            )}

        </div>
    );
};

export default Cadastro;