import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'; // Importe useParams
import Sidebar from '../../components/Sidebar/Sidebar';
import "./PaginaEditarRotas.css"; 
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';
import { API_URL } from '../../Config';

// Importe os ícones
import IconMapa from '../../assets/IconsCriar/IconMapa.png';
import IconRota from '../../assets/IconsCriar/IconRota.png';
import IconRelogio from '../../assets/IconsCriar/IconRelogio.png';
import IconCalendario from '../../assets/IconsCriar/IconCalendario.png';
import IconPessoas from '../../assets/IconsCriar/IconPessoas.png';
import IconDinheiro from '../../assets/IconsCriar/IconDinheiro.png';
import IconEstrela from '../../assets/IconsCriar/IconEstrela.png';

export default function PaginaEditarRota() {
  const navigate = useNavigate();
  const { id } = useParams(); // PEGA O ID DA URL (ex: 1)

  // Estados do formulário
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [pontos, setPontos] = useState("");
  const [horario, setHorario] = useState("");
  const [diasSemana, setDiasSemana] = useState([]);
  const [observacoes, setObservacoes] = useState("");
  const [vagas, setVagas] = useState(""); // Corresponde a vagasTotal
  const [valor, setValor] = useState("");
  const [notaMinima, setNotaMinima] = useState("");
  
  // Estado para guardar os dados originais (para não perder vagasOcupadas, dono, etc.)
  const [rotaOriginal, setRotaOriginal] = useState({});

  const dias = [
    "Segunda-feira", "Terça-feira", "Quarta-feira", 
    "Quinta-feira", "Sexta-feira", "Sábado",
  ];

  // 1. BUSCAR DADOS DA ROTA AO ABRIR A TELA
  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/rotas/${id}`)
        .then((res) => res.json())
        .then((data) => {
          // Preenche os campos com o que veio do banco
          setOrigem(data.origem);
          setDestino(data.destino);
          setPontos(data.pontos || "");
          setHorario(data.horario);
          setDiasSemana(data.dias || []);
          setObservacoes(data.observacoes || "");
          setVagas(data.vagasTotal); // Mapeia vagasTotal para o input vagas
          setValor(data.valor);
          setNotaMinima(data.notaMinima);
          
          setRotaOriginal(data); // Guarda o objeto completo
        })
        .catch((err) => console.error("Erro ao buscar rota para edição:", err));
    }
  }, [id]);

  const handleDiaChange = (dia) => {
    setDiasSemana((prev) =>
      prev.includes(dia)
        ? prev.filter((d) => d !== dia)
        : [...prev, dia]
    );
  };

  // 2. ATUALIZAR (PUT) OS DADOS NO BACK-END
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mescla os dados originais com os novos editados
    const rotaAtualizada = {
      ...rotaOriginal, // Mantém id, vagasOcupadas, dono:true, etc.
      origem, 
      destino, 
      pontos, 
      horario, 
      dias: diasSemana, 
      observacoes, 
      vagasTotal: Number(vagas), // Atualiza o total de vagas
      valor, 
      notaMinima,
    };

    try {
      const response = await fetch(`http://localhost:3001/rotas/${id}`, {
        method: 'PUT', // PUT serve para atualizar
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rotaAtualizada),
      });

      if (response.ok) {
        alert("Rota atualizada com sucesso!");
        navigate('/rotas'); // Volta para Minhas Rotas
      } else {
        alert("Erro ao atualizar rota.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="pagina-criar-rotas-container">
      <Sidebar activePage="rotas" />
      
      <main className="conteudo-rotas">
        <h1 className="page-main-title">Editar Rota</h1>
        <span className="page-main-subtitle">Edite as informações da sua carona</span>
        
        <form className="form-card-principal" onSubmit={handleSubmit}>
          
          {/* --- Seção Informações da Rota --- */}
          <h2 className="form-section-title">Informações da Rota</h2>
          <p className="form-section-subtitle">Altere os detalhes necessários</p>

          <div className="grupo-inline">
            <div className="grupo">
              <label>
                <img src={IconMapa} alt="Origem" className="input-icon" />
                Origem
              </label>
              <input
                type="text"
                value={origem}
                onChange={(e) => setOrigem(e.target.value)}
                required
              />
            </div>
            <div className="grupo">
              <label>
                <img src={IconMapa} alt="Destino" className="input-icon" />
                Destino
              </label>
              <input
                type="text"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grupo">
            <label>
              <img src={IconRota} alt="Rota" className="input-icon" />
              Pontos-chave
            </label>
            <textarea
              value={pontos}
              onChange={(e) => setPontos(e.target.value)}
            />
          </div>

          <hr className="form-divider" />

          <div className="grupo-inline">
            <div className="grupo horario-saida-grupo">
              <label>
                <img src={IconRelogio} alt="Horário" className="input-icon" />
                Horário
              </label>
              <input
                type="time"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                required
              />
            </div>
            <div className="grupo dias-semana-grupo">
              <label>
                <img src={IconCalendario} alt="Dias" className="input-icon" />
                Dias da semana
              </label>
              <div className="dias-lista-grid">
                {dias.map((dia) => (
                  <label key={dia} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={diasSemana.includes(dia)}
                      onChange={() => handleDiaChange(dia)}
                    />
                    <span>{dia}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <hr className="form-divider" />

          <div className="grupo">
            <label>Observações</label>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            />
          </div>

          <hr className="form-divider" />
          
          <div className="grupo-inline-final">
            <div className="grupo">
              <label>
                <img src={IconPessoas} alt="Vagas" className="input-icon" />
                Vagas Totais
              </label>
              <select value={vagas} onChange={(e) => setVagas(e.target.value)} required>
                <option value="">Selecione</option>
                {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            <div className="grupo">
              <label>
                <img src={IconDinheiro} alt="Valor" className="input-icon" />
                Valor (R$)
              </label>
              <select value={valor} onChange={(e) => setValor(e.target.value)}>
                <option value="">Selecione</option>
                {['Gratuito', '5.00', '10.00', '15.00', '20.00'].map((val) => <option key={val} value={val}>{val}</option>)}
              </select>
            </div>

            <div className="grupo">
              <label>
                <img src={IconEstrela} alt="Nota" className="input-icon" />
                Nota Mínima
              </label>
              <select value={notaMinima} onChange={(e) => setNotaMinima(e.target.value)}>
                <option value="">Selecione</option>
                {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} ⭐</option>)}
              </select>
            </div>
          </div>

          <button type="submit" className="btn-criar-rota-final">
            Salvar Alterações
          </button>
        </form>
      </main>
      <BotaoAcessibilidade />
    </div>
  );
};