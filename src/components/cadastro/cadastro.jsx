// Cadastro.jsx
import React from 'react';
import styles from './cadastro.module.css';

const Cadastro = ({
    email, setEmail,
    cpf, setCpf,
    phone, setPhone,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    fieldErrors, handleRegister
}) => {
    return (
        <div>
            <h2 className={styles.welcomeMessage}>Cadastre-se</h2>
            <form className={styles.registerForm} onSubmit={handleRegister}>
                <div className="informacoes-pessoais">
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
                </div>

                <div className="confirmar-senha">
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
            </form>
        </div>
    );
};

export default Cadastro;