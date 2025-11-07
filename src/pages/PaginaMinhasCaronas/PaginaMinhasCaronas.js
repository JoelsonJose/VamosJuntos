import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './PaginaMinhasCaronas.css'; 
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';

// --- ÍCONES ---
// (Certifique-se que estes caminhos/nomes estão corretos)
import IconRelogio from '../../assets/IconsCriar/IconRelogio.png';
import StarYellow from '../../assets/Star amarela.png';
import StarWhite from '../../assets/Star branca.png';
import IconCadeado from '../../assets/IconsCriar/IconCadeado.png'; // Você precisa desta imagem
import FotoUsuario1 from '../../assets/Fotos/usuario1.png'; 
import FotoUsuario2 from '../../assets/Fotos/usuario2.png'; 
import FotoUsuario3 from '../../assets/Fotos/usuario3.png'; 
import FotoUsuario4 from '../../assets/Fotos/usuario4.png'; 
import FotoUsuario5 from '../../assets/Fotos/usuario5.png'; 

// --- DADOS DE EXEMPLO ---
const mockCaronas = [
  {
    id: 1,
    origem: "Av. Alfredo Lisboa 810, Empresa",
    destino: "Jardim São Paulo, Casa",
    horario: "18:30",
    status: "Agendada",
    user: { foto: FotoUsuario1 },
    rating: 4,
    locked: false // Agendada = estrelas vazias
  },
  {
    id: 2,
    origem: "Jardim São Paulo, Casa",
    destino: "Av. Alfredo Lisboa 810, Empresa",
    horario: "8:00",
    status: "Ativa",
    user: { foto: FotoUsuario2 },
    rating: 3,
    locked: false // Ativa = estrelas vazias
  },
  {
    id: 3,
    origem: "Av. Alfredo Lisboa 810, Empresa",
    destino: "Jardim São Paulo, Casa",
    horario: "18:30",
    status: "Finalizada",
    user: { foto: FotoUsuario3 },
    rating: 1, // Finalizada = 5 estrelas
    locked: false
  },
  {
    id: 4,
    origem: "Av. Alfredo Lisboa 810, Empresa",
    destino: "Jardim São Paulo, Casa",
    horario: "18:30",
    status: "Cancelada",
    user: { foto: FotoUsuario4 },
    rating: 0,
    locked: true // Cancelada = cadeados
  },
  {
    id: 5,
    origem: "Jardim São Paulo, Casa",
    destino: "Av. Alfredo Lisboa 810, Empresa",
    horario: "8:00",
    status: "Finalizada",
    user: { foto: FotoUsuario5 },
    rating: 5, // Finalizada = 5 estrelas
    locked: false
  },
];

// --- COMPONENTE DE ESTRELAS (ADAPTADO) ---
// Agora aceita 'rating' e 'locked'
function StarRating({ rating = 0, locked = false, max = 5 }) {
  const stars = [];

  // Se 'locked' for true (ex: Cancelada), mostra cadeados
  if (locked) {
    for (let i = 0; i < max; i++) {
      stars.push(
        <img
          key={i}
          src={IconCadeado}
          alt="Avaliação bloqueada"
          className="star-img locked" // Classe especial para o cadeado
        />
      );
    }
  } 
  // Se não estiver bloqueada, mostra estrelas (cheias ou vazias)
  else {
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
  return (
    <div className="pagina-caronas-container">
      <Sidebar activePage="minhas-caronas" />
      
      <main className="conteudo-caronas">
        <HeaderCaronas />
        <ListaCaronas caronas={mockCaronas} />
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

  return (
    <div className="carona-item-wrapper">
      
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
          <img src={carona.user.foto} alt="Usuário" />
        </div>
        {/* Passa as props 'rating' e 'locked' para o StarRating */}
        <StarRating rating={carona.rating} locked={carona.locked} />
      </div>

    </div>
  );
}