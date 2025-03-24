import React, { useState } from 'react';
import NavbarComponent from '../navbar/navbar';
import Footer from '../footer';
import styles from './trabalheConosco.module.css';

const servicos = [
    { id: 1, nome: 'Barista', descricao: 'Responsável por preparar e servir cafés e bebidas.' },
    { id: 2, nome: 'Atendente de Cafeteria', descricao: 'Atendimento ao cliente e organização do ambiente.' },
    { id: 3, nome: 'Gerente de Loja', descricao: 'Gerenciamento da equipe e das operações da loja.' },
    { id: 4, nome: 'Coordenador de Eventos', descricao: 'Planejamento e execução de eventos especiais.' },
];

const TrabalheConosco = () => {
    const [nomeVaga, setNomeVaga] = useState('');
    const [modoTrabalho, setModoTrabalho] = useState('Presencial');
    const [tipoVaga, setTipoVaga] = useState('Efetivo');
    const [estadoUnidade, setEstadoUnidade] = useState('');
    const [cidadeUnidade, setCidadeUnidade] = useState('');
    const [bairroUnidade, setBairroUnidade] = useState('');
    const [email, setEmail] = useState('');
    const [curriculo, setCurriculo] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para enviar os dados do formulário
        console.log({
            nomeVaga,
            modoTrabalho,
            tipoVaga,
            estadoUnidade,
            cidadeUnidade,
            bairroUnidade,
            email,
            curriculo,
        });
    };

    return (
        <div className={styles.trabalheConoscoPage}>
            <NavbarComponent />
            <div className={styles.container}>
                <div className={styles.servicosWrapper}>
                    <h1>Serviços Disponíveis</h1>
                    <ul className={styles.servicosList}>
                        {servicos.map(servico => (
                            <li key={servico.id} className={styles.servicoItem}>
                                <strong>{servico.nome}</strong>: {servico.descricao}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.formWrapper}>
                    <h2>Formulário de Candidatura</h2>
                    <form onSubmit={handleSubmit} className={styles.formContainer}>
                        <div className={styles.column}>
                            <div className={styles.formGroup}>
                                <label htmlFor="nomeVaga">Nome da Vaga:</label>
                                <input
                                    type="text"
                                    id="nomeVaga"
                                    value={nomeVaga}
                                    onChange={(e) => setNomeVaga(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="tipoVaga">Tipo de Vaga:</label>
                                <select
                                    id="tipoVaga"
                                    value={tipoVaga}
                                    onChange={(e) => setTipoVaga(e.target.value)}
                                >
                                    <option value="Efetivo">Efetivo</option>
                                    <option value="Estágio">Estágio</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="modoTrabalho">Modo de Trabalho:</label>
                                <select
                                    id="modoTrabalho"
                                    value={modoTrabalho}
                                    onChange={(e) => setModoTrabalho(e.target.value)}
                                >
                                    <option value="Presencial">Presencial</option>
                                    <option value="Remoto">Remoto</option>
                                    <option value="Híbrido">Híbrido</option>

                                </select>
                            </div>
                        </div>

                        <div className={styles.column}>
                            <div className={styles.formGroup}>
                                <label htmlFor="estadoUnidade">Estado da Unidade:</label>
                                <input
                                    type="text"
                                    id="estadoUnidade"
                                    value={estadoUnidade}
                                    onChange={(e) => setEstadoUnidade(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="cidadeUnidade">Cidade da Unidade:</label>
                                <input
                                    type="text"
                                    id="cidadeUnidade"
                                    value={cidadeUnidade}
                                    onChange={(e) => setCidadeUnidade(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="bairroUnidade">Bairro da Unidade:</label>
                                <input
                                    type="text"
                                    id="bairroUnidade"
                                    value={bairroUnidade}
                                    onChange={(e) => setBairroUnidade(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="curriculo">Anexar Currículo:</label>
                                <input
                                    type="file"
                                    id="curriculo"
                                    onChange={(e) => setCurriculo(e.target.files[0])}
                                />
                            </div>
                        </div>

                        <button type="submit" className={styles.submitButton}>Enviar Candidatura</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TrabalheConosco;