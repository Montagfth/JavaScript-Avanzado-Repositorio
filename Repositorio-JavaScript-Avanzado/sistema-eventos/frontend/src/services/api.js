// src/services/api.js
import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Servicios para EVENTOS
export const eventosAPI = {
  getAll: () => api.get('/eventos'),
  getById: (id) => api.get(`/eventos/${id}`),
  create: (evento) => api.post('/eventos', evento),
  update: (id, evento) => api.put(`/eventos/${id}`, evento),
  delete: (id) => api.delete(`/eventos/${id}`)
};

// Servicios para CATEGORÍAS
export const categoriasAPI = {
  getAll: () => api.get('/categorias'),
  getById: (id) => api.get(`/categorias/${id}`),
  create: (categoria) => api.post('/categorias', categoria),
  update: (id, categoria) => api.put(`/categorias/${id}`, categoria),
  delete: (id) => api.delete(`/categorias/${id}`)
};

// Servicios para ASISTENTES
export const asistentesAPI = {
  getAll: () => api.get('/asistentes'),
  create: (asistente) => api.post('/asistentes', asistente),
  delete: (id) => api.delete(`/asistentes/${id}`)
};

// Servicios para RESERVAS
export const reservasAPI = {
  getAll: () => api.get('/reservas'),
  create: (reserva) => api.post('/reservas', reserva),
  delete: (id) => api.delete(`/reservas/${id}`),
  getByEvento: (eventoId) => api.get(`/reservas/evento/${eventoId}`),
  getByAsistente: (asistenteId) => api.get(`/reservas/asistente/${asistenteId}`)
};

export default api;