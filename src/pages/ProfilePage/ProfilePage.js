import React from 'react';
import './ProfilePage.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProfileHeaderCard from '../../components/CardPerfil/ProfileHeaderCard'; 
import StatsCard from '../../components/CardPerfil/StatsCard'; 
import ReviewsCard from '../../components/CardPerfil/ReviewsCard'; 
import ConquistasCard from '../../components/CardPerfil/ConquistasCard'; 
import EditProfileModal from '../../components/Modals/EditProfileModal'; 


function ProfilePage() {
    
    // ESTADO 1: Dados do usuário (Inclui estatísticas)
    const [userData, setUserData] = React.useState({
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
    });

    // ESTADO 2: Dados das avaliações (Lista dinâmica)
    const [reviewsList] = React.useState([
        {
            name: 'Maria Santos',
            date: '20/09/2025',
            role: 'Motorista',
            text: 'Excelente motorista! Muito pontual e educado.',
            photo: '/assets/maria-santos.jpg' 
        },
        {
            name: 'Raul Cadena',
            date: '20/09/2025',
            role: 'Caronista',
            text: 'Bom caronista, sempre no horário combinado.',
            photo: '/assets/raul-cadena.jpg' 
        },
        {
            name: 'Wendell Barboza',
            date: '20/10/2025',
            role: 'Caronista',
            text: 'Bom caronista, sempre no horário combinado.',
    
        }
    ]);
    
    // ESTADO 3: Dados das Conquistas (Lista dinâmica)
    const [conquistasList] = React.useState([
        {
            icon: '⭐', // Ícone de estrela para Motorista 5 Estrelas
            title: 'Motorista 5 estrelas',
            description: 'Mantém nota alta como motorista'
        },
        {
            icon: '📍',
            title: 'Veterano',
            description: 'Mais de 40 caronas realizadas'
        },
         {
            icon: '🎶',
            title: 'Divertido',
            description: 'Melhores playlists'
        }
    ]);

    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    
    const handleOpenModal = () => setIsEditModalOpen(true);
    const handleCloseModal = () => setIsEditModalOpen(false);

    const handleUpdateProfile = (newFormData) => {
        const updatedData = {
            ...userData, 
            name: newFormData.nome,
            bio: newFormData.sobre,
            occupation: newFormData.departamento,
            location: newFormData.endereco,
            email: newFormData.email,
            phone: newFormData.numero_contato 
        };
        
        setUserData(updatedData);
        handleCloseModal();
    };

    
    return (
        // NOVO CONTAINER PAI: Aplica o Flexbox para alinhar Sidebar e Conteúdo
        <div className="app-layout-container"> 
            
            <Sidebar /> {/* Sidebar de navegação */}
            
            {/* CONTAINER DA PÁGINA DE PERFIL: Conteúdo principal */}
            <div className="profile-page-container"> 
                
                <h1 className="page-title">Meu Perfil</h1>

                <button 
                    className="edit-button" 
                    onClick={handleOpenModal} 
                >
                    Editar
                </button>
                
                <div className="profile-cards-grid"> 
                    
                    <div className="main-content-column">
                        <ProfileHeaderCard userData={userData} /> 
                        {/* PASSANDO A LISTA DE AVALIAÇÕES */}
                        <ReviewsCard reviewsData={reviewsList} /> 
                    </div>
                    
                    <div className="sidebar-cards-column">
                        {/* StatsCard usa userData, que inclui os números de caronas */}
                        <StatsCard statsData={userData} /> 
                        
                        {/* PASSANDO A LISTA DE CONQUISTAS */}
                        <ConquistasCard conquistasData={conquistasList} /> 
                    </div>
                    
                </div>
                
                <EditProfileModal 
                    isOpen={isEditModalOpen} 
                    onClose={handleCloseModal} 
                    currentData={userData}
                    onSave={handleUpdateProfile} 
                />
            </div>
        </div>
    );
}

export default ProfilePage;