import React, { useState, useEffect } from "react";
import "./BotaoAcessibilidade.css";

// --- Função Helper para ler o localStorage ---
function getEstadoInicial(key, valorInicial) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : valorInicial;
  } catch (error) {
    console.warn(`Erro ao ler localStorage key "${key}":`, error);
    return valorInicial;
  }
}

export default function BotaoAcessibilidade() {
  const [open, setOpen] = useState(false);

  // --- MUDANÇA AQUI ---
  const [enabled, setEnabled] = useState(() => 
    getEstadoInicial("acessibilidade-enabled", true)
  );
  const [dark, setDark] = useState(() => 
    getEstadoInicial("acessibilidade-dark", false)
  );
  // 'daltonico' foi trocado por 'altoContraste'
  const [altoContraste, setAltoContraste] = useState(() => 
    getEstadoInicial("acessibilidade-alto-contraste", false)
  );
  const [espacamento, setEspacamento] = useState(() => 
    getEstadoInicial("acessibilidade-espacamento", false)
  );

  // --- MUDANÇA AQUI ---
  useEffect(() => {
    localStorage.setItem("acessibilidade-enabled", JSON.stringify(enabled));
    localStorage.setItem("acessibilidade-dark", JSON.stringify(dark));
    localStorage.setItem("acessibilidade-alto-contraste", JSON.stringify(altoContraste)); // Salva o novo estado
    localStorage.setItem("acessibilidade-espacamento", JSON.stringify(espacamento));

    if (enabled) {
      document.body.classList.toggle("modo-escuro", dark);
      document.body.classList.toggle("modo-alto-contraste", altoContraste); // Aplica a nova classe
      document.body.classList.toggle("espacamento-letra", espacamento);
    } else {
      document.body.classList.remove("modo-escuro", "modo-alto-contraste", "espacamento-letra");
    }
  }, [enabled, dark, altoContraste, espacamento]); // Adiciona o novo estado às dependências


  return (
    <div className="botao-acessibilidade-container">
      <button
        className="botao-acessibilidade"
        onClick={() => setOpen(!open)}
      >
      <img
        src="https://www.sorocaba.sp.gov.br/conselhos-municipais/wp-content/uploads/2019/08/conselhos-municipais-o-simbolo-de-acessibilidade-logo-universal.png"
        alt="Acessibilidade"
        style={{ width: "36px", height: "36px" }}
      />
      </button>

      {open && (
        <div className="painel-acessibilidade">
          <label> 
            <input
              type="checkbox"
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
            />
            <span className="label-texto">Acessibilidade {enabled ? "On" : "Off"}</span>
          </label>

          {enabled && (
            <>
              <label>
                <input
                  type="checkbox"
                  checked={dark}
                  onChange={() => setDark(!dark)}
                />
                <span className="label-texto">Modo Escuro</span>
              </label>
              
              {/* --- MUDANÇA AQUI --- */}
              <label>
                <input
                  type="checkbox"
                  checked={altoContraste}
                  onChange={() => setAltoContraste(!altoContraste)}
                />
                <span className="label-texto">Alto Contraste</span>
              </label>
              
              <label>
                <input
                  type="checkbox"
                  checked={espacamento}
                  onChange={() => setEspacamento(!espacamento)}
                />
                <span className="label-texto">Espaçamento de Letra</span>
              </label>
            </>
          )}
        </div>
      )}
    </div>
  );
}