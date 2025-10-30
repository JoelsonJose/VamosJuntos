import React from 'react';
import './ConquistasCard.css';

// 1. O ARRAY DE CONQUISTAS FIXO FOI REMOVIDO DAQUI.

// 2. O componente agora recebe a lista de conquistas através da prop 'conquistasData'
function ConquistasCard({ conquistasData }) {

    if (!conquistasData || conquistasData.length === 0) {
        return (
            <div className="conquistas-card">
                <h3 className="card-title">Conquistas</h3>
                <p>Nenhuma conquista alcançada ainda.</p>
            </div>
        );
    }
    
    return (
        <div className="conquistas-card">
            <h3 className="card-title">Conquistas</h3>
            
            <div className="conquistas-list">
                {/* 3. Mapeamos a lista recebida na prop: conquistasData.map */}
                {conquistasData.map((conquista, index) => (
                    <div key={index} className="conquista-item">
                        {/* Assumindo que a conquista tem um ícone/emoji no campo 'icon' */}
                        <span className="conquista-icon">{conquista.icon}</span>
                        <div className="conquista-details">
                            <p className="conquista-title">{conquista.title}</p>
                            <p className="conquista-description">{conquista.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ConquistasCard;
