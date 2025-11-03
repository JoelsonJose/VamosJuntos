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
// import PaginaMinhasCaronas from './pages/PaginaMinhasCaronas/PaginaMinhasCaronas';
// import PaginaPerfil from './pages/PaginaPerfil/PaginaPerfil';

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
      <Route path= "/editarRota" element= {<PaginaEditarRotas />} />
      <Route path= "/rotas" element= {<PaginaRotas />} />
      {/*
        <Route path= "/minhas-caronas" element= {<PaginaMinhasCaronas />} />
        <Route path= "/perfil" element= {<PaginaPerfil />} />
      */}
    </Routes>
  );
}

export default App;