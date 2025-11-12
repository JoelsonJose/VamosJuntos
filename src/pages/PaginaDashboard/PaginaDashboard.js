import '../../index.css'
import './PaginaDashboard.css';
import Sidebar from '../../components/Sidebar/Sidebar'
import CardCarona  from '../../components/CardCarona/CardCarona'; 
import Infoicon from '../../assets/Dashboard/Info.png';
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';
import { useNavigate } from 'react-router-dom';


const dadosDaCarona = {
  origem: "Casa",
  destino: "Empresa",
  horario: "08:00",
  data: "Hoje",
  status: "Confirmada",
  motorista: "Lucas Ximenes",
  squad: "Marketing"
};

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-content">
        <HeaderDashboard nomeUsuario="Homero Flávio" />
        <AreaResumo />
        <AreaCaronasSolicitadas />
      </main>
      <BotaoAcessibilidade />
    </div>
  );
}

function HeaderDashboard({ nomeUsuario }) {
  return (
    <header className="dashboard-cabecalho">
      <h1>Olá, {nomeUsuario}!</h1>
      <span className="sobretitulo">
        Bem-vindo ao seu dashboard de caronas
      </span>
    </header>
  );
}

function AreaResumo() {
  return (
    <section className="area-resumo">
      
      <div className="card-resumo">
        <div className="card-resumo-info-group">
          <div className="title-card-resumo">
            Você tem uma corrida ativa hoje!
          </div>
          <div className="info-card-resumo">
            <span>Jardim São Paulo &rarr; Recife antigo às 8:00</span>
          </div>
        </div>
        <a href="#-" className="detalhes-card-resumo">
          <img src={Infoicon} alt="Info" className="Infoicon" /> 
          <strong> Mais detalhes...</strong>
        </a>
      </div>
      <div className="card-resumo">
        <div className="card-resumo-info-group">
          <div className= "title-card-resumo">
            Última corrida:
          </div>
          <div className="info-card-resumo">
            <span>Recife antigo &rarr; Jardim São Paulo às 18:30</span>
          </div>
        </div>
        <a href="#-" className="detalhes-card-resumo">
          <img src={Infoicon} alt="Info" className="Infoicon" /> 
          <strong> Mais detalhes...</strong>
        </a>
      </div>
    </section>
  );
}

function AreaCaronasSolicitadas() {
  return (
    <section className="caronas-solicitadas">
      <h2>Caronas Solicitadas</h2>
      <CardCarona carona={dadosDaCarona} />
    </section>
  );
}