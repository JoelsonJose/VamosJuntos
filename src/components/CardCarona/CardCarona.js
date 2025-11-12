import './CardCarona.css';
import Locationincon from '../../assets/Dashboard/Location.png';
import Clockicon from '../../assets/Dashboard/Clock.png';
import { useNavigate } from 'react-router-dom';

export default function CardCarona({ carona }) { 
  const navigate = useNavigate();

  const {
    origem,
    destino,
    horario,
    data,
    status, 
    motorista,
    squad,
  } = carona;

  return (
    <article className="card-carona">
      <div className="card-header">
        <div className="rota-info">
          <h3>{origem} <span>&rarr;</span> {destino}</h3>
          <div className="detalhes-rota">
            <img src={Locationincon} alt="Location" className="Locationicon" />
            <span> Jardim São paulo &rarr; Recife antigo </span>
          </div>
        </div>
        <span className={`status-tag ${status.toLowerCase()}`}>{status}</span>
      </div>
      <div className="card-body">
        <div className="horario-info">
          <img src={Clockicon} alt="Clock" className="Clockicon" />
          <strong>{horario} - {data}</strong>
        </div>
      </div>
      <div className="motorista-info">
        <h3><strong>Motorista:</strong> {motorista}</h3>
      </div>
      <div className="squad-info">
        <p>Squad: {squad}</p>
      </div>

      <div className="card-footer">
        <button
  className="btn-ver-viagem"
  onClick={() => navigate('/caronas/caronista')}
>
  Ver Viagem
</button>

      </div>
    </article>
  );
}