package com.proyectoii.jsavanzadoproy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectoii.jsavanzadoproy.model.Asistente;

import java.util.List;
import java.util.Optional;

import com.proyectoii.jsavanzadoproy.model.Evento;

@Repository
public interface AsistenteRepository extends JpaRepository<Asistente, Long> {

    // Listar asistentes por evento (para el detalle del evento)
    List<Asistente> findByEventoId(long EventoId);

    // Validación: verificar si un email ya está registrado en un evento
    boolean existByEmailAndEventoId(String email, long eventoId);

    // Busqueda de asistente poe email y evento:
    Optional<Asistente> findByEmailAndEvento(String email, Evento evento);

}
