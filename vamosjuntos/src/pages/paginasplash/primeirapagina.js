import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './primeirapagina.css';
import logo from '../../assets/Somente_Logo_VJ 1.png';      

const PrimeiraPagina = () => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        navigate('/inicio');
      }, 1000);
    },3000);

    return () => clearTimeout(timer);
  }, [navigate]);

 return (
    <div className={`splash-container ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="logo-container">
        <img 
          src={logo} 
          alt="Logo VamosJuntos" 
          className="logo-image"
        />
      </div>
      
      <div className="text-container">
        <h1 className="main-title">VamosJuntos</h1>
        <p className="subtitle">Menos carros mais conexões</p>
      </div>
    </div>
  );
};

export default PrimeiraPagina;