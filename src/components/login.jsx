import React, { useState } from 'react'; // Importando useState
import styles from './login.module.css'; // Importando o CSS Module

const Login = () => {
    const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login e registro

    const toggleForm = (e) => {
        e.preventDefault(); // Previne o comportamento padrão do link
        setIsLogin(!isLogin); // Alterna entre os formulários
    };

    return (
        <div className={styles.loginPage}> {/* Usando classes do módulo CSS */}
            <div className={styles.form}>
                {isLogin ? (
                    <form className={styles.loginForm}>
                        <input type="text" placeholder="Nome de usuário" className={styles.input} />
                        <input type="password" placeholder="Senha" className={styles.input} />
                        <button type="submit" className={styles.button}>login</button>
                        <p className={styles.message}>
                            Não tem uma conta? <a href="#" onClick={toggleForm}>Crie uma agora</a>
                        </p>
                    </form>
                ) : (
                    <form className={styles.registerForm}>
                        <input type="text" placeholder="Nome de usuário" className={styles.input} />
                        <input type="password" placeholder="Senha" className={styles.input} />
                        <input type="text" placeholder="E-mail" className={styles.input} />
                        <button type="submit" className={styles.button}>criar</button>
                        <p className={styles.message}>
                            Já tem uma conta? <a href="#" onClick={toggleForm}>Login</a>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;