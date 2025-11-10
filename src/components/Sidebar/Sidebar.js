import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import './Sidebar.css';
import logo from '../../assets/Somente_Logo_VJ 1.png';
import CentralNotificacao from '../CentralNotificacao/CentralNotificacao';

// Imports dos Ícones Pretos
import IconDashboardB from '../../assets/Sidebar_icons/Detailsb.png';
import IconBuscarB from '../../assets/Sidebar_icons/Searchb.png'; 
import IconMinhasCaronasB from '../../assets/Sidebar_icons/People in Car Side Viewb.png';
import IconMinhasRotasB from '../../assets/Sidebar_icons/Travel Signpostb.png';
import IconCriarRotasB from '../../assets/Sidebar_icons/Addb.png';
import IconPerfilB from '../../assets/Sidebar_icons/Userb.png';
import IconNotificacaoB from '../../assets/Sidebar_icons/Doorbellb.png';
import IconLogoutB from '../../assets/Sidebar_icons/Logoutb.png';

// Imports dos Ícones Brancos
import IconDashboardW from '../../assets/Sidebar_icons/Detailsw.png';
import IconBuscarW from '../../assets/Sidebar_icons/Searchw.png';
import IconMinhasCaronasW from '../../assets/Sidebar_icons/People in Car Side Vieww.png'; 
import IconMinhasRotasW from '../../assets/Sidebar_icons/Travel Signpostw.png';
import IconCriarRotasW from '../../assets/Sidebar_icons/Addw.png'; 
import IconPerfilW from '../../assets/Sidebar_icons/Userw.png';
import IconNotificacaoW from '../../assets/Sidebar_icons/Doorbellw.png'; // Importado
import IconLogoutW from '../../assets/Sidebar_icons/Logoutw.png'; // Importado


export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', iconB: IconDashboardB, iconW: IconDashboardW, path: '/dashboard' },
    { label: 'Buscar Carona', iconB: IconBuscarB, iconW: IconBuscarW, path: '/buscar' },
    { label: 'Minhas Caronas', iconB: IconMinhasCaronasB, iconW: IconMinhasCaronasW, path: '/caronas' },
    { label: 'Minhas Rotas', iconB: IconMinhasRotasB, iconW: IconMinhasRotasW, path: '/rotas' },
    { label: 'Criar Rotas', iconB: IconCriarRotasB, iconW: IconCriarRotasW, path: '/criar' },
    { label: 'Perfil Corporativo', iconB: IconPerfilB, iconW: IconPerfilW, path: '/perfil' },
  ];

   const [isNotificacaoOpen, setIsNotificacaoOpen] = useState(false);

   const [notifications, setNotifications] = useState([
    { message: "Sua carona para 'Recife Antigo' foi confirmada!", time: "Agora", type: "simples" },
    { message: "Joelson aceitou sua solicitação.", time: "5m atrás", type: "simples" },
    { message: "Nova solicitação de Maria Santos.", time: "1h atrás", type: "simples" },
  ]);

   const toggleNotificacoes = () => {
    setIsNotificacaoOpen(!isNotificacaoOpen);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <img src= {logo} alt="logo" /> 
        </div>

        <nav className="sidebar-nav">
          {navItems.map((it) => {
            const isActive = location.pathname.startsWith(it.path);

            return (
              <Link
                key={it.path}
                to={it.path}
                className={`nav-btn ${isActive ? 'active' : ''}`}
              >
                {/* 1. CONTAINER PARA EMPILHAR OS ÍCONES */}
                <div className="nav-icon-container">
                  <img 
                    src={it.iconB} 
                    alt="" 
                    className="nav-icon icon-b"
                  />
                  <img 
                    src={it.iconW} 
                    alt="" 
                    className="nav-icon icon-w"
                  />
                </div>
                <span>{it.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        <button className="footer-btn" onClick={toggleNotificacoes}>
          <div className="nav-icon-container">
            <img src={IconNotificacaoB} alt="Notificações" className="nav-icon icon-b" /> 
            <img src={IconNotificacaoW} alt="Notificações" className="nav-icon icon-w" /> 
          </div>
        </button>
        <Link to="/" className="footer-btn">
          <div className="nav-icon-container">
            <img src={IconLogoutB} alt="Logout" className="nav-icon icon-b" />
            <img src={IconLogoutW} alt="Logout" className="nav-icon icon-w" />
          </div>
        </Link>
      </div>
        {isNotificacaoOpen && (
        <CentralNotificacao 
          notifications={notifications} 
          onClose={toggleNotificacoes} 
        />
        )}
    </aside>
  );
}