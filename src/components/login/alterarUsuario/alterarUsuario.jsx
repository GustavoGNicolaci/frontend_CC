import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import invisivel from '../../../assets/images/invisivel.png';
import visivel from '../../../assets/images/visivel.png';
import { jwtDecode } from "jwt-decode";
import { getinfoUsuario } from '../../../services/loginService';
import RequisitoSenhaModal from '../../cadastro/requisitoSenha/requisitoSenha';
import Footer from '../../footer';
import NavbarComponent from '../../navbar/navbar';
import LoadingModal from '../../shared/loadingModal/loadingModal';
import MessageModal from '../../shared/messageModal/messageModal';
import styles from './alterarUsuario.module.css';

const AlterarUsuario = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
        const fetchUserData = async () => {
            try {
                // Recupere o token do localStorage
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token não encontrado. Redirecionando para login.');
                    navigate('/login'); // Redirecione para login se o token não existir
                    return;
                }
    
                // Decodifique o token para obter o ID do usuário
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id; // Certifique-se de que o token contém o campo `id`
    
                // Busque as informações do usuário
                const usuario = await getinfoUsuario(userId);
    
                // Atualize os estados com os dados do usuário
                setEmail(usuario.email || '');
                setPhone(usuario.telefone || '');
                setCep(usuario.endereco.cep || '');
                setRua(usuario.endereco.rua || '');
                setBairro(usuario.endereco.bairro || '');
                setCidade(usuario.endereco.cidade || '');
                setEstado(usuario.endereco.estado || '');
                setNumero(usuario.endereco.numero || '');
                setComplemento(usuario.complemento || '');
                setPassword(usuario.senha || '')
            } catch (error) {
                console.error("Erro ao buscar informações do usuário:", error);
            }
        };
    
        fetchUserData();

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
            // await atualizarUsuario(email, password, phone, confirmPassword, cep, rua, estado, cidade, bairro, numero, complemento);
            setIsModalOpen(true);
        } catch (error) {
            setErrorMessage('Erro ao atualizar informações. Por favor, tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/perfil');
    };

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
            setFieldErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors.password;
                return newErrors;
            });
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
        <div className={styles.registerPage}>
            <NavbarComponent />
            <div className={styles.form}>
                <h2 className={styles.welcomeMessage}>Alterar Informações</h2>
                <form className={styles.registerForm} onSubmit={handleSubmit}>
                    <div className={styles.informacoesPessoais}>
                        <div style={{ width: '45%' }}>
                            <input
                                type="email"
                                placeholder="E-mail"
                                className={`${styles.input} ${fieldErrors.email ? styles.errorInput : ''}`}
                                value={email}
                                onChange={handleInputChange(setEmail, 'email')}
                                required
                                aria-invalid={fieldErrors.email ? "true" : "false"}
                                style={{ width: '100%' }}
                            />
                            {fieldErrors.email && <div className={styles.error}>{fieldErrors.email}</div>}
                        </div>

                        <div style={{ width: '45%' }}>
                            <InputMask
                                mask="(99) 99999-9999"
                                value={phone}
                                onChange={handleInputChange(setPhone, 'phone')}
                            >
                                {(inputProps) => <input {...inputProps} type="text" placeholder="Telefone" className={`${styles.input} ${fieldErrors.phone ? styles.errorInput : ''}`} aria-invalid={fieldErrors.phone ? "true" : "false"} style={{ width: '100%' }} />}
                            </InputMask>
                            {fieldErrors.phone && <div className={styles.error}>{fieldErrors.phone}</div>}
                        </div>
                    </div>

                    <div className={styles.endereco}>
                        <div style={{ width: '45%' }}>
                            <InputMask
                                mask="99999-999"
                                value={cep}
                                onChange={handleCepChange}
                            >
                                {(inputProps) => <input {...inputProps} type="text" placeholder="CEP" className={`${styles.input} ${fieldErrors.cep ? styles.errorInput : ''}`} aria-invalid={fieldErrors.cep ? "true" : "false"} style={{ width: '100%' }} />}
                            </InputMask>
                            {fieldErrors.cep && <div className={styles.error}>{fieldErrors.cep}</div>}
                        </div>

                        <div style={{ width: '45%' }}>
                            <input
                                type="text"
                                placeholder="Rua"
                                className={`${styles.input} ${fieldErrors.rua ? styles.errorInput : ''}`}
                                value={rua}
                                onChange={handleInputChange(setRua, 'rua')}
                                aria-invalid={fieldErrors.rua ? "true" : "false"}
                                style={{ width: '100%' }}
                            />
                            {fieldErrors.rua && <div className={styles.error}>{fieldErrors.rua}</div>}
                        </div>

                        <div style={{ width: '45%' }}>
                            <input
                                type="text"
                                placeholder="Número"
                                className={`${styles.input} ${fieldErrors.numero ? styles.errorInput : ''}`}
                                value={numero}
                                onChange={handleInputChange(setNumero, 'numero')}
                                aria-invalid={fieldErrors.numero ? "true" : "false"}
                                style={{ width: '100%' }}
                            />
                            {fieldErrors.numero && <div className={styles.error}>{fieldErrors.numero}</div>}
                        </div>

                        <div style={{ width: '45%' }}>
                            <input
                                type="text"
                                placeholder="Complemento"
                                className={styles.input}
                                value={complemento}
                                onChange={handleInputChange(setComplemento, 'complemento')}
                                style={{ width: '100%' }}
                            />
                        </div>

                        <div style={{ width: '45%' }}>
                            <input
                                type="text"
                                placeholder="Bairro"
                                className={`${styles.input} ${fieldErrors.bairro ? styles.errorInput : ''}`}
                                value={bairro}
                                onChange={handleInputChange(setBairro, 'bairro')}
                                aria-invalid={fieldErrors.bairro ? "true" : "false"}
                                style={{ width: '100%' }}
                            />
                            {fieldErrors.bairro && <div className={styles.error}>{fieldErrors.bairro}</div>}
                        </div>

                        <div style={{ width: '45%' }}>
                            <input
                                type="text"
                                placeholder="Estado"
                                className={`${styles.input} ${fieldErrors.estado ? styles.errorInput : ''}`}
                                value={estado}
                                onChange={handleInputChange(setEstado, 'estado')}
                                aria-invalid={fieldErrors.estado ? "true" : "false"}
                                style={{ width: '100%' }}
                            />
                            {fieldErrors.estado && <div className={styles.error}>{fieldErrors.estado}</div>}
                        </div>

                        <div style={{ width: '45%' }}>
                            <input
                                type="text"
                                placeholder="Cidade"
                                className={`${styles.input} ${fieldErrors.cidade ? styles.errorInput : ''}`}
                                value={cidade}
                                onChange={handleInputChange(setCidade, 'cidade')}
                                aria-invalid={fieldErrors.cidade ? "true" : "false"}
                                style={{ width: '100%' }}
                            />
                            {fieldErrors.cidade && <div className={styles.error}>{fieldErrors.cidade}</div>}
                        </div>
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
                                style={{ width: '100%' }}
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
                        {fieldErrors.password && <div className={styles.error} style={{ width: '100%' }}>{fieldErrors.password}</div>}

                        <div className={styles.passwordWrapper}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirmar Senha"
                                className={`${styles.input} ${fieldErrors.confirmPassword ? styles.errorInput : ''}`}
                                value={confirmPassword}
                                onChange={handleInputChange(setConfirmPassword, 'confirmPassword')}
                                aria-invalid={fieldErrors.confirmPassword ? "true" : "false"}
                                style={{ width: '100%' }}
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <img src={showConfirmPassword ? invisivel : visivel} alt="Toggle Password Visibility" />
                            </button>
                        </div>
                        {fieldErrors.confirmPassword && <div className={styles.error} style={{ width: '100%' }}>{fieldErrors.confirmPassword}</div>}
                    </div>

                    <button type="submit" className={styles.button} disabled={isLoading}>
                        {isLoading ? 'Atualizando...' : 'Atualizar'}
                    </button>
                </form>
                <p className={styles.message}>
                    Deseja voltar? <a href="/perfil" className={styles.link}>Voltar ao Perfil</a>
                </p>
            </div>

            {isLoading && <LoadingModal />}

            {isModalOpen && !errorMessage && (
                <MessageModal
                    message="Informações atualizadas com sucesso"
                    onClose={closeModal}
                />
            )}

            {errorMessage && (
                <MessageModal
                    message={errorMessage}
                    onClose={() => setErrorMessage('')}
                />
            )}

            <Footer />
        </div>
    );
};

export default AlterarUsuario;