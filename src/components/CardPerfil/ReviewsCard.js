import './ReviewsCard.css';

// O componente agora recebe a lista de avaliações através da prop 'reviewsData'
function ReviewsCard({ reviewsData }) { 
    // Se reviewsData não for fornecido ou for vazio, podemos retornar nulo ou uma mensagem.
    if (!reviewsData || reviewsData.length === 0) {
        return (
            <div className="reviews-card">
                <h3 className="card-title">Avaliações Recebidas</h3>
                <p>Nenhuma avaliação disponível ainda.</p>
            </div>
        );
    }
    
    return (
        <div className="reviews-card">
            <h3 className="card-title">Avaliações Recebidas</h3>
            
            {/* Mapeamos a lista recebida na prop: reviewsData.map */}
            {reviewsData.map((review, index) => (
                <div key={index} className="review-item">
                    <img 
                        // Corrigindo para usar um placeholder de ícone se a foto não existir, já que a URL é fixa
                        src={review.photo || 'https://placehold.co/50x50/f0e6ff/a100ff?text=Foto'} 
                        alt={`Foto de ${review.name}`} 
                        className="reviewer-photo" 
                    />
                    <div className="review-details">
                        <p className="reviewer-name">{review.name}</p>
                        {/* Garante que o role seja exibido corretamente */}
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
