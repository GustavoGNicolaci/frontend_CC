/* eslint-disable react/prop-types */
import React from 'react';
import styles from './OpcoesUsuarioModal.module.css';

const OpcoesUsuarioModal = ({ onClose, onAlterarConta, onSair }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.arrow}></div>
            <div className={styles.content}>
                <button className={styles.option} onClick={onAlterarConta}>Alterar Conta</button>
                <button className={styles.option} onClick={onSair}>Sair</button>
            </div>
        </div>
    );
};

export default OpcoesUsuarioModal;