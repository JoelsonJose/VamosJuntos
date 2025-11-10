import { Routes, Route } from 'react-router-dom';
import PrimeiraPagina from './pages/paginasplash/primeirapagina'; 
import PaginaInicial from './pages/PaginaInicial/PaginaInicial';
import PaginaRegistro from './pages/PaginaRegistro/PaginaRegistro';
import PaginaLogin from './pages/PaginaLogin/PaginaLogin';
import PaginaDashboard from './pages/PaginaDashboard/PaginaDashboard';
import PaginaBuscar from './pages/PaginaBuscar/PaginaBuscar';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PaginaCriar from './pages/PaginaCriarRota/PaginaCriarRota';
import PaginaEditarRotas from './pages/PaginaEditarRotas/PaginaEditarRotas';
import PaginaRotas from './pages/PaginaMinhasRotas/PaginaMinhasRotas';
import PaginaMinhasCaronas from './pages/PaginaMinhasCaronas/PaginaMinhasCaronas';
import PaginaAvaliacoes from './pages/PaginaAvaliacoes/PaginaAvaliacoes';
import PaginaRotaMotorista from './pages/PaginaRotaMotorista/PaginaRotaMotorista';
import PaginaAvaliacao from './pages/PaginaAvaliacao/PaginaAvaliacao';  
import PaginaRotaCaronista from './pages/PaginaRotaCaronista/PaginaRotaCaronista';
import PaginaAvaliacaoCaronista from './pages/PaginaAvalliacaoCaronista/PaginaAvalliacaoCaronista';
import PaginasDetalhesCarona from './pages/PaginasDetalhesCarona/PaginasDetalhesCarona'

function App() {
  return (
    <Routes>
      <Route path= "/" element = {<PrimeiraPagina />} />
      <Route path= "/inicio" element= {<PaginaInicial />} />
      <Route path= "/cadastro" element= {<PaginaRegistro />} />
      <Route path= "/login" element= {<PaginaLogin />} />
      <Route path= "/dashboard" element= {<PaginaDashboard />} />
      <Route path= "/buscar" element= {<PaginaBuscar />} />
      <Route path= "/perfil" element= {<ProfilePage />} />
      <Route path= "/criar" element= {<PaginaCriar />} />
      <Route path= "/rotas/editar" element= {<PaginaEditarRotas />} />
      <Route path= "/rotas" element= {<PaginaRotas />} />
      <Route path= "/caronas" element= {<PaginaMinhasCaronas />} />
      <Route path= "/avaliacoes" element= {<PaginaAvaliacoes />} />
      <Route path= "/rotas/motorista" element= {<PaginaRotaMotorista/>} />
      <Route path= "/rotas/motorista/avaliacao" element= {<PaginaAvaliacao/>} />
      <Route path= "/caronas/caronista" element= {<PaginaRotaCaronista/>} />
      <Route path= "/caronas/caronista/avaliacao" element= {<PaginaAvaliacaoCaronista/>} />
    </Routes>
  );
}

export default App;