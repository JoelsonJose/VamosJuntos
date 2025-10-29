// src/components/Layout/Sidebar.js

import React from 'react';
import './Sidebar.css';

// --- 1. IMPORTAÇÕES DOS ÍCONES PNG ---
import IconDashboard from '../../assets/Sidebar_icons/Details.png'; 
import IconBuscar from '../../assets/Sidebar_icons/Search.png';
import IconMinhasCaronas from '../../assets/Sidebar_icons/People in Car Side View.png';
import IconMinhasRotas from '../../assets/Sidebar_icons/Travel Signpost.png';
import IconCriarRotas from '../../assets/Sidebar_icons/Add.png';
import IconPerfil from '../../assets/Sidebar_icons/User.png';
import IconNotificacao from '../../assets/Sidebar_icons/Doorbell.png';
import IconLogout from '../../assets/Sidebar_icons/Logout.png';

// Importação do logo
import LogoImage from '../../assets/Somente_Logo_VJ 1.png'; 

// Dados de navegação - Agora usa os arquivos PNG importados
const navItems = [
    { name: 'Dashboard', icon: IconDashboard, path: '/dashboard' }, 
    { name: 'Buscar Carona', icon: IconBuscar, path: '/search' },
    { name: 'Minhas Caronas', icon: IconMinhasCaronas, path: '/my-rides' },
    { name: 'Minhas Rotas', icon: IconMinhasRotas, path: '/my-routes' },
    { name: 'Criar Rotas', icon: IconCriarRotas, path: '/create-route' },
    { name: 'Perfil Corporativo', icon: IconPerfil, path: '/profile' },
];

function Sidebar({ activeItem = 'Perfil Corporativo' }) { 
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <img src={LogoImage} alt="Logo VamosJuntos" className="logo-img" />
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <a 
                        key={item.name} 
                        href={item.path} 
                        className={`nav-item ${activeItem === item.name ? 'active' : ''}`}
                    >
                        {/* 2. Renderiza a imagem importada */}
                        <img src={item.icon} alt={item.name} className="nav-icon-img" /> 
                        
                        <span className="nav-name">{item.name}</span>
                    </a>
                ))}
            </nav>

            {/* Ícones de Notificações e Logout */}
            <div className="sidebar-footer">
                {/* 3. Renderiza as imagens para os ícones do footer */}
                <span className="footer-icon-wrapper">
                    <img src={IconNotificacao} alt="Notificações" className="footer-icon-img" />
                </span>
                <span className="footer-icon-wrapper">
                    <img src={IconLogout} alt="Sair" className="footer-icon-img" />
                </span>
            </div>
        </aside>
    );
}

export default Sidebar;