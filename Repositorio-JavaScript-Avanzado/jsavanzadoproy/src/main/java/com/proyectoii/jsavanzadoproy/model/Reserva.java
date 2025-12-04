package com.proyectoii.jsavanzadoproy.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.lang.NonNull;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "reservas")
public class Reserva {
    // Atributos:
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name="evento_id",nullable=false)
    @NotNull
    private Evento evento;

    @ManyToOne
    @JoinColumn(name="asistente_id", nullable=false)
    @NonNull
    private Asistente asistente;

    @Column(name="fecha_reserva", nullable=false)
    private LocalDateTime fechaReserva;

    @Column(length=20)
    private String estado;

    // Constructor:
    public Reserva() {
        this.fechaReserva = LocalDateTime.now();
        this.estado = "Confirmado";
    }

    public Reserva(Evento evento, Asistente asistente) {
        this.evento = evento;
        this.asistente = asistente;
        this.fechaReserva = LocalDateTime.now();
        this.estado = "Confirmado"; 
    }

    // Getters y Setters:
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }

    public Asistente getAsistente() {
        return asistente;
    }

    public void setAsistente(Asistente asistente) {
        this.asistente = asistente;
    }

    public LocalDateTime getFechaReserva() {
        return fechaReserva;
    }

    public void setFechaReserva(LocalDateTime fechaReserva) {
        this.fechaReserva = fechaReserva;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
