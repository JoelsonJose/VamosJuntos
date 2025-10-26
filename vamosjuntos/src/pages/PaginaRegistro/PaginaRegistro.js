import './PaginaRegistro.css'; 
import { Link } from 'react-router-dom'; 
import Input from '../../components/Input/Input'; 
import Button from '../../components/Button'; 
import logo from '../../assets/Somente_Logo_VJ 1.png'; 

export default function RegisterPage () {
  return (
      <div className="register-background">
        
        
        <div className="register-container">
          
          <img src={logo} alt="VamosJuntos Logo" className="register-logo" />
          <h2 className="register-title">Criando Conta</h2>
          <p className="register-subtitle">Cadastre-se para começar a usar o VamosJuntos</p>

          <form className="register-form">
            <Input label="Nome Completo" type="text" placeholder="Seu nome completo" />
            <Input label="Email Corporativo" type="email" placeholder="Seu.email@empresa.com" />
    
            
            <div className="campo-container"> 
              <label className="campo-rotulo">Departamento<span className="asterisco-obrigatorio">*</span></label>
              <select className="campo-entrada select-field"> 
                <option value="" disabled selected>Selecione seu departamento</option>
                <option value="ti">T.I.</option>
                <option value="rh">Recursos Humanos</option>
                <option value="financeiro">Financeiro</option>
              </select>
            </div>

            <Input label="Endereço" type="text" placeholder="Seu endereço completo" />
            
            
            <div className="campo-container"> 
              <label className="campo-rotulo">Foto de Perfil <span className="optional-text">(Opcional)</span></label>
              <button type="button" className="file-upload-button">
                ⬆️ Escolher foto
              </button>
            </div>

            <Input label="Senha" type="password" placeholder="Digite uma senha segura" />
            <Input label="Confirmar senha" type="password" placeholder="Confirme sua senha" />
            
            <Button title="Cadastrar" variant="primary" /> 
          </form>

          <p className="login-link-text">
            Já tem conta? <Link to="/login" className="login-link">Fazer login</Link>
          </p>
        </div>
      </div>
  );
};