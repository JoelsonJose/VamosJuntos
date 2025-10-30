import React from 'react';
import './StatsCard.css';

const StarIcon = '⭐'; // Ícone de estrela para o rating

// O componente recebe os dados brutos de estatísticas através da prop 'statsData'
function StatsCard({ statsData }) {
    
    // Desestrutura os dados necessários
    const { rating, reviewsCount, totalRides, motoristaRides, caronistaRides } = statsData;

    // Converte os dados brutos em uma lista estruturada para mapeamento
    const rideStatsList = [
        { label: 'Total de Caronas', value: totalRides },
        { label: 'Como Motorista', value: motoristaRides },
        { label: 'Como Caronista', value: caronistaRides },
    ];

    return (
        <div className="stats-card">
            
            {/* Título Estatísticas */}
            <h3 className="card-title">Estatísticas</h3>

            {/* Avaliação Grande */}
            <div className="main-rating">
                <p className="rating-value">{rating}</p>
                <div className="stars-row">
                    {/* Exibe o ícone de estrela repetido 5 vezes */}
                    {StarIcon.repeat(5)} 
                </div>
                <p className="reviews-count">{reviewsCount} avaliações</p>
            </div>

            {/* Divisória */}
            <hr className="divider" />

            
            <div className="ride-stats-list">
                {rideStatsList.map((stat, index) => (
                    <div key={index} className="ride-stats">
                        <p>{stat.label}</p>
                        <span className="stat-value">{stat.value}</span>
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default StatsCard;