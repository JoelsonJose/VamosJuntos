import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'; 
import Sidebar from '../../components/Sidebar/Sidebar';
import "./PaginaEditarRotas.css"; 
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';
import { API_URL } from '../../Config'; 
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import IconMapa from '../../assets/IconsCriar/IconMapa.png';
import IconRota from '../../assets/IconsCriar/IconRota.png';
import IconRelogio from '../../assets/IconsCriar/IconRelogio.png';
import IconCalendario from '../../assets/IconsCriar/IconCalendario.png';
import IconPessoas from '../../assets/IconsCriar/IconPessoas.png';
import IconDinheiro from '../../assets/IconsCriar/IconDinheiro.png';
import IconEstrela from '../../assets/IconsCriar/IconEstrela.png';

export default function PaginaEditarRota() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [pontos, setPontos] = useState("");
  const [horario, setHorario] = useState("");
  const [diasSemana, setDiasSemana] = useState([]);
  const [observacoes, setObservacoes] = useState("");
  const [vagas, setVagas] = useState(""); 
  const [valor, setValor] = useState("");
  const [notaMinima, setNotaMinima] = useState("");
  const [rotaOriginal, setRotaOriginal] = useState({});

    const [modalConfig, setModalConfig] = useState({
          isOpen: false,
          title: '',
          message: '',
          isAlertOnly: false,
          onConfirm: null
        });
      
    const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });
    
  const dias = [
    "Segunda-feira", "Terça-feira", "Quarta-feira", 
    "Quinta-feira", "Sexta-feira", "Sábado",
  ];

  useEffect(() => {
    if (id) {
      // CORREÇÃO: Usando API_URL
      fetch(`${API_URL}/rotas/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setOrigem(data.origem);
          setDestino(data.destino);
          setPontos(data.pontos || "");
          setHorario(data.horario);
          setDiasSemana(data.dias || []);
          setObservacoes(data.observacoes || "");
          setVagas(data.vagasTotal); 
          setValor(data.valor);
          setNotaMinima(data.notaMinima);
          setRotaOriginal(data); 
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rotaAtualizada = {
      ...rotaOriginal, 
      origem, 
      destino, 
      pontos, 
      horario, 
      dias: diasSemana, 
      observacoes, 
      vagasTotal: Number(vagas), 
      valor, 
      notaMinima,
    };

    try {
      // CORREÇÃO CRÍTICA: Trocado localhost por API_URL
      const response = await fetch(`${API_URL}/rotas/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rotaAtualizada),
      });

      if (response.ok) {
        setModalConfig({
            isOpen: true,
            title: 'Sucesso',
            message: 'Rota atualizada com sucesso!',
            isAlertOnly: true,
            onConfirm: () => {
                closeModal();
                navigate('/rotas'); 
            }
        });
      } else {
        setModalConfig({
            isOpen: true,
            title: 'Erro',
            message: 'Não foi possível atualizar a rota.',
            isAlertOnly: true,
            onConfirm: closeModal
        });
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setModalConfig({
            isOpen: true,
            title: 'Erro',
            message: 'Erro ao conectar com o servidor.',
            isAlertOnly: true,
            onConfirm: closeModal
        });
    }
  };

  return (
    <div className="pagina-criar-rotas-container">
      <Sidebar activePage="rotas" />
      <main className="conteudo-rotas">
        <h1>Editar Rota</h1>
        <p className="subtitulo">Edite as informações da sua carona</p>
        <form className="form-card-principal" onSubmit={handleSubmit}>
          {/* Conteúdo do formulário mantido igual... */}
          <div className="grupo-inline">
            <div className="grupo">
              <label><img src={IconMapa} className="input-icon" alt=""/> Origem</label>
              <input type="text" value={origem} onChange={(e) => setOrigem(e.target.value)} required />
            </div>
            <div className="grupo">
              <label><img src={IconMapa} className="input-icon" alt=""/> Destino</label>
              <input type="text" value={destino} onChange={(e) => setDestino(e.target.value)} required />
            </div>
          </div>
          
          <div className="grupo">
            <label><img src={IconRota} className="input-icon" alt=""/> Pontos-chave</label>
            <textarea value={pontos} onChange={(e) => setPontos(e.target.value)} />
          </div>

          <hr className="form-divider" />

          <div className="grupo-inline">
            <div className="grupo horario-saida-grupo">
              <label><img src={IconRelogio} className="input-icon" alt=""/> Horário</label>
              <input type="time" value={horario} onChange={(e) => setHorario(e.target.value)} required />
            </div>
            <div className="grupo dias-semana-grupo">
              <label><img src={IconCalendario} className="input-icon" alt=""/> Dias da semana</label>
              <div className="dias-lista-grid">
                {dias.map((dia) => (
                  <label key={dia} className="checkbox-item">
                    <input type="checkbox" checked={diasSemana.includes(dia)} onChange={() => handleDiaChange(dia)} />
                    <span>{dia}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <hr className="form-divider" />
          <div className="grupo"><label>Observações</label><textarea value={observacoes} onChange={(e) => setObservacoes(e.target.value)} /></div>
          <hr className="form-divider" />
          
          <div className="grupo-inline-final">
            <div className="grupo">
              <label><img src={IconPessoas} className="input-icon" alt=""/> Vagas Totais</label>
              <select value={vagas} onChange={(e) => setVagas(e.target.value)} required>
                <option value="">Selecione</option>
                {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="grupo">
              <label><img src={IconDinheiro} className="input-icon" alt=""/> Valor (R$)</label>
              <select value={valor} onChange={(e) => setValor(e.target.value)}>
                <option value="">Selecione</option>
                {['Gratuito', '5.00', '10.00', '15.00', '20.00'].map((val) => <option key={val} value={val}>{val}</option>)}
              </select>
            </div>
            <div className="grupo">
              <label><img src={IconEstrela} className="input-icon" alt=""/> Nota Mínima</label>
              <select value={notaMinima} onChange={(e) => setNotaMinima(e.target.value)}>
                <option value="">Selecione</option>
                {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} ⭐</option>)}
              </select>
            </div>
          </div>
          
          <button type="submit" className="btn-criar-rota-final">Salvar Alterações</button>
        </form>
      </main>
      <BotaoAcessibilidade />
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        isAlertOnly={modalConfig.isAlertOnly}
        onClose={closeModal}
        onConfirm={() => {
          if (modalConfig.onConfirm) modalConfig.onConfirm();
        }}
      />
    </div>
  );
};