package com.proyectoii.jsavanzadoproy.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoii.jsavanzadoproy.model.Evento;
import com.proyectoii.jsavanzadoproy.repository.EventoRepository;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "*")
public class EventoController {

    @Autowired
    private EventoRepository eventoRepository;

    // Listar todos los eventos
    @GetMapping
    public ResponseEntity<List<Evento>> listarEventos() {
        List<Evento> lista = eventoRepository.findAll();
        return ResponseEntity.ok(lista);
    }

    // Obtener un evento por su ID
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerEvento(@PathVariable Long id) {
        Optional<Evento> evento = eventoRepository.findById(id);
        return evento.isPresent()
                ? ResponseEntity.ok(evento.get())
                : ResponseEntity.badRequest().body("Evento no encontrado");
    }

    // Registrar nuevo evento
    @PostMapping
    public ResponseEntity<String> registrarEvento(@RequestBody Evento evento) {
        if (evento.getNombre() == null || evento.getNombre().isBlank()) {
            return ResponseEntity.badRequest().body("El nombre del evento es obligatorio");
        }
        if (evento.getCupoMaximo() <= 0) {
            return ResponseEntity.badRequest().body("El cupo máximo debe ser mayor que cero");
        }

        eventoRepository.save(evento);
        return ResponseEntity.ok("Evento registrado correctamente");
    }

    // Actualizar evento existente
    @PutMapping("/{id}")
    public ResponseEntity<String> actualizarEvento(@PathVariable Long id, @RequestBody Evento datosEvento) {
        Optional<Evento> eventoExistente = eventoRepository.findById(id);
        if (eventoExistente.isEmpty()) {
            return ResponseEntity.badRequest().body("Evento no encontrado");
        }

        Evento evento = eventoExistente.get();
        evento.setNombre(datosEvento.getNombre());
        evento.setFecha(datosEvento.getFecha());
        evento.setUbicacion(datosEvento.getUbicacion());
        evento.setCupoMaximo(datosEvento.getCupoMaximo());
        eventoRepository.save(evento);

        return ResponseEntity.ok("Evento actualizado correctamente");
    }

    // Eliminar evento
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarEvento(@PathVariable Long id) {
        if (!eventoRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Evento no encontrado");
        }
        eventoRepository.deleteById(id);
        return ResponseEntity.ok("Evento eliminado correctamente");
    }
}