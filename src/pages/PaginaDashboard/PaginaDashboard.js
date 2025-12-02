import React, { useState, useEffect } from 'react';
import '../../index.css';
import './PaginaDashboard.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import CardCarona from '../../components/CardCarona/CardCarona';
import Infoicon from '../../assets/Dashboard/Info.png';
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';
import { API_URL } from '../../Config';

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
  const [caronas, setCaronas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/caronas`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao buscar dados das caronas');
        }
        return response.json();
      })
      .then(data => {
        // Filtrar caronas que não estão com status "Concluída"
        const caronasAtivas = data.filter(carona => carona.status !== 'Concluída');
        setCaronas(caronasAtivas);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-content">
        <HeaderDashboard nomeUsuario="Homero Flávio" />
        <AreaResumo caronas={caronas} isLoading={isLoading} error={error} />
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

function AreaResumo({ caronas, isLoading, error }) {
  if (isLoading) {
    return (
      <section className="area-resumo">
        <div className="card-resumo">
          <p>Carregando informações da carona...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="area-resumo">
        <div className="card-resumo">
          <p>Erro ao carregar caronas. Tente novamente mais tarde.</p>
        </div>
      </section>
    );
  }

  const activeRide = caronas.length > 0 ? caronas[0] : null;

  return (
    <section className="area-resumo">
      {activeRide ? (
        <div className="card-resumo">
          <div className="card-resumo-info-group">
            <div className="title-card-resumo">
              Você tem uma corrida ativa hoje!
            </div>
            <div className="info-card-resumo">
              <span>{activeRide.origem} &rarr; {activeRide.destino} às {activeRide.horario}</span>
            </div>
          </div>
          <a href="/caronas/caronista" className="detalhes-card-resumo">
            <img src={Infoicon} alt="Info" className="Infoicon" />
            <strong> Mais detalhes...</strong>
          </a>
        </div>
      ) : (
        <div className="card-resumo">
          <div className="card-resumo-info-group">
            <div className="title-card-resumo">
              Nenhuma carona ativa no momento.
            </div>
            <div className="info-card-resumo">
              <span>Quando você tiver uma carona, ela aparecerá aqui.</span>
            </div>
          </div>
        </div>
      )}

      <div className="card-resumo">
        <div className="card-resumo-info-group">
          <div className="title-card-resumo">
            Última corrida:
          </div>
          <div className="info-card-resumo">
            <span>Recife antigo &rarr; Jardim São Paulo às 18:30</span>
          </div>
        </div>
        <a href="/caronas" className="detalhes-card-resumo">
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