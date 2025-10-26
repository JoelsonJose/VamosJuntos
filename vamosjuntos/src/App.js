import { Routes, Route } from 'react-router-dom';
import PrimeiraPagina from './pages/paginasplash/primeirapagina'; 
import PaginaInicial from './pages/PaginaInicial/PaginaInicial';
import PaginaRegistro from './pages/PaginaRegistro/PaginaRegistro';

function App() {
  return (
    <Routes>
      <Route path= "/" element = {<PrimeiraPagina />} />
      <Route path= "/inicio" element= {<PaginaInicial />} />
      <Route path= "/cadastro" element= {<PaginaRegistro />} />
    </Routes>
  );
}

export default App;