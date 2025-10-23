// src/pages/ProfilePage/ProfilePage.js

import React from 'react';
import './ProfilePage.css'; 

// --- Importação dos Cards de Visualização ---
import ProfileHeaderCard from '../../components/Cards/ProfileHeaderCard'; 
import StatsCard from '../../components/Cards/StatsCard';                 
import ReviewsCard from '../../components/Cards/ReviewsCard';           
import ConquistasCard from '../../components/Cards/ConquistasCard';     

// O modal será importado futuramente:
// import EditProfileModal from '../../components/Modals/EditProfileModal'; 


function ProfilePage() {
    // Dados de simulação para a página
    const userData = {
        name: "Homero Flávio",
        rating: 4.7,
        reviewsCount: 23,
        totalRides: 47,
        motoristaRides: 28,
        caronistaRides: 19,
        occupation: "Tecnologia",
        location: "Jardim São Paulo, Recife",
        bio: "Desenvolvedor há 5 anos, sempre pontual e gosto de compartilhar caronas. Prefiro música ambiente durante o trajeto.",
        email: "homero.flavio@empresa.com",
        phone: "(81) 9 1234-5678"
    };

    // Estado para controlar a visibilidade do Modal de Edição (para uso futuro)
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

    // O estado para Popover de Acessibilidade também será incluído futuramente:
    // const [isAccessibilityPopoverOpen, setIsAccessibilityPopoverOpen] = React.useState(false);
    
    return (
        <div className="profile-page-container">
            
            <h1 className="page-title">Meu Perfil</h1>

            {/* Botão de Edição - Está no canto superior direito */}
            <button 
                className="edit-button" 
                onClick={() => setIsEditModalOpen(true)}
            >
                Editar
            </button>
            
            {/* CONTAINER DE GRID: Organiza a página em duas colunas (principal e sidebar) */}
            <div className="profile-cards-grid"> 
                
                {/* COLUNA ESQUERDA (Maior) - Conteúdo Principal */}
                <div className="main-content-column">
                    
                    {/* 1. Profile Header Card */}
                    <ProfileHeaderCard userData={userData} /> 
                    
                    {/* 2. Reviews Card (Avaliações Recebidas) */}
                    <ReviewsCard />
                </div>
                
                {/* COLUNA DIREITA (Menor) - Estatísticas e Conquistas */}
                <div className="sidebar-cards-column">
                    
                    {/* 3. Stats Card (Estatísticas) */}
                    <StatsCard statsData={userData} /> 
                    
                    {/* 4. Conquistas Card */}
                    <ConquistasCard /> 
                </div>
                
            </div>
            
            {/* 5. Modal de Edição (Comentado, será ativado depois) */}
            {/* <EditProfileModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
            /> */}
        </div>
    );
}

export default ProfilePage;