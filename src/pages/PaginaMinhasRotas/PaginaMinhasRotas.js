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
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import { useNavigate } from 'react-router-dom';


export default function PaginaMinhasRotas() {
  
  const [minhasRotas, setMinhasRotas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [rotaParaExcluir, setRotaParaExcluir] = useState(null); 
  const [modalSolicitacoesAberto, setModalSolicitacoesAberto] = useState(false);
  const [rotaSelecionada, setRotaSelecionada] = useState(null); 

  useEffect(() => {
    fetch(`${API_URL}/rotas`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const apenasMinhas = data.filter(rota => rota.dono === true);
        setMinhasRotas(apenasMinhas);
      })
      .catch(error => console.error("Erro ao buscar rotas:", error));
  }, []);
  
  const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        isAlertOnly: false,
        onConfirm: null
      });
    
  const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });
  
  const handleAbrirModal = (rota) => {
    setRotaParaExcluir(rota); 
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setRotaParaExcluir(null); 
  };

  const handleConfirmarExclusao = async () => {
    if (rotaParaExcluir) {
      try {
        await fetch(`${API_URL}/rotas/${rotaParaExcluir.id}`, {
          method: 'DELETE',
        });
        setMinhasRotas(rotasAtuais => 
          rotasAtuais.filter(rota => rota.id !== rotaParaExcluir.id)
        );
        handleFecharModal();
      } catch (error) {
        console.error("Erro ao excluir:", error);
        setModalConfig({
          isOpen: true,
          title: 'Atenção',
          message: 'Erro ao excluir rota',
          isAlertOnly: true,
          onConfirm: closeModal,
        });
      }
    }
  };

 const toggleRotaAtiva = async (rotaId, novoEstado) => {
  try {
    // pega os dados completos da rota antes de atualizar
    const rotaAtual = minhasRotas.find(r => r.id === rotaId);

    if (!rotaAtual) {
      throw new Error("Rota não encontrada na lista local.");
    }

    // MockAPI exige enviar o objeto COMPLETO no PUT
    const rotaAtualizada = {
      ...rotaAtual,
      ativa: novoEstado
    };

    const response = await fetch(`${API_URL}/rotas/${rotaId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rotaAtualizada),
    });

    if (!response.ok) {
      const textoErro = await response.text();
      throw new Error(`Erro ao atualizar rota: ${textoErro}`);
    }

    // Atualiza a lista local
    setMinhasRotas(rotasAtuais =>
      rotasAtuais.map(rota =>
        rota.id === rotaId ? rotaAtualizada : rota
      )
    );

  } catch (error) {
    console.error("Erro ao alterar status da rota:", error);
    setModalConfig({
      isOpen: true,
      title: 'Atenção',
      message: 'Erro ao alterar status da rota',
      isAlertOnly: true,
      onConfirm: closeModal,
    });
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
          onToggleAtiva={toggleRotaAtiva}
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

function ListaRotas({ rotas, onExcluir, onVerSolicitacoes, onToggleAtiva }) {
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
          onToggleAtiva={onToggleAtiva}
        />
      ))}
    </div>
  );
}

function CardRota({ rota, onExcluir, onVerSolicitacoes, onToggleAtiva }) {

  const navigate = useNavigate();
  
  const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        isAlertOnly: false,
        onConfirm: null
      });
    
  const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });
  
  const vagasDisponiveis = rota.vagasTotal - rota.vagasOcupadas;
  const diasFormatados = Array.isArray(rota.dias) ? rota.dias.join(', ') : rota.dias;

  const handleIniciarClick = (e) => {
    e.preventDefault(); 

    if (!rota.ativa) {
      setModalConfig({
         isOpen: true,
         title: 'Rota Desativada',
         message: 'Você não pode iniciar uma viagem em uma rota desativada. Ative-a primeiro.',
         isAlertOnly: true, 
         onConfirm: closeModal
       });
    } else {
       // Se ativa, pede confirmação
       setModalConfig({
         isOpen: true,
         title: 'Iniciar Viagem',
         message: (
            <>
                Deseja iniciar esta viagem agora?
                <br />
                Os passageiros serão notificados.
            </>
         ),
         isAlertOnly: false,
         onConfirm: () => {
             // Ação confirmada: FECHA O MODAL E NAVEGA
             closeModal();
             navigate('/rotas/motorista'); // <--- ISSO ESTAVA FALTANDO OU NÃO ESTAVA SENDO CHAMADO
         }
       });
    }
  };

  const handleToggleClick = () => {
    const novoEstado = !rota.ativa;
    const acao = novoEstado ? "ativar" : "desativar";
    
    setModalConfig({
        isOpen: true,
        title: `Confirmação`,
        message: `Tem certeza que deseja ${acao} esta rota?`,
        isAlertOnly: false, // Confirmação Sim/Não
        onConfirm: () => {
            onToggleAtiva(rota.id, novoEstado); // Chama a função do pai
            closeModal();
        }
    });
  };

  return (
    <article className="card-rota">
      <div className="card-rota-header">
        <h3 className="rota-titulo">
          {rota.origem} <span>&rarr;</span> {rota.destino}
          <span className={`status-tag ${rota.ativa ? 'ativa' : 'desativada'}`}>
            {rota.ativa ? 'Ativa' : 'Desativada'}
          </span>
        </h3>
        <div className="header-actions">
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
          <p>{rota.novasSolicitacoes || 0} novas solicitações de carona</p>
          <button 
            className="btn-ver-solicitacoes"
            onClick={() => onVerSolicitacoes(rota)}
          >
            Ver solicitações
          </button>
        </div>
        <div className="footer-actions">
          {/* Botão Iniciar Viagem com bloqueio */}
          <button 
            className={`btn-iniciar-viagem ${!rota.ativa ? 'disabled-link' : ''}`}
            onClick={handleIniciarClick}
            style={!rota.ativa ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
          >
            Iniciar Viagem
          </button>
          
          {/* Botão Ativar/Desativar */}
          <button 
            className={rota.ativa ? "btn-encerrar-vagas" : "btn-ativar-rota"} // Crie a classe .btn-ativar-rota no CSS (verde) se quiser
            style={!rota.ativa ? { backgroundColor: '#d1fae5', color: '#065f46' } : {}} // Estilo rápido para o botão verde
            onClick={handleToggleClick}
          >
            {rota.ativa ? "Desativar rota" : "Ativar rota"}
          </button>
        </div>
      </div>
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        isAlertOnly={modalConfig.isAlertOnly}
        onClose={closeModal}
        onConfirm={() => {
          if (modalConfig.onConfirm) modalConfig.onConfirm();
        }}
      />
    </article>
  );
}