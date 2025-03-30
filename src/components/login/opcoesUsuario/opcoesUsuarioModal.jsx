/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook de navegação
import styles from './OpcoesUsuarioModal.module.css';

const OpcoesUsuarioModal = ({ onClose, onSair }) => {
    const navigate = useNavigate(); // Inicializa o hook de navegação

    const handleAlterarConta = () => {
        onClose(); // Fecha a modal
        navigate('/perfil'); // Redireciona para a página de perfil
    };

    return (
        <div className={styles.modal}>
            <div className={styles.arrow}></div>
            <div className={styles.content}>
                <button className={styles.option} onClick={handleAlterarConta}>Alterar Conta</button>
                <button className={styles.option} onClick={onSair}>Sair</button>
            </div>
        </div>
    );
};

export default OpcoesUsuarioModal;