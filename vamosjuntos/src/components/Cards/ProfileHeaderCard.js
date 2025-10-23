// src/components/Cards/ProfileHeaderCard.js

import React from 'react';
import './ProfileHeaderCard.css';

// Caminho correto da imagem na pasta src/assets
import FotodoPerfil from '../../assets/foto_perfil.png';

// Ícones (mantendo o seu estilo simples)
const StarIcon = '⭐';
const LocationIcon = '📍';
const TechIcon = '💻';

function ProfileHeaderCard({ userData }) {
  // Desestruturação dos dados do usuário
  const {
    name,
    occupation,
    location,
    email,
    phone,
    bio,
    rating,
    reviewsCount,
  } = userData;

  return (
    <div className="profile-header-card">
      {/* --- CABEÇALHO --- */}
      <div className="header-content">
        {/* FOTO DE PERFIL */}
        <div className="profile-image-container">
          <img
            src={FotodoPerfil}
            alt={`Foto de ${name}`}
            className="profile-image"
          />
        </div>

        {/* INFORMAÇÕES DO USUÁRIO */}
        <div className="user-details">
          <h2 className="user-name">{name}</h2>

          {/* AVALIAÇÃO */}
          <div className="rating">
            {StarIcon.repeat(Math.floor(rating))}
            <span className="rating-value">{rating}</span>
            <span className="reviews-count">({reviewsCount})</span>
          </div>

          {/* TAGS */}
          <div className="tag-line">
            <span className="tag">{TechIcon} {occupation}</span>
            <span className="tag">{LocationIcon} {location}</span>
          </div>
        </div>

        {/* BOTÃO DE ACESSIBILIDADE */}
        <div className="accessibility-container">
          <button className="accessibility-button">Acessibilidade</button>
        </div>
      </div>

      {/* SEÇÃO SOBRE */}
      <div className="section about-section">
        <h3>Sobre</h3>
        <p>{bio}</p>
      </div>

      {/* SEÇÃO CONTATO */}
      <div className="section contact-section">
        <h3>Contato</h3>
        <div className="contact-details">
          <p>Email: <span>{email}</span></p>
          <p>Número: <span>{phone}</span></p>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeaderCard;
