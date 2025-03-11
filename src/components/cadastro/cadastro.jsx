/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import invisivel from '../../assets/images/invisivel.png';
import visivel from '../../assets/images/visivel.png';
import { registro } from '../../services/loginService';
import RequisitoSenhaModal from '../cadastro/requisitoSenha/requisitoSenha';
import LoadingModal from '../shared/loadingModal/loadingModal';
import MessageModal from '../shared/messageModal/messageModal';
import styles from './cadastro.module.css';

const Cadastro = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let timeoutId;
        if (cep.length === 9) {
            timeoutId = setTimeout(async () => {
                try {
                    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                    const data = response.data;
                    setRua(data.logradouro);
                    setBairro(data.bairro);
                    setCidade(data.localidade);
                    setEstado(data.uf);
                    setFieldErrors((prevErrors) => {
                        const newErrors = { ...prevErrors };
                        delete newErrors.rua;
                        delete newErrors.bairro;
                        delete newErrors.cidade;
                        delete newErrors.estado;
                        return newErrors;
                    });
                } catch (error) {
                    console.error('Erro ao buscar endereço:', error);
                }
            }, 500);
        }
        return () => clearTimeout(timeoutId);
    }, [cep]);

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[$*&@#])(?!.*(.)\1).{5,}$/;
        return regex.test(password);
    };

    const validateFields = () => {
        const errors = {};
        if (!name) errors.name = true;
        if (!cpf) errors.cpf = true;
        if (!email) errors.email = true;
        if (!phone) errors.phone = true;
        if (!cep) errors.cep = true;
        if (!rua) errors.rua = true;
        if (!numero) errors.numero = true;
        if (!bairro) errors.bairro = true;
        if (!estado) errors.estado = true;
        if (!cidade) errors.cidade = true;
        if (!password || !validatePassword(password)) errors.password = true;
        if (!confirmPassword || confirmPassword !== password) errors.confirmPassword = true;
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;
        setIsLoading(true);
        setErrorMessage('');
        try {
            await registro(email, name, password, cpf, phone, confirmPassword, cep, rua, estado, cidade, bairro, numero, complemento);
            setIsModalOpen(true);
        } catch (error) {
            setErrorMessage('Erro ao fazer registro. Por favor, tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/login');
    };

    const toggleForm = () => {};

    const handleCepChange = (e) => {
        setCep(e.target.value);
        setFieldErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors.cep;
            return newErrors;
        });
    };

    const handleInputChange = (setter, field) => (e) => {
        setter(e.target.value);
        setFieldErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[field];
            return newErrors;
        });
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (validatePassword(value)) {
            setPasswordStrength('Senha forte');
        } else {
            setPasswordStrength('A senha deve ter pelo menos 6 caracteres, incluindo letras e números');
        }
    };

    const passwordRequirements = [
        { text: 'Pelo menos 6 caracteres', isValid: password.length >= 6 },
        { text: 'Pelo menos 1 número', isValid: /\d/.test(password) },
        { text: 'Pelo menos 1 letra', isValid: /[a-zA-Z]/.test(password) },
    ];

    return (
        <div className={styles.container}>
            <h2 className={styles.welcomeMessage}>Cadastre-se</h2>
            <form className={styles.registerForm} onSubmit={handleSubmit}>
                <div className={styles.informacoesPessoais}>
                    <input
                        type="text"
                        placeholder="Nome"
                        className={`${styles.input} ${fieldErrors.name ? styles.errorInput : ''}`}
                        value={name}
                        onChange={handleInputChange(setName, 'name')}
                        aria-invalid={fieldErrors.name ? "true" : "false"}
                    />
                    <InputMask
                        mask="999.999.999-99"
                        value={cpf}
                        onChange={handleInputChange(setCpf, 'cpf')}
                    >
                        {(inputProps) => <input {...inputProps} type="text" placeholder="CPF" className={`${styles.input} ${fieldErrors.cpf ? styles.errorInput : ''}`} aria-invalid={fieldErrors.cpf ? "true" : "false"} />}
                    </InputMask>
                    <input
                        type="email"
                        placeholder="E-mail"
                        className={`${styles.input} ${fieldErrors.email ? styles.errorInput : ''}`}
                        value={email}
                        onChange={handleInputChange(setEmail, 'email')}
                        required
                        aria-invalid={fieldErrors.email ? "true" : "false"}
                    />
                    <InputMask
                        mask="(99) 99999-9999"
                        value={phone}
                        onChange={handleInputChange(setPhone, 'phone')}
                    >
                        {(inputProps) => <input {...inputProps} type="text" placeholder="Telefone" className={`${styles.input} ${fieldErrors.phone ? styles.errorInput : ''}`} aria-invalid={fieldErrors.phone ? "true" : "false"} />}
                    </InputMask>
                </div>

                <div className={styles.endereco}>
                    <InputMask
                        mask="99999-999"
                        value={cep}
                        onChange={handleCepChange}
                    >
                        {(inputProps) => <input {...inputProps} type="text" placeholder="CEP" className={`${styles.input} ${fieldErrors.cep ? styles.errorInput : ''}`} aria-invalid={fieldErrors.cep ? "true" : "false"} />}
                    </InputMask>
                    <input
                        type="text"
                        placeholder="Rua"
                        className={`${styles.input} ${fieldErrors.rua ? styles.errorInput : ''}`}
                        value={rua}
                        onChange={handleInputChange(setRua, 'rua')}
                        aria-invalid={fieldErrors.rua ? "true" : "false"}
                    />
                    <input
                        type="text"
                        placeholder="Número"
                        className={`${styles.input} ${fieldErrors.numero ? styles.errorInput : ''}`}
                        value={numero}
                        onChange={handleInputChange(setNumero, 'numero')}
                        aria-invalid={fieldErrors.numero ? "true" : "false"}
                    />
                    <input
                        type="text"
                        placeholder="Complemento"
                        className={styles.input}
                        value={complemento}
                        onChange={handleInputChange(setComplemento, 'complemento')}
                    />
                    <input
                        type="text"
                        placeholder="Bairro"
                        className={`${styles.input} ${fieldErrors.bairro ? styles.errorInput : ''}`}
                        value={bairro}
                        onChange={handleInputChange(setBairro, 'bairro')}
                        aria-invalid={fieldErrors.bairro ? "true" : "false"}
                    />
                    <input
                        type="text"
                        placeholder="Estado"
                        className={`${styles.input} ${fieldErrors.estado ? styles.errorInput : ''}`}
                        value={estado}
                        onChange={handleInputChange(setEstado, 'estado')}
                        aria-invalid={fieldErrors.estado ? "true" : "false"}
                    />
                    <input
                        type="text"
                        placeholder="Cidade"
                        className={`${styles.input} ${fieldErrors.cidade ? styles.errorInput : ''}`}
                        value={cidade}
                        onChange={handleInputChange(setCidade, 'cidade')}
                        aria-invalid={fieldErrors.cidade ? "true" : "false"}
                    />
                </div>

                <div className={styles.confirmarSenha}>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Senha"
                            className={`${styles.input} ${fieldErrors.password ? styles.errorInput : ''}`}
                            value={password}
                            onFocus={() => setShowPasswordRequirements(true)}
                            onBlur={() => setShowPasswordRequirements(false)}
                            onChange={handlePasswordChange}
                            aria-invalid={fieldErrors.password ? "true" : "false"}
                        />
                        <button
                            type="button"
                            className={styles.togglePassword}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <img src={showPassword ? invisivel : visivel} alt="Toggle Password Visibility" />
                        </button>
                    </div>
                    <RequisitoSenhaModal isVisible={showPasswordRequirements} requirements={passwordRequirements} />
                    <div className={styles.passwordWrapper}>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirmar Senha"
                            className={`${styles.input} ${fieldErrors.confirmPassword ? styles.errorInput : ''}`}
                            value={confirmPassword}
                            onChange={handleInputChange(setConfirmPassword, 'confirmPassword')}
                            aria-invalid={fieldErrors.confirmPassword ? "true" : "false"}
                        />
                        <button
                            type="button"
                            className={styles.togglePassword}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <img src={showConfirmPassword ? invisivel : visivel} alt="Toggle Password Visibility" />
                        </button>
                    </div>
                </div>

                <button type="submit" className={styles.button} disabled={isLoading}>
                    {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>
            <p className={styles.message}>
                Já tem uma conta? <a href="/login" className={styles.link} onClick={toggleForm}>Login</a>
            </p>

            {isLoading && <LoadingModal />}

            {isModalOpen && !errorMessage && (
                <MessageModal
                    message="Cadastro realizado com sucesso"
                    onClose={closeModal}
                />
            )}

            {errorMessage && (
                <MessageModal
                    message={errorMessage}
                    onClose={() => setErrorMessage('')}
                />
            )}
        </div>
    );
};

export default Cadastro;