import { Routes, Route } from 'react-router-dom';
import PrimeiraPagina from './pages/paginasplash/primeirapagina'; 
import PaginaInicial from './pages/PaginaInicial/PaginaInicial';
import PaginaRegistro from './pages/PaginaRegistro/PaginaRegistro';
import PaginaLogin from './pages/PaginaLogin/PaginaLogin';
import PaginaBuscar from './pages/PaginaBuscar/PaginaBuscar';

function App() {
  return (
    <Routes>
      <Route path= "/" element = {<PrimeiraPagina />} />
      <Route path= "/inicio" element= {<PaginaInicial />} />
      <Route path= "/cadastro" element= {<PaginaRegistro />} />
      <Route path= "/login" element= {<PaginaLogin />} />
      <Route path= "/buscar" element = {<PaginaBuscar/>} />    
    </Routes>
  );
}

export default App;