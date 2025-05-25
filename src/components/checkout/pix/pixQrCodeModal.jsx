import React, { useState } from "react";
import styles from "./PixQrCodeModal.module.css";

const PixQrCodeModal = ({ show, onClose, qrCodeImage, qrCodeText }) => {
  const [showCopyPaste, setShowCopyPaste] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!show) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h2>Pagamento via Pix</h2>
        <img src={qrCodeImage} alt="QR Code Pix" className={styles.qrCodeImage} />
        <button
          className={styles.copyPasteButton}
          onClick={() => setShowCopyPaste(true)}
          disabled={showCopyPaste}
        >
          Copia e Cola
        </button>
        {showCopyPaste && (
          <div className={styles.copyPasteSection}>
            <textarea
              className={styles.qrCodeText}
              value={qrCodeText}
              readOnly
              rows={3}
            />
            <button
              className={styles.copyButton}
              onClick={() => {
                navigator.clipboard.writeText(qrCodeText);
                setCopied(true);
              }}
              disabled={copied}
            >
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PixQrCodeModal;