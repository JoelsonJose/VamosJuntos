import React, { useState } from 'react';
import './ModalSolicitacoes.css';
/*import FotoValdemir from '../../assets/fotos/valdemir.png'; 
import FotoJoelson from '../../assetsB/fotos/joelson.png';
import FotoGabriel from '../../assets/fotos/gabriel.png';*/

// --- DADOS DE EXEMPLO ---
// (No aplicativo real, você receberia isso da prop 'rota')
const mockSolicitacoes = [
    { id: 101, nome: "Valdemir da Silva Santos", local: "Academia Smart fit (Boa vista) - Ponto de embarque", nota: 4.89,  },
    { id: 102, nome: "Joelson José de Melo Filho", local: "Mix Matheus (Santo Amaro) - Ponto de embarque", nota: 4.72, },
    { id: 103, nome: "Gabriel de Lima Inácio Barros", local: "Mercado da torre (Torre) - Ponto de embarque", nota: 5.00, },
];

// --- Sub-componente: O Card de Solicitação Individual ---
// (Este componente controla o próprio estado de 'aceito' ou 'negado')
function CardSolicitacao({ solicitacao }) {
    // 'pendente', 'aceito', 'negado'
    const [status, setStatus] = useState('pendente'); 

    const handleAceitar = () => {
        console.log("Aceito:", solicitacao.id);
        setStatus('aceito');
        // (Aqui você faria a chamada API para aceitar)
    };

    const handleNegar = () => {
        console.log("Negado:", solicitacao.id);
        setStatus('negado');
        // (Aqui você faria a chamada API para negar)
    };

    return (
        <div className="card-solicitacao">
            {/* O Toast flutuante (verde ou vermelho) */}
            {status === 'aceito' && (
                <div className="toast-solicitacao aceito">Passageiro aceito!</div>
            )}
            {status === 'negado' && (
                <div className="toast-solicitacao negado">Passageiro negado!</div>
            )}
            
            {/* Conteúdo do Card */}
            <img src={solicitacao.foto} alt={solicitacao.nome} className="solicitacao-foto" />
            <div className="solicitacao-info">
                <h4>{solicitacao.nome}</h4>
                <p>{solicitacao.local}</p>
            </div>
            <div className="solicitacao-nota">
               
                <strong>Nota: {solicitacao.nota.toFixed(2)}</strong>
            </div>
            
            {/* Botões - Só aparecem se o status for 'pendente' */}
            {status === 'pendente' && (
                <div className="solicitacao-actions">
                    <button className="btn-aceitar" onClick={handleAceitar}>Aceitar</button>
                    <button className="btn-negar" onClick={handleNegar}>Negar</button>
                </div>
            )}
        </div>
    );
}

// --- Componente Principal: O Modal ---
export default function ModalSolicitacoes({ isOpen, onClose, rota }) {
    // Se não estiver aberto, não renderiza nada
    if (!isOpen) {
        return null;
    }

    // No aplicativo real, você usaria: rota.solicitacoes
    // Por enquanto, usamos os dados de exemplo:
    const solicitacoes = mockSolicitacoes; 

    return (
        <div className="modal-solicitacoes-overlay" onClick={onClose}>
            {/* O Container do Modal (branco) */}
            <div className="modal-solicitacoes-container" onClick={(e) => e.stopPropagation()}>
                
                <div className="modal-solicitacoes-header">
                    <h2>Solicitações de Carona</h2>
                    {/* Botão de Fechar (X) */}
                    <span className="close-button" onClick={onClose}>&times;</span>
                </div>

                <div className="modal-solicitacoes-body">
                    {/* Mapeia a lista de solicitações e cria um card para cada */}
                    {solicitacoes.map(sol => (
                        <CardSolicitacao key={sol.id} solicitacao={sol} />
                    ))}
                </div>

            </div>
        </div>
    );
}