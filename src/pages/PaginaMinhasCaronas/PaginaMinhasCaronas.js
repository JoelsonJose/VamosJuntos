import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './PaginaMinhasCaronas.css'; 
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../Config';

// --- ÍCONES ---
import IconRelogio from '../../assets/IconsCriar/IconRelogio.png';
import StarYellow from '../../assets/Star amarela.png';
import StarWhite from '../../assets/Star branca.png';
import IconCadeado from '../../assets/IconsCriar/IconCadeado.png'; 
import FotoUsuario1 from '../../assets/Fotos/usuario1.png'; 
import FotoUsuario2 from '../../assets/Fotos/usuario2.png'; 
import FotoUsuario3 from '../../assets/Fotos/usuario3.png'; 
import FotoUsuario4 from '../../assets/Fotos/usuario4.png'; 
import FotoUsuario5 from '../../assets/Fotos/usuario5.png'; 

// --- MAPA DE FOTOS ---
// Como o JSON não salva a imagem importada, salvamos um ID ("usuario1") e mapeamos aqui
const mapaDeFotos = {
  "usuario1": FotoUsuario1,
  "usuario2": FotoUsuario2,
  "usuario3": FotoUsuario3,
  "usuario4": FotoUsuario4,
  "usuario5": FotoUsuario5
};

// --- COMPONENTE DE ESTRELAS ---
function StarRating({ rating = 0, locked = false, max = 5 }) {
  const stars = [];

  if (locked) {
    for (let i = 0; i < max; i++) {
      stars.push(
        <img
          key={i}
          src={IconCadeado}
          alt="Avaliação bloqueada"
          className="star-img locked"
        />
      );
    }
  } else {
    for (let i = 0; i < max; i++) {
      const src = i < rating ? StarYellow : StarWhite;
      const alt = i < rating ? 'estrela cheia' : 'estrela vazia';
      stars.push(
        <img
          key={i}
          src={src}
          alt={alt}
          className="star-img"
        />
      );
    }
  }
  return <div className="rating-stars" aria-label={`Avaliação ${rating} de ${max}`}>{stars}</div>;
}

// --- COMPONENTE PRINCIPAL DA PÁGINA ---
export default function PaginaMinhasCaronas() {
  const [caronas, setCaronas] = useState([]);

  // Busca os dados do db.json assim que a tela abre
  useEffect(() => {
    fetch(`${API_URL}/rotas`) 
      .then(response => response.json())
      .then(data => setCaronas(data))
      .catch(err => console.error("Erro ao carregar histórico:", err));
  }, []);

  return (
    <div className="pagina-caronas-container">
      <Sidebar activePage="minhas-caronas" />
      
      <main className="conteudo-caronas">
        <HeaderCaronas />
        <ListaCaronas caronas={caronas} />
      </main>
      <BotaoAcessibilidade />
    </div>
  );
}

// --- SUB-COMPONENTES DA PÁGINA ---

function HeaderCaronas() {
  return (
    <div className="header-minhas-caronas">
      <div>
        <h1 className="page-main-title">Minhas Caronas</h1>
        <span className="page-main-subtitle">Gerencie seu histórico de viagens</span>
      </div>
    </div>
  );
}

function ListaCaronas({ caronas }) {
  if (caronas.length === 0) {
      return <div className="lista-caronas-container"><p style={{marginTop: 20}}>Carregando histórico...</p></div>;
  }

  return (
    <div className="lista-caronas-container">
      {caronas.map(carona => (
        <CardCaronaItem key={carona.id} carona={carona} />
      ))}
    </div>
  );
}

function CardCaronaItem({ carona }) {
  const statusClass = `status-${carona.status.toLowerCase()}`;
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/caronas/caronista`);
  }; 

  // Pega a foto correta baseada no ID do JSON
  const fotoUsuario = mapaDeFotos[carona.fotoId] || FotoUsuario1;

  return (
    <div 
      className="carona-item-wrapper" 
      onClick={handleCardClick}
      role="button" 
      tabIndex={0} 
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCardClick()} 
    >
      {/* --- CARD DA ESQUERDA (INFORMAÇÕES) --- */}
      <div className="carona-card-info">
        <div className="card-info-header">
          <h3 className="rota-titulo">
            {carona.origem} <span>&rarr;</span> {carona.destino}
          </h3>
          <span className={`status-tag ${statusClass}`}>
            {carona.status}
          </span>
        </div>
        <div className="rota-horario">
          <img src={IconRelogio} alt="Horário" className="input-icon" />
          <span>{carona.horario}</span>
        </div>
      </div>

      {/* --- CARD DA DIREITA (AVALIAÇÃO) --- */}
      <div className="carona-card-rating">
        <div className="rating-user-foto">
          <img src={fotoUsuario} alt="Usuário" />
        </div>
        {/* Passa as props vindas do JSON */}
        <StarRating rating={carona.rating} locked={carona.locked} />
      </div>

    </div>
  );
}