// src/components/Cards/ConquistasCard.js

import React from 'react';
import './ConquistasCard.css';

const conquistas = [
    {
        icon: '⭐', // Ícone de estrela para Motorista 5 Estrelas
        title: 'Motorista 5 estrelas',
        description: 'Mantém nota alta como motorista',
    },
    {
        icon: '🛡️', // Ícone de escudo/moeda para Veterano
        title: 'Veterano',
        description: 'Mais de 40 caronas realizadas',
    },
];

function ConquistasCard() {
    return (
        <div className="conquistas-card">
            <h3 className="card-title">Conquistas</h3>

            {conquistas.map((item, index) => (
                <div key={index} className="conquista-item">
                    <span className="conquista-icon">{item.icon}</span>
                    <div className="conquista-details">
                        <p className="conquista-title">{item.title}</p>
                        <p className="conquista-description">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ConquistasCard;