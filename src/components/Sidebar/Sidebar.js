import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import logo from '../../assets/Somente_Logo_VJ 1.png';
import CentralNotificacao from '../CentralNotificacao/CentralNotificacao';

// Ícones Pretos
import IconDashboardB from '../../assets/Sidebar_icons/Detailsb.png';
import IconBuscarB from '../../assets/Sidebar_icons/Searchb.png';
import IconMinhasCaronasB from '../../assets/Sidebar_icons/People in Car Side Viewb.png';
import IconMinhasRotasB from '../../assets/Sidebar_icons/Travel Signpostb.png';
import IconCriarRotasB from '../../assets/Sidebar_icons/Addb.png';
import IconPerfilB from '../../assets/Sidebar_icons/Userb.png';
import IconNotificacaoB from '../../assets/Sidebar_icons/Doorbellb.png';
import IconLogoutB from '../../assets/Sidebar_icons/Logoutb.png';

// Ícones Brancos
import IconDashboardW from '../../assets/Sidebar_icons/Detailsw.png';
import IconBuscarW from '../../assets/Sidebar_icons/Searchw.png';
import IconMinhasCaronasW from '../../assets/Sidebar_icons/People in Car Side Vieww.png';
import IconMinhasRotasW from '../../assets/Sidebar_icons/Travel Signpostw.png';
import IconCriarRotasW from '../../assets/Sidebar_icons/Addw.png';
import IconPerfilW from '../../assets/Sidebar_icons/Userw.png';
import IconNotificacaoW from '../../assets/Sidebar_icons/Doorbellw.png';
import IconLogoutW from '../../assets/Sidebar_icons/Logoutw.png';

export default function Sidebar() {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isNotificacaoOpen, setIsNotificacaoOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', iconB: IconDashboardB, iconW: IconDashboardW, path: '/dashboard' },
    { label: 'Buscar Carona', iconB: IconBuscarB, iconW: IconBuscarW, path: '/buscar' },
    { label: 'Minhas Caronas', iconB: IconMinhasCaronasB, iconW: IconMinhasCaronasW, path: '/caronas' },
    { label: 'Minhas Rotas', iconB: IconMinhasRotasB, iconW: IconMinhasRotasW, path: '/rotas' },
    { label: 'Criar Rotas', iconB: IconCriarRotasB, iconW: IconCriarRotasW, path: '/criar' },
    { label: 'Perfil Corporativo', iconB: IconPerfilB, iconW: IconPerfilW, path: '/perfil' },
  ];

  const [notifications] = useState([
    { message: "Sua carona para 'Recife Antigo' foi confirmada!", time: "Agora", type: "simples" },
    { message: "Joelson aceitou sua solicitação.", time: "5m atrás", type: "simples" },
    { message: "Nova solicitação de Maria Santos.", time: "1h atrás", type: "simples" },
  ]);

  const toggleNotificacoes = () => {
    setIsNotificacaoOpen(!isNotificacaoOpen);
  };

  const handleOpenMobileMenu = () => setIsMobileOpen(true);
  const handleCloseMobileMenu = () => setIsMobileOpen(false);

  // Scroll + overlay blackout
  useEffect(() => {
    if (isMobileOpen) {
      document.body.classList.add("menu-backdrop-active");
    } else {
      document.body.classList.remove("menu-backdrop-active");
    }
  }, [isMobileOpen]);

  return (
    <>
      {/* BACKDROP CLICK → FECHAR */}
      {isMobileOpen && (
        <div className="sidebar-backdrop" onClick={handleCloseMobileMenu}></div>
      )}

      {/* Botão de abrir */}
      <button
        className={`mobile-logo-opener ${isMobileOpen ? 'hide' : ''}`}
        onClick={handleOpenMobileMenu}
        aria-label="Abrir menu"
      >
        <img src={logo} alt="Abrir menu" />
      </button>

      {/* SIDEBAR */}
      <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>

        <div className="sidebar-top">
          {/* Clique no logo → FECHAR */}
          <div
            className="sidebar-logo"
            onClick={handleCloseMobileMenu}
            role="button"
            aria-label="Fechar menu"
          >
            <img src={logo} alt="logo" />
          </div>

          <nav className="sidebar-nav">
            {navItems.map((it) => {
              const isActive = location.pathname.startsWith(it.path);

              return (
                <Link
                  key={it.path}
                  to={it.path}
                  className={`nav-btn ${isActive ? 'active' : ''}`}
                  onClick={handleCloseMobileMenu}
                >
                  <div className="nav-icon-container">
                    <img src={it.iconB} className="nav-icon icon-b" alt="" />
                    <img src={it.iconW} className="nav-icon icon-w" alt="" />
                  </div>
                  <span>{it.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* FOOTER */}
        <div className="sidebar-footer">

          {/* Notificações */}
          <button
            className={`footer-btn ${isNotificacaoOpen ? 'active' : ''}`}
            onClick={toggleNotificacoes}
          >
            <div className="nav-icon-container">
              <img src={IconNotificacaoB} className="nav-icon icon-b" alt="Notificações" />
              <img src={IconNotificacaoW} className="nav-icon icon-w" alt="Notificações" />
            </div>
          </button>

          {/* Logout */}
          <Link to="/" className="footer-btn" onClick={handleCloseMobileMenu}>
            <div className="nav-icon-container">
              <img src={IconLogoutB} className="nav-icon icon-b" alt="Logout" />
              <img src={IconLogoutW} className="nav-icon icon-w" alt="Logout" />
            </div>
          </Link>
        </div>

        {/* Modal de notificações */}
        {isNotificacaoOpen && (
          <CentralNotificacao notifications={notifications} onClose={toggleNotificacoes} />
        )}

      </aside>
    </>
  );
}
