import React, { useState, useEffect } from 'react'; 
import './EditProfileModal.css'; 
import EditIcon from '../../assets/Editw.png'; // Importando o ícone de edição branco

const departments = [
    "Selecione seu departamento",
    "Tecnologia",
    "Recursos Humanos",
    "Financeiro",
    "Marketing",
    "Operações"
];


const EditProfileModal = ({ isOpen, onClose, currentData, onSave }) => {
    
    
    const [formData, setFormData] = useState({
        nome: '',
        sobre: '',
        departamento: departments[0], 
        endereco: '',
        email: '',
        numero_contato: ''
    });

    
    useEffect(() => {
        if (currentData) {
            setFormData({
                nome: currentData.name || '',
                sobre: currentData.bio || '', 
                departamento: currentData.occupation || departments[0], 
                endereco: currentData.location || '', 
                email: currentData.email || '',
                numero_contato: (currentData.phone || '').replace(/[\s()-]/g, '')
            });
        }
    }, [currentData]); 

    
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
        if (onSave) {
            onSave(formData);
        }
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
                    <div className="modal-icon-container">
                       <img src={EditIcon} alt="Ícone de Edição" className="edit-icon" />
                    </div>
                    <div className="modal-title-container">
                        <h2>Edição de perfil</h2>
                        <p>Edite seu perfil completo</p>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="edit-profile-form">
                    
                    {/* Campos de Nome, Sobre, Departamento, Endereço... (Mantidos) */}
                    <label htmlFor="nome">Nome Completo</label>
                    <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} placeholder="Seu nome completo" required />
                    
                    <label htmlFor="sobre">Sobre</label>
                    <textarea id="sobre" name="sobre" value={formData.sobre} onChange={handleChange} placeholder="Fale um pouco sobre você e suas preferências" rows="3" />
                    
                    <label htmlFor="departamento">Departamento*</label>
                    <select id="departamento" name="departamento" value={formData.departamento} onChange={handleChange} required className="select-field">
                        {departments.map((dep) => (<option key={dep} value={dep}>{dep}</option>))}
                    </select>

                    <label htmlFor="endereco">Endereço</label>
                    <input type="text" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} placeholder="Seu endereço completo" />
                    
                    {/* Campo Foto de Perfil (SEM LÓGICA DE JS POR ENQUANTO) */}
                    <div className="profile-photo-upload">
                        <label>Foto de Perfil</label>
                        <div className="upload-options">
                            <button type="button" className="choose-photo-btn">Escolher foto</button>
                            <span className="optional-text">Opcional</span>
                        </div>
                    </div>

                    {/* Campo Email de contato */}
                    <label htmlFor="email">Email de contato*</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Digite seu Email de contato" required />

                    {/* Campo Número de contato */}
                    <label htmlFor="numero_contato">número de contato*</label>
                    <input type="tel" id="numero_contato" name="numero_contato" value={formData.numero_contato} onChange={handleChange} placeholder="Digite seu número de contato" required />

                    <button type="submit" className="confirm-button">
                        Confirmar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;