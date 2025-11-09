import React from 'react';
import CardNotificacao from '../CardNotificacao/CardNotificacao';
import './CentralNotificacao.css';

function CentralNotificacao({ notifications, onClose }) {
  return (
    <div className="central-notificacao">
      <div className="central-notificacao-header">
        <h3 className="central-notificacao-title">Notificações</h3>
        <button className="central-notificacao-close" onClick={onClose}>
          ✕
        </button>
      </div>
      
      <div className="central-notificacao-content">
        {notifications.length === 0 ? (
          <div className="central-notificacao-empty">
            <p>Nenhuma notificação</p>
            <small>Novas notificações aparecerão aqui</small>
          </div>
        ) : (
          notifications.map((notif, index) => (
            <CardNotificacao
              key={index}
              message={notif.message}
              time={notif.time}
              type={notif.type}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CentralNotificacao;