package com.ngolajr.ispmedia.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Grupo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private Utilizador owner;
    @ManyToMany
    private List<Utilizador> participantes;
}
