import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Infoicon from '../../assets/Dashboard/Info.png';
import "./PaginaDeRotas.css";

function HeaderRotas() {
  return (
    <header className="header-rotas">
      <h1>Criar Nova Rota</h1>
      <span className="subtitle">Ofereça uma carona para seus colegas de trabalho</span>
    </header>
  );
}

function FormularioRota({ handleSubmit, ...props }) {
  const dias = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
    "Domingo",
  ];

  return (
    <form className="form-rota" onSubmit={handleSubmit}>
      <section className="secao-informacoes">
        <div className="grupo">
          <label>Origem (Bairro/Avenida)</label>
          <input
            type="text"
            placeholder="Ex: Jardim São Paulo, Av. Liberdade"
            value={props.origem}
            onChange={(e) => props.setOrigem(e.target.value)}
          />
        </div>

        <div className="grupo">
          <label>Destino (Bairro/Avenida)</label>
          <input
            type="text"
            placeholder="Ex: Recife Antigo, Av. Alfredo Lisboa 810"
            value={props.destino}
            onChange={(e) => props.setDestino(e.target.value)}
          />
        </div>
      </section>

      <div className="grupo">
        <label>Pontos-chave do Trajeto</label>
        <textarea
          placeholder="Ex: Parada 1 - Av. Liberdade..."
          value={props.pontos}
          onChange={(e) => props.setPontos(e.target.value)}
        />
      </div>

      <section className="secao-horario">
        <div className="grupo">
          <label>Horário de Saída</label>
          <input
            type="time"
            value={props.horario}
            onChange={(e) => props.setHorario(e.target.value)}
          />
        </div>

        <div className="grupo dias-semana">
          <label>Dias da semana</label>
          <div className="dias-lista">
            {dias.map((dia) => (
              <label key={dia}>
                <input
                  type="checkbox"
                  checked={props.diasSemana.includes(dia)}
                  onChange={() => props.handleDiaChange(dia)}
                />
                {dia}
              </label>
            ))}
          </div>
        </div>
      </section>

      <div className="grupo">
        <label>Observações Adicionais</label>
        <textarea
          placeholder="Ex: Aceito apenas colegas da empresa..."
          value={props.observacoes}
          onChange={(e) => props.setObservacoes(e.target.value)}
        />
      </div>

      <section className="secao-final">
        <div className="grupo">
          <label>Número de Vagas</label>
          <select
            value={props.vagas}
            onChange={(e) => props.setVagas(e.target.value)}
          >
            <option value="">Selecione</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="grupo">
          <label>Valor por Pessoa (R$)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={props.valor}
            onChange={(e) => props.setValor(e.target.value)}
          />
        </div>

        <div className="grupo">
          <label>Nota Mínima</label>
          <select
            value={props.notaMinima}
            onChange={(e) => props.setNotaMinima(e.target.value)}
          >
            <option value="">Selecione</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} ⭐
              </option>
            ))}
          </select>
        </div>
      </section>

      <button type="submit" className="btn-criar">
        <img src={Infoicon} alt="Info" className="Infoicon" /> 
        <strong>Criar Rota</strong>
      </button>
    </form>
  );
}


const PaginaDeRotas = () => {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [pontos, setPontos] = useState("");
  const [horario, setHorario] = useState("");
  const [diasSemana, setDiasSemana] = useState([]);
  const [observacoes, setObservacoes] = useState("");
  const [vagas, setVagas] = useState("");
  const [valor, setValor] = useState("");
  const [notaMinima, setNotaMinima] = useState("");

  const handleDiaChange = (dia) => {
    setDiasSemana((prev) =>
      prev.includes(dia)
        ? prev.filter((d) => d !== dia)
        : [...prev, dia]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const novaRota = {
      origem,
      destino,
      pontos,
      horario,
      diasSemana,
      observacoes,
      vagas,
      valor,
      notaMinima,
    };

    console.log("🚗 Nova rota criada:", novaRota);
    alert("Rota criada com sucesso!");
    
    // Aqui você pode enviar para o backend via fetch/axios
  };

  return (
    <div className="pagina-rotas-container">
      <Sidebar />
      <main className="conteudo-rotas">
        <HeaderRotas />
        <FormularioRota
          handleSubmit={handleSubmit}
          origem={origem}
          setOrigem={setOrigem}
          destino={destino}
          setDestino={setDestino}
          pontos={pontos}
          setPontos={setPontos}
          horario={horario}
          setHorario={setHorario}
          diasSemana={diasSemana}
          handleDiaChange={handleDiaChange}
          observacoes={observacoes}
          setObservacoes={setObservacoes}
          vagas={vagas}
          setVagas={setVagas}
          valor={valor}
          setValor={setValor}
          notaMinima={notaMinima}
          setNotaMinima={setNotaMinima}
        />
      </main>
    </div>
  );
};

export default PaginaDeRotas;