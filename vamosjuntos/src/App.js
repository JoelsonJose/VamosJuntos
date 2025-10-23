// src/App.js

import React from 'react';

// REMOVA ou COMENTE a linha da PaginaInicial e PrimeiraPagina
// import PrimeiraPagina from './pages/PaginaInicial/PaginaInicial';

// IMPORTE os componentes que você precisa para a tela de perfil:
import MainLayout from './components/Layout/MainLayout';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {
  return (
    // Renderize a ProfilePage DENTRO do MainLayout
    <MainLayout>
      <ProfilePage />
    </MainLayout>
  );
}

export default App;