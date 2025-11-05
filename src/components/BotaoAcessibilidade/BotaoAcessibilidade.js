import React, { useState, useEffect } from "react";
import "./BotaoAcessibilidade.css";

// --- Função Helper para ler o localStorage ---
// Tenta ler um item do localStorage. Se não existir ou for inválido, retorna 'valorInicial'.
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

  // 1. INICIALIZAR O ESTADO A PARTIR DO LOCALSTORAGE
  // Em vez de useState(true), usamos uma função que lê o localStorage.
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

  // 2. EFEITO PARA SALVAR NO LOCALSTORAGE E APLICAR CLASSES
  // Este useEffect agora faz duas coisas:
  // - Salva qualquer mudança no localStorage
  // - Aplica/Remove as classes do <body>
  useEffect(() => {
    // Salva as configurações atuais no localStorage
    localStorage.setItem("acessibilidade-enabled", JSON.stringify(enabled));
    localStorage.setItem("acessibilidade-dark", JSON.stringify(dark));
    localStorage.setItem("acessibilidade-daltonico", JSON.stringify(daltonico));
    localStorage.setItem("acessibilidade-espacamento", JSON.stringify(espacamento));

    // Aplica ou remove as classes do <body>
    if (enabled) {
      document.body.classList.toggle("modo-escuro", dark);
      document.body.classList.toggle("modo-daltonico", daltonico);
      document.body.classList.toggle("espacamento-letra", espacamento);
    } else {
      // Limpa todas as classes se a acessibilidade for desativada
      document.body.classList.remove("modo-escuro", "modo-daltonico", "espacamento-letra");
    }
    // Dependências: Roda este efeito sempre que qualquer um destes estados mudar
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
          <label>
            <input
              type="checkbox"
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
            />
            Acessibilidade {enabled ? "On" : "Off"}
          </label>

          {enabled && (
            <>
              <label>
                <input
                  type="checkbox"
                  checked={dark}
                  onChange={() => setDark(!dark)}
                />
                Modo Escuro
              </label>
              <label>
                <input
              m   type="checkbox"
                  checked={daltonico}
                  onChange={() => setDaltonico(!daltonico)}
                />
                Modo Daltônico
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={espacamento}
                  onChange={() => setEspacamento(!espacamento)}
                />
                Espaçamento de Letra
              </label>
            </>
          )}
        </div>
      )}
    </div>
  );
}