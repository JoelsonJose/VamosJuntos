import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './PaginaMinhasCaronas.css'; 
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';
import { useNavigate } from 'react-router-dom';

// ATENÇÃO: Verifique se o arquivo na pasta src se chama 'config.js' (minúsculo)
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
    // Renderiza apenas um cadeado quando bloqueado
    stars.push(<img key="locked" src={IconCadeado} alt="Avaliação bloqueada" className="star-img locked"/>);
  } else {
    for (let i = 0; i < max; i++) {
      const src = i < rating ? StarYellow : StarWhite;
      stars.push(<img key={i} src={src} alt={i < rating ? 'estrela cheia' : 'estrela vazia'} className="star-img"/>);
    }
  }
  return <div className="rating-stars">{stars}</div>;
}

// --- COMPONENTE PRINCIPAL DA PÁGINA ---
export default function PaginaMinhasCaronas() {
  const [caronas, setCaronas] = useState([]);
  const [erro, setErro] = useState(null); 

  // Busca os dados do banco
  useEffect(() => {
    console.log("Tentando buscar caronas em:", `${API_URL}/caronas`); 

    fetch(`${API_URL}/caronas`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na resposta da API: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Dados recebidos:", data); 
        if (Array.isArray(data)) {
          setCaronas(data);
        } else {
          console.error("A API não retornou uma lista (array)!", data);
          setCaronas([]); 
        }
      })
      .catch(err => {
        console.error("Erro fatal ao carregar histórico:", err);
        setErro(err.message);
      });
  }, []);

  if (erro) {
    return (
      <div className="pagina-caronas-container">
        <Sidebar activePage="minhas-caronas" />
        <main className="conteudo-caronas" style={{padding: 20, color: 'red'}}>
          <h2>Ocorreu um erro!</h2>
          <p>Detalhes: {erro}</p>
        </main>
      </div>
    );
  }

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
  if (!caronas || caronas.length === 0) {
      return (
        <div className="lista-caronas-container">
            <p style={{marginTop: 20, color: '#666'}}>Nenhuma carona encontrada ou carregando...</p>
        </div>
      );
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
  const navigate = useNavigate();
  
  // --- CORREÇÃO DA TELA BRANCA ---
  // Garante que 'statusSafe' seja sempre uma string, mesmo se carona.status for null/undefined
  const statusSafe = carona.status || 'agendada'; 
  const statusClass = `status-${statusSafe.toLowerCase()}`;
  
  // Em PaginaMinhasCaronas.js
const handleCardClick = () => {
  // Agora enviamos o ID da carona para a próxima página saber qual abrir
  navigate(`/caronas/caronista`, { state: { caronaId: carona.id } });
};

  const fotoParaMostrar = (carona.fotoId && mapaDeFotos[carona.fotoId]) ? mapaDeFotos[carona.fotoId] : FotoUsuario1;

  return (
    <div 
      className="carona-item-wrapper" 
      onClick={handleCardClick}
      role="button" 
      tabIndex={0} 
    >
      <div className="carona-card-info">
        <div className="card-info-header">
          <h3 className="rota-titulo">
            {carona.origem} <span>&rarr;</span> {carona.destino}
          </h3>
          <span className={`status-tag ${statusClass}`}>
            {carona.status || 'Agendada'}
          </span>
        </div>
        <div className="rota-horario">
          <img src={IconRelogio} alt="Horário" className="input-icon" />
          <span>{carona.horario}</span>
        </div>
      </div>

      <div className="carona-card-rating">
        <div className="rating-user-foto">
          {fotoParaMostrar && <img src={fotoParaMostrar} alt="Usuário" />}
        </div>
        <StarRating rating={carona.rating} locked={carona.locked} />
      </div>

    </div>
  );
}