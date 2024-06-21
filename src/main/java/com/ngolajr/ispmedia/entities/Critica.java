package com.ngolajr.ispmedia.entities;

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
    private Album album;
}
