/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OpcoesUsuarioModal.module.css';

const OpcoesUsuarioModal = ({ onClose, onSair }) => {
    const navigate = useNavigate();

    const handleAlterarConta = () => {
        onClose();
        navigate('/perfil');
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