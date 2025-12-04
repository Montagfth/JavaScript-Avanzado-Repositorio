package com.proyectoii.jsavanzadoproy.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyectoii.jsavanzadoproy.model.Asistente;
import com.proyectoii.jsavanzadoproy.model.Evento;
import com.proyectoii.jsavanzadoproy.model.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByEventoId(Long eventoId);

    List<Reserva> findByAsistenteId(Long asistenteId);

    int countByEventoId(Long eventoId);

    Optional<Reserva> findByEventoAndAsistente(Evento evento, Asistente asistente);
}
