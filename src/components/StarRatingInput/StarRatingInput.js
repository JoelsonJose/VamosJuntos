import React, { useState } from 'react';
// import { FaStar } from 'react-icons/fa'; // Removido
import './StarRatingInput.css';

// 1. IMPORTE SUAS IMAGENS DE ESTRELA
// (Ajuste o caminho se o 'assets' não estiver em 'src/')
import StarYellow from '../../assets/Star amarela.png';
import StarWhite from '../../assets/Star branca.png';

/**
 * Componente de seleção de estrelas.
 * @param {Object} props
 * @param {number} props.rating - O estado da nota (de 0 a 5)
 * @param {function} props.setRating - A função (useState) para atualizar a nota
 */
export default function StarRatingInput({ rating, setRating }) {
  const [hover, setHover] = useState(null);

  return (
    <div className="star-rating-input-container">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        // 2. DECIDIR QUAL IMAGEM USAR
        const isFilled = ratingValue <= (hover || rating);
        const starImage = isFilled ? StarYellow : StarWhite;

        return (
          // 3. MOVEMOS OS EVENTOS DE MOUSE PARA O LABEL
          <label 
            key={index}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          >
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            {/* 4. SUBSTITUÍMOS <FaStar> POR <img> */}
            <img
              className="star-icon" // O CSS vai controlar o tamanho
              src={starImage}
              alt={isFilled ? "Estrela preenchida" : "Estrela vazia"}
            />
          </label>
        );
      })}
    </div>
  );
}