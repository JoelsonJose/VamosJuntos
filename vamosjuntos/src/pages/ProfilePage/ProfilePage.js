import React from 'react';
import './ProfilePage.css'; 

// --- Importação dos Cards de Visualização ---
import ProfileHeaderCard from '../../components/Cards/ProfileHeaderCard'; 
import StatsCard from '../../components/Cards/StatsCard';                 
import ReviewsCard from '../../components/Cards/ReviewsCard';           
import ConquistasCard from '../../components/Cards/ConquistasCard';     

// **IMPORTAÇÃO DO MODAL DE EDIÇÃO**
import EditProfileModal from '../../components/Modals/EditProfileModal'; 


function ProfilePage() {
    // 1. **Definir o estado do usuário para que os dados possam ser atualizados**
    //    Usamos 'useState' para que a página possa ser renderizada novamente após a edição.
    const [userData, setUserData] = React.useState({
        name: "Homero Flávio",
        rating: 4.7,
        reviewsCount: 23,
        totalRides: 47,
        motoristaRides: 28,
        caronistaRides: 19,
        // O campo 'occupation' é o 'Departamento' no formulário
        occupation: "Tecnologia", 
        // O campo 'location' é o 'Endereço' no formulário
        location: "Jardim São Paulo, Recife", 
        // O campo 'bio' é o 'Sobre' no formulário
        bio: "Desenvolvedor há 5 anos, sempre pontual e gosto de compartilhar caronas. Prefiro música ambiente durante o trajeto.",
        email: "homero.flavio@empresa.com",
        phone: "(81) 9 1234-5678"
    });

    // 2. **Estado para controlar a visibilidade do Modal de Edição**
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    
    // Funções para abrir e fechar o modal
    const handleOpenModal = () => setIsEditModalOpen(true);
    const handleCloseModal = () => setIsEditModalOpen(false);

    // 3. **Função para atualizar os dados após o envio do modal**
    const handleUpdateProfile = (newFormData) => {
        // Esta função deve ser chamada pelo modal após salvar os dados
        // Mapeia os dados do formulário para o formato de userData
        const updatedData = {
            ...userData, // Mantém dados como rating, rides, etc.
            name: newFormData.nome,
            bio: newFormData.sobre,
            occupation: newFormData.departamento,
            location: newFormData.endereco,
            email: newFormData.email,
            // Formata o telefone de volta para o padrão de visualização, se necessário
            phone: newFormData.numero_contato 
        };
        
        // Atualiza o estado para que os cards sejam renderizados novamente
        setUserData(updatedData);
        // Fecha o modal
        handleCloseModal();
    };


    // O estado para Popover de Acessibilidade também será incluído futuramente:
    // const [isAccessibilityPopoverOpen, setIsAccessibilityPopoverOpen] = React.useState(false);
    
    return (
        <div className="profile-page-container">
            
            <h1 className="page-title">Meu Perfil</h1>

            {/* Botão de Edição - Está no canto superior direito */}
            <button 
                className="edit-button" 
                onClick={handleOpenModal} // Chama a função para abrir o modal
            >
                Editar
            </button>
            
            {/* CONTAINER DE GRID: Organiza a página em duas colunas (principal e sidebar) */}
            <div className="profile-cards-grid"> 
                
                {/* COLUNA ESQUERDA (Maior) - Conteúdo Principal */}
                <div className="main-content-column">
                    
                    {/* 1. Profile Header Card - Agora recebe os dados do estado */}
                    <ProfileHeaderCard userData={userData} /> 
                    
                    {/* 2. Reviews Card (Avaliações Recebidas) */}
                    <ReviewsCard />
                </div>
                
                {/* COLUNA DIREITA (Menor) - Estatísticas e Conquistas */}
                <div className="sidebar-cards-column">
                    
                    {/* 3. Stats Card (Estatísticas) - Agora recebe os dados do estado */}
                    <StatsCard statsData={userData} /> 
                    
                    {/* 4. Conquistas Card */}
                    <ConquistasCard /> 
                </div>
                
            </div>
            
            {/* **5. Modal de Edição (Ativado e com props)** */}
            {/* Passa as funções e os dados para o modal */}
            <EditProfileModal 
                isOpen={isEditModalOpen} 
                onClose={handleCloseModal} 
                currentData={userData}
                onSave={handleUpdateProfile} // Função para salvar os dados
            />
        </div>
    );
}

export default ProfilePage;