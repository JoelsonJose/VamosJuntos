import './PaginaEsqueciSenha.css';
import { Link } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Button from '../../components/Button';
import logo from '../../assets/imagem vamosjuntos.png';
import { useNavigate } from 'react-router-dom';
import BotaoAcessibilidade from "../../components/BotaoAcessibilidade/BotaoAcessibilidade";

export default function PaginaEsqueciSenha() {
  const navigate = useNavigate();

  const handleRecuperarSenha = (event) => {
    event.preventDefault();
    // Lógica para enviar email de recuperação de senha
    // Por enquanto, apenas navega para a página de login
    navigate('/login');
  };

  return (
    <div className="esqueci-senha-background">
      <div className="esqueci-senha-container">
        <img src={logo} alt="VamosJuntos Logo" className="esqueci-senha-logo" />
        <h2 className="esqueci-senha-title">Recuperar Senha</h2>
        <p className="esqueci-senha-subtitle">
          Insira seu email para enviarmos um link de recuperação de senha
        </p>

        <form className="esqueci-senha-form">
          <Input label="Email Corporativo" type="email" placeholder="Seu.email@empresa.com" />
          <Button title="Enviar" variant="primary" onClick={handleRecuperarSenha} />
        </form>

        <p className="login-link-text">
          Lembrou a senha? <Link to="/login" className="login-link">Fazer login</Link>
        </p>
      </div>
      <BotaoAcessibilidade />
    </div>
  );
};
