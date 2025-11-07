import React from 'react';
import StarYellow from '../../assets/Star amarela.png';
import StarWhite from '../../assets/Star branca.png';
import './StarRating.css';

export default function StarRating({ rating = 0, max = 5 }) {
  const stars = [];
  for (let i = 0; i < max; i++) {
    const src = i < rating ? StarYellow : StarWhite;
    const alt = i < rating ? 'estrela cheia' : 'estrela vazia';
    stars.push(
      <img
        key={i}
        src={src}
        alt={alt}
        className="star-img"
        draggable="false"
      />
    );
  }
  return <div className="star-rating">{stars}</div>;
}