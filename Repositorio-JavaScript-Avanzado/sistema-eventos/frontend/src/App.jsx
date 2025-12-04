// src/App.jsx
import React, { useState, useEffect } from 'react';
import { eventosAPI, categoriasAPI, asistentesAPI, reservasAPI } from './services/api';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('eventos');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Sistema de Gestión de Eventos</h1>
      </header>

      <nav className="app-nav">
        {['eventos', 'categorias', 'asistentes', 'reservas'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`nav-btn ${activeTab === tab ? 'active' : ''}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      <main className="app-main">
        {activeTab === 'eventos' && <EventosView />}
        {activeTab === 'categorias' && <CategoriasView />}
        {activeTab === 'asistentes' && <AsistentesView />}
        {activeTab === 'reservas' && <ReservasView />}
      </main>
    </div>
  );
}

// ========== VISTA DE EVENTOS ==========
function EventosView() {
  const [eventos, setEventos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    fecha: '',
    ubicacion: '',
    cupoMaximo: '',
    categoria: { id: '' }
  });

  useEffect(() => {
    cargarEventos();
    cargarCategorias();
  }, []);

  const cargarEventos = async () => {
    setLoading(true);
    try {
      const response = await eventosAPI.getAll();
      setEventos(response.data);
    } catch (error) {
      console.error('Error al cargar eventos:', error);
      alert('Error al cargar eventos');
    } finally {
      setLoading(false);
    }
  };

  const cargarCategorias = async () => {
    try {
      const response = await categoriasAPI.getAll();
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const datos = {
        ...formData,
        cupoMaximo: parseInt(formData.cupoMaximo),
        categoria: { id: parseInt(formData.categoria.id) }
      };

      if (editando) {
        await eventosAPI.update(editando, datos);
        alert('Evento actualizado correctamente');
      } else {
        await eventosAPI.create(datos);
        alert('Evento creado correctamente');
      }
      
      resetForm();
      cargarEventos();
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + (error.response?.data || 'Error al guardar evento'));
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este evento?')) {
      setLoading(true);
      try {
        await eventosAPI.delete(id);
        alert('Evento eliminado correctamente');
        cargarEventos();
      } catch (error) {
        alert('Error al eliminar evento');
      } finally {
        setLoading(false);
      }
    }
  };

  const editar = (evento) => {
    setFormData({
      nombre: evento.nombre,
      fecha: evento.fecha,
      ubicacion: evento.ubicacion,
      cupoMaximo: evento.cupoMaximo,
      categoria: { id: evento.categoria?.id || '' }
    });
    setEditando(evento.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ nombre: '', fecha: '', ubicacion: '', cupoMaximo: '', categoria: { id: '' } });
    setEditando(null);
    setShowForm(false);
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <h2>Gestión de Eventos</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancelar' : '+ Nuevo Evento'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>{editando ? 'Editar Evento' : 'Nuevo Evento'}</h3>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Nombre del evento"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              className="form-input"
            />
            <input
              type="date"
              value={formData.fecha}
              onChange={(e) => setFormData({...formData, fecha: e.target.value})}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Ubicación"
              value={formData.ubicacion}
              onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
              className="form-input"
            />
            <input
              type="number"
              placeholder="Cupo máximo"
              value={formData.cupoMaximo}
              onChange={(e) => setFormData({...formData, cupoMaximo: e.target.value})}
              min="1"
              className="form-input"
            />
            <select
              value={formData.categoria.id}
              onChange={(e) => setFormData({...formData, categoria: { id: e.target.value }})}
              className="form-input"
            >
              <option value="">Seleccionar categoría</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button onClick={handleSubmit} className="btn-primary" disabled={loading}>
              {loading ? 'Guardando...' : (editando ? 'Actualizar' : 'Crear')}
            </button>
            <button onClick={resetForm} className="btn-secondary">Cancelar</button>
          </div>
        </div>
      )}

      {loading && <div className="loading">Cargando...</div>}

      <div className="cards-grid">
        {eventos.map(evento => (
          <div key={evento.id} className="card">
            <h3>{evento.nombre}</h3>
            <div className="card-details">
              <p><strong>Fecha:</strong> {evento.fecha}</p>
              <p><strong>Ubicación:</strong> {evento.ubicacion}</p>
              <p><strong>Cupo:</strong> {evento.cupoMaximo} personas</p>
              <p><strong>Categoría:</strong> {evento.categoria?.nombre || 'Sin categoría'}</p>
            </div>
            <div className="card-actions">
              <button onClick={() => editar(evento)} className="btn-edit">Editar</button>
              <button onClick={() => eliminar(evento.id)} className="btn-delete">Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {eventos.length === 0 && !loading && (
        <div className="empty-state">No hay eventos registrados</div>
      )}
    </div>
  );
}

// ========== VISTA DE CATEGORÍAS ==========
function CategoriasView() {
  const [categorias, setCategorias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    setLoading(true);
    try {
      const response = await categoriasAPI.getAll();
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
      alert('Error al cargar categorías');
    } finally {
      setLoading(false);
    }
  };

  const guardar = async () => {
    if (!nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }
    setLoading(true);
    try {
      if (editando) {
        await categoriasAPI.update(editando, { nombre });
        alert('Categoría actualizada');
      } else {
        await categoriasAPI.create({ nombre });
        alert('Categoría creada');
      }
      resetForm();
      cargarCategorias();
    } catch (error) {
      alert('Error al guardar categoría');
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async (id) => {
    if (window.confirm('¿Eliminar esta categoría?')) {
      setLoading(true);
      try {
        await categoriasAPI.delete(id);
        alert('Categoría eliminada');
        cargarCategorias();
      } catch (error) {
        alert('Error: Esta categoría puede estar siendo usada por eventos');
      } finally {
        setLoading(false);
      }
    }
  };

  const editar = (cat) => {
    setNombre(cat.nombre);
    setEditando(cat.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setNombre('');
    setEditando(null);
    setShowForm(false);
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <h2>Categorías</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancelar' : '+ Nueva Categoría'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>{editando ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="form-input"
            style={{ width: '100%' }}
          />
          <div className="form-actions">
            <button onClick={guardar} className="btn-primary" disabled={loading}>
              {loading ? 'Guardando...' : (editando ? 'Actualizar' : 'Crear')}
            </button>
            <button onClick={resetForm} className="btn-secondary">Cancelar</button>
          </div>
        </div>
      )}

      {loading && <div className="loading">Cargando...</div>}

      <div className="cards-grid-small">
        {categorias.map(cat => (
          <div key={cat.id} className="card">
            <h3>{cat.nombre}</h3>
            <div className="card-actions">
              <button onClick={() => editar(cat)} className="btn-edit">Editar</button>
              <button onClick={() => eliminar(cat.id)} className="btn-delete">Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {categorias.length === 0 && !loading && (
        <div className="empty-state">No hay categorías registradas</div>
      )}
    </div>
  );
}

// ========== VISTA DE ASISTENTES ==========
function AsistentesView() {
  const [asistentes, setAsistentes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', email: '' });

  useEffect(() => {
    cargarAsistentes();
  }, []);

  const cargarAsistentes = async () => {
    setLoading(true);
    try {
      const response = await asistentesAPI.getAll();
      setAsistentes(response.data);
    } catch (error) {
      console.error('Error al cargar asistentes:', error);
      alert('Error al cargar asistentes');
    } finally {
      setLoading(false);
    }
  };

  const guardar = async () => {
    if (!formData.nombre || !formData.email) {
      alert('Todos los campos son obligatorios');
      return;
    }
    setLoading(true);
    try {
      await asistentesAPI.create(formData);
      alert('Asistente registrado');
      setFormData({ nombre: '', email: '' });
      setShowForm(false);
      cargarAsistentes();
    } catch (error) {
      alert('Error: ' + (error.response?.data || 'Error al registrar asistente'));
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async (id) => {
    if (window.confirm('¿Eliminar este asistente?')) {
      setLoading(true);
      try {
        await asistentesAPI.delete(id);
        alert('Asistente eliminado');
        cargarAsistentes();
      } catch (error) {
        alert('Error al eliminar');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <h2>Asistentes</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancelar' : '+ Nuevo Asistente'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>Nuevo Asistente</h3>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Nombre completo"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              className="form-input"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="form-input"
            />
          </div>
          <div className="form-actions">
            <button onClick={guardar} className="btn-primary" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
            <button onClick={() => setShowForm(false)} className="btn-secondary">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {loading && <div className="loading">Cargando...</div>}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asistentes.map(asistente => (
              <tr key={asistente.id}>
                <td>{asistente.id}</td>
                <td>{asistente.nombre}</td>
                <td>{asistente.email}</td>
                <td>
                  <button onClick={() => eliminar(asistente.id)} className="btn-delete-small">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {asistentes.length === 0 && !loading && (
        <div className="empty-state">No hay asistentes registrados</div>
      )}
    </div>
  );
}

// ========== VISTA DE RESERVAS ==========
function ReservasView() {
  const [reservas, setReservas] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [asistentes, setAsistentes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    evento: { id: '' },
    asistente: { id: '' }
  });

  useEffect(() => {
    cargarReservas();
    cargarEventos();
    cargarAsistentes();
  }, []);

  const cargarReservas = async () => {
    setLoading(true);
    try {
      const response = await reservasAPI.getAll();
      setReservas(response.data);
    } catch (error) {
      console.error('Error al cargar reservas:', error);
    } finally {
      setLoading(false);
    }
  };

  const cargarEventos = async () => {
    try {
      const response = await eventosAPI.getAll();
      setEventos(response.data);
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    }
  };

  const cargarAsistentes = async () => {
    try {
      const response = await asistentesAPI.getAll();
      setAsistentes(response.data);
    } catch (error) {
      console.error('Error al cargar asistentes:', error);
    }
  };

  const guardar = async () => {
    if (!formData.evento.id || !formData.asistente.id) {
      alert('Todos los campos son obligatorios');
      return;
    }
    setLoading(true);
    try {
      const datos = {
        evento: { id: parseInt(formData.evento.id) },
        asistente: { id: parseInt(formData.asistente.id) }
      };
      await reservasAPI.create(datos);
      alert('Reserva creada correctamente');
      setFormData({ evento: { id: '' }, asistente: { id: '' } });
      setShowForm(false);
      cargarReservas();
    } catch (error) {
      alert('Error: ' + (error.response?.data || 'Error al crear reserva'));
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async (id) => {
    if (window.confirm('¿Cancelar esta reserva?')) {
      setLoading(true);
      try {
        await reservasAPI.delete(id);
        alert('Reserva cancelada');
        cargarReservas();
      } catch (error) {
        alert('Error al cancelar reserva');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <h2>Reservas</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancelar' : '+ Nueva Reserva'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>Nueva Reserva</h3>
          <div className="form-grid">
            <select
              value={formData.evento.id}
              onChange={(e) => setFormData({...formData, evento: { id: e.target.value }})}
              className="form-input"
            >
              <option value="">Seleccionar evento</option>
              {eventos.map(evento => (
                <option key={evento.id} value={evento.id}>
                  {evento.nombre} - {evento.fecha}
                </option>
              ))}
            </select>
            <select
              value={formData.asistente.id}
              onChange={(e) => setFormData({...formData, asistente: { id: e.target.value }})}
              className="form-input"
            >
              <option value="">Seleccionar asistente</option>
              {asistentes.map(asistente => (
                <option key={asistente.id} value={asistente.id}>
                  {asistente.nombre} ({asistente.email})
                </option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button onClick={guardar} className="btn-primary" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Reserva'}
            </button>
            <button onClick={() => setShowForm(false)} className="btn-secondary">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {loading && <div className="loading">Cargando...</div>}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Evento</th>
              <th>Asistente</th>
              <th>Fecha Reserva</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map(reserva => (
              <tr key={reserva.id}>
                <td>{reserva.id}</td>
                <td>{reserva.evento?.nombre || 'N/A'}</td>
                <td>{reserva.asistente?.nombre || 'N/A'}</td>
                <td>{new Date(reserva.fechaReserva).toLocaleString('es-PE')}</td>
                <td>
                  <span className="badge">{reserva.estado}</span>
                </td>
                <td>
                  <button onClick={() => eliminar(reserva.id)} className="btn-delete-small">
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {reservas.length === 0 && !loading && (
        <div className="empty-state">No hay reservas registradas</div>
      )}
    </div>
  );
}

export default App;