// src/components/Layout/Sidebar.js

import React from 'react';
import './Sidebar.css';
// CORREÇÃO: Usando o nome exato do arquivo do logo
import LogoImage from '../../assets/Somente_Logo_VJ 1.png'; 

// Dados de navegação
const navItems = [
    { name: 'Dashboard', icon: '🏠', path: '/dashboard' },
    { name: 'Buscar Carona', icon: '🔍', path: '/search' },
    { name: 'Minhas Caronas', icon: '🚚', path: '/my-rides' },
    { name: 'Minhas Rotas', icon: '🗺️', path: '/my-routes' },
    { name: 'Criar Rotas', icon: '➕', path: '/create-route' },
    { name: 'Perfil Corporativo', icon: '🧑‍💻', path: '/profile' },
];

// O 'activeItem' é passado pelo MainLayout para destacar o link correto
function Sidebar({ activeItem = 'Perfil Corporativo' }) { 
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                {/* CORREÇÃO AQUI: Renderiza a imagem importada */}
                <img src={LogoImage} alt="Logo VamosJuntos" className="logo-img" />
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <a 
                        key={item.name} 
                        href={item.path} 
                        className={`nav-item ${activeItem === item.name ? 'active' : ''}`}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-name">{item.name}</span>
                    </a>
                ))}
            </nav>

            {/* Ícones de Notificações e Logout */}
            <div className="sidebar-footer">
                <span className="footer-icon">🔔</span>
                <span className="footer-icon">🚪</span>
            </div>
        </aside>
    );
}

export default Sidebar;