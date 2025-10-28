import React from 'react';
import './Sidebar.css';
import IconDashboard from '../../assets/Sidebar_icons/Details.png';
import IconBuscar from '../../assets/Sidebar_icons/Search.png';
import IconMinhasCaronas from '../../assets/Sidebar_icons/People in Car Side View.png';
import IconMinhasRotas from '../../assets/Sidebar_icons/Travel Signpost.png';
import IconCriarRotas from '../../assets/Sidebar_icons/Add.png';
import IconPerfil from '../../assets/Sidebar_icons/User.png';
import IconNotificacao from '../../assets/Sidebar_icons/Doorbell.png';
import IconLogout from '../../assets/Sidebar_icons/Logout.png';
import logo from '../../assets/Somente_Logo_VJ 1.png';

export default function Sidebar({ activePage = ' ' }) {
  const navItems = [
  { label: 'Dashboard', icon: IconDashboard, page: 'dashboard' },
  { label: 'Buscar Carona', icon: IconBuscar, page: 'buscar' },
  { label: 'Minhas Caronas', icon: IconMinhasCaronas, page: 'minhas-caronas' },
  { label: 'Minhas Rotas', icon: IconMinhasRotas, page: 'rotas' },
  { label: 'Criar Rotas', icon: IconCriarRotas, page: 'criar' },
  { label: 'Perfil Corporativo', icon: IconPerfil, page: 'perfil' },
];


  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo">
          {/* se tiver logo troque src */}
          <img src= {logo} alt="logo" /> 
        </div>

        <nav className="sidebar-nav">
  {navItems.map((it) => (
    <button
      key={it.page}
      className={`nav-btn ${activePage === it.page ? 'active' : ''}`}
    >
      <img src={it.icon} alt={it.label} className="nav-icon" />
      <span>{it.label}</span>
    </button>
  ))}
</nav>

      </div>

      <div className="sidebar-footer">
  <button className="footer-btn">
    <img src={IconNotificacao} alt="Notificações" />
  </button>
  <button className="footer-btn">
    <img src={IconLogout} alt="Logout" />
  </button>
</div>

    </aside>
  );
}
