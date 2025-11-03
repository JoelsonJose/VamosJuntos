import { Link } from 'react-router-dom'; 
import Sidebar from '../../components/Sidebar/Sidebar';
import './PaginaMinhasRotas.css'; 

// 1. IMPORTE SEUS ÍCONES
// (Ajuste os caminhos/nomes para os arquivos do seu protótipo)
/*import IconNovaRota from '../../assets/IconsCriar/IconAdicionar.png'; // Exemplo
import IconExcluir from '../../assets/IconsCriar/IconExcluir.png';   // Exemplo*/
import IconMapa from '../../assets/Dashboard/Location.png';
import IconRelogio from '../../assets/IconsCriar/IconRelogio.png';
import IconPessoas from '../../assets/IconsCriar/IconPessoas.png';
import IconEstrela from '../../assets/IconsCriar/IconEstrela.png';


// --- DADOS DE EXEMPLO (simulando o que viria do seu banco de dados) ---
const minhasRotas = [
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


// --- COMPONENTE PRINCIPAL DA PÁGINA ---
export default function PaginaMinhasRotas() {
  return (
    // Container principal da página (Fundo gradiente)
    <div className="pagina-rotas-container">
      <Sidebar activePage="rotas" />
      
      {/* Área de conteúdo (com margem e padding corretos) */}
      <main className="conteudo-rotas">
        <HeaderRotas />
        <ListaRotas rotas={minhasRotas} />
      </main>
    </div>
  );
}


// --- SUB-COMPONENTES DA PÁGINA ---

// Cabeçalho: "Minhas Rotas" e botão "Nova Rota"
function HeaderRotas() {
  return (
    <div className="header-minhas-rotas">
      <div>
        <h1 className="page-main-title">Minhas Rotas</h1>
        <span className="page-main-subtitle">Gerencie suas rotas de carona</span>
      </div>
      {/* O botão "Nova Rota" deve ser um Link para a página de criação */}
      <Link to="/criar" className="btn-nova-rota">
        <span>Nova Rota</span>
      </Link>
    </div>
  );
}

// Container da lista de cards
function ListaRotas({ rotas }) {
  return (
    <div className="lista-rotas-container">
      {rotas.map(rota => (
        <CardRota key={rota.id} rota={rota} />
      ))}
    </div>
  );
}

// O Card de Rota (componente reutilizável)
function CardRota({ rota }) {
  const vagasDisponiveis = rota.vagasTotal - rota.vagasOcupadas;

  return (
    <article className="card-rota">
      
      {/* --- 1. CABEÇALHO (Título, Tag, Excluir) --- */}
      <div className="card-rota-header">
        <h3 className="rota-titulo">
          {rota.origem} <span>&rarr;</span> {rota.destino}
        </h3>
        <div className="header-actions">
          <span className={`status-tag ${rota.ativa ? 'ativa' : 'inativa'}`}>
            {rota.ativa ? 'Ativa' : 'Inativa'}
          </span>
          <button className="btn-excluir">
            Excluir
          </button>
        </div>
      </div>

      {/* --- 2. SUB-HEADER (Pontos de carona) --- */}
      <a href="#" className="rota-pontos-link">
        <img src={IconMapa} alt="Mapa" className="input-icon" />
        <span>Ver pontos de carona</span>
      </a>

      {/* --- 3. LINHA DE INFORMAÇÕES (Horário, Vagas, Nota) --- */}
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

      {/* --- 4. RODAPÉ (Solicitações e Botões) --- */}
      <div className="card-rota-footer">
        <div className="footer-solicitacoes">
          <p>{rota.novasSolicitacoes} novas solicitações de carona</p>
          <button className="btn-ver-solicitacoes">Ver solicitações</button>
        </div>
        <div className="footer-actions">
          <button className="btn-encerrar-vagas">Encerrar vagas disponíveis</button>
        </div>
      </div>
      
    </article>
  );
}