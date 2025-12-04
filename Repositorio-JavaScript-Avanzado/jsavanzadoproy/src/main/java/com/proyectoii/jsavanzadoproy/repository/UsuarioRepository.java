package com.proyectoii.jsavanzadoproy.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyectoii.jsavanzadoproy.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Buscar por nombre de usuario (para login o verificación)
    Optional<Usuario> findByUser(String user);

    // Si necesitas evitar usuarios duplicados al registrar:
    boolean existByUser(String user);

}
