
package com.proyectoii.jsavanzadoproy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectoii.jsavanzadoproy.model.Asistente;
import com.proyectoii.jsavanzadoproy.model.Evento;
import com.proyectoii.jsavanzadoproy.repository.AsistenteRepository;
import com.proyectoii.jsavanzadoproy.repository.EventoRepository;

@Service
public class AsistenteService {

    // Atributos:
    @Autowired
    private AsistenteRepository asistenteRepository;
    @Autowired
    private EventoRepository eventoRepository;

    // Listado de asistentes:
    public List<Asistente> listarAsistentes() {
        return asistenteRepository.findAll();
    }

    public String registrarAsistente(Asistente asistente) {
        // Si el asistente no tiene evento, lo registramos sin asociarlo
        if (asistente.getEvento() == null || asistente.getEvento().getId() == null) {
            asistente.setEvento(null);
            asistenteRepository.save(asistente);
            return "Asistente registrado correctamente (sin evento)";
        }

        // Validar existencia del evento
        Evento evento = eventoRepository.findById(asistente.getEvento().getId()).orElse(null);
        if (evento == null) {
            return "El evento no existe";
        }

        // Validar duplicado (email + evento)
        if (asistenteRepository.findByEmailAndEvento(asistente.getEmail(), evento).isPresent()) {
            return "Este asistente ya está registrado en este evento";
        }

        // Validar cupo máximo (si lo necesitas)
        // int asistentesRegistrados =
        // asistenteRepository.findByEventoId(evento).size();
        // if (asistentesRegistrados >= evento.getCupoMaximo()) {
        // return "Cupo máximo alcanzado para este evento";
        // }

        asistente.setEvento(evento);
        asistenteRepository.save(asistente);
        return "Asistente registrado correctamente";
    }

    // Metodo de eliminacion de asistente de evento:
    public String eliminarAsistente(Long id) {
        if (!asistenteRepository.existsById(id)) {
            return "Asistente no encontrado";
        }
        asistenteRepository.deleteById(id);
        return "Asistente eliminado correctamente";
    }

}
