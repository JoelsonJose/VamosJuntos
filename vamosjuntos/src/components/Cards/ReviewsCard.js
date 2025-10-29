// src/components/Cards/ReviewsCard.js

import React from 'react';
import './ReviewsCard.css';

// Dados simulados 
const reviews = [
    {
        name: 'Maria Santos',
        date: '20/09/2025',
        role: 'Motorista',
        text: 'Excelente motorista! Muito pontual e educado.',
        photo: '/assets/maria-santos.jpg' // Substitua pelo caminho da imagem
    },
    {
        name: 'Raul Cadena',
        date: '20/09/2025',
        role: 'Caronista',
        text: 'Bom caronista, sempre no horário combinado.',
        photo: '/assets/raul-cadena.jpg' // Substitua pelo caminho da imagem
    }
];

function ReviewsCard() {
    return (
        <div className="reviews-card">
            <h3 className="card-title">Avaliações Recebidas</h3>
            
            {reviews.map((review, index) => (
                <div key={index} className="review-item">
                    <img 
                        src={review.photo} 
                        alt={`Foto de ${review.name}`} 
                        className="reviewer-photo" 
                    />
                    <div className="review-details">
                        <p className="reviewer-name">{review.name}</p>
                        <span className={`reviewer-role ${review.role.toLowerCase()}`}>
                            Como {review.role}
                        </span>
                        <p className="review-text">{review.text}</p>
                    </div>
                    <span className="review-date">{review.date}</span>
                </div>
            ))}
        </div>
    );
}

export default ReviewsCard;