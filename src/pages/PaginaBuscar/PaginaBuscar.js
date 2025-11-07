import './PaginaBuscar.css';
import Sidebar from '../../components/Sidebar/Sidebar'; 
import StarYellow from '../../assets/Star amarela.png';
import StarWhite from '../../assets/Star branca.png';
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';

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
  const caronas = [
    { nome: "João Silva", rating: 4, rota: "Av. Alfredo Lisboa 810, Empresa → Jardim São Paulo, Casa", vagas: "3/4", classe: "vagas3" },
    { nome: "Maria Santos", rating: 3, rota: "Jardim São Paulo, Casa → Av. Alfredo Lisboa 810, Empresa", vagas: "1/4", classe: "vagas1" },
    { nome: "Pedro Lima", rating: 5, rota: "Av. Alfredo Lisboa 810, Empresa → Jardim São Paulo, Casa", vagas: "4/4", classe: "vagas4" },
    { nome: "Carla Menezes", rating: 2, rota: "Boa Viagem → Derby", vagas: "2/4", classe: "vagas2" },
    { nome: "Lucas Andrade", rating: 4, rota: "Casa Amarela → Recife Antigo", vagas: "3/4", classe: "vagas3" },
    { nome: "Fernanda Costa", rating: 5, rota: "Torre → Pina", vagas: "4/4", classe: "vagas4" },
    { nome: "Ricardo Alves", rating: 3, rota: "Imbiribeira → Boa Vista", vagas: "1/4", classe: "vagas1" },
  ];

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

        <div className="conteudo-busca">
          <div className="resultados-container">
            {caronas.map((c, i) => (
              <div key={i} className="carona-card">
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
