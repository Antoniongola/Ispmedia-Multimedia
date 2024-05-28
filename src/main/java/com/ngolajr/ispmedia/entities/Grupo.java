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
    @OneToMany
    private List<Utilizador> editores;
    @ManyToMany
    private List<Utilizador> participantes;
}
