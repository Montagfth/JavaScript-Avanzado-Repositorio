
package com.proyectoii.jsavanzadoproy.controller;

import java.util.List;

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
import com.proyectoii.jsavanzadoproy.service.AsistenteService;

@RestController
@RequestMapping("/api/asistentes")
// Para front-end separado:
@CrossOrigin(origins = "*")
public class AsistenteController {

    @Autowired
    private AsistenteService asistenteService;

    // Listar todos los asistentes
    @GetMapping
    public ResponseEntity<List<Asistente>> listarAsistentes() {
        List<Asistente> lista = asistenteService.listarAsistentes();
        return ResponseEntity.ok(lista);
    }

    // Registrar nuevo asistente
    @PostMapping
    public ResponseEntity<String> registrarAsistente(@RequestBody Asistente asistente) {
        String mensaje = asistenteService.registrarAsistente(asistente);
        if (mensaje.contains("correctamente")) {
            return ResponseEntity.ok(mensaje);
        } else {
            return ResponseEntity.badRequest().body(mensaje);
        }
    }

    // Eliminar asistente por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarAsistente(@PathVariable Long id) {
        String mensaje = asistenteService.eliminarAsistente(id);
        if (mensaje.contains("correctamente")) {
            return ResponseEntity.ok(mensaje);
        } else {
            return ResponseEntity.badRequest().body(mensaje);
        }
    }
}
