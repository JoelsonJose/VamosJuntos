import './PaginaInicial.css';
import logo from '../../assets/Somente_Logo_VJ 1.png';
import Button from '../../components/Button/index';

export default function PaginaInicial () {
    return (
        <div className='paginainicial'>
            <img  src= {logo} alt='Logo VamosJuntos' className='paginainicial-logo'/>
            <h1 className='paginainicial-title'>VamosJuntos</h1>
            <p className='paginainicial-subtitle'>Menos carros mais conexões</p>

            <div className='paginainicial-button-group'>
                <Button title = "Login"/>
                <Button title = "Criar Conta"/>
            </div>
        </div>
    )
}