import React, { useState } from "react";
import Sidebar from '../../components/Sidebar/Sidebar'; // Corrigido (sem chaves)
import "./PaginaEditarRotas.css"; 
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';

// Importe os ícones do seu protótipo
// (Verifique se esses caminhos e nomes estão corretos)
import IconMapa from '../../assets/IconsCriar/IconMapa.png';
import IconRota from '../../assets/IconsCriar/IconRota.png';
import IconRelogio from '../../assets/IconsCriar/IconRelogio.png';
import IconCalendario from '../../assets/IconsCriar/IconCalendario.png';
import IconPessoas from '../../assets/IconsCriar/IconPessoas.png';
import IconDinheiro from '../../assets/IconsCriar/IconDinheiro.png';
import IconEstrela from '../../assets/IconsCriar/IconEstrela.png';


export default function PaginaCriarRota() {
  // --- Todo o estado e lógica agora vivem no componente principal ---
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [pontos, setPontos] = useState("");
  const [horario, setHorario] = useState("");
  const [diasSemana, setDiasSemana] = useState([]);
  const [observacoes, setObservacoes] = useState("");
  const [vagas, setVagas] = useState("");
  const [valor, setValor] = useState("");
  const [notaMinima, setNotaMinima] = useState("");

  const dias = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const handleDiaChange = (dia) => {
    setDiasSemana((prev) =>
      prev.includes(dia)
        ? prev.filter((d) => d !== dia)
        : [...prev, dia]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaRota = { origem, destino, pontos, horario, diasSemana, observacoes, vagas, valor, notaMinima };
    console.log("🚗 Nova rota criada:", novaRota);
    alert("Rota criada com sucesso!");
  };

  return (
    // 1. Layout Padrão da Página (Container Flex)
    <div className="pagina-criar-rotas-container">
      <Sidebar activePage="rotas" /> {/* Define o item 'Criar Rotas' como ativo */}
      
      {/* 2. Área de Conteúdo Principal (com margem e padding corretos) */}
      <main className="conteudo-rotas">
        <h1 className="page-main-title">Editar Rota</h1>
        <span className="page-main-subtitle">Edite sua carona para oferecer aos seus colegas de trabalho</span>
        
        {/* 3. O CARD BRANCO ÚNICO (que é o formulário) */}
        <form className="form-card-principal" onSubmit={handleSubmit}>
          
          {/* --- Seção Informações da Rota --- */}
          <h2 className="form-section-title">
            Informações da Rota
          </h2>
          <p className="form-section-subtitle">Preencha os detalhes da sua carona</p>

          <div className="grupo-inline">
            <div className="grupo">
              <label>
                <img src={IconMapa} alt="Origem" className="input-icon" />
                Origem (Bairro/Avenida)
              </label>
              <input
                type="text"
                placeholder="Ex: Jardim São Paulo, Av. Liberdade"
                value={origem}
                onChange={(e) => setOrigem(e.target.value)}
              />
            </div>
            <div className="grupo">
              <label>
                <img src={IconMapa} alt="Destino" className="input-icon" />
                Destino (Bairro/Avenida)
              </label>
              <input
                type="text"
                placeholder="Ex: Recife Antigo, Av. Alfredo Lisboa 810"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grupo">
            <label>
              <img src={IconRota} alt="Rota" className="input-icon" />
              Pontos-chave do Trajeto
            </label>
            <textarea
              placeholder="Ex: Parada 1 - Av. Liberdade..."
              value={pontos}
              onChange={(e) => setPontos(e.target.value)}
            />
          </div>

          {/* --- Divisória --- */}
          <hr className="form-divider" />

          {/* --- Seção Horário/Dias --- */}
          <div className="grupo-inline">
            <div className="grupo horario-saida-grupo">
              <label>
                <img src={IconRelogio} alt="Horário" className="input-icon" />
                Horário de Saída
              </label>
              <input
                type="time"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
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

          {/* --- Divisória --- */}
          <hr className="form-divider" />

          {/* --- Seção Observações --- */}
          <div className="grupo">
            <label>
              Observações Adicionais
            </label>
            <textarea
              placeholder="Ex: Aceito apenas colegas da empresa..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            />
          </div>

          {/* --- Divisória --- */}
          <hr className="form-divider" />
          
          {/* --- Seção Configurações --- */}
          <div className="grupo-inline-final">
            <div className="grupo">
              <label>
                <img src={IconPessoas} alt="Vagas" className="input-icon" />
                Número de Vagas
              </label>
              <select value={vagas} onChange={(e) => setVagas(e.target.value)}>
                <option value="">Selecione</option>
                {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            <div className="grupo">
              <label>
                <img src={IconDinheiro} alt="Valor" className="input-icon" />
                Valor por Pessoa (R$)
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

          {/* --- Botão Final --- */}
          <button type="submit" className="btn-criar-rota-final">
            Editar Rota
          </button>
        </form>
      </main>
      <BotaoAcessibilidade />
    </div>
  );
};
