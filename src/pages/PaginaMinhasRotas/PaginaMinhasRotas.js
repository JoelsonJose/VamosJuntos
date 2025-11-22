import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import './PaginaMinhasRotas.css'; 
import { API_URL } from '../../Config';
import PopUpExcluir from '../../components/PopUpExcluir/PopUpExcluir';
import IconMapa from '../../assets/IconsCriar/IconMapa.png';
import IconRelogio from '../../assets/IconsCriar/IconRelogio.png';
import IconPessoas from '../../assets/IconsCriar/IconPessoas.png';
import IconEstrela from '../../assets/IconsCriar/IconEstrela.png';
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';
import ModalSolicitacoes from '../../components/ModalSolicitacoes/ModalSolicitacoes';

export default function PaginaMinhasRotas() {
  
  const [minhasRotas, setMinhasRotas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [rotaParaExcluir, setRotaParaExcluir] = useState(null); 
  const [modalSolicitacoesAberto, setModalSolicitacoesAberto] = useState(false);
  const [rotaSelecionada, setRotaSelecionada] = useState(null); 

  // BUSCAR DADOS DO BACK-END (JSON SERVER)
  useEffect(() => {
    fetch(`${API_URL}/rotas`) 
      .then(response => response.json())
      .then(data => {
        const apenasMinhas = data.filter(rota => rota.dono === true);
        
        setMinhasRotas(apenasMinhas);
      })
      .catch(error => console.error("Erro ao buscar rotas:", error));
  }, []);
  
  const handleAbrirModal = (rota) => {
    setRotaParaExcluir(rota); 
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setRotaParaExcluir(null); 
  };

  // EXCLUIR ROTA
  const handleConfirmarExclusao = async () => {
    if (rotaParaExcluir) {
      try {
        // Deleta do Banco de Dados Fake
        await fetch(`${API_URL}/rotas/${rotaParaExcluir.id}`, {
          method: 'DELETE',
        });
        
        // Remove visualmente da lista sem precisar recarregar a página
        setMinhasRotas(rotasAtuais => 
          rotasAtuais.filter(rota => rota.id !== rotaParaExcluir.id)
        );
        handleFecharModal();
      } catch (error) {
        console.error("Erro ao excluir:", error);
        alert("Erro ao excluir rota. Verifique se o servidor está rodando.");
      }
    }
  };

  const handleAbrirModalSolicitacoes = (rota) => {
    setRotaSelecionada(rota);
    setModalSolicitacoesAberto(true);
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
  if (rotas.length === 0) {
    return (
      <div className="lista-rotas-container">
        <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
          Nenhuma rota encontrada. Crie sua primeira rota!
        </p>
      </div>
    );
  }

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

  // Formata os dias: se for array junta com vírgula, se for string mostra direto
  const diasFormatados = Array.isArray(rota.dias) ? rota.dias.join(', ') : rota.dias;

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
          {/* Ajuste o link abaixo se tiver uma página de edição */}
          <Link to={`/rotas/editar/${rota.id}`} className="btn-editar">
            Editar
          </Link>
          <button 
            className="btn-excluir" 
            onClick={() => onExcluir(rota)} 
          >
            Excluir
          </button>
        </div>
      </div>

      <Link to="/rotas/motorista" className="rota-pontos-link">
        <img src={IconMapa} alt="Mapa" className="input-icon" />
        <span>Ver pontos de carona</span>
      </Link>
      
      <div className="rota-info-row">
        <div className="info-item">
          <img src={IconRelogio} alt="Horário" className="info-icon" />
          <div className="info-text">
            <strong>{rota.horario}</strong>
            {/* Aqui usamos a variável formatada para evitar erro com Arrays */}
            <span style={{ fontSize: '0.85rem' }}>{diasFormatados}</span>
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
            <strong>{rota.notaMinima || "4.5"} estrelas</strong>
            <span>nota mínima</span>
          </div>
        </div>
      </div>
      
      <div className="card-rota-footer">
        <div className="footer-solicitacoes">
          <p>{rota.novasSolicitacoes} novas solicitações de carona</p>
          <button 
            className="btn-ver-solicitacoes"
            onClick={() => onVerSolicitacoes(rota)}
          >
            Ver solicitações
          </button>
        </div>
        <div className="footer-actions">
          <Link to={"/rotas/motorista"} className="btn-iniciar-viagem">
            Iniciar Viagem
          </Link>
          <button className="btn-encerrar-vagas">Encerrar vagas</button>
        </div>
      </div>
    </article>
  );
}