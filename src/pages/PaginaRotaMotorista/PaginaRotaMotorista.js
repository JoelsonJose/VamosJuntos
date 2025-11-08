import React, { useState } from 'react';
import './PaginaRotaMotorista.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import StarRating from '../../components/StarRating/StarRating';

import PerfilHomero from '../../assets/RotaMotorista/perfilhomero.png'; // NOVA IMAGEM
import MapaRota from '../../assets/RotaMotorista/MAPA.png'; // NOVA IMAGEM (para o mock)
import { Link } from 'react-router-dom';
import CarroProgress from '../../assets/RotaMotorista/Sedan.png';
import Wheelchair from '../../assets/RotaMotorista/Wheelchair.png';
import Person from '../../assets/RotaMotorista/Person.png';
import Clock from '../../assets/RotaMotorista/Clock.png';
import MapPin from '../../assets/RotaMotorista/Map Pinpoint.png';
import Check from '../../assets/RotaMotorista/Check Mark.png';
import Cancel from '../../assets/RotaMotorista/Cancel.png';
import CheckOff from '../../assets/RotaMotorista/Check Mark off.png';
import CancelOff from '../../assets/RotaMotorista/Cancel off.png';
import CarModelIcon from '../../assets/RotaMotorista/Koenigsegg One.png';
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';



export default function PaginaRotaMotorista() {
  const [passageiros, setPassageiros] = useState([
    { nome: "João Gomes", rating: 4, marcado: null, embarque: true },
    { nome: "Gustavo Levi", rating: 5, marcado: null, embarque: true },
    { nome: "Michele Dario", rating: 3, marcado: null, embarque: true },
    { nome: "Júlio Azevedo", rating: 2, marcado: null, embarque: true },
  ]);

  const marcacao = (index, tipo) => {
    const novo = [...passageiros];
    novo[index].marcado = tipo;
    setPassageiros(novo);
  };

  const concluidos = passageiros.filter(p => p.marcado !== null).length;
  const progresso = (concluidos / passageiros.length) * 100;

  return (
    <div className="rota-pagina">
      <Sidebar activePage="rotas" />

      {/* Conteúdo Principal */}
      <div className="rota-conteudo">
        
        {/* TÍTULO E SUBTÍTULO */}
        <header className="rota-titulo-header">
          <h1>Minhas Rotas</h1>
          <p>Acompanhe seus pontos de embarque</p>
        </header>

        {/* CONTAINER PRINCIPAL: PROGRESSO, MAPA E CARD LATERAL */}
        <main className="rota-principal-container">
          
          {/* PROGRESSO E MAPA */}
          <div className="rota-mapa-progress-wrapper">

            {/* BARRA DE PROGRESSO E ROTA */}
            <div className="rota-progress-header">
              <p className="rota-descricao">
                Jardim São Paulo → Av. Alfredo Lisboa 810, Empresa
              </p>
              <div className="status-badge">Ativa</div>
            </div>
            
            <div className="rota-mapa-progress-wrapper card-branco">

              {/* Barra Roxo Claro */}
              <div className="rota-progresso-bar-bg"> 
                {/* Ícones de parada (simulados) */}
                <div className="progresso-stop stop-1"></div>
                <div className="progresso-stop stop-2"></div>
                <div className="progresso-stop stop-3"></div>
                <div className="progresso-stop stop-4"></div>
                
                {/* Barra de Progresso Real */}
                <div className="progresso-fill" style={{ width: `${progresso}%` }}></div>
                
                {/* Ícone do Carro */}
                <img 
                  src={CarroProgress} 
                  className="carro-progress-img" 
                  style={{ left: `${progresso}%` }} 
                  alt="Carro de Progresso"
                />
              </div>
            </div>
            

            {/* MAPA (IMAGEM MOCK) */}
            <div className="rota-mapa card-branco">

              <img src={MapaRota} alt="Mapa da Rota" className="mapa-img" />
            </div>

          </div> {/* FIM .rota-mapa-progress-wrapper */}

          {/* CARD LATERAL DIREITO: MOTORISTA E PASSAGEIROS */}
          <div className="card-lateral-direita">

            {/* INFORMAÇÕES DO MOTORISTA */}
            <div className="motorista-header-card">
              <div className="motorista-info-perfil">
                <img src={PerfilHomero} alt="Foto do Motorista" className="perfil-img" />
                <div className="motorista-detalhes">
                  <strong className="nome-motorista">Homero Flávio</strong>
                  <StarRating rating={4} />
                </div>
              </div>
            </div>

            <div className="rota-infos-resumo">
              <div className="carro-modelo">
                <img src={CarModelIcon} alt="Modelo do Carro" className="carro-modelo-icon" />
                          Honda Civic 2023
            </div>

              <p className="caronas-info">508 caronas feitas</p>
              
              <div className="info-item-icon">
                <img src={Person} alt="Vagas" />
                <span>4 vagas</span>
              </div>
              <div className="info-item-icon">
                <img src={Wheelchair} alt="Acessibilidade" />
                <span>Acessibilidade</span> <div className="status-dot green"></div>
              </div>
              <div className="info-item-icon">
                <img src={MapPin} alt="Embarque" />
                <span>1,2km para próximo embarque</span>
              </div>
              <div className="info-item-icon">
                <img src={Clock} alt="Estimativa" />
                <span>Estimativa de chegada - 11 minutos</span>
              </div>
            </div>

            <hr className="divider-lista"/>

            {/* LISTA DE PASSAGEIROS */}
            <div className="passageiros-lista">
              {passageiros.map((p, i) => (
                <div key={i} className="passageiro-card-lateral">
                  <div className={`passageiro-status-dot ${p.marcado === 'ok' ? 'status-ok' : p.marcado === 'no' ? 'status-no' : 'status-pending'}`}>
                     {/* Ponto de status estilizado via CSS */}
                  </div>
                  <div className="passageiro-info">
                    <strong>{p.nome}</strong>
                    <StarRating rating={p.rating} />
                  </div>

                  <div className="acoes-lateral">
                    {/* Check */}
                    <img
                      src={p.marcado === "ok" ? Check : CheckOff}
                      onClick={() => marcacao(i, "ok")}
                      className={`acao-btn ${p.marcado === "no" ? 'disabled' : ''}`}
                      alt="Check"
                    />
                    {/* Cancel */}
                    <img
                      src={p.marcado === "no" ? Cancel : CancelOff}
                      onClick={() => marcacao(i, "no")}
                      className={`acao-btn ${p.marcado === "ok" ? 'disabled' : ''}`}
                      alt="Cancel"
                    />
                  </div>
                </div>
              ))}
            </div>
            <Link to={"/rotas/motorista/avaliacao"} className="finalizar-btn">
            Finalizar carona
            </Link>
          </div> {/* FIM .card-lateral-direita */}

        </main>
        <BotaoAcessibilidade/>
      </div>
    </div>
  );
}