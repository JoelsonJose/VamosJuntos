import React, { useState, useEffect } from 'react';
import './PaginaBuscar.css';
import Sidebar from '../../components/Sidebar/Sidebar'; 
import StarYellow from '../../assets/Star amarela.png';
import StarWhite from '../../assets/Star branca.png';
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';
import { useNavigate } from 'react-router-dom';

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
  const [caronas, setCaronas] = useState([]);

  // Estados dos filtros
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");

  // Busca os dados do servidor
  useEffect(() => {
    fetch('http://localhost:3001/rotas')
      .then(response => response.json())
      .then(data => {
        // Transforma os dados do banco para o visual do seu design
        const dadosFormatados = data.map(rotaDoBanco => {
          
          const total = Number(rotaDoBanco.vagasTotal) || 4;
          const ocupadas = Number(rotaDoBanco.vagasOcupadas) || 0;
          const livres = total - ocupadas;
          
          // Lógica para manter suas cores (classes CSS)
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
            destinoReal: rotaDoBanco.destino
          };
        });
        setCaronas(dadosFormatados);
      })
      .catch(err => console.error("Erro ao buscar:", err));
  }, []);

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
            <select>
              <option>Selecione o horário</option>
              <option>08:00</option>
              <option>12:00</option>
              <option>18:00</option>
            </select>
            <select>
              <option>Selecione o dia</option>
              <option>Segunda</option>
              <option>Terça</option>
              <option>Quarta</option>
              <option>Quinta</option>
              <option>Sexta</option>
            </select>
            <button className="btn-buscar">Buscar caronas</button>
          </div>
        </div>

        <div className="conteudo-busca">
          <div className="resultados-container">
            {caronas.length === 0 && <p style={{padding: 20}}>Carregando caronas...</p>}

            {caronas
              .filter(c => 
                  c.rota.toLowerCase().includes(origem.toLowerCase()) && 
                  c.rota.toLowerCase().includes(destino.toLowerCase())
              )
              .map((c, i) => (
              <div
                key={c.id || i}
                className="carona-card"
                // AQUI FOI CORRIGIDO: Agora clica em qualquer card
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
                <li>08:00 - Entrada no trabalho</li>
                <li>12:00 - Almoço</li>
                <li>18:00 - Saída do trabalho</li>
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
                <li>Jardim São Paulo</li>
                <li>Casa Amarela</li>
                <li>Graças</li>
                <li>Torrões</li>
                <li>Santo Amaro</li>
                <li>Engenho do Meio</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <BotaoAcessibilidade />
    </div>
  );
}