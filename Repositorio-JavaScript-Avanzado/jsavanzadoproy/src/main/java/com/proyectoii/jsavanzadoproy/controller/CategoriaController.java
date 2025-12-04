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

import com.proyectoii.jsavanzadoproy.model.Categoria;
import com.proyectoii.jsavanzadoproy.repository.CategoriaRepository;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    // Listar todas las categorías
    @GetMapping
    public ResponseEntity<List<Categoria>> listarCategorias() {
        List<Categoria> categorias = categoriaRepository.findAll();
        return ResponseEntity.ok(categorias);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerCategoria(@PathVariable Long id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        if (categoria.isPresent()) {
            return ResponseEntity.ok(categoria.get());
        } else {
            return ResponseEntity.badRequest().body("Categoría no encontrada");
        }
    }

    // Crear una nueva categoría
    @PostMapping
    public ResponseEntity<String> crearCategoria(@RequestBody Categoria categoria) {
        categoriaRepository.save(categoria);
        return ResponseEntity.ok("Categoría registrada correctamente");
    }

    // Actualizar una categoría existente
    @PutMapping("/{id}")
    public ResponseEntity<String> actualizarCategoria(@PathVariable Long id, @RequestBody Categoria datosCategoria) {
        Optional<Categoria> categoriaExistente = categoriaRepository.findById(id);
        if (categoriaExistente.isEmpty()) {
            return ResponseEntity.badRequest().body("Categoría no encontrada");
        }

        Categoria categoria = categoriaExistente.get();
        categoria.setNombre(datosCategoria.getNombre());
        categoriaRepository.save(categoria);

        return ResponseEntity.ok("Categoría actualizada correctamente");
    }

    // Eliminar una categoría
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarCategoria(@PathVariable Long id) {
        if (!categoriaRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Categoría no encontrada");
        }

        categoriaRepository.deleteById(id);
        return ResponseEntity.ok("Categoría eliminada correctamente");
    }
}
