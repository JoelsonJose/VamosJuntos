import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import logo from '../../assets/imagem vamosjuntos.png';
import CentralNotificacao from '../CentralNotificacao/CentralNotificacao';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

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

// Ícone SVG do Hambúrguer (3 tracinhos) para a Barra Superior
const IconHamburger = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isNotificacaoOpen, setIsNotificacaoOpen] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    isAlertOnly: false,
    onConfirm: null
  });

  const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

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

  const handleLogoutClick = (e) => {

    if (e && e.preventDefault) e.preventDefault();

    handleCloseMobileMenu(); // Fecha o menu se estiver no mobile

    setModalConfig({
      isOpen: true,
      title: 'Sair da Conta',
      message: 'Tem certeza que deseja sair do VamosJuntos?',
      isAlertOnly: false, // Mostra Cancelar e Confirmar
      onConfirm: () => {
        closeModal();
        navigate('/'); // Redireciona para o Login
      }
    });
  };

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
      {/* --- BARRA SUPERIOR MOBILE (TOP BAR) --- */}
      {/* Só aparece no mobile via CSS */}
      <header className="mobile-top-bar">
        
        {/* Botão Menu (Esquerda) */}
        <button className="top-bar-btn menu-btn" onClick={handleOpenMobileMenu}>
          <IconHamburger />
        </button>

        {/* Logo (Centro) */}
        <div className="top-bar-logo">
          <img src={logo} alt="VamosJuntos" />
        </div>

        {/* Ícones (Direita) */}
        <div className="top-bar-actions">
          <button className="top-bar-btn" onClick={toggleNotificacoes}>
            <img src={IconNotificacaoB} alt="Notificações" className="icon-mobile-black" />
          </button>
          <button className="top-bar-btn" onClick={handleLogoutClick}>
            <img src={IconLogoutB} alt="Sair" className="icon-mobile-black" />
          </button>
        </div>
      </header>

      {/* BACKDROP CLICK → FECHAR */}
      {isMobileOpen && (
        <div className="sidebar-backdrop" onClick={handleCloseMobileMenu}></div>
      )}

      {/* SIDEBAR (LATERAL) */}
      <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>

        <div className="sidebar-top">
          {/* Clique no logo da sidebar → FECHAR */}
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

        {/* FOOTER DA SIDEBAR (Aparece quando a sidebar abre) */}
        <div className="sidebar-footer">
          <button className="footer-btn" onClick={toggleNotificacoes}>
            <div className="nav-icon-container">
              <img src={IconNotificacaoB} className="nav-icon icon-b" alt="Notificações" />
              <img src={IconNotificacaoW} className="nav-icon icon-w" alt="Notificações" />
            </div>
          </button>
          <button className="footer-btn" onClick={handleLogoutClick}>
            <div className="nav-icon-container">
              <img src={IconLogoutB} className="nav-icon icon-b" alt="Logout" />
              <img src={IconLogoutW} className="nav-icon icon-w" alt="Logout" />
            </div>
          </button>
        </div>

      </aside>

      {/* Notificação fora do aside para não cortar */}
      {isNotificacaoOpen && (
        <CentralNotificacao notifications={notifications} onClose={toggleNotificacoes} />
      )}

      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        isAlertOnly={modalConfig.isAlertOnly}
        onClose={closeModal}
        onConfirm={() => {
          if (modalConfig.onConfirm) modalConfig.onConfirm();
        }}
      />
    </>
  );
}