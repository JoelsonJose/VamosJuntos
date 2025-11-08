import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import './PaginaAvaliacoes.css'; 
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';

// Componente simples para renderizar estrelas
const renderEstrelas = (numEstrelas) => {
    let estrelas = [];
    // Arredonda a nota média para decidir quantas estrelas preencher
    const displayRating = Math.round(numEstrelas || 0); 
    const filledStar = '⭐'; 
    const emptyStar = '☆';

    for (let i = 0; i < 5; i++) {
        const starClass = i < displayRating ? 'estrela-preenchida' : 'estrela-vazia';
        const starIcon = i < displayRating ? filledStar : emptyStar;
        estrelas.push(<span key={i} className={starClass}>{starIcon}</span>);
    }
    return estrelas;
};

const PaginaAvaliacoes = () => {
    const navigate = useNavigate();
    const location = useLocation(); 

    // 1. RECUPERANDO OS DADOS DO DONO DO PERFIL
    // profileRating deve vir como 4.7
    const { profileName, profilePhoto, reviewsCount, profileRating } = location.state || {};

    // Dados de exemplo (MOCKADOS) para a lista completa
    const avaliacoes = [
        {
            id: 1,
            nome: "Maria Santos",
            data: "28/09/2025",
            estrelas: 4,
            tipo: "Motorista",
            comentario: "Excelente motorista! Muito pontual e educado. Gostei muito da experiência e recomendo a todos.",
            foto: "https://placehold.co/400x400/94A3B8/FFFFFF?text=MS", // Placeholder
        },
        {
            id: 2,
            nome: "Raul Cadena",
            data: "20/09/2025",
            estrelas: 3,
            tipo: "Caronista",
            comentario: "Bom caronista, sempre no horário combinado. A viagem foi tranquila.",
            foto: "https://placehold.co/400x400/94A3B8/FFFFFF?text=RC", // Placeholder
        },
        {
            id: 3,
            nome: "Ana Pereira",
            data: "15/09/2025",
            estrelas: 5,
            tipo: "Motorista",
            comentario: "Motorista super atencioso e prestativo. Recomendo muito! Carro limpo e confortável.",
            foto: "https://placehold.co/400x400/94A3B8/FFFFFF?text=AP", // Placeholder
        },
         {
            id: 4,
            nome: "Wendell Barboza",
            data: "15/10/2025",
            estrelas: 5,
            tipo: "Motorista",
            comentario: "Motorista super atencioso e prestativo. Recomendo muito! Carro limpo e confortável.",
            foto: "https://placehold.co/400x400/94A3B8/FFFFFF?text=WB", // Placeholder
        }
        // Adicione mais avaliações mockadas aqui
    ];

    return (
        <div className="pagina-avaliacoes-full-container">
            <div className="conteudo-avaliacoes-wrapper">
                
                {/* Botão Voltar */}
                <button 
                    onClick={() => navigate('/perfil')} 
                    className="botao-voltar"
                >
                    &larr; Voltar ao Perfil
                </button>

                {/* BLOCO: INFORMAÇÕES DO PERFIL AVALIADO */}
                <div className="header-perfil-avaliacoes">
                    <img 
                        src={profilePhoto || "https://placehold.co/80x80/9333ea/FFFFFF?text=PF"} 
                        alt={`Foto de Perfil de ${profileName || 'Usuário'}`} 
                        className="foto-perfil-avaliado"
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x80/9333ea/FFFFFF?text=PF" }} // Fallback
                    />
                    <div className="info-perfil">
                        <h1 className="nome-perfil-avaliado">{profileName || 'Usuário'}</h1>
                        
                        {/* NOVO BLOCO: NOTA MÉDIA E ESTRELAS */}
                        <div className="rating-display">
                            {/* Garante que o valor seja exibido com uma casa decimal (ex: 4.7) */}
                            <span className="nota-media">
                                {profileRating !== undefined && profileRating !== null ? profileRating.toFixed(1) : '0.0'}
                            </span>
                            <div className="rating-estrelas">
                                {renderEstrelas(profileRating)}
                            </div>
                        </div>
                        
                        <p className="subtitulo-avaliacoes">Baseado em {reviewsCount || 0} avaliações</p>
                    </div>
                </div>

                <h2>Avaliações Recebidas ({avaliacoes.length})</h2>
                
                <div className="lista-avaliacoes">
                    {avaliacoes.map((avaliacao) => (
                        <div key={avaliacao.id} className="card-avaliacao">
                            <img 
                                src={avaliacao.foto} 
                                alt={`Foto de ${avaliacao.nome}`} 
                                className="foto-perfil-avaliacao" 
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/60x60/DDDDDD/666666?text=U" }} // Fallback
                            />
                            <div className="detalhes-avaliacao">
                                <h3>
                                    {avaliacao.nome} 
                                    <span className="data-avaliacao">({avaliacao.data})</span>
                                </h3>
                                <div className="estrelas-avaliacao-wrapper">
                                    {renderEstrelas(avaliacao.estrelas)}
                                    <span className="tipo-avaliacao">
                                        {avaliacao.tipo === "Motorista" ? "Como Motorista" : "Como Caronista"}
                                    </span>
                                </div>
                                <p>{avaliacao.comentario}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <BotaoAcessibilidade/>
        </div>
    );
};

export default PaginaAvaliacoes;