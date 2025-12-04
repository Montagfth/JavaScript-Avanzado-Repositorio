package com.proyectoii.jsavanzadoproy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.proyectoii.jsavanzadoproy.model.Asistente;
import java.util.List;
import java.util.Optional;
import com.proyectoii.jsavanzadoproy.model.Evento;

@Repository
public interface AsistenteRepository extends JpaRepository<Asistente, Long> {

    List<Asistente> findByEventoId(long EventoId);

    // CORREGIR: Cambiar "existBy" por "existsBy"
    boolean existsByEmailAndEventoId(String email, long eventoId);

    Optional<Asistente> findByEmailAndEvento(String email, Evento evento);
}
