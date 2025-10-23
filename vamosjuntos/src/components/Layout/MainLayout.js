// src/components/Layout/MainLayout.js

import React from 'react';
import Sidebar from './Sidebar.js'; // Importa a Sidebar
import './MainLayout.css';

// O MainLayout recebe 'children', que é a página (ProfilePage, DashboardPage, etc.)
function MainLayout({ children }) {
    
    // Define o item ativo para a Sidebar
    const activeNav = 'Perfil Corporativo'; 

    return (
        <div className="main-layout-container">
            
            {/* 1. Sidebar (será visível apenas no desktop via CSS) */}
            <Sidebar activeItem={activeNav} /> 

            {/* 2. Content Area (recebe o conteúdo da ProfilePage) */}
            <main className="main-content">
                {children}
            </main>

            {/* 3. BottomTabBar (para o mobile - a ser criado) */}
            {/* <BottomTabBar activeItem={activeNav} /> */}
        </div>
    );
}

export default MainLayout;