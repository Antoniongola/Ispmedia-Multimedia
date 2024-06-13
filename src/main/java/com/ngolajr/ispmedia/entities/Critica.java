package com.ngolajr.ispmedia.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Critica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private double nota;
    @Column(length = 2000)
    private String critica;
    //verificar
    @OneToOne
    private Utilizador critico;
}
