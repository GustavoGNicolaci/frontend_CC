import React, { useState } from 'react';
import NavbarComponent from '../navbar/navbar';
import Footer from '../footer';
import styles from './contato.module.css';

const Contato = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('pedido não entregue');
    const [solicitacao, setSolicitacao] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ nome, email, titulo, categoria, solicitacao });
    };

    return (
        <div className={styles.contatoPage}>
            <NavbarComponent />
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <h1>Contato</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="nome">Nome do Solicitante:</label>
                            <input
                                type="text"
                                id="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email do Solicitante:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="titulo">Título da Solicitação:</label>
                            <input
                                type="text"
                                id="titulo"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="categoria">Categoria:</label>
                            <select
                                id="categoria"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                            >
                                <option value="pedido não entregue">Pedido não entregue</option>
                                <option value="cancelamento">Cancelamento</option>
                                <option value="problema na compra">Problema na compra</option>
                                <option value="outros">Outros</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="solicitacao">Escreva sua solicitação:</label>
                            <textarea
                                id="solicitacao"
                                value={solicitacao}
                                onChange={(e) => setSolicitacao(e.target.value)}
                                rows="5"
                                required
                            />
                        </div>
                        <button type="submit" className={styles.submitButton}>Enviar</button>
                    </form>
                </div>

                <div className={styles.infoContainer}>
                    <h2>Informações de Contato</h2>
                    <p><strong>Email:</strong> contato@cafeconnect.com</p>
                    <p><strong>Telefone:</strong> (11) 1234-5678</p>
                    <p><strong>Endereço:</strong> Rua Exemplo, 123 - São Paulo, SP</p>
                    <p><strong>CEP:</strong> 00000-0900</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contato;