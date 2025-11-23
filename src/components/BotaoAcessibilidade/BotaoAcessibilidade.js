import React, { useState, useEffect, useRef } from "react"; // 1. Importe useRef
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
  
  // 2. Criar a referência para o container do botão
  const menuRef = useRef(null);

  const [enabled, setEnabled] = useState(() => 
    getEstadoInicial("acessibilidade-enabled", true)
  );
  const [dark, setDark] = useState(() => 
    getEstadoInicial("acessibilidade-dark", false)
  );
  const [altoContraste, setAltoContraste] = useState(() => 
    getEstadoInicial("acessibilidade-alto-contraste", false)
  );
  const [espacamento, setEspacamento] = useState(() => 
    getEstadoInicial("acessibilidade-espacamento", false)
  );

  // 3. Lógica para detectar clique fora e fechar
  useEffect(() => {
    function handleClickOutside(event) {
      // Se o menu estiver aberto E o clique foi fora do componente
      if (open && menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    // Adiciona o ouvinte de evento
    document.addEventListener("mousedown", handleClickOutside);
    
    // Limpa o ouvinte quando o componente desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Efeito para aplicar as classes ao body
  useEffect(() => {
    localStorage.setItem("acessibilidade-enabled", JSON.stringify(enabled));
    localStorage.setItem("acessibilidade-dark", JSON.stringify(dark));
    localStorage.setItem("acessibilidade-alto-contraste", JSON.stringify(altoContraste));
    localStorage.setItem("acessibilidade-espacamento", JSON.stringify(espacamento));

    if (enabled) {
      document.body.classList.toggle("modo-escuro", dark);
      document.body.classList.toggle("modo-alto-contraste", altoContraste);
      document.body.classList.toggle("espacamento-letra", espacamento);
    } else {
      document.body.classList.remove("modo-escuro", "modo-alto-contraste", "espacamento-letra");
    }
  }, [enabled, dark, altoContraste, espacamento]);


  return (
    // 4. Adicionar a ref no container principal
    <div className="botao-acessibilidade-container" ref={menuRef}>
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