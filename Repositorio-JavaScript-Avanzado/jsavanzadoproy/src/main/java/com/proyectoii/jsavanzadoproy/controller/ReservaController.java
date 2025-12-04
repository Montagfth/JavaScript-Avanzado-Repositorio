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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyectoii.jsavanzadoproy.model.Asistente;
import com.proyectoii.jsavanzadoproy.model.Evento;
import com.proyectoii.jsavanzadoproy.model.Reserva;
import com.proyectoii.jsavanzadoproy.repository.AsistenteRepository;
import com.proyectoii.jsavanzadoproy.repository.EventoRepository;
import com.proyectoii.jsavanzadoproy.repository.ReservaRepository;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "*")
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private AsistenteRepository asistenteRepository;

    // Listar todas las reservas
    @GetMapping
    public ResponseEntity<List<Reserva>> listarReservas() {
        List<Reserva> reservas = reservaRepository.findAll();
        return ResponseEntity.ok(reservas);
    }

    // Crear una reserva (asociando evento y asistente)
    @PostMapping
    public ResponseEntity<String> crearReserva(@RequestBody Reserva reserva) {

        // Validar existencia del evento
        Optional<Evento> eventoOpt = eventoRepository.findById(reserva.getEvento().getId());
        if (eventoOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Evento no encontrado");
        }

        // Validar existencia del asistente
        Optional<Asistente> asistenteOpt = asistenteRepository.findById(reserva.getAsistente().getId());
        if (asistenteOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Asistente no encontrado");
        }

        Evento evento = eventoOpt.get();
        Asistente asistente = asistenteOpt.get();

        // Validar que el evento no haya alcanzado el cupo máximo
        int reservasActuales = reservaRepository.countByEventoId(evento.getId());
        if (reservasActuales >= evento.getCupoMaximo()) {
            return ResponseEntity.badRequest().body("Cupo máximo alcanzado para este evento");
        }

        // Validar que el asistente no tenga ya una reserva en ese evento
        if (reservaRepository.findByEventoAndAsistente(evento, asistente).isPresent()) {
            return ResponseEntity.badRequest().body("El asistente ya tiene una reserva para este evento");
        }

        reserva.setEvento(evento);
        reserva.setAsistente(asistente);
        reservaRepository.save(reserva);

        return ResponseEntity.ok("Reserva registrada correctamente");
    }

    // Obtener todas las reservas de un evento
    @GetMapping("/evento/{eventoId}")
    public ResponseEntity<List<Reserva>> listarPorEvento(@PathVariable Long eventoId) {
        List<Reserva> reservas = reservaRepository.findByEventoId(eventoId);
        return ResponseEntity.ok(reservas);
    }

    // Obtener todas las reservas de un asistente
    @GetMapping("/asistente/{asistenteId}")
    public ResponseEntity<List<Reserva>> listarPorAsistente(@PathVariable Long asistenteId) {
        List<Reserva> reservas = reservaRepository.findByAsistenteId(asistenteId);
        return ResponseEntity.ok(reservas);
    }

    // Eliminar reserva por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarReserva(@PathVariable Long id) {
        if (!reservaRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Reserva no encontrada");
        }
        reservaRepository.deleteById(id);
        return ResponseEntity.ok("Reserva eliminada correctamente");
    }

}
