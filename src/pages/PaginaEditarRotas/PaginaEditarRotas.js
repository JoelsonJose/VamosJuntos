import './PaginaEditarRotas.css';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function EditarRotaPage() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Editar Rota</h1>
          <span className="subtitle">Altere os detalhes da sua rota</span>
        </header>

        <section className="area-editar-rota">
          <div className="card-editar-rota">
            <h5 className="fw-bold">Informações da Rota</h5>
            <p className="text-secondary mb-4">Atualize os detalhes da sua carona</p>

            <div className="row mb-3">
              <div className="col-md-6">
                <label><i className="bi bi-geo-alt-fill"></i> Origem (Bairro/Avenida)</label>
                <input type="text" className="form-control" defaultValue="Casa Amarela, Recife" />
              </div>
              <div className="col-md-6">
                <label><i className="bi bi-geo-alt-fill"></i> Destino (Bairro/Avenida)</label>
                <input type="text" className="form-control" defaultValue="Recife Antigo, Av. Alfredo Lisboa 810" />
              </div>
            </div>

            <div className="mb-3">
              <label><i className="bi bi-signpost-split"></i> Pontos-chave do Trajeto</label>
              <textarea className="form-control" rows="2" defaultValue="Av. Norte, Derby, Boa Vista"></textarea>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label><i className="bi bi-clock"></i> Horário de Saída</label>
                <input type="time" className="form-control" defaultValue="08:00" />
              </div>

              <div className="col-md-6">
                <label>Dias da Semana</label>
                <div className="d-flex flex-wrap gap-2 mt-1">
                  <div><input type="checkbox" defaultChecked /> Segunda</div>
                  <div><input type="checkbox" defaultChecked /> Terça</div>
                  <div><input type="checkbox" defaultChecked /> Quarta</div>
                  <div><input type="checkbox" defaultChecked /> Quinta</div>
                  <div><input type="checkbox" defaultChecked /> Sexta</div>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label>Observações Adicionais</label>
              <textarea className="form-control" rows="2" defaultValue="Evitar horários de pico; preferir caronas com boa avaliação."></textarea>
            </div>

            <div className="row mb-4">
              <div className="col-md-4">
                <label><i className="bi bi-people"></i> Número de Vagas</label>
                <select className="form-select" defaultValue="4">
                  <option>4</option>
                  <option>3</option>
                  <option>2</option>
                  <option>1</option>
                </select>
              </div>
              <div className="col-md-4">
                <label><i className="bi bi-cash"></i> Valor por Pessoa (R$)</label>
                <select className="form-select" defaultValue="10,00">
                  <option>10,00</option>
                  <option>8,00</option>
                  <option>12,00</option>
                </select>
              </div>
              <div className="col-md-4">
                <label><i className="bi bi-star"></i> Nota Mínima</label>
                <select className="form-select" defaultValue="4+">
                  <option>4+</option>
                  <option>3+</option>
                  <option>5</option>
                </select>
              </div>
            </div>

            <div className="text-center">
              <button className="btn btn-purple me-2">Salvar Alterações</button>
              <button className="btn btn-outline-secondary">Cancelar</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}