import React, { useState, useEffect } from 'react';
import './EditProfileModal.css'; // Importa o CSS

// Dados de simulação para o dropdown de Departamento
const departments = [
    "Selecione seu departamento",
    "Tecnologia",
    "Recursos Humanos",
    "Financeiro",
    "Marketing",
    "Operações"
];

// O modal agora aceita a prop 'onSave' além de 'isOpen', 'onClose' e 'currentData'
const EditProfileModal = ({ isOpen, onClose, currentData, onSave }) => {
    
    // Estado local para os dados do formulário
    const [formData, setFormData] = useState({
        nome: '',
        sobre: '',
        departamento: departments[0], 
        endereco: '',
        email: '',
        numero_contato: ''
    });

    // Efeito para preencher o formulário com os dados atuais do perfil
    // Isso garante que o modal sempre abra com os últimos dados salvos
    useEffect(() => {
        if (currentData) {
            setFormData({
                nome: currentData.name || '',
                // Mapeamento: bio (dados) -> sobre (formulário)
                sobre: currentData.bio || '', 
                // Mapeamento: occupation (dados) -> departamento (formulário)
                departamento: currentData.occupation || departments[0], 
                // Mapeamento: location (dados) -> endereco (formulário)
                endereco: currentData.location || '', 
                email: currentData.email || '',
                // Remove caracteres especiais para o input
                numero_contato: (currentData.phone || '').replace(/[\s()-]/g, '')
            });
        }
    }, [currentData]);

    // Não renderiza nada se o modal não estiver aberto
    if (!isOpen) {
        return null;
    }

    // Função para lidar com a mudança nos inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 1. Chama a função de salvamento passada via props (handleUpdateProfile)
        //    Isso atualiza o estado na ProfilePage
        if (onSave) {
            onSave(formData);
        }
        
        // 2. O modal será fechado pela função 'onSave' no ProfilePage,
        //    mas podemos chamar onClose() aqui também, dependendo da sua preferência de fluxo.
        // onClose(); // Comentado, pois o onSave() em ProfilePage já chama o onClose()
    };

    // Função para impedir o fechamento do modal ao clicar dentro do conteúdo
    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        // Overlay do Modal - Clica fora para fechar
        <div className="edit-modal-overlay" onClick={onClose}>
            {/* Conteúdo do Modal - Impede o fechamento ao clicar no formulário */}
            <div className="edit-modal-content" onClick={handleContentClick}>
                
                <header className="edit-modal-header">
                    {/*  - Substitua por sua tag de imagem */}
                    <div className="modal-icon-container">
                       {/* Aqui vai o ícone da sua empresa */}
                    </div>
                    <div className="modal-title-container">
                        <h2>Edição de perfil</h2>
                        <p>Edite seu perfil completo</p>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="edit-profile-form">
                    
                    {/* Campo Nome Completo */}
                    <label htmlFor="nome">Nome Completo</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Seu nome completo"
                        required
                    />

                    {/* Campo Sobre */}
                    <label htmlFor="sobre">Sobre</label>
                    <textarea
                        id="sobre"
                        name="sobre"
                        value={formData.sobre}
                        onChange={handleChange}
                        placeholder="Fale um pouco sobre você e suas preferências"
                        rows="3"
                    />

                    {/* Campo Departamento */}
                    <label htmlFor="departamento">Departamento*</label>
                    <select
                        id="departamento"
                        name="departamento"
                        value={formData.departamento}
                        onChange={handleChange}
                        required
                        className="select-field"
                    >
                        {departments.map((dep) => (
                            <option key={dep} value={dep}>
                                {dep}
                            </option>
                        ))}
                    </select>

                    {/* Campo Endereço */}
                    <label htmlFor="endereco">Endereço</label>
                    <input
                        type="text"
                        id="endereco"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleChange}
                        placeholder="Seu endereço completo"
                    />
                    
                    {/* Campo Foto de Perfil */}
                    <div className="profile-photo-upload">
                        <label>Foto de Perfil</label>
                        <div className="upload-options">
                            <button type="button" className="choose-photo-btn">Escolher foto</button>
                            <span className="optional-text">Opcional</span>
                        </div>
                    </div>

                    {/* Campo Email de contato */}
                    <label htmlFor="email">Email de contato*</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Digite seu Email de contato"
                        required
                    />

                    {/* Campo Número de contato */}
                    <label htmlFor="numero_contato">número de contato*</label>
                    <input
                        type="tel" 
                        id="numero_contato"
                        name="numero_contato"
                        value={formData.numero_contato}
                        onChange={handleChange}
                        placeholder="Digite seu número de contato"
                        required
                    />

                    <button type="submit" className="confirm-button">
                        Confirmar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;