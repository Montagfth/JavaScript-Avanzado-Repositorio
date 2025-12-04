package com.proyectoii.jsavanzadoproy.repository;

import com.proyectoii.jsavanzadoproy.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {

    // Buscar eventos cuyo nombre contenga una cadena (útil para búsquedas/filtro en
    // frontend)
    List<Evento> findByNombreContainingIgnoreCase(String nombre);

    // Buscar eventos por categoría (si en frontend filtras por categoría)
    List<Evento> findByCategoriaId(Long categoriaId);

}
