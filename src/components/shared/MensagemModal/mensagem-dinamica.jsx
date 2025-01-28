// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from './mensagem-dinamica.css';

// eslint-disable-next-line react/prop-types
const MensagemDinamica = ({ imageSrc, message, onClose }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <img src={imageSrc} alt="Status" className={styles.image} />
                <p>{message}</p>
            </div>
        </div>
    );
};

export default MensagemDinamica;