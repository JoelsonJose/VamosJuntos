import React from 'react';
import './PaginaBuscar.css';
import Sidebar from '../../components/Sidebar/Sidebar'; // caminho que você já tem
import StarYellow from '../../assets/Star amarela.png';
import StarWhite from '../../assets/Star branca.png';

function StarRating({ rating = 0, max = 5 }) {
  // rating: número inteiro entre 0 e max
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
  return (
    <div className="pagina-buscar">
      <Sidebar activePage="buscar" />

      <div className="conteudo-buscar">
        <h1>Buscar Caronas</h1>
        <p className="subtitulo">Encontre caronas disponíveis na sua região</p>

        {/* filtros (mantém o que você já tem) */}
        <div className="filtros-container">
          <div className="filtro-titulo">
            <h3>Filtros de Busca</h3>
            <p>Defina seus critérios para encontrar a carona ideal</p>
          </div>

          <div className="filtros-inputs">
            <input type="text" placeholder="Origem (Bairro/Avenida)" />
            <input type="text" placeholder="Destino (Bairro/Avenida)" />
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

        {/* resultados + dicas */}
        <div className="conteudo-busca">
          <div className="resultados-container">
            {/* exemplo de cards */}
            <div className="carona-card">
              <div className="carona-left">
                <div className="carona-nome">
                  <strong>João Silva</strong>
                <StarRating rating={4} />
                </div>
                <p className="carona-rota">Av. Alfredo Lisboa 810, Empresa → Jardim São Paulo, Casa</p>
              </div>
              <div className="carona-status vagas3">3/4 vagas</div>
            </div>

            <div className="carona-card">
              <div className="carona-left">
                <div className="carona-nome">
                  <strong>Maria Santos</strong>
                   <StarRating rating={3} />
                </div>
                <p className="carona-rota">Jardim São Paulo, Casa → Av. Alfredo Lisboa 810, Empresa</p>
              </div>
              <div className="carona-status vagas1">1/4 vagas</div>
            </div>

            <div className="carona-card">
              <div className="carona-left">
                <div className="carona-nome">
                  <strong>Pedro Lima</strong>
                 <StarRating rating={5} />
                </div>
                <p className="carona-rota">Av. Alfredo Lisboa 810, Empresa → Jardim São Paulo, Casa</p>
              </div>
              <div className="carona-status vagas4">4/4 vagas</div>
            </div>
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
    </div>
  );
}