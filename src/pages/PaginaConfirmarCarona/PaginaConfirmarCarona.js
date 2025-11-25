import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import BotaoAcessibilidade from '../../components/BotaoAcessibilidade/BotaoAcessibilidade';
import { API_URL } from '../../Config'; // Importando a URL certa
import './PaginaConfirmarCarona.css'; 

// Ícones (ajuste se necessário)
import IconRelogio from '../../assets/IconsCriar/IconRelogio.png';
import IconMapa from '../../assets/IconsCriar/IconMapa.png';
import FotoUsuario2 from '../../assets/Fotos/usuario2.png'; // Foto do Lucas

export default function PaginaConfirmarCarona() {
  const navigate = useNavigate();

  // Simulando os dados da rota que você escolheu (Lucas Ximenes)
  // Num app real, esses dados viriam via 'state' do navigate
  const dadosDaRota = {
    motorista: "Lucas Ximenes",
    origem: "Armazém 9",
    destino: "Olinda (Carmo)",
    horario: "17:00",
    valor: "Gratuito",
    fotoId: "usuario2" // Importante para aparecer a foto na lista
  };

  const handleConfirmar = async () => {
    // Monta o objeto EXATAMENTE como a tela 'Minhas Caronas' espera
    const novaCaronaAgendada = {
      origem: dadosDaRota.origem,
      destino: dadosDaRota.destino,
      horario: dadosDaRota.horario,
      status: "Agendada", // Isso define a cor amarela e o status
      fotoId: dadosDaRota.fotoId, 
      rating: 0,
      locked: false
    };

    try {
      // Salva na gaveta 'caronas' do MockAPI
      const response = await fetch(`${API_URL}/caronas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaCaronaAgendada),
      });

      if (response.ok) {
        alert("Carona confirmada com sucesso!");
        navigate('/caronas'); // Vai para 'Minhas Caronas'
      } else {
        alert("Erro ao confirmar carona.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão.");
    }
  };

  const handleCancelar = () => {
    navigate('/buscar');
  };

  return (
    <div className="pagina-confirmar-container" style={{ display: 'flex' }}>
      <Sidebar activePage="buscar" />
      
      <main className="conteudo-confirmar" style={{ padding: '20px', width: '100%' }}>
        <h1 className="page-main-title">Confirmar Carona</h1>
        <p>Revise os detalhes da sua viagem</p>

        {/* Card de Resumo */}
        <div className="card-confirmacao" style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '15px', 
            maxWidth: '500px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            margin: '20px 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <img src={FotoUsuario2} alt="Motorista" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }} />
            <div>
              <h3 style={{ margin: 0 }}>{dadosDaRota.motorista}</h3>
              <span style={{ color: '#666' }}>Motorista Parceiro</span>
            </div>
          </div>

          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={IconMapa} width="20" alt="" />
            <strong>{dadosDaRota.origem} ➔ {dadosDaRota.destino}</strong>
          </div>

          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={IconRelogio} width="20" alt="" />
            <span>Saída às {dadosDaRota.horario}</span>
          </div>

          <div style={{ marginTop: '20px', fontWeight: 'bold', color: '#4a00e0' }}>
            Valor: {dadosDaRota.valor}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="actions-row" style={{ display: 'flex', gap: '15px' }}>
          <button 
            onClick={handleCancelar}
            style={{ 
              padding: '12px 24px', 
              borderRadius: '8px', 
              border: '1px solid #ccc', 
              background: 'transparent',
              cursor: 'pointer' 
            }}
          >
            Cancelar
          </button>
          
          <button 
            onClick={handleConfirmar}
            style={{ 
              padding: '12px 24px', 
              borderRadius: '8px', 
              border: 'none', 
              background: '#4a00e0', 
              color: 'white', 
              fontWeight: 'bold',
              cursor: 'pointer' 
            }}
          >
            Confirmar Viagem
          </button>
        </div>

      </main>
      <BotaoAcessibilidade />
    </div>
  );
}