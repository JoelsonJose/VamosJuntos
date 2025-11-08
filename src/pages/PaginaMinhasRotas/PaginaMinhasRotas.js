import React, { useState } from 'react'; // 1. IMPORTE o useState
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import './PaginaMinhasRotas.css'; 
import PopUpExcluir from '../../components/PopUpExcluir/PopUpExcluir'
import IconMapa from '../../assets/IconsCriar/IconMapa.png';
import IconRelogio from '../../assets/IconsCriar/IconRelogio.png';
import IconPessoas from '../../assets/IconsCriar/IconPessoas.png';
import IconEstrela from '../../assets/IconsCriar/IconEstrela.png';
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';
import ModalSolicitacoes from '../../components/ModalSolicitacoes/ModalSolicitacoes';

const dadosIniciaisDasRotas = [
  {
    id: 1,
    origem: "Casa Amarela(Saída)",
    destino: "Recife Antigo(Chegada)",
    ativa: true,
    horario: "8:00",
    dias: "Seg,Ter,Qua,Sex",
    vagasOcupadas: 2,
    vagasTotal: 4,
    notaMinima: "4+",
    novasSolicitacoes: 3,
  },
  {
    id: 2,
    origem: "Recife Antigo(Saída)",
    destino: "Casa Amarela(Chegada)",
    ativa: true,
    horario: "18:00",
    dias: "Seg,Ter,Qua,Sex",
    vagasOcupadas: 1,
    vagasTotal: 4,
    notaMinima: "4+",
    novasSolicitacoes: 2,
  }
];

export default function PaginaMinhasRotas() {
  
  const [minhasRotas, setMinhasRotas] = useState(dadosIniciaisDasRotas); 
  const [modalAberto, setModalAberto] = useState(false);
  const [rotaParaExcluir, setRotaParaExcluir] = useState(null); 
  const [modalSolicitacoesAberto, setModalSolicitacoesAberto] = useState(false);
  const [rotaSelecionada, setRotaSelecionada] = useState(null); // Para saber qual rota mostrar
  
  const handleAbrirModal = (rota) => {
    setRotaParaExcluir(rota); 
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setRotaParaExcluir(null); 
  };

  const handleConfirmarExclusao = () => {
    if (rotaParaExcluir) {
      setMinhasRotas(rotasAtuais => 
        rotasAtuais.filter(rota => rota.id !== rotaParaExcluir.id)
      );
      handleFecharModal(); 
    }
  };

  const handleAbrirModalSolicitacoes = (rota) => {
    setRotaSelecionada(rota); // Guarda a rota que o usuário clicou
    setModalSolicitacoesAberto(true); // Abre o modal
  };

  const handleFecharModalSolicitacoes = () => {
    setModalSolicitacoesAberto(false);
    setRotaSelecionada(null);
  };

  return (
    <div className="pagina-rotas-container">
      <Sidebar activePage="rotas" />
      
      <main className="conteudo-rotas">
        <HeaderRotas />
        <ListaRotas 
          rotas={minhasRotas} 
          onExcluir={handleAbrirModal} 
          onVerSolicitacoes={handleAbrirModalSolicitacoes}
        />
      </main>
      <BotaoAcessibilidade />
      <PopUpExcluir 
        isOpen={modalAberto}
        onClose={handleFecharModal}
        onConfirm={handleConfirmarExclusao}
        titulo="Excluir Rota" 
        mensagem="Tem certeza que quer excluir esta rota?" 
      />
      <ModalSolicitacoes
        isOpen={modalSolicitacoesAberto}
        onClose={handleFecharModalSolicitacoes}
        rota={rotaSelecionada}
      />
    </div>
  );
}

function HeaderRotas() {
  return (
    <div className="header-minhas-rotas">
      <div>
        <h1 className="page-main-title">Minhas Rotas</h1>
        <span className="page-main-subtitle">Gerencie suas rotas de carona</span>
      </div>
      <Link to="/criar" className="btn-nova-rota">
        <span>Nova Rota</span>
      </Link>
    </div>
  );
}

function ListaRotas({ rotas, onExcluir, onVerSolicitacoes }) {
  return (
    <div className="lista-rotas-container">
      {rotas.map(rota => (
        <CardRota 
          key={rota.id} 
          rota={rota} 
          onExcluir={onExcluir}
          onVerSolicitacoes={onVerSolicitacoes}  
        />
      ))}
    </div>
  );
}

function CardRota({ rota, onExcluir, onVerSolicitacoes }) {
  const vagasDisponiveis = rota.vagasTotal - rota.vagasOcupadas;

  return (
    <article className="card-rota">
      <div className="card-rota-header">
        <h3 className="rota-titulo">
          {rota.origem} <span>&rarr;</span> {rota.destino}
        </h3>
        <div className="header-actions">
          <span className={`status-tag ${rota.ativa ? 'ativa' : 'inativa'}`}>
            {rota.ativa ? 'Ativa' : 'Inativa'}
          </span>
          <a href="/rotas/editar" className="btn-editar">
            Editar
          </a>
          <button 
            className="btn-excluir" 
            onClick={() => onExcluir(rota)} 
          >
            Excluir
          </button>
        </div>
      </div>

      <a href="#" className="rota-pontos-link">
        <img src={IconMapa} alt="Mapa" className="input-icon" />
        <span>Ver pontos de carona</span>
      </a>
      <div className="rota-info-row">
        <div className="info-item">
          <img src={IconRelogio} alt="Horário" className="info-icon" />
          <div className="info-text">
            <strong>{rota.horario}</strong>
            <span>{rota.dias}</span>
          </div>
        </div>
        <div className="info-item">
          <img src={IconPessoas} alt="Vagas" className="info-icon" />
          <div className="info-text">
            <strong>{rota.vagasOcupadas}/{rota.vagasTotal} vagas</strong>
            <span>{vagasDisponiveis} disponíveis</span>
          </div>
        </div>
        <div className="info-item">
          <img src={IconEstrela} alt="Nota" className="info-icon" />
          <div className="info-text">
            <strong>{rota.notaMinima} estrelas</strong>
            <span>nota mínima</span>
          </div>
        </div>
      </div>
      <div className="card-rota-footer">
        <div className="footer-solicitacoes">
          <p>{rota.novasSolicitacoes} novas solicitações de carona</p>
          <button 
          className="btn-ver-solicitacoes"
          onClick={() => onVerSolicitacoes(rota)}>Ver solicitações</button>
        </div>
        <div className="footer-actions">
          <Link to={"/rotas/motorista"} className="btn-iniciar-viagem">
            Iniciar Viagem
          </Link>
          <button className="btn-encerrar-vagas">Encerrar vagas disponíveis</button>
        </div>
      </div>
    </article>
  );
}