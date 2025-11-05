import { Link, useLocation } from 'react-router-dom'; 

import './Sidebar.css';
import logo from '../../assets/Somente_Logo_VJ 1.png';


import IconDashboardB from '../../assets/Sidebar_icons/Detailsb.png';
import IconBuscarB from '../../assets/Sidebar_icons/Searchb.png'; 
import IconMinhasCaronasB from '../../assets/Sidebar_icons/People in Car Side Viewb.png';
import IconMinhasRotasB from '../../assets/Sidebar_icons/Travel Signpostb.png';
import IconCriarRotasB from '../../assets/Sidebar_icons/Addb.png';
import IconPerfilB from '../../assets/Sidebar_icons/Userb.png';
import IconNotificacaoB from '../../assets/Sidebar_icons/Doorbellb.png';
import IconLogoutB from '../../assets/Sidebar_icons/Logoutb.png';

import IconDashboardW from '../../assets/Sidebar_icons/Detailsw.png';
import IconBuscarW from '../../assets/Sidebar_icons/Searchw.png';
import IconMinhasCaronasW from '../../assets/Sidebar_icons/People in Car Side Vieww.png'; 
import IconMinhasRotasW from '../../assets/Sidebar_icons/Travel Signpostw.png';
import IconCriarRotasW from '../../assets/Sidebar_icons/Addw.png'; 
import IconPerfilW from '../../assets/Sidebar_icons/Userw.png';

export default function Sidebar() {
  
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', iconB: IconDashboardB, iconW: IconDashboardW, path: '/dashboard' },
    { label: 'Buscar Carona', iconB: IconBuscarB, iconW: IconBuscarW, path: '/buscar' },
    { label: 'Minhas Caronas', iconB: IconMinhasCaronasB, iconW: IconMinhasCaronasW, path: '/minhas-caronas' },
    { label: 'Minhas Rotas', iconB: IconMinhasRotasB, iconW: IconMinhasRotasW, path: '/rotas' },
    { label: 'Criar Rotas', iconB: IconCriarRotasB, iconW: IconCriarRotasW, path: '/criar' },
    { label: 'Perfil Corporativo', iconB: IconPerfilB, iconW: IconPerfilW, path: '/perfil' },
  ];

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
                <img 
                  src={isActive ? it.iconW : it.iconB} 
                  alt={it.label} 
                  className="nav-icon" 
                />
                <span>{it.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        <button className="footer-btn">
          <img src={IconNotificacaoB} alt="Notificações" /> 
        </button>
        <Link to="/" className="footer-btn"> {/* <-- MUDANÇA AQUI */}
          <img src={IconLogoutB} alt="Logout" />
        </Link>
      </div>
    </aside>
  );
}