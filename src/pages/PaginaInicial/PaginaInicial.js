import '../../index.css'
import './PaginaInicial.css';
import logo from '../../assets/imagem vamosjuntos.png';
import Button from '../../components/Button/index';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import BotaoAcessibilidade from "../../components/BotaoAcessibilidade/BotaoAcessibilidade";

export default function PaginaInicial () {

    const navigate = useNavigate();
    
    const [isFadingIn, setIsFadingIn] = useState(false);

    useEffect(() => {
        setIsFadingIn(true);
    }, []);

    const irParaCadastro = () => {
        navigate('/cadastro'); 
    };

    const irParaLogin = () => {
        navigate('/login'); 
    };

    return (
        <div className={`paginainicial ${isFadingIn ? 'fade-in' : ''}`}>
            <img  src= {logo} alt='Logo VamosJuntos' className='paginainicial-logo'/>
            <h1 className='paginainicial-title'>VamosJuntos</h1>
            <p className='paginainicial-subtitle'>Menos carros mais conexões</p>

            <div className='paginainicial-button-group'>
                <Button title="Login" variant="primary" onClick={irParaLogin} />
                <Button title="Criar Conta" variant="primary" onClick={irParaCadastro} />
            </div>
            <BotaoAcessibilidade />
        </div>
    )
}