import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import Sidebar from '../../components/Sidebar/Sidebar';
import "./PaginaCriarRota.css"; 
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';

// Importe os ícones
import IconMapa from '../../assets/IconsCriar/IconMapa.png';
import IconRota from '../../assets/IconsCriar/IconRota.png';
import IconRelogio from '../../assets/IconsCriar/IconRelogio.png';
import IconCalendario from '../../assets/IconsCriar/IconCalendario.png';
import IconPessoas from '../../assets/IconsCriar/IconPessoas.png';
import IconDinheiro from '../../assets/IconsCriar/IconDinheiro.png';
import IconEstrela from '../../assets/IconsCriar/IconEstrela.png';

export default function PaginaCriarRota() {
  const navigate = useNavigate(); 

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
    "Segunda-feira", "Terça-feira", "Quarta-feira", 
    "Quinta-feira", "Sexta-feira", "Sábado",
  ];

  const handleDiaChange = (dia) => {
    setDiasSemana((prev) =>
      prev.includes(dia)
        ? prev.filter((d) => d !== dia)
        : [...prev, dia]
    );
  };

  // 2. FUNÇÃO DE ENVIO CONECTADA AO BACK-END
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação básica
    if (!origem || !destino || !horario || !vagas) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }

    // Monta o objeto igual ao formato do db.json
    const novaRota = { 
      origem, 
      destino, 
      pontos, 
      horario, 
      dias: diasSemana, 
      observacoes, 
      vagasTotal: Number(vagas), 
      vagasOcupadas: 0,          
      valor, 
      notaMinima,
      ativa: true,
      novasSolicitacoes: 0,
      
      // --- CORREÇÃO AQUI ---
      dono: true,          // Isso garante que apareça em "Minhas Rotas"
      motorista: "Você"    // Para aparecer seu nome na busca
    };

    try {
      const response = await fetch('http://localhost:3001/rotas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaRota),
      });

      if (response.ok) {
        alert("Rota criada com sucesso!");
        navigate('/rotas'); // Redireciona para a tela de Minhas Rotas
      } else {
        alert("Erro ao criar rota no servidor.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor. Verifique se o json-server está rodando.");
    }
  };

  return (
    <div className="pagina-criar-rotas-container">
      <Sidebar activePage="criar" />
      
      <main className="conteudo-rotas">
        <h1 className="page-main-title">Criar Nova Rota</h1>
        <span className="page-main-subtitle">Ofereça uma carona para seus colegas de trabalho</span>
        
        <form className="form-card-principal" onSubmit={handleSubmit}>
          
          {/* --- Seção Informações da Rota --- */}
          <h2 className="form-section-title">Informações da Rota</h2>
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
                required
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
                required
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

          {/* --- Seção Observações --- */}
          <div className="grupo">
            <label>Observações Adicionais</label>
            <textarea
              placeholder="Ex: Aceito apenas colegas da empresa..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            />
          </div>

          <hr className="form-divider" />
          
          {/* --- Seção Configurações --- */}
          <div className="grupo-inline-final">
            <div className="grupo">
              <label>
                <img src={IconPessoas} alt="Vagas" className="input-icon" />
                Número de Vagas
              </label>
              <select value={vagas} onChange={(e) => setVagas(e.target.value)} required>
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
            Criar Rota
          </button>
        </form>
      </main>
      <BotaoAcessibilidade />
    </div>
  );
};