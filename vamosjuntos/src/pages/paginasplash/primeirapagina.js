import React from 'react';          
import './primeirapagina.css';
import logo from '../../assets/Somente_Logo_VJ_1.png'; // ⭐ IMPORTAÇÃO DA SUA LOGO;      

// ⭐ COMPONENTE - Criamos uma "função especial" que retorna HTML
const PrimeiraPagina = () => {
  
  // ⭐ RETORNO - O que vai aparecer na tela
 return (
    <div className="splash-container">
      <div className="logo-container">
        <img 
          src={logo} // ⭐ AGORA USA A LOGO IMPORTADA
          alt="Logo VamosJuntos" 
          className="logo-image"
        />
      </div>
        {/* Imagem da logo - usando a que já existe no public/ */}
      
      
      <div className="text-container">
        {/* Container para o texto */}
        <h1 className="main-title">VamosJuntos</h1>
        {/* Título principal */}
        
        <p className="subtitle">Menos carros mais conexões</p>
        {/* Subtítulo */}
      </div>
    </div>
  );
};

// ⭐ EXPORTAÇÃO - Permite usar este componente em outros arquivos
export default PrimeiraPagina;