package com.ngolajr.ispmedia.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Critica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int nota;
    @Column(length = 300)
    private String critica;
    //verificar
    @ManyToOne
    private Utilizador critico;
    @ManyToOne
    @JsonBackReference(value = "album-critica")
    private Album album;
}
