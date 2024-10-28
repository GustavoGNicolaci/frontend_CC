import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer';
import NavbarComponent from '../navbar';
import styles from './userProfile.module.css';

const UserProfile = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [cep, setCep] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        // Implementar lógica para atualizar as informações do usuário
        try {
            // Supondo que você tenha um serviço para atualizar as informações do usuário
            // await updateUser({ email, username, password, cpf, phone, street, number, complement, cep });
            console.log('Informações atualizadas com sucesso');
            navigate('/produtos');
        } catch (error) {
            setError('Erro ao atualizar informações');
        }
    };

    return (
        <div className={styles.userProfilePage}>
            <NavbarComponent />
            <div className={styles.form}>
                <form className={styles.userProfileForm} onSubmit={handleUpdate}>
                    <h2 className={styles.title}>Atualizar Informações</h2>
                    
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Informações Pessoais</h3>
                        <input
                            type="text"
                            placeholder="E-mail"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Nome de usuário"
                            className={styles.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="CPF"
                            className={styles.input}
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Telefone"
                            className={styles.input}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Endereço</h3>

                        <input
                            type="text"
                            placeholder="CEP"
                            className={styles.input}
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Rua"
                            className={styles.input}
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Número"
                            className={styles.input}
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Complemento"
                            className={styles.input}
                            value={complement}
                            onChange={(e) => setComplement(e.target.value)}
                        />
                    </div>
                    
                    <button type="submit" className={styles.button}>Atualizar</button>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile;