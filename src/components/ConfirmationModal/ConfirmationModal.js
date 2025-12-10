import React from 'react';
import './ConfirmationModal.css'; 

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, isAlertOnly = false }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        
        <div className="modal-header">
          {title && <h3>{title}</h3>}
        </div>

        <div className="modal-body">
          <p>{message}</p>
        </div>

        <div className="modal-footer">
          
          {/* SE FOR APENAS ALERTA */}
          {isAlertOnly ? (
            <button 
              className="btn-modal btn-primary" 
              /* CORREÇÃO AQUI: Se tiver uma ação (navegar), executa ela. 
                 Se não tiver, apenas fecha. */
              onClick={onConfirm ? onConfirm : onClose}
            >
              OK
            </button>
          ) : (
            /* SE FOR PERGUNTA (CONFIRMAR/CANCELAR) */
            <>
              <button className="btn-modal btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button className="btn-modal btn-primary" onClick={onConfirm}>
                Confirmar
              </button>
            </>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;