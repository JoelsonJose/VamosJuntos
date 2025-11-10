import React, { useState } from "react";
import "./PaginasDetalhesCarona.css";

function PaginaDetalhesCarona() {
  const [solicitacoes, setSolicitacoes] = useState(3);
  const [solicitado, setSolicitado] = useState(false);

  const handleSolicitarCarona = () => {
    setSolicitacoes(solicitacoes + 1);
    setSolicitado(true);
    console.log("Solicitação de carona enviada.");
  };

  return (
    <div className="pagina-detalhes-carona">
      <div className="sidebar">
        <div className="logo">
          <img
            src="https://via.placeholder.com/70/9c66e4/ffffff?text=V"
            alt="Logo"
          />
        </div>
        <div className="nav-item">Dashboard</div>
        <div className="nav-item active">Buscar Carona</div>
        <div className="nav-item">Minhas Caronas</div>
        <div className="nav-item">Minhas Rotas</div>
        <div className="nav-item">Criar Rotas</div>
        <div className="nav-item">Perfil Corporativo</div>
      </div>

      <div className="main-content">
        <h1>Detalhes da Carona</h1>
        <p className="subtitle">Confirme sua reserva para garantir sua viagem.</p>

        <div className="card-container">
          <div className="trip-details">
            <div className="route-header">
              <h2>Jardim São Paulo → Av. Alfredo Lisboa 810, Empresa</h2>
              <span className="status-tag">Agendada</span>
            </div>
            <div className="route-info">
              🕒 <strong>8:00</strong> | 📍 1ª Tv. Eng. Abdias de Carvalho - Curado -{" "}
              <strong>Ponto de embarque</strong>
            </div>

            <img
              id="map-image"
              src="mapa_rota_exemplo.png"
              alt="Mapa da rota entre Jardim São Paulo e Av. Alfredo Lisboa"
            />
          </div>

          <div className="side-info">
            <div className="driver-card">
              <div className="driver-details">
                <img
                  id="maria-photo"
                  src="https://i.pravatar.cc/60?img=12"
                  alt="Foto da Maria Santos"
                />
                <div>
                  <h3>Maria Santos (Caronista)</h3>
                  <div className="stars">⭐⭐⭐⭐⭐</div>
                  <small>546 caronas feitas</small>
                </div>
              </div>

              <div className="caronista-info">
                <h4>Mais sobre Maria:</h4>
                <p>👤 <strong>Idade:</strong> 34 anos</p>
                <p>⭐ <strong>Membro desde:</strong> Jan/2022</p>
                <p>✅ <strong>Verificado:</strong> CNH e Endereço</p>
                <p>💬 <strong>Preço sugerido:</strong> R$ 5,00</p>
              </div>

              <hr style={{ margin: "15px 0" }} />

              <div className="car-details">
                <h4>Honda Civic 2023</h4>
                <p>
                  PLACA: <span className="badge-placa">BRA2E15</span>
                </p>

                <div className="vagas-count">
                  <span id="solicitacoes-count">{solicitacoes}</span> solicitações |{" "}
                  <strong>4 vagas</strong> (Máximo)
                </div>

                <div className="info-grid">
                  <span>1,8 km de você</span>
                  <span>6 minutos</span>
                  <span>Acessibilidade ⊕</span>
                </div>
              </div>
            </div>

            <div className="action-card">
              <h4>Comentários:</h4>
              <p
                style={{
                  fontStyle: "italic",
                  fontSize: "0.8em",
                  color: "#777",
                }}
              >
                "Motorista confiável e pontual."
              </p>

              <button
                className="btn-primary"
                id="solicitarCaronaBtn"
                onClick={handleSolicitarCarona}
                disabled={solicitado}
              >
                {solicitado ? "SOLICITAÇÃO ENVIADA" : "SOLICITAR CARONA"}
              </button>

              {solicitado && (
                <p
                  id="message"
                  style={{
                    textAlign: "center",
                    color: "green",
                    fontWeight: "bold",
                    marginTop: "15px",
                  }}
                >
                  ✅ Solicitação enviada! Aguarde a confirmação de Maria.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaginaDetalhesCarona;