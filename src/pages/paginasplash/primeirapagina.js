import '../../index.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './primeirapagina.css';
import logo from '../../assets/imagem vamosjuntos.png';  

const PrimeiraPagina = () => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        navigate('/inicio');
      }, 1000);
    },250);

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
    </div>
  );
};

export default PrimeiraPagina;