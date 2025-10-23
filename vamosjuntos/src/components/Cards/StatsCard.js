// src/components/Cards/StatsCard.js

import React from 'react';
import './StatsCard.css';

const StarIcon = '⭐'; // Ícone de estrela para o rating

function StatsCard({ statsData }) {
    // statsData é o mesmo objeto userData que vem da ProfilePage
    const { rating, reviewsCount, totalRides, motoristaRides, caronistaRides } = statsData;

    return (
        <div className="stats-card">
            
            {/* Título Estatísticas */}
            <h3 className="card-title">Estatísticas</h3>

            {/* Avaliação Grande */}
            <div className="main-rating">
                <p className="rating-value">{rating}</p>
                <div className="stars-row">
                    {StarIcon.repeat(5)} 
                </div>
                <p className="reviews-count">{reviewsCount} avaliações</p>
            </div>

            {/* Divisória */}
            <hr className="divider" />

            {/* Detalhes das Caronas */}
            <div className="ride-stats">
                <p>Total de Caronas</p>
                <span className="stat-value">{totalRides}</span>
            </div>
            <div className="ride-stats">
                <p>Como Motorista</p>
                <span className="stat-value">{motoristaRides}</span>
            </div>
            <div className="ride-stats">
                <p>Como Caronista</p>
                <span className="stat-value">{caronistaRides}</span>
            </div>
        </div>
    );
}

export default StatsCard;