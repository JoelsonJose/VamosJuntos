import React, { useState } from 'react';
import './PaginaRotaCaronista.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import StarRating from '../../components/StarRating/StarRating';
import PerfilLucas from '../../assets/Fotos/usuario2.png';
import MapaRota from '../../assets/RotaCaronista/MAPAcaronista.png'; 
import { Link } from 'react-router-dom';
import ClockCinza from '../../assets/RotaCaronista/Clockcinza.png';
import LocationCinza from '../../assets/RotaCaronista/Locationcinza.png';
import MapPinpoint from '../../assets/RotaMotorista/Map Pinpoint.png';
import Wheelchair from '../../assets/RotaMotorista/Wheelchair.png';
import Person from '../../assets/RotaMotorista/Person.png';
import CarModelIcon from '../../assets/RotaMotorista/Koenigsegg One.png';
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';
import { useNavigate } from 'react-router-dom';


export default function PaginaRotaCaronista() {

  const navigate = useNavigate();

 
  return (
    <div className="rota-pagina">
      <Sidebar activePage="caronas" />

      <div className="rota-conteudo">
        <header className="rota-titulo-header">
          <h1>Minha viagem</h1>
          <p>Acompanhe sua viagem de perto</p>
        </header>

        <main className="rota-principal-container">

          {/* Coluna esquerda: card com destino + pequena linha de infos + mapa */}
          <div className="rota-mapa-progress-wrapper">

            {/* Cabeçalho do destino (igual protótipo) */}
            <div className="rota-progress-header">
              <p className="rota-descricao">
                Jardim São Paulo → Av. Alfredo Lisboa 810, Empresa
              </p>
              <div className="status-badge">Ativa</div>
            </div>

            {/* Linha de infos acima do mapa (substitui barra de progresso) */}
            <div className="info-compacta card-branco">
              <div className="info-compacta-left">
                <img src={ClockCinza} alt="Relógio" className="info-icon-small" />
                <span className="info-compacta-text">8:00</span>
                <img src={LocationCinza} alt="Local" className="info-icon-small location" />
                <span className="info-compacta-text">1ª Tv. Eng. Abdias de Carvalho - Curado · Ponto de embarque</span>
              </div>
            </div>

            {/* MAPA (mock) */}
            <div className="rota-mapa card-branco">
              <img src={MapaRota} alt="Mapa da Rota" className="mapa-img" />
            </div>
          </div>

          {/* Coluna direita: card do motorista */}
          <div className="card-lateral-direita">

            <div className="motorista-header-card">
              <div className="motorista-info-perfil">
                <img src={PerfilLucas} alt="Foto do Motorista" className="perfil-img" />
                <div className="motorista-detalhes">
                  <strong className="nome-motorista">Lucas Ximenes</strong>
                  <StarRating rating={5} />
                </div>
              </div>
            </div>

            <div className="rota-infos-resumo">
              <div className="carro-modelo">
                <img src={CarModelIcon} alt="Modelo do Carro" className="carro-modelo-icon" />
                Honda civic 2023
              </div>

              <p className="caronas-info">546 caronas feitas</p>

              <div className="info-item-icon">
                <img src={Person} alt="Vagas" />
                <span>4 vagas</span>
              </div>
              <div className="info-item-icon">
                <img src={Wheelchair} alt="Acessibilidade" />
                <span>Acessibilidade</span> <div className="status-dot green"></div>
              </div>
              <div className="info-item-icon">
                <img src={MapPinpoint} alt="Distância" />
                <span>1,8 km de você - 6 minutos</span>
              </div>

              {/* PLACA: badge em CSS (100% criado por CSS) */}
              <div className="placa-row">
                <strong>PLACA:</strong>
                <div className="placa-badge">BRA2E19</div>
              </div>

            </div>

            <hr className="divider-lista"/>

            {/* Comentários estáticos (dois) */}
            <div className="comentarios-lista">
              <div className="comentario-box">
                <p className="comentario-text">"Ótimo motorista, dirigibilidade segura e confiante."</p>
              </div>
              <div className="comentario-box">
                <p className="comentario-text">"Chegou no local na hora exata, ótima motorista."</p>
              </div>
            </div>

            <Link to={"/caronas/caronista/avaliacao"} className="cancelar-btn">
              Finalizar carona
            </Link>

            <Link to={"/caronas"} className="cancelar-btn">
              Cancelar viagem
            </Link>

          </div>
        </main>

        <BotaoAcessibilidade/>
      </div>
    </div>
  );
}