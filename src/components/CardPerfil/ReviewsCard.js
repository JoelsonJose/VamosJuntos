import React from 'react';
import './ReviewsCard.css';

// Componente simples para renderizar estrelas
const StarRating = ({ rating }) => {
    // Usando apenas unicode para estrelas, já que o componente não está com Tailwind
    const filledStar = '⭐'; 
    const emptyStar = '☆';
    
    // As avaliações no ProfilePage não tinham o campo stars, 
    // então usaremos 4 estrelas como padrão de exibição no resumo.
    const displayRating = rating || 4; 

    return (
        <div className="star-rating">
            {[...Array(5)].map((_, i) => (
                <span 
                    key={i} 
                    className={`star ${i < displayRating ? 'filled' : 'empty'}`}
                >
                    {i < displayRating ? filledStar : emptyStar}
                </span>
            ))}
        </div>
    );
};

// O componente agora recebe 'reviewsData' e a função 'onCardClick'
function ReviewsCard({ reviewsData, onCardClick }) { 
    
    // Pega APENAS as duas primeiras avaliações para o card de resumo
    const latestReviews = reviewsData ? reviewsData.slice(0, 2) : [];
    const totalReviews = reviewsData ? reviewsData.length : 0;
    
    if (totalReviews === 0) {
        return (
            <div className="reviews-card no-reviews">
                <h3 className="card-title">Avaliações Recebidas</h3>
                <p>Nenhuma avaliação disponível ainda.</p>
            </div>
        );
    }
    
    return (
        // O card inteiro é clicável - Usa o evento onClick passado pelo ProfilePage
        <div 
            className="reviews-card clickable"
            onClick={onCardClick} 
        >
            <h3 className="card-title">Avaliações Recebidas</h3>
            
            <div className="review-list-summary">
                {latestReviews.map((review, index) => (
                    <div key={index} className="review-item">
                        {/* Imagem do Avaliador com Fallback (use seus assets reais) */}
                        <img 
                            src={review.photo || 'https://placehold.co/50x50/f0e6ff/a100ff?text=U'} 
                            alt={`Foto de ${review.name}`} 
                            className="reviewer-photo" 
                        />
                        <div className="review-details">
                            <div className="review-meta">
                                <p className="reviewer-name">{review.name}</p>
                                <span className="review-date">{review.date}</span>
                            </div>

                            <StarRating rating={review.stars} />
                            
                            <span className={`reviewer-role`}>
                                Como {review.role}
                            </span>
                            <p className="review-text">{review.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Link para ver todos - exibe se houver mais de 2 */}
            {totalReviews > latestReviews.length && (
                <p className="view-all-link">
                    Ver todas ({totalReviews}) &rarr;
                </p>
            )}
        </div>
    );
}

export default ReviewsCard;