import Input from '../../components/Input/Input'; 
import Button from '../../components/Button'; 
import logo from '../../assets/Somente_Logo_VJ 1.png';

export default function RegisterPage () {
  return (
      <div className="login-background">
        
        
        <div className="login-container">
          
          <img src={logo} alt="VamosJuntos Logo" className="login-logo" />
          <h2 className="login-title">Entrar no VamosJuntos</h2>
          <p className="login-subtitle">Faça login para acessar suas caronas</p>

          <form className="login-form">
            <Input label="Email Corporativo" type="email" placeholder="Seu.email@empresa.com" />
            <Input label="Senha" type="password" placeholder="Digite uma senha segura" />
            <Button title="Entrar" variant="primary" /> 
          </form>

          <p className="forgot-link-text">
            <Link to="/esqueci" className="forgot-link">Esqueci minha senha</Link>
          </p>
           <p className="forgot-link-text">
            Não tem conta? <Link to="/cadastro" className="cadastro-link">Cadastra-se</Link>
          </p>
        </div>
      </div>
  );
};
