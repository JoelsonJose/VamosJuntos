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

  // ... (toda a sua lógica de 'useState' e 'useEffect' continua igual) ...
  const [enabled, setEnabled] = useState(() => 
    getEstadoInicial("acessibilidade-enabled", true)
  );
  const [dark, setDark] = useState(() => 
    getEstadoInicial("acessibilidade-dark", false)
  );
  const [daltonico, setDaltonico] = useState(() => 
    getEstadoInicial("acessibilidade-daltonico", false)
  );
  const [espacamento, setEspacamento] = useState(() => 
    getEstadoInicial("acessibilidade-espacamento", false)
  );

  useEffect(() => {
    localStorage.setItem("acessibilidade-enabled", JSON.stringify(enabled));
    localStorage.setItem("acessibilidade-dark", JSON.stringify(dark));
    localStorage.setItem("acessibilidade-daltonico", JSON.stringify(daltonico));
    localStorage.setItem("acessibilidade-espacamento", JSON.stringify(espacamento));

    if (enabled) {
      document.body.classList.toggle("modo-escuro", dark);
      document.body.classList.toggle("modo-daltonico", daltonico);
      document.body.classList.toggle("espacamento-letra", espacamento);
    } else {
      document.body.classList.remove("modo-escuro", "modo-daltonico", "espacamento-letra");
    }
  }, [enabled, dark, daltonico, espacamento]);


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
          {/* --- MUDANÇA AQUI --- */}
          <label> 
            <input
              type="checkbox"
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
            />
            {/* Texto envolvido em um <span> */}
            <span className="label-texto">Acessibilidade {enabled ? "On" : "Off"}</span>
          </label>

          {enabled && (
            <>
              {/* --- MUDANÇA AQUI --- */}
              <label>
                <input
                  type="checkbox"
                  checked={dark}
                  onChange={() => setDark(!dark)}
                />
                {/* Texto envolvido em um <span> */}
                <span className="label-texto">Modo Escuro</span>
              </label>
              {/* --- MUDANÇA AQUI --- */}
              <label>
                <input
                  type="checkbox"
                  checked={daltonico}
                  onChange={() => setDaltonico(!daltonico)}
                />
                {/* Texto envolvido em um <span> */}
                <span className="label-texto">Modo Daltônico</span>
              </label>
              {/* --- MUDANÇA AQUI --- */}
              <label>
                <input
                  type="checkbox"
                  checked={espacamento}
                  onChange={() => setEspacamento(!espacamento)}
                />
                {/* Texto envolvido em um <span> */}
                <span className="label-texto">Espaçamento de Letra</span>
              </label>
            </>
          )}
        </div>
      )}
    </div>
  );
}