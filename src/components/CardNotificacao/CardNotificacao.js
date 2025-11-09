import React from 'react';
import './CardNotificacao.css';

function CardNotificacao({ message, time, type = "info" }) {
  return (
    <div className={`card-notificacao card-notificacao--${type}`}>
      <div className="card-notificacao-icon">
        {type === "success" && "✅"}
        {type === "warning" && "⚠️"}
        {type === "info" && "💡"}
        {type === "carona" && "🚗"}
      </div>
      <div className="card-notificacao-content">
        <p className="card-notificacao-message">{message}.</p>
        <small className="card-notificacao-time">• {time}</small>
      </div>
    </div>
  );
}

export default CardNotificacao;