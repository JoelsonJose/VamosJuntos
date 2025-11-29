import React, { useState } from 'react';
import './PaginaConfirmarCarona.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import StarRating from '../../components/StarRating/StarRating';
import { useNavigate } from 'react-router-dom';
// IMPORTANTE: Importando a URL para salvar no banco
import { API_URL } from '../../Config'; 

import PersonIcon from '../../assets/ConfirmarCarona/PersonConfirmar.png';
import PeopleIcon from '../../assets/ConfirmarCarona/People in Car Side ViewConfirmar.png';
import CheckIcon from '../../assets/ConfirmarCarona/Check MarkConfirmar.png';
import CoinIcon from '../../assets/ConfirmarCarona/Coin in HandConfirmar.png';
import LucasXimenes from '../../assets/ConfirmarCarona/LucasXimenes.png';

import ClockCinza from '../../assets/RotaCaronista/Clockcinza.png';
import LocationCinza from '../../assets/RotaCaronista/Locationcinza.png';

export default function PaginaConfirmarCarona() {
  // começa SEM nenhuma seleção
  const [selectedPoint, setSelectedPoint] = useState(null);
  const navigate = useNavigate();

  const pontos = [
    { id: 1, nome: 'Praça de Jardim São Paulo', horario: '8:15' },
    { id: 2, nome: 'Shopping Afogados', horario: '8:50' },
    { id: 3, nome: 'Praça das cinco pontas', horario: '9:25' },
    { id: 4, nome: 'Cais Santa Rita', horario: '9:35' },
  ];

  // Comportamento: só 1 selecionado.
  const handleSelect = (id) => {
    setSelectedPoint(prev => (prev === id ? null : id));
  };

  // --- FUNÇÃO PARA SALVAR NO BANCO (COM PROTEÇÃO DE DUPLICIDADE) ---
  const handleConfirmar = async () => {
    // Validação simples: obriga escolher um ponto
    if (!selectedPoint) {
        alert("Por favor, selecione um ponto de embarque antes de confirmar.");
        return;
    }

    try {
        // 1. Antes de salvar, buscamos o que já existe para não duplicar
        const checkResponse = await fetch(`${API_URL}/caronas`);
        const minhasCaronas = await checkResponse.json();

        // Verifica se já existe carona ativa deste motorista neste horário
        const jaExiste = minhasCaronas.some(carona => 
            carona.motorista === "Lucas Ximenes" && 
            carona.horario === "08:00" &&
            carona.status !== "Cancelada"
        );

        if (jaExiste) {
            alert("Você já confirmou esta viagem anteriormente!");
            navigate('/caronas'); // Apenas redireciona sem criar nova
            return;
        }

        // 2. Se não existe, cria o objeto da nova carona
        const novaCarona = {
            motorista: "Lucas Ximenes",
            origem: "Jardim São Paulo",
            destino: "Av. Alfredo Lisboa 810",
            horario: "08:00",
            status: "Agendada",
            fotoId: "usuario2", // ID da foto do Lucas no mapa da outra página
            rating: 3,
            locked: false,
            valor: "5.00"
        };

        // 3. Salva no banco
        const response = await fetch(`${API_URL}/caronas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novaCarona),
        });

        if (response.ok) {
            alert('Carona Confirmada com Sucesso!');
            navigate('/caronas'); // Vai para Minhas Caronas ver o resultado
        } else {
            alert('Erro ao confirmar carona.');
        }
    } catch (error) {
        console.error("Erro:", error);
        alert('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="pagina-confirmar">
      <Sidebar />
      <div className="conteudo-confirmar">
        <button 
            onClick={() => navigate('/buscar')} 
            className="botao-voltar"
        >
            &larr; Voltar para Buscar
        </button>
        <h2>Buscar Carona</h2>
        <p className="subtitulo">Escolha a melhor carona para você</p>

        <div className="container-geral">
          {/* CARD ESQUERDO */}
          <div className="card-esquerdo">
            <div className="trajeto-header">
              <strong>Jardim São Paulo → Av. Alfredo Lisboa 810, Empresa</strong>
              <span className="status-agendada">Agendada</span>
            </div>

            <div className="info-trajeto">
              <div className="info-item">
                <img src={ClockCinza} alt="hora" />
                <span>8:00</span>
              </div>
              <div className="info-item">
                <img src={LocationCinza} alt="local" />
                <span>1ª Tv. Eng. Abdias de Carvalho - Curado - Ponto de embarque</span>
              </div>
            </div>

            <hr className="linha-roxa" />

            <div className="pontos-embarque">
              <strong>Pontos de embarque:</strong>
              <div className="lista-pontos">
                {pontos.map((ponto) => (
                  <label
                    key={ponto.id}
                    className={`opcao-embarque ${selectedPoint === ponto.id ? 'ativo' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedPoint === ponto.id}
                      onChange={() => handleSelect(ponto.id)}
                    />
                    <div className="texto-ponto">
                      <span className="nome-ponto">{ponto.nome}</span>
                      <span className="previsao">-Previsão de chegada {ponto.horario}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* CARD DIREITO */}
          <div className="card-direito">
            <div className="perfil">
              <img src={LucasXimenes} alt="Lucas Ximenes" className="foto-perfil" />
              <div>
                <p className="nome-perfil">Lucas Ximenes</p>
                <StarRating rating={3} />
              </div>
            </div>

            <div className="info-lucas">
              <p><img src={PersonIcon} alt="idade" /> <strong>Idade:</strong> 28 anos</p>
              <p><img src={PeopleIcon} alt="caronas" /> <strong>Caronas feitas:</strong> 546</p>
              <p><img src={CheckIcon} alt="verificado" /> <strong>Membro verificado:</strong> CNH e Endereço</p>
              <p><img src={CoinIcon} alt="valor" /> <strong>Valor sugerido:</strong> R$ 5,00</p>
            </div>

            <div className="info-veiculo">
              <strong>Honda civic 2023</strong>
              <p>Acessibilidade <span className="ponto-acessibilidade">•</span></p>
              <p><strong>PLACA:</strong> <span className="placa">BRA2E19</span></p>
              <p className="vagas">3 vagas disponíveis <span className="maximo">(4 vagas máx.)</span></p>
            </div>

            <div className="comentarios">
              <strong>Comentários:</strong>
              <textarea
                readOnly
                value="Chegou no local na hora exata, ótima motorista."
              />
            </div>

            <div className="botoes">
              <button className="btn-voltar" onClick={() => navigate('/buscar')}>
                    Voltar
              </button>
              {/* Chama a nova função protegida */}
              <button className="btn-confirmar" onClick={handleConfirmar}>
                    Confirmar Carona
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}