import React, { useState, useEffect } from 'react';
import './PaginaBuscar.css';
import Sidebar from '../../components/Sidebar/Sidebar'; 
import StarYellow from '../../assets/Star amarela.png';
import StarWhite from '../../assets/Star branca.png';
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../Config';

function StarRating({ rating = 0, max = 5 }) {
  const stars = [];
  for (let i = 0; i < max; i++) {
    const src = i < rating ? StarYellow : StarWhite;
    const alt = i < rating ? 'estrela cheia' : 'estrela vazia';
    stars.push(
      <img
        key={i}
        src={src}
        alt={alt}
        className="star-img"
        aria-hidden={i >= rating ? "true" : "false"}
      />
    );
  }
  return <div className="star-rating" aria-label={`Avaliação ${rating} de ${max}`}>{stars}</div>;
}

export default function PaginaBuscar() {
  const navigate = useNavigate();
  const [allCaronas, setAllCaronas] = useState([]);
  const [caronas, setCaronas] = useState([]);

  // Estados dos filtros
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [horario, setHorario] = useState("");
  const [dia, setDia] = useState("");

    const [horariosPopulares, setHorariosPopulares] = useState([]);
    const [bairrosPopulares, setBairrosPopulares] = useState([]);
  
    // Busca os dados do servidor
    useEffect(() => {
      fetch(`${API_URL}/rotas`)
        .then(response => response.json())
        .then(data => {
          const rotasAtivas = data.filter(rota => rota.ativa);
  
          // Calcular horários populares
          const contagemHorarios = rotasAtivas.reduce((acc, rota) => {
            acc[rota.horario] = (acc[rota.horario] || 0) + 1;
            return acc;
          }, {});
          const horariosOrdenados = Object.keys(contagemHorarios)
            .sort((a, b) => contagemHorarios[b] - contagemHorarios[a])
            .slice(0, 3);
          setHorariosPopulares(horariosOrdenados);
  
          // Calcular bairros populares
          const locaisRelevantes = rotasAtivas.flatMap(rota => [rota.origem, rota.destino]);
          const contagemBairros = locaisRelevantes
            .filter(local => local !== "Armazém 12" && local !== "Armazém 9")
            .reduce((acc, local) => {
              acc[local] = (acc[local] || 0) + 1;
              return acc;
            }, {});
          const bairrosOrdenados = Object.keys(contagemBairros)
            .sort((a, b) => contagemBairros[b] - contagemBairros[a])
            .slice(0, 6);
          setBairrosPopulares(bairrosOrdenados);
  
          // Formata os dados para exibição
          const dadosFormatados = rotasAtivas.map(rotaDoBanco => {
              const total = Number(rotaDoBanco.vagasTotal) || 4;
              const ocupadas = Number(rotaDoBanco.vagasOcupadas) || 0;
              const livres = total - ocupadas;
              
              let classeCss = "vagas1";
              if (livres >= 3) classeCss = "vagas4";
              else if (livres === 2) classeCss = "vagas3";
              else if (livres === 1) classeCss = "vagas2";
              else if (livres <= 0) classeCss = "vagas1";
  
              return {
                id: rotaDoBanco.id,
                nome: rotaDoBanco.motorista || "Motorista Parceiro",
                rating: Number(rotaDoBanco.notaMinima) || 5,
                rota: `${rotaDoBanco.origem} → ${rotaDoBanco.destino}`,
                vagas: `${ocupadas}/${total}`,
                classe: classeCss,
                origemReal: rotaDoBanco.origem,
                destinoReal: rotaDoBanco.destino,
                horario: rotaDoBanco.horario,
                dias: rotaDoBanco.dias || [],
              };
            });
          setAllCaronas(dadosFormatados);
          setCaronas(dadosFormatados);
        })
        .catch(err => console.error("Erro ao buscar:", err));
    }, []);
  // Helper function to normalize strings for accent-insensitive search
  const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  const handleBuscarClick = () => {
    const normalizedOrigem = normalizeString(origem);
    const normalizedDestino = normalizeString(destino);

    let caronasFiltradas = allCaronas.filter(c => {
      const matchOrigem = !origem || normalizeString(c.origemReal).includes(normalizedOrigem);
      const matchDestino = !destino || normalizeString(c.destinoReal).includes(normalizedDestino);
      const matchHorario = !horario || c.horario === horario;
      const matchDia = !dia || c.dias.includes(dia);
      return matchOrigem && matchDestino && matchHorario && matchDia;
    });
    setCaronas(caronasFiltradas);
  };

  const handleLimparFiltros = () => {
    setOrigem("");
    setDestino("");
    setHorario("");
    setDia("");
    setCaronas(allCaronas);
  };

  return (
    <div className="pagina-buscar">
      <Sidebar activePage="buscar" />

      <div className="conteudo-buscar">
        <h1>Buscar Caronas</h1>
        <p className="subtitulo">Encontre caronas disponíveis na sua região</p>

        <div className="filtros-container">
          <div className="filtro-titulo">
            <h3>Filtros de Busca</h3>
            <p>Defina seus critérios para encontrar a carona ideal</p>
          </div>

          <div className="filtros-inputs">
            <input 
              type="text" 
              placeholder="Origem (Bairro/Avenida)" 
              value={origem}
              onChange={(e) => setOrigem(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Destino (Bairro/Avenida)" 
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
            />
            <select value={horario} onChange={(e) => setHorario(e.target.value)}>
              <option value="">Selecione o horário</option>
              <option>07:30</option>
              <option>08:00</option>
              <option>12:00</option>
              <option>17:00</option>
              <option>18:00</option>
              <option>18:15</option>
              <option>18:30</option>
              <option>19:00</option>
            </select>
            <select value={dia} onChange={(e) => setDia(e.target.value)}>
              <option value="">Selecione o dia</option>
              <option>Segunda</option>
              <option>Terça</option>
              <option>Quarta</option>
              <option>Quinta</option>
              <option>Sexta</option>
            </select>
            <button className="btn-buscar" onClick={handleBuscarClick}>Buscar caronas</button>
            <button className="btn-limpar" onClick={handleLimparFiltros}>Limpar Filtros</button>
          </div>
        </div>

        <div className="conteudo-busca">
          <div className="resultados-container">
            {caronas.length === 0 && <p style={{padding: 20}}>Nenhuma carona encontrada com estes filtros.</p>}

            {caronas.map((c, i) => (
              <div
                key={c.id || i}
                className="carona-card"
                onClick={() => navigate('/buscar/conforimarcarona')} 
                style={{ cursor: 'pointer' }} 
              >
                <div className="carona-left">
                  <div className="carona-nome">
                    <strong>{c.nome}</strong>
                    <StarRating rating={c.rating} />
                  </div>
                  <p className="carona-rota">{c.rota}</p>
                </div>
                <div className={`carona-status ${c.classe}`}>{c.vagas} vagas</div>
              </div>
            ))}
          </div>

          <div className="dicas-container">
            <h3>💡 Dicas de Busca</h3>

            <div className="dica-bloco">
              <h4>Horários Mais Procurados</h4>
              <ul>
                {horariosPopulares.map(horario => (
                  <li key={horario}>{horario}</li>
                ))}
              </ul>
            </div>

            <div className="dica-bloco">
              <h4>Como Buscar</h4>
              <ul>
                <li>Use nomes de bairros ou avenidas</li>
                <li>Seja flexível com horários</li>
                <li>Considere pontos próximos</li>
              </ul>
            </div>

            <div className="dica-bloco">
              <h4>Bairros Populares</h4>
              <ul>
                {bairrosPopulares.map(bairro => (
                  <li key={bairro}>{bairro}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <BotaoAcessibilidade />
    </div>
  );
}