package com.ngolajr.ispmedia.entities;

import jakarta.persistence.*;

@Entity
public class Critica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int nota;
    private String critica;
    //verificar
    @OneToOne
    private Utilizador critico;
}
