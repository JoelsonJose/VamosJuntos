import './PopUpExcluir.css';

function ModalConfirmacao({ isOpen, onClose, onConfirm, titulo, mensagem }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>{titulo || "Você tem certeza?"}</h2>
        <p>
          {mensagem || "Esta ação não pode ser desfeita."}
        </p>
        <div className="modal-botoes">
          <button onClick={onClose} className="btn-modal-cancelar">
            Cancelar
          </button>
          <button onClick={onConfirm} className="btn-modal-confirmar-excluir">
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacao;